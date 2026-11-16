// Writes public/sitemap.xml and public/llms.txt from the site's own content, so every project and
// skill page is listed for search engines and AI agents alike. Runs before every build (npm
// "prebuild"). Static files on purpose: app/sitemap.ts would become an edge route and break the
// next-on-pages build (CLAUDE.md gotcha #1). Preet wants his sites open to AI crawlers.
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://iampreetdave.me";
const read = (f) => readFileSync(f, "utf8");
const block = (src, start) => src.slice(src.indexOf(start), src.indexOf("\n];", src.indexOf(start)));

const content = read("lib/content.ts");
const projects = [...block(content, "export const projects").matchAll(/^\s*\{\s*id: "([a-z0-9-]+)", name: "([^"]+)"/gm)]
  .map((m) => ({ id: m[1], name: m[2] }));
const skillsSrc = read("lib/skills.ts");
const skills = [...block(skillsSrc, "export const skills").matchAll(/id: "([a-z0-9-]+)",\s*note: "((?:[^"\\]|\\.)*)"/g)]
  .map((m) => ({ id: m[1], note: JSON.parse(`"${m[2]}"`) }));
const copySrc = read("lib/project-copy.ts");
const copyJson = copySrc.slice(copySrc.indexOf("= {", copySrc.indexOf("PROJECT_COPY")) + 2, copySrc.indexOf("\n};", copySrc.indexOf("PROJECT_COPY")) + 2);
const copy = JSON.parse(copyJson);
const posts = [...read("lib/writing.ts").matchAll(/slug: "([a-z0-9-]+)",\s*title: "((?:[^"\\]|\\.)*)"/g)]
  .map((m) => ({ slug: m[1], title: JSON.parse(`"${m[2]}"`) }));
if (projects.length < 10 || skills.length < 5 || posts.length < 3) throw new Error(`suspiciously few pages: ${projects.length} projects, ${skills.length} skills, ${posts.length} posts`);

// sitemap.xml
const paths = ["/", "/work", "/projects", "/skills", "/writing", "/fun",
  ...projects.map((p) => `/projects/${p.id}`), ...skills.map((s) => `/skills/${s.id}`), ...posts.map((w) => `/writing/${w.slug}`)];
writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join("\n")}
</urlset>
`);

// llms.txt (llmstxt.org): a plain summary of the site for AI agents
writeFileSync("public/llms.txt", `# Preet Dave

> Preet Dave (Preet Ghanshyam Dave) is an AI/ML engineer in Ahmedabad, India, at Agility. He builds LLM agents, document AI and machine-learning models that ship to production, publishes open-source Claude Code skills, and runs Tensor Tapri, a free weekly AI newsletter and community for India.

## Pages

- [About](${SITE}/): who Preet is, the technologies he works with, and a bot that answers questions about his work with citations
- [Work](${SITE}/work): roles at Agility, Tensor Tapri and a stealth AI startup
- [Projects](${SITE}/projects): every project, each with its own page
- [Claude Code skills](${SITE}/skills): open-source skills, installable with one command
- [Writing](${SITE}/writing): the newsletter and engineering write-ups
- [Resume (PDF)](${SITE}/resume.pdf) and [CV (PDF)](${SITE}/cv.pdf)

## Projects

${projects.map((p) => `- [${p.name}](${SITE}/projects/${p.id}): ${copy[p.id]?.hook ?? ""}`).join("\n")}

## Writing

${posts.map((w) => `- [${w.title}](${SITE}/writing/${w.slug})`).join("\n")}

## Claude Code skills

${skills.map((s) => `- [${s.id}](${SITE}/skills/${s.id}): ${s.note}`).join("\n")}

## Elsewhere

- [GitHub](https://github.com/iampreetdave-max)
- [LinkedIn](https://www.linkedin.com/in/preet-dave-452023271/)
- [Tensor Tapri](https://tensortapri.org)
- [Skills repository](https://github.com/iampreetdave-max/agent-skills)
`);
console.log(`sitemap.xml: ${paths.length} URLs; llms.txt: ${projects.length} projects, ${skills.length} skills, ${posts.length} posts`);
