// Minimal projects + automations list (dhruvchauhan.me style). Static; theme and
// header come from globals.css / SiteHeader.
import {
  Anchor, AudioLines, BrainCircuit, Cctv, CloudSun, CodeXml, Coffee, Flag, Globe, Goal, Handshake,
  Medal, Newspaper, NotebookPen, Puzzle, Scale, ScanText, Spade, Telescope, Trophy, Truck,
  createLucideIcon, type LucideIcon,
} from "lucide-react";
import { automations, projects } from "@/lib/content";

// lucide has no basketball; drawn in its 24px line style so it matches the rest
const Basketball = createLucideIcon("Basketball", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "ball" }],
  ["path", { d: "M12 2v20M2 12h20M4.9 4.9C7.5 7.6 8.5 9.8 8.5 12s-1 4.4-3.6 7.1M19.1 4.9C16.5 7.6 15.5 9.8 15.5 12s1 4.4 3.6 7.1", key: "seams" }],
]);

const ICONS: Record<string, LucideIcon> = {
  "Claude Code Skills": Puzzle,
  "Padosi": Handshake,
  "Q": AudioLines,
  "WinWall": Trophy,
  "Nudge AI": BrainCircuit,
  "Marine Procurement ERP": Anchor,
  "LedgerLens": ScanText,
  "Real-Time Poker Platform": Spade,
  "Tensor Tapri": Coffee,
  "AI News Globe": Globe,
  "TransitOps": Truck,
  "Therma Netra": CloudSun,
  "CityShield · VisionScan": Cctv,
  "Arbiter": Scale,
  "AI Race News": Newspaper,
  "NBA Game Predictor": Basketball,
  "Soccer Match Predictor": Goal,
  "NASCAR Race Predictor": Flag,
  "CodeTransform": CodeXml,
  "Sky Alerts": Telescope,
  "Find-Ranks": Medal,
  "TalkToNotes": NotebookPen,
};

export const metadata = { title: "Projects · Preet Ghanshyam Dave" };

export default function ProjectsPage() {
  return (
    <>
      <div className="rowlist">
        {projects.map((p) => {
          const Icon = ICONS[p.name];
          return (
          <div className="row" key={p.id} id={p.id}>
            <div className="row-main">
              <div className="row-title">
                {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a> : p.name}
              </div>
              <div className="row-note">{p.note}</div>
              <div className="tags">{p.tags}</div>
            </div>
            <div className="row-when row-side">
              {p.cat}
              {Icon && <span className="row-icon" aria-hidden="true"><Icon size={44} strokeWidth={0.9} /></span>}
            </div>
          </div>
          );
        })}
      </div>

      <h2 className="sec-label">Automations</h2>
      <div className="rowlist">
        {automations.map((a) => (
          <div className="row" key={a.id} id={a.id}>
            <div className="row-main">
              <div className="row-title">{a.name}</div>
              <div className="row-note">{a.note}</div>
              <div className="tags">{a.tags}</div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
