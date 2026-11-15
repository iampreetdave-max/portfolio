"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  BadgeCheck, Check, Copy, FileSearch, GraduationCap, Package, RefreshCwOff, Rocket, ScanSearch,
  Smartphone, Target, Workflow, type LucideIcon,
} from "lucide-react";
import { MARKET, packs, skills } from "@/lib/skills";
import s from "./SkillPacks.module.css";

const ICON: Record<string, LucideIcon> = {
  "done-gate": BadgeCheck, "loop-breaker": RefreshCwOff, "skill-scout": ScanSearch,
  "doc-extraction": FileSearch, "make-automation": Workflow, "honest-model-eval": Target,
  "hackathon-sprint": Rocket, "android-device-test": Smartphone, "exam-sheet": GraduationCap,
};

export function CopyCmd({ cmd, tabbable = true }: { cmd: string; tabbable?: boolean }) {
  const [done, setDone] = useState(false);
  const copy = () =>
    navigator.clipboard?.writeText(cmd).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    }).catch(() => {});
  return (
    <div className={s.cmd}>
      <code>{cmd}</code>
      <button type="button" onClick={copy} tabIndex={tabbable ? 0 : -1} aria-label={done ? "Copied" : `Copy: ${cmd}`}>
        {done ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      </button>
    </div>
  );
}

// Each pack has its own choreography, played with the Web Animations API (native, no library)
// so it can run backwards cleanly when the pack is opened again.
type Style = "vortex" | "deck" | "hop";
const STYLE: Record<string, Style> = { "all-skills": "vortex", "senior-pack": "deck", "student-pack": "hop" };

