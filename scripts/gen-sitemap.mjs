// Writes public/sitemap.xml from the site's own content, so every project and skill page is listed.
// Runs before every build (npm "prebuild"). Static file on purpose: app/sitemap.ts would become an
// edge route and break the next-on-pages build (CLAUDE.md gotcha #1).
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://iampreetdave.me";
const ids = (file, start) => {
  const src = readFileSync(file, "utf8");
  const block = src.slice(src.indexOf(start), src.indexOf("\n];", src.indexOf(start)));
  return [...block.matchAll(/^\s*\{\s*id: "([a-z0-9-]+)"/gm)].map((m) => m[1]);
};
const projects = ids("lib/content.ts", "export const projects");
const skills = ids("lib/skills.ts", "export const skills");
if (projects.length < 10 || skills.length < 5) throw new Error(`suspiciously few pages: ${projects.length} projects, ${skills.length} skills`);

const paths = ["/", "/work", "/projects", "/skills", "/writing", "/fun",
  ...projects.map((id) => `/projects/${id}`), ...skills.map((id) => `/skills/${id}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap.xml: ${paths.length} URLs (${projects.length} projects, ${skills.length} skills)`);
