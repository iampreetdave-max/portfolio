import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import SkillPacks, { CopyCmd } from "@/components/SkillPacks";
import s from "@/components/SkillPacks.module.css";
import { MARKET, REPO, packs, skills } from "@/lib/skills";

export const metadata = pageMeta({ title: "Claude Code Skills", description: "Open-source Claude Code skills by Preet Dave: done-gate, loop-breaker, skill-scout and more. Install all of them or just one with a single command.", path: "/skills" });

const inPacks = (id: string) => packs.filter((p) => p.id !== "all-skills" && p.members.includes(id)).map((p) => p.id.replace("-pack", "")).join(" · ");

export default function Skills() {
  return (
    <>
      <h1 className="sr-only">Claude Code skills by Preet Dave</h1>
      <div className="prose">
        <p>
          Skills I have published for Claude Code. Each one came out of real projects where an AI agent kept making the
          same mistake, and one rule runs through all of them: never assume anything. They are open source on{" "}
          <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      </div>

      <h2 className="sec-label">Packs</h2>
      <SkillPacks />

      <h2 className="sec-label">Install</h2>
      <div className="prose">
        <p>Everything, with one command from your terminal:</p>
      </div>
      <CopyCmd cmd={`claude plugin marketplace add iampreetdave-max/agent-skills && claude plugin install all-skills@${MARKET}`} />
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
          Want just one skill? Click it above or below: each has its own page with a one-skill install
          command. Install one pack or single skills, not several that overlap, or the same skill loads twice. Without the plugin
          system, copy a folder from <code className={s.ic}>skills/</code> in the repo into{" "}
          <code className={s.ic}>~/.claude/skills/</code>; any agent that reads <code className={s.ic}>SKILL.md</code> can use them.
        </p>
      </div>

      <h2 className="sec-label">Use</h2>
      <div className="prose">
        <p>
          Each skill loads by itself when what you ask matches it, like &ldquo;I&apos;m stuck, same error again&rdquo; or
          &ldquo;find skills for this project&rdquo;. To call one directly, type <code className={s.ic}>/</code> and its
          name, for example <code className={s.ic}>/all-skills:loop-breaker</code>. Get updates with{" "}
          <code className={s.ic}>claude plugin marketplace update {MARKET}</code>.
        </p>
      </div>

      <h2 className="sec-label">The skills</h2>
      <div className="rowlist">
        {skills.map((k) => (
          <div className="row" key={k.id} id={k.id}>
            <div className="row-main">
              <div className="row-title">
                <Link href={`/skills/${k.id}`}>{k.id}</Link>
              </div>
              <div className="row-note">{k.note}</div>
              <div className="tags">Use when: {k.when}</div>
            </div>
            <div className="row-when">{inPacks(k.id)}</div>
          </div>
        ))}
      </div>
    </>
  );
}
