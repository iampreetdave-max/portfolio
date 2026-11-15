"use client";

// Network of every technology on the site and the projects that use it. Positions come
// precomputed from lib/techweb.ts; this only draws them and handles hover and keyboard.
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { Web, WebNode } from "@/lib/techweb";

function Glyph({ node, size }: { node: WebNode; size: number }) {
  return node.icon ? (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="tw-icon">
      <path d={node.icon} />
    </svg>
  ) : (
    <span className="tw-mono" aria-hidden="true">{node.mono}</span>
  );
}

export default function TechWeb({ web }: { web: Web }) {
  const { nodes, edges, w, h } = web;
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const techs = useMemo(() => nodes.filter((n) => n.kind === "tech").sort((a, b) => a.label.localeCompare(b.label)), [nodes]);
  const [active, setActive] = useState<string | null>(null); // last hovered or focused node: drives the caption
  const [lit, setLit] = useState(false); // pointer or focus is in the graph: dims everything else
  const [tabStop, setTabStop] = useState(techs[0]?.id);
  const refs = useRef(new Map<string, SVGGElement | null>());
  const caption = useRef<HTMLParagraphElement>(null);

  const cur = active ? byId.get(active) : undefined;
  const near = cur && lit ? new Set([cur.id, ...cur.n]) : null; // highlight only while the pointer is on a node
  const on = (id: string) => !!near?.has(id);
  const show = (id: string) => { clearTimeout(timer.current); setActive(id); setLit(true); };
  // A node lights while the pointer rests on it and goes dark when it leaves, so the highlight is
  // always under the cursor. The short delays stop a fast sweep from flashing every node it
  // crosses, and moving straight from one node to the next swaps without blinking.
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const enter = (id: string) => { clearTimeout(timer.current); timer.current = setTimeout(() => show(id), 70); };
  const leave = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setLit(false), 120); };
  useEffect(() => () => clearTimeout(timer.current), []);

  // One tab stop for the whole graph; arrow keys walk the technologies A to Z, Enter jumps to their projects.
  const key = (e: React.KeyboardEvent, id: string) => {
    const i = techs.findIndex((t) => t.id === id);
    const j = ({ ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: techs.length - 1 } as Record<string, number>)[e.key];
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); caption.current?.querySelector("a")?.focus(); return; }
    if (j === undefined) return;
    e.preventDefault();
    const next = techs[(j + techs.length) % techs.length];
    setTabStop(next.id);
    refs.current.get(next.id)?.focus();
  };

  const names = (ids: string[]) => ids.map((id) => byId.get(id)!).sort((a, b) => a.label.localeCompare(b.label));
  const anchor = (n: WebNode) => (n.x > w * 0.62 ? { x: n.x - 7, textAnchor: "end" as const } : { x: n.x + 7, textAnchor: "start" as const });
  const label = (n: WebNode) => <text key={n.id} {...anchor(n)} y={n.y + 3.5}>{n.label}</text>;

  return (
    <figure className={`techweb${lit && near ? " dim" : ""}`}>
      <svg
        className="tw-svg" viewBox={`0 0 ${w} ${h}`} role="group" onMouseLeave={leave}
        aria-label="Technologies I have worked with, each linked to the projects that use it. Arrow keys move between technologies; Enter jumps to the projects."
      >
        <g className="tw-edges">
          {edges.map(([a, b]) => {
            const p = byId.get(a)!, q = byId.get(b)!;
            return <line key={a + b} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={near && cur && (a === cur.id || b === cur.id) ? "on" : undefined} />;
          })}
        </g>
        {nodes.filter((n) => n.kind === "project").map((n) => (
          <a key={n.id} href={n.href} tabIndex={-1} className={`tw-node tw-proj${on(n.id) ? " on" : ""}`} onMouseEnter={() => enter(n.id)} onMouseLeave={leave}>
            <circle cx={n.x} cy={n.y} r={6} className="tw-hit" />
            <circle cx={n.x} cy={n.y} r={3.5} />
          </a>
        ))}
        {techs.map((n) => (
          <g
            key={n.id} ref={(el) => { refs.current.set(n.id, el); }} role="button" tabIndex={n.id === tabStop ? 0 : -1}
            aria-label={`${n.label}, used in ${names(n.n).map((p) => p.label).join(", ")}`}
            className={`tw-node tw-tech${on(n.id) ? " on" : ""}`} transform={`translate(${n.x} ${n.y})`}
            onMouseEnter={() => enter(n.id)} onMouseLeave={leave} onFocus={() => { show(n.id); setTabStop(n.id); }} onBlur={() => setLit(false)}
            onKeyDown={(e) => key(e, n.id)}
          >
            <circle r={13} />
            {n.icon ? <svg x={-7} y={-7} width={14} height={14} viewBox="0 0 24 24"><path d={n.icon} /></svg> : <text y={3}>{n.mono}</text>}
          </g>
        ))}
        {/* project names show only for the highlighted part, on top of the icons; at rest they would collide */}
        <g className="tw-labels" aria-hidden="true">{lit && cur ? nodes.filter((n) => n.kind === "project" && on(n.id)).map(label) : null}</g>
      </svg>

      <ul className="tw-grid">
        {techs.map((n) => (
          <li key={n.id}>
            <button type="button" aria-pressed={active === n.id} onClick={() => setActive(active === n.id ? null : n.id)}>
              <Glyph node={n} size={13} />{n.label}
            </button>
          </li>
        ))}
      </ul>

      <p className="tw-caption" ref={caption}>
        {!cur ? (
          "Hover or tap a technology to see where I used it."
        ) : (
          <>
            <span className="tw-cap-name">{cur.label}</span>
            {cur.kind === "tech" ? ": " : <> (<a href={cur.href}>open</a>), built with </>}
            {names(cur.n).map((p, i) => (
              <Fragment key={p.id}>
                {i > 0 && ", "}
                {p.kind === "project" ? <a href={p.href}>{p.label}</a> : p.label}
              </Fragment>
            ))}
          </>
        )}
      </p>
    </figure>
  );
}
