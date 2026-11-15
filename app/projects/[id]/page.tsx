import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { PROJECT_COPY, PROJECT_LINKS, PROJECT_SHOTS } from "@/lib/project-copy";
import { PROJECT_ICONS } from "@/lib/project-icons";
import { JsonLd, SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// One page per project, prerendered at build time (no runtime route, so no edge runtime needed).
export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ id: p.id }));
export function generateMetadata({ params }: { params: { id: string } }) {
  const p = projects.find((x) => x.id === params.id);
  return pageMeta({
    title: p?.name ?? "Project",
    description: PROJECT_COPY[params.id]?.hook ?? p?.note ?? "",
    path: `/projects/${params.id}`,
    image: PROJECT_SHOTS[params.id] ? `/projects/${params.id}.jpg` : undefined,
  });
}

const label = (href: string) =>
  href.startsWith("/") ? "Open it" : href.includes("github.com") ? "Code on GitHub" : "Visit the live site";

export default function ProjectPage({ params }: { params: { id: string } }) {
  const i = projects.findIndex((p) => p.id === params.id);
  if (i < 0) notFound();
  const p = projects[i];
  const c = PROJECT_COPY[p.id];
  const Icon = PROJECT_ICONS[p.id];
  const shot = PROJECT_SHOTS[p.id];
  const links: [string, string][] = [...(p.href ? [[p.href, label(p.href)] as [string, string]] : []), ...(PROJECT_LINKS[p.id] ?? [])];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const code = p.href?.includes("github.com");
  return (
    <>
      <JsonLd data={{ "@graph": [
        {
          "@type": code ? "SoftwareSourceCode" : "CreativeWork",
          name: p.name,
          description: c?.hook ?? p.note,
          url: `${SITE}/projects/${p.id}`,
          ...(code ? { codeRepository: p.href } : {}),
          ...(shot ? { image: `${SITE}/projects/${p.id}.jpg` } : {}),
          keywords: p.tags.split(" · ").join(", "),
          author: { "@id": `${SITE}/#person` },
        },
        breadcrumbs([["Home", "/"], ["Projects", "/projects"], [p.name, `/projects/${p.id}`]]),
      ] }} />
      <Link href="/projects" className="pd-back">&larr; Projects</Link>
      <header className="pd-head">
        {Icon && <span className="pd-icon" aria-hidden="true"><Icon size={34} strokeWidth={1} /></span>}
        <div>
          <h1 className="pd-title">{p.name}</h1>
          <div className="pd-cat">{p.cat}</div>
        </div>
      </header>

      {c && <p className="pd-hook">{c.hook}</p>}

      {links.length > 0 && (
        <div className="pd-links">
          {links.map(([href, text]) =>
            href.startsWith("/")
              ? <Link key={href} href={href}>{text}</Link>
              : <a key={href} href={href} target="_blank" rel="noopener noreferrer">{text}</a>,
          )}
        </div>
      )}

      {shot && (
        <figure className="pd-shot">
          {/* eslint-disable-next-line @next/next/no-img-element -- static screenshot, already sized */}
          <img src={`/projects/${p.id}.jpg`} alt={`Screenshot of ${p.name}: ${shot}`} width={1280} height={800} loading="lazy" />
          <figcaption>{shot}</figcaption>
        </figure>
      )}

      {c && (
        <>
          <h2 className="sec-label">Highlights</h2>
          <ul className="pd-list">{c.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
        </>
      )}

      <h2 className="sec-label">The full story</h2>
      <div className="prose">
        <p>{p.note}</p>
        {p.cv && <p>{p.cv}</p>}
      </div>

      <h2 className="sec-label">Built with</h2>
      <div className="pd-tags">{p.tags}</div>

      <nav className="pd-pager" aria-label="More projects">
        <Link href={`/projects/${prev.id}`}>&larr; {prev.name}</Link>
        <Link href={`/projects/${next.id}`}>{next.name} &rarr;</Link>
      </nav>
    </>
  );
}
