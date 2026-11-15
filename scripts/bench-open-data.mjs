// Benchmark: the Open Data Finder against Claude on varied open-data needs.
// Headline numbers are only what a script can check: how many links each side
// returns, and how many of its top 5 resolve (HTTP 2xx, or 3xx that lands on a
// live page). Relevance is left to a human: the report ends with a side-by-side
// sheet. No LLM judge.
//
// Usage: npm run build && npx next start -p 3203   (in another shell, with ANTHROPIC_API_KEY set)
//        node scripts/bench-open-data.mjs          -> docs/open-data-bench.md
// The Claude side (claude-sonnet-5-5 with web search) runs only when ANTHROPIC_API_KEY is set here too.
// Spends real API money: one run is about 36 Haiku calls and 18 Sonnet calls with up to 5 searches each.
import Anthropic from "@anthropic-ai/sdk";
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3203";
const OUT = new URL("../docs/open-data-bench.md", import.meta.url);
const NEEDS = [
  ["India", "daily rainfall by district in Gujarat"],
  ["India", "Indian court judgments full text"],
  ["India", "PM2.5 air quality readings for Indian cities"],
  ["India", "Indian census population by village"],
  ["Earth observation", "satellite land surface temperature"],
  ["Earth observation", "Sentinel-2 crop type labels"],
  ["Earth observation", "monthly global sea surface temperature"],
  ["Health", "hospital readmission rates"],
  ["Health", "COVID-19 daily cases by country"],
  ["Economics", "GDP per capita by country"],
  ["Economics", "household consumption expenditure survey microdata"],
  ["ML training", "labelled images of plant leaf diseases"],
  ["ML training", "Gujarati speech recordings for speech recognition"],
  ["Transport", "bus GPS traces"],
  ["Transport", "bike share trip records"],
  ["Legal", "US Supreme Court opinions text"],
  ["Obscure", "lightning strike locations"],
  ["Obscure", "beehive weight and temperature sensor readings"],
];
const UA = "open-data-finder-bench/1.0 (+https://iampreetdave.me/open-data)";

// Same rules as the finder (checkTarget/isLive in app/open-data/pipeline.ts): 202 is a bot challenge,
// not the page, and Harvard Dataverse and Figshare pages (202 for any id, real or made up) are
// checked through their JSON APIs. Applied to both sides alike.
const DV_PAGE = "https://dataverse.harvard.edu/dataset.xhtml?persistentId=";
const isLive = (s) => s >= 200 && s < 400 && s !== 202;
function checkTarget(url) {
  if (url.startsWith(DV_PAGE)) return `https://dataverse.harvard.edu/api/datasets/:persistentId/?persistentId=${url.slice(DV_PAGE.length)}`;
  const fig = /^https:\/\/([\w-]+\.)?figshare\.com\/articles\/.*\/(\d+)\/?$/.exec(url);
  return fig ? `https://api.figshare.com/v2/articles/${fig[2]}` : url;
}

async function resolves(link) {
  const url = checkTarget(link);
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method, redirect: "follow", signal: AbortSignal.timeout(10_000),
        headers: { "user-agent": UA, accept: "text/html,*/*", ...(method === "GET" ? { range: "bytes=0-0" } : {}) },
      });
      res.body?.cancel().catch(() => {});
      if (isLive(res.status) || method === "GET") return res.status;
    } catch {
      if (method === "GET") return 0;
    }
  }
  return 0;
}

