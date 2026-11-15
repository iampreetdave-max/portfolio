import { pageMeta } from "@/lib/seo";
import { work } from "@/lib/content";

export const metadata = pageMeta({ title: "Work", description: "Preet Dave's work: AI/ML software engineer at Agility in Ahmedabad, founder of Tensor Tapri, ML intern at a stealth AI startup, and project lead at GTU.", path: "/work" });

export default function Work() {
  return (
    <>
      <h1 className="sr-only">Work: Preet Dave, AI/ML engineer</h1>
      <div className="rowlist">
      {work.map((w) => (
        <div className="row" key={w.id} id={w.id}>
          <div className="row-main">
            <div className="row-title">
              {w.href ? <a href={w.href} target="_blank" rel="noopener noreferrer">{w.role}</a> : w.role}
            </div>
            <div className="row-note">{w.note}</div>
          </div>
          <div className="row-when">{w.when}</div>
        </div>
      ))}
    </div>
    </>
  );
}
