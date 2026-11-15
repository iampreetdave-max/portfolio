"use client";

// "Ask Preet": a button on every page opens a small chat. Each question gets a short cited
// answer from this site's own content, or an honest "I don't know".
import { Fragment, useEffect, useRef, useState } from "react";

const EMAIL = "iampreetdave@gmail.com";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; // Turnstile only when configured
const EXAMPLES = ["What does Preet do?", "What has he built with OCR?", "Where does he work now?", "Has he used reinforcement learning?"];
const OPEN = "ask-preet:open"; // window event: any button can open the panel, optionally with a question

type Source = { id: string; title: string; link: string };
type Reply = { kind: "answer"; answer: string; sources: Source[] } | { kind: "idk" | "resting" | "error"; message?: string };
type Turn = { q: string; reply?: Reply };
type Turnstile = { render: (el: HTMLElement, o: object) => string; reset: (id: string) => void };

const mail = <a href={`mailto:${EMAIL}`}>email me</a>;
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
  if (reply.kind === "idk") return <p>I don&rsquo;t know that from what is on this site. Please {mail} and I&rsquo;ll answer it myself.</p>;
  if (reply.kind === "resting") return <p>The bot is resting for today. Please {mail} instead.</p>;
  return <p>{reply.message ?? "Something went wrong on my side."} You can also {mail}.</p>;
}

// The About page's entry point: looks like the old inline box, opens the panel.
export function AskOpen() {
  return (
    <div className="ask-entry">
      <button type="button" className="ask-open" onClick={() => openAsk()}>
        <span>Ask about a project, a skill or a role</span><span aria-hidden="true">Ask</span>
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

  useEffect(() => { if (open) input.current?.focus(); }, [open]);
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
      <button ref={launcher} type="button" className="askp-launch" aria-expanded={open} aria-controls="askp" onClick={() => (open ? close() : setOpen(true))}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" /></svg>
        Ask Preet
      </button>

      <div id="askp" className="askp" role="dialog" aria-label="Ask about Preet's work" hidden={!open} onKeyDown={(e) => { if (e.key === "Escape") close(); }}>
        <div className="askp-head">
          <span>Ask about my work</span>
          <button type="button" onClick={close} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="askp-log" ref={log} aria-live="polite">
          {!turns.length && <p className="askp-hint">Answers come only from this site and my CV, with links to the source. If it is not written here, it says so.</p>}
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
          <input id="askp-q" ref={input} value={q} onChange={(e) => setQ(e.target.value)} maxLength={300} autoComplete="off" placeholder="Ask about a project, a skill or a role" />
          <button type="submit" disabled={waiting || !q.trim()} aria-label="Send">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          </button>
        </form>
      </div>
    </>
  );
}
