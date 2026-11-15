import Link from "next/link";
import SkillPacks, { CopyCmd } from "@/components/SkillPacks";
import s from "@/components/SkillPacks.module.css";
import { MARKET, REPO, packs, skills } from "@/lib/skills";
import { JsonLd, SITE, breadcrumbs, pageMeta } from "@/lib/seo";

// This page is a landing page for people trying to make AI coding better, so it leads with the
// problems the skills solve, not with who wrote them.
export const metadata = pageMeta({
  title: "Claude Code Skills for Better Vibe Coding",
  description: "Free, open-source Claude Code skills that make AI coding agents prove work is done, stop looping on bugs, and catch data leakage and compliance gaps. Install all of them or just one.",
  path: "/skills",
});

const INSTALL_ALL = `claude plugin marketplace add iampreetdave-max/agent-skills && claude plugin install all-skills@${MARKET}`;

const FAQ: [string, string][] = [
  ["What are Claude Code skills?", "A skill is a folder with a SKILL.md file of instructions, and sometimes scripts, that Claude Code loads when your request matches its description. It teaches the agent a repeatable way of working, such as proving a task is finished before saying so."],
  ["How do I install all of them?", `Run this in your terminal, then restart Claude Code: ${INSTALL_ALL}`],
  ["Can I install just one skill?", `Yes. Every skill has its own page with a one-skill install command, for example /plugin install loop-breaker@${MARKET} from inside Claude Code.`],
  ["Do they work with other AI coding agents?", "They use the open SKILL.md format. Copy a skill's folder into the skills directory of any agent that reads SKILL.md files."],
  ["How do these make vibe coding better?", "They target the mistakes AI coding agents make most often: calling work done when parts are missing (done-gate), looping on the same bug (loop-breaker), leaking future data into ML models (honest-model-eval), and shipping without a compliance check (compliance-check)."],
  ["Are they free?", "Yes. They are open source under the MIT licence, and the code is on GitHub."],
];

const inPacks = (id: string) => packs.filter((p) => p.id !== "all-skills" && p.members.includes(id)).map((p) => p.id.replace("-pack", "")).join(" · ");

export default function Skills() {
  return (
    <>
      <JsonLd data={{ "@graph": [
        {
          "@type": "ItemList",
          name: "Claude Code skills by Preet Dave",
          itemListElement: skills.map((k, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}/skills/${k.id}`,
            item: { "@type": "SoftwareSourceCode", name: k.id, description: `${k.headline}. ${k.note}`, url: `${SITE}/skills/${k.id}`, codeRepository: `${REPO}/tree/main/skills/${k.id}`, author: { "@id": `${SITE}/#person` } },
          })),
        },
        { "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
        breadcrumbs([["Home", "/"], ["Skills", "/skills"]]),
      ] }} />

      <h1 className={s.h1}>Claude Code skills for better vibe coding</h1>
      <div className="prose">
        <p>
          Open-source skills that make AI coding agents better at real work: proving a task is really done, getting
          unstuck from a bug loop, and catching data leakage and compliance gaps before launch. Each one came out of
          real projects where an agent kept making the same mistake, and one rule runs through all of them: never
          assume anything. They are free, MIT licensed and on{" "}
          <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </div>

      <h2 className="sec-label">Packs</h2>
      <SkillPacks />

      <h2 className="sec-label">Install</h2>
      <div className="prose"><p>Everything, with one command from your terminal:</p></div>
      <CopyCmd cmd={INSTALL_ALL} />
      <div className="prose">
        <p>
          On Windows PowerShell 5, use <code className={s.ic}>;</code> instead of <code className={s.ic}>&amp;&amp;</code>.
          Restart Claude Code afterwards. Or do it from inside Claude Code, choosing a pack or a single skill:
        </p>
      </div>
      <CopyCmd cmd="/plugin marketplace add iampreetdave-max/agent-skills" />
      <CopyCmd cmd={`/plugin install senior-pack@${MARKET}`} />
      <div className="prose">
        <p>
          Want just one skill? Click it above or below: each has its own page with a one-skill install command.
          Install one pack or single skills, not several that overlap, or the same skill loads twice. Without the
          plugin system, copy a folder from <code className={s.ic}>skills/</code> in the repo into{" "}
          <code className={s.ic}>~/.claude/skills/</code>; any agent that reads <code className={s.ic}>SKILL.md</code> can use them.
        </p>
      </div>

      <h2 className="sec-label">Use</h2>
      <div className="prose">
        <p>
          Each skill loads by itself when what you ask matches it, like &ldquo;I&apos;m stuck, same error again&rdquo; or
          &ldquo;is this app compliant?&rdquo;. To call one directly, type <code className={s.ic}>/</code> and its
          name, for example <code className={s.ic}>/all-skills:loop-breaker</code>. Get updates with{" "}
          <code className={s.ic}>claude plugin marketplace update {MARKET}</code>.
        </p>
      </div>

      <h2 className="sec-label">The skills</h2>
      <div className="rowlist">
        {skills.map((k) => (
          <div className="row" key={k.id} id={k.id}>
            <div className="row-main">
              <div className="row-title"><Link href={`/skills/${k.id}`}>{k.headline}</Link></div>
              <div className="row-note">{k.note}</div>
              <div className="tags">{k.id} · Use when: {k.when}</div>
            </div>
            <div className="row-when">{inPacks(k.id)}</div>
          </div>
        ))}
      </div>

      <h2 className="sec-label">Questions</h2>
      <div className="rowlist">
        {FAQ.map(([q, a]) => (
          <div className="row" key={q}>
            <div className="row-main">
              <h3 className="row-title">{q}</h3>
              <div className="row-note">{a}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
