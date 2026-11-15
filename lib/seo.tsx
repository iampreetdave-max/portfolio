// SEO in one place: who Preet is (schema.org Person), per-page metadata with canonical URLs and
// social cards, and a JSON-LD helper. Keep facts here in line with lib/content.ts.
import type { Metadata } from "next";

export const SITE = "https://iampreetdave.me";
const OG = { url: "/og.png", width: 1200, height: 630, alt: "Preet Dave, AI/ML engineer in Ahmedabad" };

export const PERSON = {
  "@type": "Person",
  "@id": `${SITE}/#person`,
  name: "Preet Dave",
  alternateName: "Preet Ghanshyam Dave",
  url: SITE,
  image: `${SITE}/og.png`,
  jobTitle: "AI/ML Engineer",
  worksFor: { "@type": "Organization", name: "Agility" },
  address: { "@type": "PostalAddress", addressLocality: "Ahmedabad", addressRegion: "Gujarat", addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
  sameAs: [
    "https://github.com/iampreetdave-max",
    "https://www.linkedin.com/in/preet-dave-452023271/",
    "https://tensortapri.org",
  ],
  knowsAbout: [
    "Machine learning", "Large language models", "AI agents", "Agentic AI", "Claude Code",
    "Claude Code skills and plugins", "Document AI and OCR", "Computer vision", "Retrieval-augmented generation",
    "Predictive modelling", "Python", "Next.js", "Product development", "Technical project leadership",
  ],
};

// Per-page metadata. Next replaces (not merges) openGraph/twitter per page, so every page sets them fully.
export function pageMeta({ title, description, path, image }: { title?: string; description: string; path: string; image?: string }): Metadata {
  const img = image ? { url: image, alt: title ?? "Preet Dave" } : OG;
  const full = title ? `${title} · Preet Dave` : "Preet Dave · AI/ML Engineer in Ahmedabad";
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "en_IN", siteName: "Preet Dave", url: path, title: full, description, images: [img] },
    twitter: { card: "summary_large_image", title: full, description, images: [img.url] },
  };
}

// JSON-LD block. The data is static site content, never user input, so it needs no escaping.
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...data }) }} />;
}

export const breadcrumbs = (items: [string, string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${SITE}${path}` })),
});