async function finder(need) {
  const t0 = Date.now();
  try {
    const res = await fetch(`${BASE}/api/open-data`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ q: need }) });
    const j = await res.json();
    if (!res.ok) throw new Error(j.error ?? `HTTP ${res.status}`);
    return { items: j.results.map((r) => ({ title: r.title, url: r.url, why: r.why })), note: j.note, meta: j.meta, secs: (Date.now() - t0) / 1000 };
  } catch (e) {
    return { items: [], error: e.message, secs: (Date.now() - t0) / 1000 };
  }
}

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;
async function claude(need) {
  if (!client) return null;
  const t0 = Date.now();
  const messages = [{
    role: "user",
    content: `Find 5 to 8 real, openly available datasets for this need: ${need}\nFor each, give its title, the URL of the dataset's own page (not a search page), and one line on why it fits. Reply with only a JSON array: [{"title":"...","url":"...","why":"..."}]`,
  }];
  const params = {
    model: "claude-sonnet-5-5",
    max_tokens: 16000,
    output_config: { effort: "medium" }, // keeps spend modest; Sonnet 5.5 defaults to high
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 5 }],
  };
  const usage = { inputTokens: 0, outputTokens: 0, searches: 0 };
  const add = (u) => {
    usage.inputTokens += (u.input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0);
    usage.outputTokens += u.output_tokens ?? 0;
    usage.searches += u.server_tool_use?.web_search_requests ?? 0;
  };
  try {
    let msg = await client.beta.messages.create({ ...params, messages });
    add(msg.usage);
    for (let i = 0; msg.stop_reason === "pause_turn" && i < 3; i++) {
      messages.push({ role: "assistant", content: msg.content });
      msg = await client.beta.messages.create({ ...params, messages });
      add(msg.usage);
      messages.pop();
    }
    if (msg.stop_reason === "refusal") throw new Error("refused");
    const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
    let items = [];
    try {
      items = JSON.parse(text.slice(text.indexOf("["), text.lastIndexOf("]") + 1));
    } catch {
      items = Array.from(text.matchAll(/https?:\/\/[^\s)"'\]>]+/g), (m) => ({ title: "", url: m[0] }));
    }
    items = items.filter((x) => typeof x?.url === "string" && /^https?:\/\//.test(x.url));
    return { items, usage, secs: (Date.now() - t0) / 1000 };
  } catch (e) {
    return { items: [], usage, error: e.message, secs: (Date.now() - t0) / 1000 };
  }
}

const score = async (side) => {
  if (!side) return null;
  const statuses = await Promise.all(side.items.slice(0, 5).map((x) => resolves(x.url)));
  side.items.slice(0, 5).forEach((x, i) => (x.status = statuses[i]));
  return { ...side, ok: statuses.filter(isLive).length, top: statuses.length };
};

const rows = [];
for (const [area, need] of NEEDS) {
  const [f, c] = await Promise.all([finder(need), claude(need)]);
  const row = { area, need, f: await score(f), c: await score(c) };
  rows.push(row);
  console.log(`${need}: finder ${row.f.ok}/${row.f.top} of ${row.f.items.length}${row.f.error ? ` (${row.f.error})` : ""}` + (row.c ? `, claude ${row.c.ok}/${row.c.top} of ${row.c.items.length}` : ", claude NOT RUN"));
}

// ---- report -------------------------------------------------------------------
// No em-dash in the committed report (site rule); built from char codes so this file holds none either.
const [EM, EN] = [new RegExp(`\\s*${String.fromCharCode(0x2014)}\\s*`, "g"), new RegExp(String.fromCharCode(0x2013), "g")];
const md = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(EM, ", ").replace(EN, " to ").replace(/\s+/g, " ").trim();
const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const pct = (a, b) => (b ? `${Math.round((100 * a) / b)}%` : "n/a");
const F = rows.map((r) => r.f), C = rows.map((r) => r.c).filter(Boolean);
const modes = Array.from(new Set(F.map((f) => (f.meta ? (f.meta.rankBy === "model" ? `planned and ranked by ${f.meta.usage.model}` : "catalog order, no model answered") : "error"))));
const cpu = F.filter((f) => f.meta).map((f) => f.meta.cpuMs);
const OURS = "Our finder (Claude Haiku 5.5 + catalog APIs + link checks)";
const THEIRS = "Claude Sonnet 5.5 + web search";
// USD per million tokens and per search, from platform.claude.com/docs/en/about-claude/pricing (read 2026-11-15)
const haikuUsd = (u) => (u.inputTokens * 0.1 + u.outputTokens * 0.5) / 1e6;
const sonnetUsd = (u) => (u.inputTokens * 2 + u.outputTokens * 10) / 1e6 + u.searches * 0.01;
const fu = F.filter((f) => f.meta).map((f) => f.meta.usage), cu = C.map((c) => c.usage);
const avg = (xs, f) => (xs.length ? sum(xs.map(f)) / xs.length : 0);
const usd = (x) => `$${x.toFixed(4)}`;

let out = `# Open Data Finder benchmark

Run on ${new Date().toISOString().slice(0, 10)} against ${BASE}, ${rows.length} needs, one run.
${OURS}: ${modes.join(", ")}.
${THEIRS}: ${client ? "run (claude-sonnet-5-5, effort medium, web_search_20260209 with up to 5 searches)" : "NOT RUN (no ANTHROPIC_API_KEY)"}.

Scoring is automatic and covers links only: a link resolves when a HEAD (or a one-byte GET) ends on HTTP 2xx after redirects, not counting 202 (a bot challenge, which Harvard Dataverse and Figshare send for real and made-up ids alike; their links are checked through their JSON APIs instead).
Both sides' links are re-checked by this script, so the finder's own link check is not taken on trust.
Relevance is not scored; judge it in the side-by-side sheet below.

## Headline

| | ${OURS} | ${THEIRS} |
|---|---|---|
| Links returned (total) | ${sum(F.map((f) => f.items.length))} | ${C.length ? sum(C.map((c) => c.items.length)) : "NOT RUN"} |
| Top-5 links that resolve | ${sum(F.map((f) => f.ok))} of ${sum(F.map((f) => f.top))} (${pct(sum(F.map((f) => f.ok)), sum(F.map((f) => f.top)))}) | ${C.length ? `${sum(C.map((c) => c.ok))} of ${sum(C.map((c) => c.top))} (${pct(sum(C.map((c) => c.ok)), sum(C.map((c) => c.top)))})` : "NOT RUN"} |
| Needs with no result | ${F.filter((f) => !f.items.length).length} | ${C.length ? C.filter((c) => !c.items.length).length : "NOT RUN"} |
| Mean time per need | ${avg(F, (f) => f.secs).toFixed(1)} s | ${C.length ? `${avg(C, (c) => c.secs).toFixed(1)} s` : "NOT RUN"} |
| Mean tokens per need (in / out) | ${Math.round(avg(fu, (u) => u.inputTokens))} / ${Math.round(avg(fu, (u) => u.outputTokens))} | ${cu.length ? `${Math.round(avg(cu, (u) => u.inputTokens))} / ${Math.round(avg(cu, (u) => u.outputTokens))}` : "NOT RUN"} |
| Mean web searches per need | 0 (catalog APIs are free) | ${cu.length ? avg(cu, (u) => u.searches).toFixed(1) : "NOT RUN"} |
| Mean cost per need (USD) | ${usd(avg(fu, haikuUsd))} | ${cu.length ? usd(avg(cu, sonnetUsd)) : "NOT RUN"} |

Cost uses list prices: Haiku 5.5 $0.10 in / $0.50 out per million tokens; Sonnet 5.5 $2 in / $10 out per million tokens plus $10 per 1,000 web searches.

Finder CPU for parsing and normalising catalog JSON (measured locally in the Next edge sandbox): mean ${cpu.length ? (sum(cpu) / cpu.length).toFixed(2) : "n/a"} ms, max ${cpu.length ? Math.max(...cpu).toFixed(2) : "n/a"} ms per request.

## Per need

| # | Area | Need | Ours: links | Ours: top-5 resolve | Ours: tokens in / out | Claude: links | Claude: top-5 resolve | Claude: tokens in / out | Claude: searches | Ours: CPU ms | Ours: s | Claude: s |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
${rows.map((r, i) => {
  const u = r.f.meta?.usage, c = r.c;
  return `| ${i + 1} | ${r.area} | ${md(r.need)} | ${r.f.items.length} | ${r.f.ok}/${r.f.top} | ${u ? `${u.inputTokens} / ${u.outputTokens}` : "n/a"} | ${c ? c.items.length : "NOT RUN"} | ${c ? `${c.ok}/${c.top}` : "NOT RUN"} | ${c ? `${c.usage.inputTokens} / ${c.usage.outputTokens}` : "NOT RUN"} | ${c ? c.usage.searches : "NOT RUN"} | ${r.f.meta?.cpuMs ?? "n/a"} | ${r.f.secs.toFixed(1)} | ${c ? c.secs.toFixed(1) : "NOT RUN"} |`;
}).join("\n")}

## Side-by-side sheet (judge relevance yourself)

Status after each link is the benchmark's own re-check (0 means no answer).
`;
const cell = (x) => (x ? `[${md(x.title) || md(x.url).slice(0, 60)}](${x.url})${x.status !== undefined ? ` (${x.status})` : ""}${x.why ? `: ${md(x.why)}` : ""}` : "");
rows.forEach((r, i) => {
  out += `\n### ${i + 1}. ${md(r.need)}\n\n`;
  if (r.f.meta) out += `Finder searched: ${r.f.meta.searches.map((s) => `${s.catalog} "${md(s.query)}" ${s.error ? `(${md(s.error)})` : `${s.hits} hits, ${s.kb} KB`}`).join("; ")}. Checked ${r.f.meta.checked}, dropped ${r.f.meta.dropped}.\n\n`;
  if (r.f.note) out += `Finder note: ${md(r.f.note)}\n\n`;
  if (r.f.error) out += `Finder error: ${md(r.f.error)}\n\n`;
  if (r.c?.error) out += `Claude error: ${md(r.c.error)}\n\n`;
  const n = Math.max(r.f.items.length, r.c?.items.length ?? 0, 1);
  out += `| # | ${OURS} | ${THEIRS} |\n|---|---|---|\n`;
  for (let k = 0; k < Math.min(n, 8); k++) out += `| ${k + 1} | ${cell(r.f.items[k])} | ${r.c ? cell(r.c.items[k]) : k === 0 ? "NOT RUN" : ""} |\n`;
});

mkdirSync(new URL("../docs/", import.meta.url), { recursive: true });
writeFileSync(OUT, out);
console.log(`wrote ${OUT.pathname}`);
