import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyCmd } from "@/components/SkillPacks";
import s from "@/components/SkillPacks.module.css";
import { MARKET, REPO, packs, skills } from "@/lib/skills";
import { JsonLd, SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// One page per skill, prerendered at build time (no runtime route, so no edge runtime needed).
export const dynamicParams = false;
export const generateStaticParams = () => skills.map((k) => ({ id: k.id }));
// Titles lead with the problem the skill solves, the way people search for it.
export const generateMetadata = ({ params }: { params: { id: string } }) => {
  const k = skills.find((x) => x.id === params.id);
  return pageMeta({ title: `${k?.headline ?? params.id} (${params.id})`, description: k?.note ?? "", path: `/skills/${params.id}` });
};

export default function SkillPage({ params }: { params: { id: string } }) {
  const i = skills.findIndex((k) => k.id === params.id);
  if (i < 0) notFound();
  const k = skills[i];
  const prev = skills[(i - 1 + skills.length) % skills.length];
  const next = skills[(i + 1) % skills.length];
  const alsoIn = packs.filter((p) => p.members.includes(k.id)).map((p) => p.id);

  return (
    <>
      <JsonLd data={{ "@graph": [
        {
          "@type": "SoftwareSourceCode",
          name: k.id,
          description: `${k.headline}. ${k.note}`,
          url: `${SITE}/skills/${k.id}`,
          codeRepository: `${REPO}/tree/main/skills/${k.id}`,
          keywords: "Claude Code, Claude Code skill, agent skills, SKILL.md",
          license: "https://opensource.org/licenses/MIT",
          author: { "@id": `${SITE}/#person` },
        },
        breadcrumbs([["Home", "/"], ["Skills", "/skills"], [k.id, `/skills/${k.id}`]]),
      ] }} />
      <Link href="/skills" className={s.back}>&larr; All skills</Link>
      <div className={s.eyebrow}>{k.id} · Claude Code skill</div>
      <h1 className={s.h1}>{k.headline}</h1>
      <div className="prose"><p>{k.note}</p></div>

      <h2 className="sec-label">Install just this skill</h2>
      <div className="prose"><p>From your terminal, in one command:</p></div>
      <CopyCmd cmd={`claude plugin marketplace add iampreetdave-max/agent-skills && claude plugin install ${k.id}@${MARKET}`} />
      <div className="prose"><p>Or from inside Claude Code:</p></div>
      <CopyCmd cmd="/plugin marketplace add iampreetdave-max/agent-skills" />
      <CopyCmd cmd={`/plugin install ${k.id}@${MARKET}`} />
      <div className="prose"><p>Or without the plugin system (macOS, Linux or Git Bash):</p></div>
      <CopyCmd cmd={`git clone --depth 1 ${REPO} /tmp/agent-skills && mkdir -p ~/.claude/skills && cp -r /tmp/agent-skills/skills/${k.id} ~/.claude/skills/`} />
      <div className="prose">
        <p>
          Restart Claude Code afterwards. On Windows PowerShell 5, use <code className={s.ic}>;</code> instead
          of <code className={s.ic}>&amp;&amp;</code>. Remove it with{" "}
          <code className={s.ic}>claude plugin uninstall {k.id}@{MARKET}</code>.
        </p>
      </div>

      <h2 className="sec-label">Use it</h2>
      <div className="prose"><p>It loads by itself when what you ask matches, for example:</p></div>
      <ul className={s.list}>{k.examples.map((e) => <li key={e}>&ldquo;{e}&rdquo;</li>)}</ul>
      <div className="prose">
        <p>Or call it directly with <code className={s.ic}>/{k.id}:{k.id}</code>. Installed from a pack, the pack name comes first, for example <code className={s.ic}>/all-skills:{k.id}</code>.</p>
      </div>

      <h2 className="sec-label">What it does</h2>
      <ol className={s.steps}>{k.steps.map((step) => <li key={step}>{step}</li>)}</ol>

      <h2 className="sec-label">Needs</h2>
      <div className="prose">
        <p>
          {k.needs} Also in {alsoIn.join(", ")}. Read the full instructions in{" "}
          <a href={`${REPO}/blob/main/skills/${k.id}/SKILL.md`} target="_blank" rel="noopener noreferrer">SKILL.md on GitHub</a>.
        </p>
      </div>

      <nav className={s.pager} aria-label="More skills">
        <Link href={`/skills/${prev.id}`}>&larr; {prev.id}</Link>
        <Link href={`/skills/${next.id}`}>{next.id} &rarr;</Link>
      </nav>
    </>
  );
}
