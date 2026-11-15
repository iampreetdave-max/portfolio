// Self-check for the Open Data Finder's guards (no network, no model).
// Run: node scripts/check-open-data.mjs
import ts from "typescript";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Transpile pipeline.ts with the model helper stubbed out, then import it.
const src = readFileSync(new URL("../app/open-data/pipeline.ts", import.meta.url), "utf8")
  .replace(`from "./chat"`, `from "data:text/javascript,export const chat = () => { throw new Error('no model'); }"`);
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const file = join(mkdtempSync(join(tmpdir(), "odf-")), "pipeline.mjs");
writeFileSync(file, js);
const p = await import(pathToFileURL(file).href);

// The model may only pick ids it was shown, once each; URLs in its text are stripped.
const v = p.validatePicks(
  { picks: [{ id: "c1", why: "Daily data, see https://made-up.example/x" }, { id: "c9", why: "invented" }, { id: "c1", why: "dupe" }, { url: "https://x.y" }], note: "c2 is a looser fit than c1" },
  new Map([["c1", "Rainfall A"], ["c2", "Rainfall B"]]),
);
assert.equal(v.note, '"Rainfall B" is a looser fit than "Rainfall A"'); // no internal ids shown to readers
assert.deepEqual(v.picks.map((x) => x.id), ["c1"]);
assert.equal(v.rejected, 3);
assert.ok(!/https?:/.test(v.picks[0].why));

// Plans keep only known catalogs and short, plain queries.
const plan = p.validatePlan({ queries: ["precipitation <script>", "", "rainfall India"], catalogs: ["nasa", "made-up"] });
assert.deepEqual(plan.catalogs, ["nasa"]);
assert.ok(plan.queries.every((q) => !/[<>]/.test(q)));
assert.equal(p.validatePlan({ queries: [] }), null);

assert.equal(p.commercial("cc-by-nc-4.0"), "no");
assert.equal(p.commercial("CC-BY-4.0"), "yes");
assert.equal(p.commercial("cc0-1.0"), "yes");
assert.equal(p.commercial("cc-zero"), "yes");
assert.equal(p.commercial("other"), "check");
assert.equal(p.commercial(""), "check");
assert.equal(p.licence("https://creativecommons.org/licenses/by/4.0/"), "CC-BY-4.0");
assert.equal(p.licence("http://creativecommons.org/publicdomain/zero/1.0/"), "CC0-1.0");
assert.equal(p.commercial(p.licence("https://creativecommons.org/licenses/by-nc/4.0/")), "no");

// A bot challenge (202) is not a checked link.
assert.equal(p.isLive(200), true);
assert.equal(p.isLive(301), true);
assert.equal(p.isLive(202), false);
assert.equal(p.isLive(404), false);
assert.equal(p.checkTarget("https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/TQVIIH"), "https://dataverse.harvard.edu/api/datasets/:persistentId/?persistentId=doi:10.7910/DVN/TQVIIH");
assert.equal(p.checkTarget("https://plos.figshare.com/articles/dataset/Some_title_/30099541"), "https://api.figshare.com/v2/articles/30099541");
assert.equal(p.checkTarget("https://zenodo.org/records/3764788"), "https://zenodo.org/records/3764788");
const [em, en] = [String.fromCharCode(0x2014), String.fromCharCode(0x2013)];
assert.equal(p.clip(`a ${em} b, 1990${en}2020 <b>x</b> &amp; y`), "a, b, 1990 to 2020 x & y");
assert.deepEqual(p.heuristicPlan("daily rainfall by district in Gujarat").queries, ["rainfall district gujarat", "rainfall district"]);
assert.deepEqual(p.heuristicPlan("GDP per capita by country").queries, ["gdp per capita country", "gdp per capita"]);
assert.deepEqual(p.heuristicPlan("Gujarat वर्षा data!").queries, ["gujarat वर्षा"]); // non-Latin words survive

console.log("open-data guards: all checks passed");
