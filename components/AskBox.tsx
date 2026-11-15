"use client";

// HAPI: an assistant on every page. Its logo opens a small chat; each question gets a short
// cited answer from this site's own content, or an honest "I don't know".
import { Fragment, useEffect, useId, useRef, useState } from "react";

const EMAIL = "iampreetdave@gmail.com";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; // Turnstile only when configured
const EXAMPLES = ["What does Preet do?", "What has he built with OCR?", "Where does he work now?", "Has he used reinforcement learning?"];

type Source = { id: string; title: string; link: string };
type Reply = { kind: "answer"; answer: string; sources: Source[] } | { kind: "idk" | "resting" | "error"; message?: string };
type Turn = { q: string; reply?: Reply };
type Turnstile = { render: (el: HTMLElement, o: object) => string; reset: (id: string) => void };

const mail = <a href={`mailto:${EMAIL}`}>email Preet</a>;

// An original amber hologram mark: broken rings, a sweeping arc through a bright core, and a
// scatter of light specks. Static and transparent, so it floats over the page.
// Fixed seed, so the server and the browser draw the same specks.
const SPECKS = (() => {
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: 54 }, () => {
    const a = rnd() * Math.PI * 2, r = 14 + rnd() * 16, len = 0.7 + rnd() * 2.4;
    const x = 32 + r * Math.cos(a), y = 32 + r * Math.sin(a);
    const rot = (a * 180) / Math.PI + (rnd() < 0.75 ? 90 : 0); // most run along the ring
    return { x: +x.toFixed(2), y: +y.toFixed(2), len: +len.toFixed(2), rot: +rot.toFixed(1), o: +(0.3 + rnd() * 0.7).toFixed(2), w: +(0.5 + rnd() * 0.8).toFixed(2) };
  });
})();

function HapiLogo({ size }: { size: number }) {
  const g = useId().replace(/:/g, "");
  return (
    <svg className="jv" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id={`${g}h`}><stop offset="0" stopColor="currentColor" stopOpacity=".45" /><stop offset=".6" stopColor="currentColor" stopOpacity=".12" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${g}c`}><stop offset="0" stopColor="#fffaf0" /><stop offset=".35" stopColor="#ffd98a" /><stop offset=".7" stopColor="currentColor" stopOpacity=".7" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill={`url(#${g}h)`} />
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        <circle cx="32" cy="32" r="27.5" strokeWidth="2.3" strokeDasharray="6 1.6 1.2 2.4 9 1.4 2.2 3.2 3.6 1.1 1 4.2 7 2" opacity=".95" />
        <circle cx="32" cy="32" r="24.6" strokeWidth=".8" strokeDasharray=".8 1.7" opacity=".55" />
        <circle cx="32" cy="32" r="21" strokeWidth="1.6" strokeDasharray="17 6 4 9 25 7 3 5" opacity=".75" />
        <circle cx="32" cy="32" r="13.5" strokeWidth="1.1" strokeDasharray="20 5 7 6 9 4" opacity=".7" />
        <path d="M13.5 39.5 A20 12 -28 0 1 50.5 23.5" strokeWidth="1.7" opacity=".85" />
        <path d="M18 27 A15 9 -28 0 0 45 37" strokeWidth=".9" opacity=".5" />
        {SPECKS.map((p, i) => (
          <line key={i} x1={p.x - p.len / 2} y1={p.y} x2={p.x + p.len / 2} y2={p.y} transform={`rotate(${p.rot} ${p.x} ${p.y})`} strokeWidth={p.w} opacity={p.o} />
        ))}
      </g>
      <circle className="jv-core" cx="32" cy="32" r="8.5" fill={`url(#${g}c)`} />
      <path d="M28.5 31.5 a3.6 3.6 0 1 1 3.8 4.2" fill="none" stroke="#fff6e0" strokeWidth=".9" strokeLinecap="round" opacity=".9" />
    </svg>
  );
}

const greeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };

