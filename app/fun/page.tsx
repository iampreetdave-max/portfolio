"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ─── TYPES ─── */

/* ─── SHARED COMPONENTS ─── */

function LoadingPulse() {
  return (
    <div className="flex items-center gap-3 py-8 justify-center">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] text-white/45 tracking-wider">
        CLAUDE IS THINKING...
      </span>
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="border border-red-900/50 bg-red-950/20 p-4 text-center rounded-md">
      <p className="font-mono text-xs text-red-300/90 mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="font-mono text-[10px] tracking-wider border border-red-800/70 px-4 py-1.5 text-red-300/90 hover:bg-red-900/30 transition-colors rounded-md"
      >
        RETRY
      </button>
    </div>
  );
}

function ScoreDisplay({ label, value, color }: { label: string; value: string | number; color?: string }) {
  return (
    <div className="border border-white/[0.07] rounded-md px-4 py-3 text-center bg-white/[0.015]">
      <div
        className="font-mono text-2xl font-black tabular"
        style={{ color: color || "#FAFAFA" }}
      >
        {value}
      </div>
      <div className="font-mono text-[9px] text-white/40 tracking-widest uppercase mt-1">
        {label}
      </div>
    </div>
  );
}

/* ─── AI DEBATE ─── */

type DebateSide = "for" | "against";
type DebateStyle = "casual" | "sharp" | "relentless";
interface DebateTurn { role: "ai" | "user"; text: string }
interface RoundScores { argument: number; evidence: number; rebuttal: number }
interface JudgeResult { user: RoundScores; ai: RoundScores; note: string; summary: string }
interface Verdict { winner: "human" | "ai" | "draw"; headline: string; best_human_point: string; best_ai_point: string; tip: string }
type JudgeSlot = JudgeResult | "pending" | null; // null = judge call failed, round unscored

// Mirrors LIMITS in lib/debate.ts (not imported, so the prompts stay out of the client bundle).
const DEBATE = { motion: 140, turn: 600, rounds: 16 };

const MOTIONS = [
  "Remote work beats office work",
  "Nuclear power should replace coal in India",
  "AI models should be open-sourced",
  "Pineapple belongs on pizza",
  "Homework should be abolished in primary schools",
  "Social media does more harm than good",
  "City centres should ban private cars",
  "Space exploration is worth the cost",
  "A four-day work week should be the norm",
  "College degrees are overrated",
  "Cricket is a better sport than football",
  "Tipping should be abolished",
  "Video games are art",
  "Universal basic income is a good idea",
  "Zoos should be phased out",
  "Cash should be phased out",
];

const STYLES: { id: DebateStyle; label: string; hint: string }[] = [
  { id: "casual",     label: "CASUAL",     hint: "Friendly, plain-spoken" },
  { id: "sharp",      label: "SHARP",      hint: "Crisp, names flaws" },
  { id: "relentless", label: "RELENTLESS", hint: "Presses every gap" },
];

const total = (s: RoundScores) => s.argument + s.evidence + s.rebuttal;

async function debateAPI(payload: Record<string, unknown>) {
  const res = await fetch("/api/fun", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ game: "debate", payload }),
  }).catch(() => null);
  const data = res ? await res.json().catch(() => ({})) : {};
  if (!res || !res.ok) {
    const err = new Error(
      data.error || "The AI couldn't respond just now. Try again in a moment."
    ) as Error & { reframe?: string; declined?: boolean };
    err.reframe = data.reframe;
    err.declined = data.declined;
    throw err;
  }
  return data;
}

function Choice({
  name, checked, onChange, label, hint,
}: { name: string; checked: boolean; onChange: () => void; label: string; hint?: string }) {
  return (
    <label className="cursor-pointer block h-full">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="flex flex-col justify-center h-full border rounded-md px-3 py-2.5 text-center transition-colors border-white/[0.14] text-white/75 hover:border-white/40 peer-checked:bg-[#C9A86A] peer-checked:text-black peer-checked:border-[#C9A86A] peer-focus-visible:ring-2 peer-focus-visible:ring-[#C9A86A] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black">
        <span className="block font-mono text-[11px] tracking-wider font-bold">{label}</span>
        {hint && <span className="block font-mono text-[10px] mt-0.5 opacity-75">{hint}</span>}
      </span>
    </label>
  );
}

