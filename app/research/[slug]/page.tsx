import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AFFILIATION, AUTHOR, DATE, asset, papers, pdf, plain, type Paper } from "@/lib/research";
import { JsonLd, SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// One page per paper, prerendered at build time. Static, so no edge runtime.
export const dynamicParams = false;
export const generateStaticParams = () => papers.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = papers.find((x) => x.slug === params.slug);
  if (!p) return {};
  const m = pageMeta({ title: p.title, description: p.description, path: `/research/${p.slug}`, image: asset(p, p.figures[0].file) });
  return {
    ...m,
    keywords: p.keywords,
    authors: [{ name: AUTHOR, url: SITE }],
    openGraph: { ...m.openGraph, type: "article", publishedTime: DATE.iso, authors: [AUTHOR] },
    // Google Scholar reads these (scholar.google.com/intl/en/scholar/inclusion.html)
    other: {
      citation_title: p.title,
      citation_author: "Dave, Preet Ghanshyam",
      citation_publication_date: DATE.scholar,
      citation_pdf_url: `${SITE}${pdf(p)}`,
      citation_abstract_html_url: `${SITE}/research/${p.slug}`,
      citation_language: "en",
      citation_keywords: p.keywords.join("; "),
    },
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// the papers' only markup is *italic* (film titles, the coined term)
const rich = (s: string) => ({ __html: esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>") });

// pager label: the title up to its colon or question mark
const short = (t: string) => t.match(/^[^:?]+\??/)![0];

const bibtex = (p: Paper) => `@misc{dave2026${p.slug.replace(/-/g, "")},
  author = {Dave, Preet Ghanshyam},
  title  = {{${p.title}}},
  year   = {2026},
  month  = nov,
  url    = {${SITE}/research/${p.slug}},
  note   = {Preprint}
}`;

function Figure({ p, i }: { p: Paper; i: number }) {
  const f = p.figures[i];
  const src = asset(p, f.file);
  return (
    <figure className="rp-fig">
      <a href={src} target="_blank" rel="noopener">
        {/* eslint-disable-next-line @next/next/no-img-element -- static figure, already sized */}
        <img src={src} alt={plain(f.caption)} width={f.w} height={f.h} loading={i ? "lazy" : "eager"} decoding="async" />
      </a>
      <figcaption dangerouslySetInnerHTML={rich(f.caption)} />
    </figure>
  );
}

export default function PaperPage({ params }: { params: { slug: string } }) {
  const i = papers.findIndex((p) => p.slug === params.slug);
  if (i < 0) notFound();
  const p = papers[i];
  const prev = papers[(i - 1 + papers.length) % papers.length];
  const next = papers[(i + 1) % papers.length];
  const url = `${SITE}/research/${p.slug}`;
  const pdfMedia = { "@type": "MediaObject", contentUrl: `${SITE}${pdf(p)}`, encodingFormat: "application/pdf", name: `${p.title} (PDF)` };

  return (
    <>
      <JsonLd data={{ "@graph": [
        {
          "@type": "ScholarlyArticle",
          "@id": `${url}#paper`,
          headline: p.title,
          name: p.title,
          author: {
            "@type": "Person", "@id": `${SITE}/#person`, name: AUTHOR, url: SITE,
            affiliation: { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
          },
          datePublished: DATE.iso,
          abstract: plain(p.abstract),
          description: p.description,
          keywords: p.keywords.join(", "),
          url,
          image: `${SITE}${asset(p, p.figures[0].file)}`,
          inLanguage: "en",
          isAccessibleForFree: true,
          creativeWorkStatus: "Preprint",
          encoding: pdfMedia,
          associatedMedia: pdfMedia,
        },
        breadcrumbs([["Home", "/"], ["Research", "/research"], [p.title, `/research/${p.slug}`]]),
      ] }} />
      <Link href="/research" className="pd-back">&larr; Research</Link>
      <div><span className="paper-badge">Research paper · Preprint · {DATE.text}</span></div>
      <h1 className="pd-title rp-title">{p.title}</h1>
      <p className="rp-author"><span>{AUTHOR}</span> · {AFFILIATION}</p>

      <div className="pd-links rp-actions">
        <a href={pdf(p)} download={`Dave-2026-${p.slug}.pdf`} className="primary">Download PDF</a>
        <a href={asset(p, "demo.html")} target="_blank" rel="noopener">Try the interactive demo</a>
        <a href="#cite">Cite</a>
        {p.slug === "dataset-discovery" && <Link href="/projects/open-data-finder">The Open Data Finder</Link>}
      </div>

      <div className="article rp-body">
        <Figure p={p} i={0} />

        <h2 id="abstract">Abstract</h2>
        <p dangerouslySetInnerHTML={rich(p.abstract)} />

        <h2 id="highlights">Highlights</h2>
        <ul>{p.highlights.map((h) => <li key={h} dangerouslySetInnerHTML={rich(h)} />)}</ul>

        <h2 id="key-results">Key results at a glance</h2>
        <table>
          <caption>{p.table.caption}</caption>
          <thead><tr>{p.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
          <tbody>
            {p.table.rows.map((r) => <tr key={r[0]}>{r.map((c, j) => <td key={j} dangerouslySetInnerHTML={rich(c)} />)}</tr>)}
          </tbody>
        </table>

        <h2 id="figures">Figures</h2>
        {p.figures.slice(1).map((f, j) => <Figure key={f.file} p={p} i={j + 1} />)}

        <h2 id="keywords">Keywords</h2>
        <p className="pd-tags">{p.keywords.join(" · ")}</p>

        <h2 id="cite">Cite</h2>
        <p className="rp-cite">Dave, P. G. (2026). <span dangerouslySetInnerHTML={rich(p.title)} />. Preprint. {url}</p>
        <pre><code>{bibtex(p)}</code></pre>
      </div>

      <nav className="pd-pager" aria-label="More research">
        <Link href={`/research/${prev.slug}`}>&larr; {short(prev.title)}</Link>
        <Link href={`/research/${next.slug}`}>{short(next.title)} &rarr;</Link>
      </nav>
    </>
  );
}
