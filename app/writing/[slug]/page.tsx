import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Marked } from "marked";
import { pages } from "@/lib/writing";
import { JsonLd, SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// One page per write-up, rendered from content/writing/<slug>.md at build time. Static, so no
// edge runtime and no markdown parser shipped to the browser.
export const dynamicParams = false;
export const generateStaticParams = () => pages.map((p) => ({ slug: p.slug }));
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = pages.find((x) => x.slug === params.slug);
  // `image` is only set for photo-like JPGs; the transparent figure PNGs would turn black-on-black in link previews
  return pageMeta({ title: p?.title ?? "Writing", description: p?.note ?? "", path: `/writing/${params.slug}`, image: p?.image });
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
// GitHub's heading anchors, so the docs' own #links keep working
const anchor = (html: string) => html.replace(/<[^>]+>/g, "").toLowerCase().replace(/&[a-z]+;|[^\w\s-]/g, "").trim().replace(/\s/g, "-");

const md = new Marked({
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      return `<h${depth} id="${anchor(html)}">${html}</h${depth}>\n`;
    },
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens);
      return /^https?:/.test(href) ? `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${text}</a>` : `<a href="${esc(href)}">${text}</a>`;
    },
    // figures: "x.light.png" has a "x.dark.png" twin that CSS swaps in for the dark theme;
    // each image links to its full-size file because the diagrams are dense
    image({ href, title, text }) {
      const twin = href.includes(".light.") ? href.replace(".light.", ".dark.") : null;
      const img = (src: string, cls: string) =>
        `<a href="${esc(src)}" target="_blank" rel="noopener"${cls ? ` class="${cls}"` : ""}><img src="${esc(src)}" alt="${esc(text)}" loading="lazy" decoding="async"></a>`;
      return `<figure>${img(href, twin ? "fig-light" : "")}${twin ? img(twin, "fig-dark") : ""}${title ? `<figcaption>${esc(title)}</figcaption>` : ""}</figure>`;
    },
  },
});

export default function WritingPage({ params }: { params: { slug: string } }) {
  const i = pages.findIndex((p) => p.slug === params.slug);
  if (i < 0) notFound();
  const p = pages[i];
  const src = readFileSync(join(process.cwd(), "content", "writing", `${p.slug}.md`), "utf8");
  // a lone image is parsed as a paragraph; a figure cannot live inside a <p>
  const html = (md.parse(src) as string).replace(/<p>(<figure>[\s\S]*?<\/figure>)<\/p>/g, "$1");
  const prev = pages[(i - 1 + pages.length) % pages.length];
  const next = pages[(i + 1) % pages.length];

  return (
    <>
      <JsonLd data={{ "@graph": [
        {
          "@type": "Article",
          headline: p.title,
          description: p.note,
          url: `${SITE}/writing/${p.slug}`,
          ...(p.image ? { image: `${SITE}${p.image}` } : {}),
          author: { "@id": `${SITE}/#person` },
          ...(p.source ? { isBasedOn: p.source } : {}),
        },
        breadcrumbs([["Home", "/"], ["Writing", "/writing"], [p.title, `/writing/${p.slug}`]]),
      ] }} />
      <Link href="/writing" className="pd-back">&larr; Writing</Link>
      <h1 className="pd-title wr-title">{p.title}</h1>
      <div className="pd-cat">
        {p.when}
        {p.source && <> · <a href={p.source} target="_blank" rel="noopener noreferrer">original on GitHub</a></>}
      </div>
      <p className="pd-hook wr-lede">{p.note}</p>
      <article className="article" dangerouslySetInnerHTML={{ __html: html }} />
      <nav className="pd-pager" aria-label="More writing">
        <Link href={`/writing/${prev.slug}`}>&larr; {prev.title}</Link>
        <Link href={`/writing/${next.slug}`}>{next.title} &rarr;</Link>
      </nav>
    </>
  );
}
