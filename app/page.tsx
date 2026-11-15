import { about } from "@/lib/content";
import { techWeb } from "@/lib/techweb";
import { JsonLd, PERSON, SITE, pageMeta } from "@/lib/seo";
import TechWeb from "@/components/TechWeb";

export const metadata = pageMeta({
  description: "AI/ML engineer in Ahmedabad, India. Preet Dave builds LLM agents, document AI and ML models that ship, publishes open-source Claude Code skills and runs Tensor Tapri.",
  path: "/",
});

const Para = ({ para }: { para: (typeof about)[number] }) => (
  <>
    {para.map((s, j) =>
      typeof s === "string" ? s : s.href.startsWith("http")
        ? <a key={j} href={s.href} target="_blank" rel="noopener noreferrer">{s.text}</a>
        : <a key={j} href={s.href}>{s.text}</a>,
    )}
  </>
);

export default function About() {
  const [first, ...rest] = about;
  return (
    <>
      <JsonLd data={{ "@graph": [PERSON, { "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: "Preet Dave", publisher: { "@id": `${SITE}/#person` } }] }} />
      <div className="prose">
        {/* the greeting is the page's one h1, styled like the paragraphs around it */}
        <h1 className="prose-h1"><Para para={first} /></h1>
        {rest.map((para, i) => <p key={i}><Para para={para} /></p>)}
      </div>

      <h2 className="sec-label">What I work with</h2>
      <TechWeb web={techWeb()} />

    </>
  );
}
