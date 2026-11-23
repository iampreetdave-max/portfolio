import Link from "next/link";
import { DATE, asset, papers, pdf } from "@/lib/research";

// Research paper cards: the whole list on /research and the top of /writing.
export default function PaperCards() {
  return (
    <div className="papers">
      {papers.map((p) => {
        const hero = p.figures[0];
        return (
          <article className="paper" key={p.slug}>
            <Link href={`/research/${p.slug}`} className="paper-fig" tabIndex={-1} aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element -- static figure, already sized */}
              <img src={asset(p, hero.file)} alt="" width={hero.w} height={hero.h} loading="lazy" decoding="async" />
            </Link>
            <div className="paper-body">
              <div className="paper-badge">Research paper · {DATE.text}</div>
              <h2 className="paper-title"><Link href={`/research/${p.slug}`}>{p.title}</Link></h2>
              <p className="paper-finding">{p.finding}</p>
              <div className="pd-links paper-actions">
                <Link href={`/research/${p.slug}`} className="primary">Read</Link>
                <a href={pdf(p)} target="_blank" rel="noopener">PDF</a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
