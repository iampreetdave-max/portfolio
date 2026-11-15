"use client";

// Jarvis: an assistant on every page. Its logo opens a small chat; each question gets a short
// cited answer from this site's own content, or an honest "I don't know".
import { Fragment, useEffect, useId, useRef, useState } from "react";

const EMAIL = "iampreetdave@gmail.com";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; // Turnstile only when configured
const EXAMPLES = ["What does Preet do?", "What has he built with OCR?", "Where does he work now?", "Has he used reinforcement learning?"];
const OPEN = "ask-preet:open"; // window event: any button can open the panel, optionally with a question

type Source = { id: string; title: string; link: string };
type Reply = { kind: "answer"; answer: string; sources: Source[] } | { kind: "idk" | "resting" | "error"; message?: string };
type Turn = { q: string; reply?: Reply };
type Turnstile = { render: (el: HTMLElement, o: object) => string; reset: (id: string) => void };

const mail = <a href={`mailto:${EMAIL}`}>email the boss</a>;

// An original arc-reactor style mark: two dashed rings turning in opposite directions around a
// glowing core. Transparent, so it floats over the page.
function JarvisLogo({ size }: { size: number }) {
  const g = useId().replace(/:/g, "");
  return (
    <svg className="jv" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id={`${g}h`}><stop offset="0" stopColor="currentColor" stopOpacity=".35" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></radialGradient>
        <radialGradient id={`${g}c`}><stop offset="0" stopColor="#fff" /><stop offset=".5" stopColor="currentColor" /><stop offset="1" stopColor="currentColor" stopOpacity=".2" /></radialGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill={`url(#${g}h)`} />
      <circle className="jv-ticks" cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="1.5 3.2" opacity=".75" />
      <circle className="jv-ring" cx="32" cy="32" r="21.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeDasharray="11 5.9" />
      <circle cx="32" cy="32" r="15" fill="none" stroke="currentColor" strokeWidth="1.1" opacity=".6" />
      <circle className="jv-core" cx="32" cy="32" r="8.5" fill={`url(#${g}c)`} />
    </svg>
  );
}

const greeting = () => { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };
const openAsk = (q?: string) => window.dispatchEvent(new CustomEvent(OPEN, { detail: q }));

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

// The About page's entry point: looks like the old inline box, opens the panel.
export function AskOpen() {
  return (
    <div className="ask-entry">
      <button type="button" className="ask-open" onClick={() => openAsk()}>
        <span>Ask Jarvis about a project, a skill or a role</span><span aria-hidden="true">Ask</span>
      </button>
      <div className="ask-chips">
        {EXAMPLES.map((e) => <button key={e} type="button" onClick={() => openAsk(e)}>{e}</button>)}
      </div>
    </div>
  );
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

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const asked = (e as CustomEvent<string | undefined>).detail;
      if (asked) send(asked);
    };
    window.addEventListener(OPEN, onOpen);
    return () => window.removeEventListener(OPEN, onOpen);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- send only touches refs and setters

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
        aria-label={open ? "Close Jarvis" : "Ask Jarvis, Preet's assistant"} title="Ask Jarvis" onClick={() => (open ? close() : setOpen(true))}>
        <JarvisLogo size={58} />
      </button>

      <div id="askp" className="askp" role="dialog" aria-label="Jarvis, Preet's assistant" hidden={!open} onKeyDown={(e) => { if (e.key === "Escape") close(); }}>
        <div className="askp-head">
          <span className="askp-title"><JarvisLogo size={26} /><span><b>Jarvis</b> Preet&rsquo;s assistant</span></span>
          <button type="button" onClick={close} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="askp-log" ref={log} aria-live="polite">
          {!turns.length && (
            <div className="askp-a">
              <p>{hello}. I&rsquo;m Jarvis, the boss&rsquo;s assistant. Ask me anything about his work and projects.</p>
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
          <input id="askp-q" ref={input} value={q} onChange={(e) => setQ(e.target.value)} maxLength={300} autoComplete="off" placeholder="Ask Jarvis about the boss's work" />
          <button type="submit" disabled={waiting || !q.trim()} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </button>
        </form>
      </div>
    </>
  );
}