function Answer({ reply }: { reply: Reply }) {
  if (reply.kind === "answer") {
    const src = new Map(reply.sources.map((s) => [s.id, s]));
    return (
      <p>
        {reply.answer.split(/\[([a-z0-9-]+)\]/).map((part, i) => {
          const s = i % 2 ? src.get(part) : undefined;
          return s ? <a key={i} className="ask-cite" href={s.link}>{s.title}</a> : <Fragment key={i}>{part}</Fragment>;
        })}
      </p>
    );
  }
  if (reply.kind === "idk") return <p>I&rsquo;m afraid that isn&rsquo;t in my files, and I&rsquo;d rather not guess. Do {mail}; he answers personally.</p>;
  if (reply.kind === "resting") return <p>I&rsquo;m running on reserve power for today. Do {mail} instead; he answers personally.</p>;
  return <p>{reply.message ?? "Something went wrong on my end."} You can always {mail}.</p>;
}

export default function AskBox() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [hello, setHello] = useState("Hello");
  const busy = useRef(false);
  const token = useRef("");
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef("");
  const input = useRef<HTMLInputElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const waiting = turns.length > 0 && !turns[turns.length - 1].reply;

  const send = async (question: string) => {
    const text = question.trim();
    if (!text || busy.current) return;
    busy.current = true;
    setQ("");
    setTurns((t) => [...t, { q: text }]);
    let reply: Reply = { kind: "error" };
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: text, token: token.current }) });
      reply = await res.json();
    } catch {}
    setTurns((t) => t.map((x, i) => (i === t.length - 1 ? { ...x, reply } : x)));
    busy.current = false;
    const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
    if (SITE_KEY && ts && widgetId.current) { token.current = ""; ts.reset(widgetId.current); } // tokens are single use
  };

  useEffect(() => { if (open) { input.current?.focus(); setHello(greeting()); } }, [open]);
  useEffect(() => { log.current?.scrollTo({ top: log.current.scrollHeight, behavior: "smooth" }); }, [turns]);

  // Turnstile loads on first open, not on every page view.
  useEffect(() => {
    if (!open || !SITE_KEY || !widget.current || document.getElementById("cf-turnstile")) return;
    const el = widget.current;
    const s = document.createElement("script");
    s.id = "cf-turnstile";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => {
      const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (ts && !widgetId.current) widgetId.current = ts.render(el, { sitekey: SITE_KEY, appearance: "interaction-only", callback: (t: string) => { token.current = t; } });
    };
    document.head.appendChild(s);
  }, [open]);

  const close = () => { setOpen(false); launcher.current?.focus(); };

  return (
    <>
      <button ref={launcher} type="button" className={`askp-launch${open ? " open" : ""}`} aria-expanded={open} aria-controls="askp"
        aria-label={open ? "Close HAPI" : "Ask HAPI, Preet's assistant"} title="Ask HAPI" onClick={() => (open ? close() : setOpen(true))}>
        <HapiLogo size={60} />
      </button>

      <div id="askp" className="askp" role="dialog" aria-label="HAPI, Preet's assistant" hidden={!open} onKeyDown={(e) => { if (e.key === "Escape") close(); }}>
        <div className="askp-head">
          <span className="askp-title"><HapiLogo size={26} /><span><b>HAPI</b> Preet&rsquo;s assistant</span></span>
          <button type="button" onClick={close} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="askp-log" ref={log} aria-live="polite">
          {!turns.length && (
            <div className="askp-a">
              <p>{hello}. I&rsquo;m HAPI, Preet&rsquo;s assistant. Ask me anything about Preet&rsquo;s work and projects.</p>
              <p className="askp-hint">I answer only from this site and his CV, with a link to each source, and I&rsquo;ll tell you when I don&rsquo;t know.</p>
            </div>
          )}
          {turns.map((t, i) => (
            <Fragment key={i}>
              <p className="askp-q">{t.q}</p>
              {t.reply ? <div className="askp-a"><Answer reply={t.reply} /></div> : <p className="askp-a askp-wait">Thinking</p>}
            </Fragment>
          ))}
        </div>

        {!turns.length && (
          <div className="askp-try">
            {EXAMPLES.map((e) => <button key={e} type="button" onClick={() => send(e)}>{e}</button>)}
          </div>
        )}
        {SITE_KEY && <div ref={widget} className="askp-turnstile" />}

        <form className="askp-form" onSubmit={(e) => { e.preventDefault(); send(q); }}>
          <label htmlFor="askp-q" className="sr-only">Your question about my work</label>
          <input id="askp-q" ref={input} value={q} onChange={(e) => setQ(e.target.value)} maxLength={300} autoComplete="off" placeholder="Ask HAPI about Preet's work" />
          <button type="submit" disabled={waiting || !q.trim()} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </button>
        </form>
      </div>
    </>
  );
}
