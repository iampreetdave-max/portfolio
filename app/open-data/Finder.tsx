"use client";

import { useState } from "react";
import type { Result } from "./pipeline";

const NAMES: Record<string, string> = {
  huggingface: "Hugging Face", zenodo: "Zenodo", nasa: "NASA Earthdata", dataverse: "Harvard Dataverse",
  socrata: "Socrata", europa: "data.europa.eu", worldbank: "World Bank", figshare: "Figshare",
};
const EXAMPLES = [
  "daily rainfall by district in Gujarat",
  "Indian court judgments",
  "satellite land surface temperature",
  "bus GPS traces",
];
const COMMERCIAL = { yes: "commercial use: likely OK", no: "non-commercial only", check: "commercial use: check terms" };
type Data = {
  results: Result[];
  note: string;
  alsoCheck: { name: string; url: string; note: string }[];
  meta: { rankBy: string; checked: number; dropped: number; searches: { catalog: string; hits: number; error?: string }[] };
};

export default function Finder() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  async function run(text: string) {
    const query = text.trim();
    if (query.length < 3 || busy) return;
    setQ(query);
    setBusy(true);
    setError("");
    setData(null);
    try {
      const res = await fetch("/api/open-data", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ q: query }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setData(json);
    } catch (e) {
      setError((e as Error).message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const searched = data ? Array.from(new Set(data.meta.searches.filter((s) => !s.error).map((s) => NAMES[s.catalog]))) : [];

  return (
    <div className="od">
      <form className="od-form" onSubmit={(e) => { e.preventDefault(); run(q); }}>
        <label htmlFor="od-q" className="od-visually-hidden">What data do you need?</label>
        <input id="od-q" value={q} onChange={(e) => setQ(e.target.value)} maxLength={200} placeholder="e.g. daily rainfall by district in Gujarat" autoComplete="off" />
        <button type="submit" disabled={busy || q.trim().length < 3}>{busy ? "Searching" : "Find data"}</button>
      </form>
      <div className="od-examples">
        {EXAMPLES.map((x) => (
          <button key={x} type="button" onClick={() => run(x)} disabled={busy}>{x}</button>
        ))}
      </div>

      <div aria-live="polite">
        {busy && <p className="od-status">Searching the catalogs and checking every link. This takes a few seconds.</p>}
        {error && <p className="od-status">{error}</p>}
      </div>

      {data && (
        <>
          {data.note && <p className="od-note">{data.note}</p>}
          {data.results.length > 0 && (
            <table className="od-table">
              <thead>
                <tr><th>Dataset</th><th>Coverage</th><th>Format</th><th>License</th><th>Access</th><th>Updated</th><th>Link</th></tr>
              </thead>
              <tbody>
                {data.results.map((r) => (
                  <tr key={r.url}>
                    <td data-label="Dataset">
                      <a className="od-title" href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
                      <div className="od-sub">{[NAMES[r.catalog], r.publisher, r.size].filter(Boolean).join(" · ")}</div>
                      {r.why && <div className="od-why">{r.why}</div>}
                      {r.description && <div className="od-desc">{r.description}</div>}
                    </td>
                    <td data-label="Coverage">{r.coverage || "not stated"}</td>
                    <td data-label="Format">{r.formats.join(", ") || "not stated"}</td>
                    <td data-label="License">
                      {r.license || "not stated"}
                      <div className="od-sub">{COMMERCIAL[r.commercial]}</div>
                    </td>
                    <td data-label="Access">{r.access}</td>
                    <td data-label="Updated">{r.updated || "not stated"}</td>
                    <td data-label="Link checked" title={`HTTP ${r.status}, final URL ${r.finalUrl}`}>
                      {r.confirmed ? <span className="od-ok">✓ {r.status}</span> : <span className="od-warn">HTTP {r.status}, open it to confirm</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {data.alsoCheck.length > 0 && (
            <>
              <h2 className="sec-label">Also check (Indian portals with no search API, so not searched or checked here)</h2>
              <div className="rowlist">
                {data.alsoCheck.map((p) => (
                  <div className="row" key={p.url}>
                    <div className="row-main">
                      <div className="row-title"><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a></div>
                      <div className="row-note">{p.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          <p className="od-meta">
            Searched {searched.join(", ") || "no catalog successfully"}. Checked {data.meta.checked} links, dropped {data.meta.dropped} dead.
            Ranked by {data.meta.rankBy === "model" ? "Claude Haiku 5.5" : "catalog order (no model answered)"}.
          </p>
        </>
      )}
    </div>
  );
}
