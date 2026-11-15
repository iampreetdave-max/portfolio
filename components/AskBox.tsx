"use client";

// "Ask about my work": one question in, a short cited answer (or an honest "I don't know") out.
import { Fragment, useEffect, useRef, useState } from "react";

const EMAIL = "iampreetdave@gmail.com";
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY; // Turnstile only when configured
const EXAMPLES = ["What has he built with OCR?", "Where does he work now?", "Has he used reinforcement learning?"];

type Source = { id: string; title: string; link: string };
type Reply = { kind: "answer"; answer: string; sources: Source[] } | { kind: "idk" | "resting" | "error"; message?: string };
type Turnstile = { render: (el: HTMLElement, o: object) => string; reset: (id: string) => void };

const mail = <a href={`mailto:${EMAIL}`}>email me</a>;

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

export default function AskBox() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [reply, setReply] = useState<Reply | null>(null);
  const token = useRef<string>("");
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>("");

  useEffect(() => {
    if (!SITE_KEY || !widget.current) return;
    const el = widget.current;
    const mount = () => {
      const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (ts && !widgetId.current) widgetId.current = ts.render(el, { sitekey: SITE_KEY, appearance: "interaction-only", callback: (t: string) => { token.current = t; } });
    };
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = mount;
    document.head.appendChild(s);
  }, []);

  const send = async (question: string) => {
    const text = question.trim();
    if (!text || busy) return;
    setQ(text);
    setBusy(true);
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ question: text, token: token.current }) });
      setReply(await res.json().catch(() => ({ kind: "error" })));
    } catch {
      setReply({ kind: "error" });
    } finally {
      setBusy(false);
      const ts = (window as unknown as { turnstile?: Turnstile }).turnstile;
      if (SITE_KEY && ts && widgetId.current) { token.current = ""; ts.reset(widgetId.current); } // tokens are single use
    }
  };

  return (
    <div className="ask">
      <form className="ask-form" onSubmit={(e) => { e.preventDefault(); send(q); }}>
        <label htmlFor="ask-q" className="sr-only">Your question about my work</label>
        <input
          id="ask-q" value={q} onChange={(e) => setQ(e.target.value)} maxLength={300} autoComplete="off"
          placeholder="Ask about a project, a skill or a role"
        />
        <button type="submit" disabled={busy || !q.trim()}>{busy ? "Asking" : "Ask"}</button>
      </form>
      <div className="ask-try">
        Try:{" "}
        {EXAMPLES.map((e, i) => (
          <Fragment key={e}>{i > 0 && " · "}<button type="button" onClick={() => send(e)} disabled={busy}>{e}</button></Fragment>
        ))}
      </div>
      {SITE_KEY && <div ref={widget} className="ask-turnstile" />}
      <div className="ask-out" aria-live="polite">{reply && !busy && <Answer reply={reply} />}</div>
      <p className="ask-note">Answers come only from this site and my CV, with links to the source. If it is not written here, the bot says so.</p>
    </div>
  );
}
