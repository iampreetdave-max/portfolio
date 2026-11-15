"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
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

// Pick a pack: its skill tiles fly to the centre, stack, and merge into one pack card.
// Offsets come from offsetLeft/offsetTop (layout, not transforms), so re-measuring mid-animation is safe.
export default function SkillPacks() {
  const stage = useRef<HTMLDivElement>(null);
  const tiles = useRef<Record<string, HTMLDivElement | null>>({});
  const [packed, setPacked] = useState<string | null>(null);
  const [shown, setShown] = useState(packs[1]); // card content stays put while it fades out
  const [off, setOff] = useState<Record<string, [number, number]>>({});

  const measure = useCallback(() => {
    const st = stage.current;
    if (!st) return;
    const o: Record<string, [number, number]> = {};
    for (const [id, el] of Object.entries(tiles.current)) {
      if (el) o[id] = [st.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2), st.clientHeight / 2 - (el.offsetTop + el.offsetHeight / 2)];
    }
    setOff(o);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    return () => ro.disconnect();
  }, [measure]);

  const pick = (id: string) => {
    const next = packs.find((p) => p.id === id)!;
    if (packed === id) return setPacked(null);
    if (packed) { // switching packs: spread out first, then merge the new set
      setPacked(null);
      const wait = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450;
      setTimeout(() => { setShown(next); setPacked(id); }, wait);
      return;
    }
    setShown(next);
    setPacked(id);
  };

  const members = packed ? shown.members : [];
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
          const i = members.indexOf(k.id);
          const [dx, dy] = off[k.id] ?? [0, 0];
          const style = {
            "--dx": `${dx}px`, "--dy": `${dy}px`,
            "--r": `${i < 0 ? 0 : (i - (members.length - 1) / 2) * 6}deg`,
            "--d": `${i < 0 ? 0 : i * 45}ms`,
          } as CSSProperties;
          return (
            <div key={k.id} ref={(el) => { tiles.current[k.id] = el; }} style={style} aria-hidden="true"
              className={`${s.tile} ${packed ? (i >= 0 ? s.in : s.out) : ""}`}>
              <Icon size={16} strokeWidth={1.5} />
              <span>{k.id}</span>
            </div>
          );
        })}
        <div className={s.flash} aria-hidden="true" />
        <div className={s.pack} aria-hidden={!packed}>
          <Package size={22} strokeWidth={1.4} aria-hidden="true" />
          <div className={s.packName}>{shown.id}</div>
          <div className={s.packMeta}>{shown.members.length} skills, {shown.blurb}</div>
          <CopyCmd cmd={`/plugin install ${shown.id}@${MARKET}`} tabbable={!!packed} />
        </div>
      </div>

      <p className={s.hint}>Pick a pack to merge its skills into one install. Pick it again to spread them out.</p>
      <div className={s.sr} aria-live="polite">{packed ? `${shown.id}: ${shown.members.length} skills packed into one install` : ""}</div>
    </div>
  );
}