function JudgeLine({ round, slot }: { round: number; slot: JudgeSlot | undefined }) {
  if (slot === "pending")
    return <p className="font-mono text-[10px] text-white/55 tracking-wider pl-1">JUDGE SCORING ROUND {round}...</p>;
  if (!slot)
    return <p className="font-mono text-[10px] text-white/55 tracking-wider pl-1">ROUND {round} NOT SCORED</p>;
  const rows: [string, keyof RoundScores][] = [["Argument", "argument"], ["Evidence", "evidence"], ["Rebuttal", "rebuttal"]];
  return (
    <details className="border border-white/[0.08] rounded-md px-3 py-2 bg-white/[0.015]">
      <summary className="cursor-pointer font-mono text-[10px] tracking-wider text-white/70">
        JUDGE · ROUND {round} · YOU {total(slot.user)} · AI {total(slot.ai)}
      </summary>
      {slot.note && <p className="text-white/70 text-xs leading-relaxed mt-2">{slot.note}</p>}
      <table className="mt-2 w-full max-w-[16rem] font-mono text-[11px] text-white/75">
        <thead>
          <tr className="text-white/55 text-[10px] tracking-wider">
            <th scope="col" className="text-left font-normal">CRITERION</th>
            <th scope="col" className="text-right font-normal">YOU</th>
            <th scope="col" className="text-right font-normal">AI</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, k]) => (
            <tr key={k}>
              <th scope="row" className="text-left font-normal">{label}</th>
              <td className="text-right tabular">{slot.user[k]}</td>
              <td className="text-right tabular">{slot.ai[k]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

function DebateGame() {
  const [topic, setTopic] = useState("");
  const [side, setSide] = useState<DebateSide>("for");
  const [style, setStyle] = useState<DebateStyle>("sharp");
  const [debateMotion, setDebateMotion] = useState<string | null>(null);
  const [turns, setTurns] = useState<DebateTurn[]>([]);
  const [judges, setJudges] = useState<JudgeSlot[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ msg: string; retry: () => void } | null>(null);
  const [declined, setDeclined] = useState<{ reason: string; reframe: string } | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const turnRef = useRef<HTMLTextAreaElement>(null);

  const rounds = turns.length ? (turns.length - 1) / 2 : 0;
  const scored = judges.filter((j): j is JudgeResult => !!j && j !== "pending");
  const youTotal = scored.reduce((s, j) => s + total(j.user), 0);
  const aiTotal = scored.reduce((s, j) => s + total(j.ai), 0);
  const base = { motion: debateMotion, side, style };
  const summaries = () => judges.map((j) => (j && j !== "pending" ? j.summary : ""));

  useEffect(() => {
    if (debateMotion && !loading && !verdict) turnRef.current?.focus();
  }, [debateMotion, loading, verdict]);

  const surprise = () => {
    const pool = MOTIONS.filter((m) => m !== topic);
    setTopic(pool[Math.floor(Math.random() * pool.length)]);
    setDeclined(null);
  };

  const start = async (m = topic) => {
    const text = m.trim();
    if (!text) return;
    setLoading(true);
    setError(null);
    setDeclined(null);
    try {
      const data = await debateAPI({ action: "open", motion: text, side, style });
      setDebateMotion(data.motion || text);
      setTurns([{ role: "ai", text: data.reply }]);
      setJudges([]);
      setVerdict(null);
    } catch (e) {
      const err = e as Error & { reframe?: string; declined?: boolean };
      if (err.declined) setDeclined({ reason: err.message, reframe: err.reframe || "" });
      else setError({ msg: err.message, retry: () => start(text) });
    }
    setLoading(false);
  };

  const judge = async (history: DebateTurn[]) => {
    const round = (history.length - 1) / 2;
    setJudges((j) => { const c = [...j]; c[round - 1] = "pending"; return c; });
    let result: JudgeSlot = null;
    try {
      result = await debateAPI({ ...base, action: "judge", history });
    } catch {}
    setJudges((j) => { const c = [...j]; c[round - 1] = result; return c; });
  };

  const send = async (text = draft.trim()) => {
    if (!text || loading || rounds >= DEBATE.rounds) return;
    setPending(text);
    setDraft("");
    setLoading(true);
    setError(null);
    try {
      const data = await debateAPI({ ...base, action: "turn", history: turns, summaries: summaries(), message: text });
      const next: DebateTurn[] = [...turns, { role: "user", text }, { role: "ai", text: data.reply }];
      setTurns(next);
      judge(next);
    } catch (e) {
      setDraft(text);
      setError({ msg: (e as Error).message, retry: () => send(text) });
    }
    setPending(null);
    setLoading(false);
  };

  const end = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await debateAPI({
        ...base, action: "verdict", history: turns, summaries: summaries(), tally: [youTotal, aiTotal, scored.length],
      });
      setVerdict(data);
    } catch (e) {
      setError({ msg: (e as Error).message, retry: end });
    }
    setLoading(false);
  };

  const reset = () => {
    setDebateMotion(null);
    setTurns([]);
    setJudges([]);
    setDraft("");
    setVerdict(null);
    setError(null);
  };

  /* setup screen */
  if (!debateMotion) {
    return (
      <div className="space-y-6">
        <p className="text-white/65 font-mono text-xs tracking-wide leading-relaxed">
          GIVE CLAUDE ANY MOTION. IT TAKES THE OTHER SIDE AND ARGUES BACK.
          <br />
          A NEUTRAL AI JUDGE SCORES EVERY ROUND.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); start(); }}
          className="border border-white/[0.10] rounded-xl p-5 sm:p-6 space-y-5 bg-white/[0.015]"
        >
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label htmlFor="debate-motion" className="font-mono text-[10px] text-white/65 tracking-widest uppercase">
                Motion
              </label>
              <span className="font-mono text-[10px] text-white/55 tabular" aria-hidden="true">
                {topic.length}/{DEBATE.motion}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="debate-motion"
                type="text"
                value={topic}
                maxLength={DEBATE.motion}
                onChange={(e) => { setTopic(e.target.value); setDeclined(null); }}
                placeholder="e.g. Remote work beats office work"
                className="flex-1 min-w-0 bg-white/[0.025] border border-white/[0.14] rounded-md px-4 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#C9A86A]"
              />
              <button
                type="button"
                onClick={surprise}
                className="font-mono text-[11px] tracking-wider border border-white/[0.18] px-4 py-3 text-white/80 hover:border-[#C9A86A] hover:text-[#C9A86A] transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A]"
              >
                SURPRISE ME
              </button>
            </div>
          </div>

          <fieldset>
            <legend className="font-mono text-[10px] text-white/65 tracking-widest uppercase mb-2">Your side</legend>
            <div className="grid grid-cols-2 gap-2">
              <Choice name="debate-side" checked={side === "for"} onChange={() => setSide("for")} label="FOR" />
              <Choice name="debate-side" checked={side === "against"} onChange={() => setSide("against")} label="AGAINST" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-mono text-[10px] text-white/65 tracking-widest uppercase mb-2">AI style</legend>
            <div className="grid grid-cols-3 gap-2">
              {STYLES.map((s) => (
                <Choice key={s.id} name="debate-style" checked={style === s.id} onChange={() => setStyle(s.id)} label={s.label} hint={s.hint} />
              ))}
            </div>
          </fieldset>

          {declined && (
            <div role="alert" className="border border-[#E0A040]/45 bg-[#E0A040]/[0.06] rounded-md p-4 space-y-2">
              <p className="font-mono text-[10px] text-[#E0A040] tracking-widest">CAN&apos;T DEBATE THAT ONE</p>
              <p className="text-white/80 text-sm">{declined.reason}</p>
              {declined.reframe && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-1">
                  <p className="text-white/80 text-sm flex-1">
                    <span className="font-mono text-[10px] text-white/60 tracking-wider mr-2">TRY</span>
                    {declined.reframe}
                  </p>
                  <button
                    type="button"
                    onClick={() => { setTopic(declined.reframe); setDeclined(null); }}
                    className="font-mono text-[10px] tracking-wider border border-[#E0A040]/60 px-3 py-1.5 text-[#E0A040] hover:bg-[#E0A040]/10 rounded-md"
                  >
                    USE THIS MOTION
                  </button>
                </div>
              )}
            </div>
          )}

          {loading ? (
            <LoadingPulse />
          ) : (
            <button
              type="submit"
              disabled={!topic.trim()}
              className="w-full font-mono text-[11px] tracking-wider border border-white/80 text-white py-3 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-colors rounded-md disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A]"
            >
              START DEBATE
            </button>
          )}
        </form>
        {error && <ErrorBanner message={error.msg} onRetry={error.retry} />}
      </div>
    );
  }

  /* debate screen */
  const opp: DebateSide = side === "for" ? "against" : "for";
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <ScoreDisplay label="You" value={scored.length ? youTotal : "–"} />
        <ScoreDisplay label="Round" value={`${rounds}/${DEBATE.rounds}`} />
        <ScoreDisplay label="AI" value={scored.length ? aiTotal : "–"} color="#C9A86A" />
      </div>

      <div className="border border-white/[0.10] rounded-xl p-5 bg-black/30">
        <div className="font-mono text-[10px] text-white/60 tracking-widest uppercase mb-2">Motion</div>
        <p className="text-white text-base font-semibold leading-snug mb-3">{debateMotion}</p>
        <div className="flex flex-wrap gap-2 font-mono text-[10px] tracking-wider">
          <span className="border border-white/[0.16] rounded-md px-2 py-0.5 text-white/80">YOU: {side.toUpperCase()}</span>
          <span className="border border-[#C9A86A]/40 rounded-md px-2 py-0.5 text-[#C9A86A]">AI: {opp.toUpperCase()}</span>
          <span className="border border-white/[0.16] rounded-md px-2 py-0.5 text-white/70">STYLE: {style.toUpperCase()}</span>
        </div>
      </div>

      <ol className="space-y-3" aria-live="polite" aria-label="Debate transcript">
        {turns.map((t, i) => {
          const round = Math.ceil(i / 2);
          return (
            <li key={i} className="space-y-2">
              <div
                className={`rounded-xl p-4 border ${
                  t.role === "ai"
                    ? "border-[#C9A86A]/25 bg-[#C9A86A]/[0.04] mr-6 sm:mr-12"
                    : "border-white/[0.12] bg-white/[0.03] ml-6 sm:ml-12"
                }`}
              >
                <div className={`font-mono text-[10px] tracking-widest mb-1.5 ${t.role === "ai" ? "text-[#C9A86A]" : "text-white/65"}`}>
                  {t.role === "ai" ? (i === 0 ? "AI · OPENING" : `AI · ROUND ${round}`) : `YOU · ROUND ${round}`}
                </div>
                <p className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap break-words">{t.text}</p>
              </div>
              {t.role === "ai" && i > 0 && <JudgeLine round={round} slot={judges[round - 1]} />}
            </li>
          );
        })}
        {pending && (
          <li className="rounded-xl p-4 border border-white/[0.12] bg-white/[0.03] ml-6 sm:ml-12 opacity-70">
            <div className="font-mono text-[10px] tracking-widest mb-1.5 text-white/65">YOU · ROUND {rounds + 1}</div>
            <p className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap break-words">{pending}</p>
          </li>
        )}
      </ol>

      {loading && <LoadingPulse />}
      {error && <ErrorBanner message={error.msg} onRetry={error.retry} />}

      {verdict ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4" role="region" aria-label="Final verdict">
          <div className="border border-[#C9A86A]/45 bg-[#C9A86A]/[0.06] rounded-xl p-5 text-center">
            <div className="font-mono text-[10px] text-white/60 tracking-widest mb-2">FINAL VERDICT</div>
            <div className="font-mono text-xl font-bold text-white mb-2">
              {verdict.winner === "human" ? "YOU WIN" : verdict.winner === "ai" ? "AI WINS" : "DRAW"}
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{verdict.headline}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="border border-white/[0.10] rounded-xl p-4 bg-white/[0.015]">
              <div className="font-mono text-[10px] text-white/60 tracking-widest mb-2">YOUR BEST POINT</div>
              <p className="text-white/80 text-sm leading-relaxed">{verdict.best_human_point}</p>
            </div>
            <div className="border border-white/[0.10] rounded-xl p-4 bg-white/[0.015]">
              <div className="font-mono text-[10px] text-white/60 tracking-widest mb-2">AI&apos;S BEST POINT</div>
              <p className="text-white/80 text-sm leading-relaxed">{verdict.best_ai_point}</p>
            </div>
          </div>
          <div className="border border-white/[0.10] rounded-xl p-4 bg-white/[0.015]">
            <div className="font-mono text-[10px] text-white/60 tracking-widest mb-2">TIP FOR NEXT TIME</div>
            <p className="text-white/80 text-sm leading-relaxed">{verdict.tip}</p>
          </div>
          <button
            onClick={reset}
            className="w-full font-mono text-[11px] tracking-wider border border-white/[0.16] py-3 text-white/75 hover:border-white/40 hover:text-white transition-colors rounded-md"
          >
            NEW DEBATE →
          </button>
        </motion.div>
      ) : (
        !loading && (
          <div className="space-y-3">
            {rounds < DEBATE.rounds ? (
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="space-y-2">
                <div className="flex items-baseline justify-between">
                  <label htmlFor="debate-turn" className="font-mono text-[10px] text-white/65 tracking-widest uppercase">
                    Your argument
                  </label>
                  <span className="font-mono text-[10px] text-white/55 tabular" aria-hidden="true">
                    {draft.length}/{DEBATE.turn}
                  </span>
                </div>
                <textarea
                  id="debate-turn"
                  ref={turnRef}
                  rows={3}
                  value={draft}
                  maxLength={DEBATE.turn}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); send(); }
                  }}
                  aria-describedby="debate-turn-hint"
                  placeholder="Make your case, or answer the AI's question..."
                  className="w-full bg-white/[0.025] border border-white/[0.14] rounded-md px-4 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#C9A86A] resize-y"
                />
                <p id="debate-turn-hint" className="font-mono text-[10px] text-white/55">
                  Enter sends · Shift+Enter for a new line
                </p>
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="w-full font-mono text-[11px] tracking-wider border border-white/80 text-white py-3 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-colors rounded-md disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A]"
                >
                  SEND ARGUMENT
                </button>
              </form>
            ) : (
              <p className="font-mono text-[11px] text-white/70 text-center py-2">
                {DEBATE.rounds}-ROUND LIMIT REACHED. END THE DEBATE FOR THE VERDICT.
              </p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={end}
                disabled={rounds < 1}
                title={rounds < 1 ? "Make at least one argument first" : undefined}
                className="font-mono text-[11px] tracking-wider border border-[#C9A86A]/50 py-2.5 text-[#C9A86A] hover:bg-[#C9A86A]/10 transition-colors rounded-md disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A]"
              >
                END DEBATE
              </button>
              <button
                onClick={reset}
                className="font-mono text-[11px] tracking-wider border border-white/[0.16] py-2.5 text-white/70 hover:border-white/40 hover:text-white transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A86A]"
              >
                NEW MOTION
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

/* ─── MAIN PAGE ─── */

export default function FunZone() {
  return (
    <div className="min-h-screen bg-ink text-paper">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-mono text-base font-bold tracking-tight hover:opacity-85 transition-opacity">
            <span className="text-white">PD</span>
            <span className="text-white/30 font-light">/</span>
            <span className="text-[#C9A86A] text-xs font-normal tracking-[0.3em] uppercase">Fun Zone</span>
          </a>
          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="font-mono text-[11px] tracking-wider text-white/45 hover:text-white transition-colors uppercase"
            >
              Projects
            </Link>
            <span className="text-white/15">|</span>
            <a
              href="/"
              className="font-mono text-[11px] tracking-wider text-white/45 hover:text-white transition-colors uppercase"
            >
              ← Portfolio
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-gradient-to-r from-[#C9A86A]/65 to-transparent" />
              <span className="font-mono text-[11px] text-white/65 tracking-[0.2em] uppercase">
                <span className="text-[#C9A86A] mr-2 font-bold">–</span>Interactive
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              AI Debate
            </h1>
            <p className="text-white/55 text-sm max-w-md">
              Think you can out-argue an AI? Pick a motion and find out.
            </p>
          </motion.div>

          <DebateGame />
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-2xl mx-auto flex items-center justify-end gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://ai-race-news.pages.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-white/30 hover:text-[#C9A86A] transition-colors tracking-wider"
            >
              AI Race News →
            </a>
            <Link href="/projects" className="font-mono text-[10px] text-white/30 hover:text-[#C9A86A] transition-colors tracking-wider">
              All Projects →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
