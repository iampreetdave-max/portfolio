import { pageMeta } from "@/lib/seo";
// Projects list: each row is a short hook that links to the project's own page; hovering
// reveals one more line (the proof). Copy lives in lib/project-copy.ts, facts in lib/content.ts.
import Link from "next/link";
import { automations, projects } from "@/lib/content";
import { PROJECT_COPY } from "@/lib/project-copy";
import { PROJECT_ICONS } from "@/lib/project-icons";

export const metadata = pageMeta({ title: "Projects", description: "Projects by Preet Dave: LLM agents, document AI and OCR, predictive models, open-source Claude Code skills and AI data tools, with results and screenshots.", path: "/projects" });

export default function ProjectsPage() {
  return (
    <>
      <h1 className="sr-only">Projects by Preet Dave, AI/ML engineer</h1>
      <div className="rowlist">
        {projects.map((p) => {
          const Icon = PROJECT_ICONS[p.id];
          const c = PROJECT_COPY[p.id];
          return (
            <div className="row prow" key={p.id} id={p.id}>
              <div className="row-main">
                <div className="row-title">
                  <Link href={`/projects/${p.id}`} className="prow-link">{p.name}</Link>
                  {p.href?.includes("github.com") && (
                    <a href={p.href} className="prow-gh" target="_blank" rel="noopener noreferrer" aria-label={`${p.name} code on GitHub`}>GitHub &#8599;</a>
                  )}
                </div>
                <div className="row-note">{c?.hook ?? p.note}</div>
                {c?.proof && (
                  <div className="prow-more"><div><div className="row-note">{c.proof}</div></div></div>
                )}
                <div className="tags">{p.tags}</div>
              </div>
              <div className="row-when row-side">
                {p.cat}
                {Icon && <span className="row-icon" aria-hidden="true"><Icon size={44} strokeWidth={0.9} /></span>}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="sec-label">Automations</h2>
      <div className="rowlist">
        {automations.map((a) => (
          <div className="row" key={a.id} id={a.id}>
            <div className="row-main">
              <div className="row-title">{a.name}</div>
              <div className="row-note">{a.note}</div>
              <div className="tags">{a.tags}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