function tileMotion(style: Style, dx: number, dy: number, i: number, n: number, top: number): [Keyframe[], KeyframeAnimationOptions] {
  if (style === "vortex") {
    // spiral: swing out sideways from the straight path, spin a full turn, shrink into the centre
    const len = Math.hypot(dx, dy) || 1, px = (-dy / len) * 46, py = (dx / len) * 46;
    return [[
      { transform: "translate(0px, 0px) rotate(0deg) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.5 + px}px, ${dy * 0.5 + py}px) rotate(200deg) scale(.85)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) rotate(400deg) scale(.25)`, opacity: 0 },
    ], { duration: 950, delay: i * 55, easing: "cubic-bezier(.45,0,.2,1)" }];
  }
  if (style === "deck") {
    // file in one by one, flat and square, stacking with a 4px step, then the deck closes
    const step = (i - (n - 1) / 2) * 4;
    return [[
      { transform: "translate(0px, 0px) scale(1)", opacity: 1 },
      { transform: `translate(${dx}px, ${dy + step}px) scale(.88)`, opacity: 1, offset: 0.7 },
      { transform: `translate(${dx}px, ${dy}px) scale(.8)`, opacity: 0 },
    ], { duration: 700, delay: i * 80, easing: "cubic-bezier(.7,0,.25,1)" }];
  }
  // hop: jump up on an arc, then drop into the pack with a spin. The jump is capped by the tile's
  // distance from the top of the grid, so top-row tiles never fly over the pack buttons.
  const lift = Math.min(70 + (i % 2) * 24, top + 18), spin = (i % 2 ? -1 : 1) * 14;
  return [[
    { transform: "translate(0px, 0px) rotate(0deg) scale(1)", opacity: 1, easing: "cubic-bezier(.2,.7,.4,1)" },
    { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - lift}px) rotate(${spin}deg) scale(1.06)`, opacity: 1, offset: 0.5, easing: "cubic-bezier(.6,0,.8,.4)" },
    { transform: `translate(${dx}px, ${dy}px) rotate(${spin * 2}deg) scale(.55)`, opacity: 0 },
  ], { duration: 820, delay: i * 95, easing: "linear" }];
}

const CARD: Record<Style, [Keyframe[], number]> = {
  vortex: [[
    { transform: "translate(-50%, -50%) scale(.2) rotate(-120deg)", opacity: 0 },
    { transform: "translate(-50%, -50%) scale(1.06) rotate(6deg)", opacity: 1, offset: 0.7 },
    { transform: "translate(-50%, -50%) scale(1) rotate(0deg)", opacity: 1 },
  ], 560],
  deck: [[
    { transform: "translate(-50%, -38%) scale(.97)", opacity: 0 },
    { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
  ], 380],
  hop: [[
    { transform: "translate(-50%, -50%) scale(.6)", opacity: 0 },
    { transform: "translate(-50%, -57%) scale(1.07)", opacity: 1, offset: 0.55 },
    { transform: "translate(-50%, -48%) scale(.98)", opacity: 1, offset: 0.8 },
    { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
  ], 600],
};

const FLASH: Record<Style, Keyframe[] | null> = {
  vortex: [{ opacity: 0, transform: "scale(.2)" }, { opacity: 0.45, offset: 0.3 }, { opacity: 0, transform: "scale(1.9)" }],
  deck: null, // precise, no fireworks
  hop: [{ opacity: 0, transform: "scale(.3)" }, { opacity: 0.3, offset: 0.25 }, { opacity: 0, transform: "scale(1.1)", offset: 0.5 }, { opacity: 0.25, transform: "scale(.5)", offset: 0.6 }, { opacity: 0, transform: "scale(1.3)" }],
};

export default function SkillPacks() {
  const stage = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const tiles = useRef<Record<string, HTMLAnchorElement | null>>({});
  const running = useRef<Animation[]>([]);
  const busy = useRef(false);
  const [packed, setPacked] = useState<string | null>(null);
  const [shown, setShown] = useState(packs[1]); // card content stays put while it closes

  const play = (id: string) => {
    const st = stage.current;
    const pack = packs.find((p) => p.id === id)!;
    if (!st || !card.current) return;
    const k = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1;
    const style = STYLE[id];
    const anims: Animation[] = [];
    let last = 0;
    for (const sk of skills) {
      const el = tiles.current[sk.id];
      if (!el) continue;
      const i = pack.members.indexOf(sk.id);
      if (i < 0) { // not in this pack: step back and fade
        anims.push(el.animate([{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(.94)" }], { duration: 260 * k, fill: "both", easing: "ease" }));
        continue;
      }
      // offsetLeft/Top are layout positions, unaffected by transforms, so this is safe mid-animation
      const dx = st.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2);
      const dy = st.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2);
      const [frames, opts] = tileMotion(style, dx, dy, i, pack.members.length, el.offsetTop);
      anims.push(el.animate(frames, { ...opts, duration: (opts.duration as number) * k, delay: (opts.delay ?? 0) * k, fill: "both" }));
      last = Math.max(last, ((opts.delay ?? 0) + (opts.duration as number)) * k);
    }
    const [cardFrames, cardMs] = CARD[style];
    anims.push(card.current.animate(cardFrames, { duration: cardMs * k, delay: last * 0.78, fill: "both", easing: "ease-out" }));
    const f = FLASH[style];
    if (f && flash.current && k) anims.push(flash.current.animate(f, { duration: 760, delay: last * 0.62, fill: "both", easing: "ease-out" }));
    running.current = anims;
  };

  const close = async () => {
    const anims = running.current;
    anims.forEach((a) => a.reverse());
    await Promise.all(anims.map((a) => a.finished.catch(() => {})));
    anims.forEach((a) => a.cancel());
    running.current = [];
  };

  const pick = async (id: string) => {
    if (busy.current) return;
    busy.current = true;
    try {
      if (packed) {
        setPacked(null);
        await close();
        if (packed === id) return;
      }
      setShown(packs.find((p) => p.id === id)!);
      setPacked(id);
      play(id);
      await Promise.all(running.current.map((a) => a.finished.catch(() => {})));
    } finally {
      busy.current = false;
    }
  };

  return (
    <div className={s.wrap}>
      <div className={s.bar} role="group" aria-label="Packs">
        {packs.map((p) => (
          <button key={p.id} type="button" aria-pressed={packed === p.id} onClick={() => pick(p.id)}>
            {p.id}
          </button>
        ))}
      </div>

      <div ref={stage} className={`${s.stage} ${packed ? s.packed : ""}`}>
        {skills.map((k) => {
          const Icon = ICON[k.id];
          return (
            <Link key={k.id} href={`/skills/${k.id}`} ref={(el) => { tiles.current[k.id] = el; }}
              className={s.tile} tabIndex={packed ? -1 : undefined} aria-hidden={packed ? true : undefined}>
              <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{k.id}</span>
            </Link>
          );
        })}
        <div ref={flash} className={s.flash} aria-hidden="true" />
        <div ref={card} className={s.pack} aria-hidden={!packed}>
          <Package size={22} strokeWidth={1.4} aria-hidden="true" />
          <div className={s.packName}>{shown.id}</div>
          <div className={s.packMeta}>{shown.members.length} skills, {shown.blurb}</div>
          <CopyCmd cmd={`/plugin install ${shown.id}@${MARKET}`} tabbable={!!packed} />
        </div>
      </div>

      <p className={s.hint}>Pick a pack to merge its skills into one install, or click a skill to install just that one.</p>
      <div className={s.sr} aria-live="polite">{packed ? `${shown.id}: ${shown.members.length} skills packed into one install` : ""}</div>
    </div>
  );
}
