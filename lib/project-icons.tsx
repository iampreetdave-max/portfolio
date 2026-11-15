// One lucide line icon per project, keyed by project id (lib/content.ts). Add one for every new project.
import {
  Anchor, AudioLines, BrainCircuit, Cctv, CloudSun, CodeXml, Coffee, Flag, Globe, Goal, Handshake,
  Medal, Newspaper, NotebookPen, Puzzle, Scale, ScanText, SearchCheck, Spade, Telescope, Trophy, Truck,
  createLucideIcon, type LucideIcon,
} from "lucide-react";

// lucide has no basketball; drawn in its 24px line style so it matches the rest
const Basketball = createLucideIcon("Basketball", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "ball" }],
  ["path", { d: "M12 2v20M2 12h20M4.9 4.9C7.5 7.6 8.5 9.8 8.5 12s-1 4.4-3.6 7.1M19.1 4.9C16.5 7.6 15.5 9.8 15.5 12s1 4.4 3.6 7.1", key: "seams" }],
]);

export const PROJECT_ICONS: Record<string, LucideIcon> = {
  "claude-code-skills": Puzzle,
  "open-data-finder": SearchCheck,
  "padosi": Handshake,
  "q": AudioLines,
  "winwall": Trophy,
  "nudge-ai": BrainCircuit,
  "marine-procurement-erp": Anchor,
  "ledgerlens": ScanText,
  "poker-platform": Spade,
  "tensor-tapri": Coffee,
  "ai-news-globe": Globe,
  "transitops": Truck,
  "therma-netra": CloudSun,
  "cityshield": Cctv,
  "arbiter": Scale,
  "ai-race-news": Newspaper,
  "nba-predictor": Basketball,
  "soccer-predictor": Goal,
  "nascar-predictor": Flag,
  "codetransform": CodeXml,
  "sky-alerts": Telescope,
  "find-ranks": Medal,
  "talktonotes": NotebookPen,
};
