import { work } from "@/lib/content";

export const metadata = { title: "Work · Preet Ghanshyam Dave" };

export default function Work() {
  return (
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
  );
}
