"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */

const BOOT_LINES = [
  { text: "PREET-OS v2.0.1  —  Neural Bootstrap Sequence", color: "amber", delay: 0 },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: "dim", delay: 80 },
  { text: "[  OK  ] CPU: Neural Engine ×8 @ 4.2GHz  —  loaded", color: "green", delay: 220 },
  { text: "[  OK  ] ML Stack: XGBoost · LightGBM · TensorFlow · PyTorch · Scikit-Learn", color: "green", delay: 400 },
  { text: "[  OK  ] Automation Stack: Make.com · Zapier · n8n · GoHighLevel", color: "green", delay: 580 },
  { text: "[  OK  ] Database: PostgreSQL/Azure  —  4,084+ live prediction records", color: "green", delay: 760 },
  { text: "[  OK  ] Prediction Engines: NBA (1,064 games) · Soccer (3,020) · NASCAR (7,566)", color: "green", delay: 940 },
  { text: "[  OK  ] AI Race Pipeline: 110+ sources · 15-min intervals  —  ACTIVE", color: "green", delay: 1120 },
  { text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", color: "dim", delay: 1280 },
  { text: "All systems NOMINAL. Type 'help' to view available commands.", color: "white", delay: 1440 },
];

const PROJECTS = [
  {
    id: "nba-engine",
    name: "nba-prediction-engine",
    category: "ML Engineering · Sports Analytics",
    desc: "Production XGBoost model — 1,064 settled games, live sportsbook odds, real P&L. +16.5% ROI on Grade A picks. 66.3% Moneyline win rate.",
    tech: ["XGBoost", "Python 3.11", "PostgreSQL", "GitHub Actions", "Azure", "SportsRadar API"],
    roi: "+16.5%",
    records: "1,064",
    status: "LIVE" as const,
    link: "https://github.com/iampreetdave-max",
  },
  {
    id: "soccer-engine",
    name: "soccer-prediction-v1-v2",
    category: "ML Engineering · Sports Analytics",
    desc: "Dual-model system — Ridge Regression + GPU ensemble. 3,020 matches, 15+ leagues. +9.1% ROI on Grade A+B picks.",
    tech: ["Ridge Regression", "XGBoost", "CUDA", "Python", "Mistral AI", "PostgreSQL"],
    roi: "+9.1%",
    records: "3,020",
    status: "LIVE" as const,
    link: "https://github.com/iampreetdave-max",
  },
  {
    id: "nascar-engine",
    name: "nascar-prediction-engine",
    category: "ML Engineering · Sports Analytics",
    desc: "3 track-type ensembles. 5 prediction markets. 7,566 historical records. Odds scraped from 9 sportsbooks via Selenium.",
    tech: ["XGBoost", "LightGBM", "Random Forest", "Python", "Selenium", "Platt Scaling"],
    records: "7,566",
    status: "LIVE" as const,
    link: "https://github.com/iampreetdave-max",
  },
  {
    id: "ai-race",
    name: "ai-race-news",
    category: "Data Engineering · Full-Stack",
    desc: "110+ sources scraped every 15 min. Audience-specific feeds (Dev/Business/Finance/Research), smart dedup, 12 auto-tags.",
    tech: ["FastAPI", "Python", "BeautifulSoup", "Docker", "APScheduler", "SQLite"],
    records: "110+ sources",
    status: "LIVE" as const,
    link: "https://github.com/iampreetdave-max/ai-race-news",
  },
  {
    id: "talknotes",
    name: "TalkToNotes",
    category: "Computer Vision · NLP",
    desc: "TrOCR system converting handwritten notes into searchable knowledge bases with chatbot interface for natural language querying.",
    tech: ["TrOCR", "Transformers", "Vector Search", "Python"],
    status: "COMPLETE" as const,
    link: "https://github.com/iampreetdave/TalkNotes",
  },
  {
    id: "studbud",
    name: "StudBud",
    category: "Web · Full-Stack",
    desc: "Full-stack academic platform with ML-powered study recommendations and adaptive scheduling.",
    tech: ["TypeScript", "Machine Learning", "Full-Stack"],
    status: "COMPLETE" as const,
    link: "https://github.com/iampreetdave/STUDBUD",
  },
  {
    id: "find-ranks",
    name: "Find-Ranks",
    category: "Web · Data Processing",
    desc: "Automates mark extraction from PDF mark sheets and generates ranked institutional analytics.",
    tech: ["Streamlit", "Python", "PDF Processing"],
    status: "COMPLETE" as const,
    link: "https://github.com/iampreetdave-max/Find-Ranks",
  },
];

const SKILLS = [
  { name: "Machine Learning",              pct: 90, items: ["Scikit-Learn", "XGBoost", "LightGBM", "Regression & Classification", "Feature Engineering", "Ensemble Methods"] },
  { name: "Automation & Integrations",     pct: 88, items: ["Make.com", "GoHighLevel", "Zapier", "n8n", "ActiveCampaign", "API & Webhook Integrations"] },
  { name: "Deep Learning & Neural Nets",   pct: 85, items: ["TensorFlow", "PyTorch", "Keras", "CNNs", "Transformers", "Neural Network Optimization"] },
  { name: "Development & Deployment",      pct: 85, items: ["Python (Advanced)", "FastAPI", "JavaScript", "Full-Stack", "API Development", "ML Pipeline Automation"] },
  { name: "Computer Vision & NLP",         pct: 80, items: ["TrOCR", "Image Processing", "NLP", "Vector Embeddings & Search"] },
];

const EXP = [
  {
    role: "Trainee Software Engineer",
    company: "Agility Innovations Pvt. Ltd.",
    period: "Sep 2025 – Present",
    location: "Ahmedabad, India",
    desc: "Building and shipping production ML systems — prediction engines, data pipelines, and full-stack applications deployed and validated against live data at scale.",
    active: true,
  },
  {
    role: "Machine Learning Intern",
    company: "Oasis Infobyte",
    period: "2025",
    location: "Remote",
    desc: "Developed ML projects across neural network architectures, built end-to-end ML pipelines from data ingestion to deployment.",
    active: false,
  },
  {
    role: "AI Research Lead",
    company: "Smart India Hackathon & Rotaract Club Hackathon",
    period: "2024 – 2025",
    location: "India",
    desc: "Led AI research teams in computer vision and TrOCR systems. Designed architectures for real-world document processing challenges.",
    active: false,
  },
];

const CERTS = [
  { name: "Claude AI / Anthropic",          issuer: "Anthropic",          year: "2025", verified: true },
  { name: "Python (4-Phase Mastery)",        issuer: "Training Institute",  year: "2024", verified: true },
  { name: "Machine Learning with Python",   issuer: "Online Platform",     year: "2024", verified: true },
  { name: "Natural Language Processing",    issuer: "Online Platform",     year: "2024", verified: true },
  { name: "C, C++, C Advanced",             issuer: "Programming Institute",year: "2023", verified: true },
  { name: "ML Engineering by Saikat Dutta", issuer: "Saikat Dutta",        year: "2025", verified: false },
];

const LIVE_SYSTEMS = [
  {
    name: "sports-prediction-platform.service",
    desc: "NBA · Soccer · NASCAR engines — 7 GitHub Actions workflows, autonomous daily runs",
    uptime: "15+ months",
    scale: "10,000+ events",
  },
  {
    name: "enterprise-automation-suite.service",
    desc: "CRM sync · dynamic notifications · cross-platform integrations 24/7",
    uptime: "Zero downtime SLA",
    scale: "8+ active workflows",
  },
  {
    name: "ai-intelligence-pipeline.service",
    desc: "110+ sources · smart dedup · audience-targeted auto-tagged feeds",
    uptime: "15-min update cycles",
    scale: "110+ sources",
  },
];

const CMD_HELP = [
  "┌─────────────────────────────────────────────────────────────────┐",
  "│  AVAILABLE COMMANDS                                             │",
  "├───────────────────────┬─────────────────────────────────────────┤",
  "│  whoami               │  display identity                       │",
  "│  about                │  background & bio                       │",
  "│  skills               │  technical stack overview               │",
  "│  projects             │  all 14+ projects                       │",
  "│  experience           │  work history                           │",
  "│  certs                │  certifications                         │",
  "│  stats                │  live system metrics                    │",
  "│  contact              │  get in touch                           │",
  "│  ls                   │  list sections                          │",
  "│  clear                │  clear interactive log                  │",
  "└───────────────────────┴─────────────────────────────────────────┘",
  "  ↑ / ↓   navigate command history",
  "  Tab     autocomplete",
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENTS
═══════════════════════════════════════════════════════════════ */

function Prompt() {
  return (
    <span className="select-none shrink-0 whitespace-nowrap font-mono">
      <span className="text-[#F5A623]">preet</span>
      <span className="text-[#444]">@</span>
      <span className="text-[#00D96E]">portfolio</span>
      <span className="text-[#444]">:</span>
      <span className="text-[#00D4FF]">~</span>
      <span className="text-[#999]">$</span>
      <span>&nbsp;</span>
    </span>
  );
}

function CmdLine({ cmd }: { cmd: string }) {
  return (
    <div className="flex items-center mt-6 mb-2">
      <Prompt />
      <span className="text-[#E2E2E2]">{cmd}</span>
    </div>
  );
}

function SkillBar({
  pct,
  name,
  items,
}: {
  pct: number;
  name: string;
  items: string[];
}) {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setOn(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[#555] w-8 text-right tabular-nums shrink-0">{pct}%</span>
        <span className="text-[#2A2A2A] shrink-0">[</span>
        {/* Bar container */}
        <div
          className="relative overflow-hidden shrink-0"
          style={{ width: "160px", height: "1.1em" }}
        >
          {/* Empty track */}
          <div
            className="absolute inset-0 text-[#1A1A1A] whitespace-nowrap overflow-hidden leading-none pt-px"
            aria-hidden
          >
            {"░".repeat(28)}
          </div>
          {/* Filled bar — animated width */}
          <motion.div
            className="absolute inset-0 text-[#00D96E] whitespace-nowrap overflow-hidden leading-none pt-px"
            style={{ textShadow: "0 0 6px rgba(0,217,110,0.55)" }}
            initial={{ width: "0%" }}
            animate={{ width: on ? `${pct}%` : "0%" }}
            transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {"█".repeat(28)}
          </motion.div>
        </div>
        <span className="text-[#2A2A2A] shrink-0">]</span>
        <span className="text-[#D0D0D0] ml-2 shrink-0">{name}</span>
      </div>
      <div className="pl-12 flex flex-wrap gap-1 mt-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="text-[10px] text-[#3A3A3A] border border-[#1A1A1A] px-1.5 py-px bg-[#0A0A0A] rounded-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */

export default function TerminalPortfolio() {
  const [bootCount, setBootCount]   = useState(0);
  const [bootDone, setBootDone]     = useState(false);
  const [input, setInput]           = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx]       = useState(-1);
  const [cmdLog, setCmdLog]         = useState<Array<{ cmd: string; out: string[] }>>([]);

  const bodyRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Boot sequence ── */
  useEffect(() => {
    const timers = BOOT_LINES.map((line, i) =>
      setTimeout(() => {
        setBootCount(i + 1);
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setBootDone(true), 500);
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── Auto-scroll ── */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [bootCount, bootDone, cmdLog]);

  /* ── Run command ── */
  const runCmd = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((h) => [cmd, ...h.slice(0, 49)]);
    setHistIdx(-1);

    if (cmd === "clear") { setCmdLog([]); return; }

    const RESPONSES: Record<string, string[]> = {
      help: CMD_HELP,
      ls: [
        "about/",
        "skills/",
        `projects/  (${PROJECTS.length} items)`,
        "experience/",
        "certs/",
        "live-systems/",
        "contact/",
        "stats/",
      ],
      whoami: [
        "Preet Ghanshyam Dave",
        "AI/ML Engineer · Automation Developer · Deep Learning",
        "B.Tech CS (AI-ML) · Trainee SWE @ Agility Innovations",
        "Ahmedabad, India",
        "",
        "Status: ● Open to AI/ML Roles",
      ],
      about: [
        "I'm an AI-ML Engineer passionate about building intelligent",
        "systems that solve real-world problems.",
        "",
        "Expertise: deep learning · computer vision · NLP",
        "End-to-end ML pipelines from data ingestion to production.",
        "",
        "Currently: B.Tech CS (AI-ML) + Trainee SWE @ Agility,",
        "shipping production ML systems validated at scale.",
      ],
      skills: SKILLS.map(
        (s) =>
          `${String(s.pct).padStart(3)}%  [${
            ("█".repeat(Math.round(s.pct / 5)) + "░".repeat(20)).slice(0, 20)
          }]  ${s.name}`
      ),
      projects: PROJECTS.map(
        (p) =>
          `${p.status.padEnd(10)}${p.name.padEnd(36)}${p.category}`
      ),
      experience: EXP.map(
        (e) =>
          `${e.active ? "● ACTIVE   " : "○ --------- "}${e.role} @ ${e.company}`
      ),
      certs: CERTS.map(
        (c) =>
          `${c.verified ? "[✓]" : "[ ]"} ${c.name.padEnd(38)}${c.issuer} (${c.year})`
      ),
      stats: [
        "14+    Projects shipped",
        "13+    Automation workflows built",
        " 4,084 Live prediction records",
        "15mo+  Production uptime (sports engines)",
        "110+   AI sources monitored (every 15 min)",
        "  2    Internships completed",
        "  1    Hackathon won",
      ],
      contact: [
        "email     →  iampreetdave@gmail.com",
        "phone     →  +91 90810 25277",
        "github    →  github.com/iampreetdave-max",
        "linkedin  →  linkedin.com/in/preet-dave-452023271",
        "location  →  Ahmedabad, India",
        "resume    →  /resume.pdf (PDF)  ·  /resume.docx (DOCX)",
      ],
    };

    const out =
      RESPONSES[cmd] ??
      [`bash: ${cmd}: command not found`, "Type 'help' for available commands."];

    setCmdLog((l) => [...l, { cmd: raw, out }]);
  }, []);

  /* ── Keyboard handler ── */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCmd(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(i);
      setInput(cmdHistory[i] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(histIdx - 1, -1);
      setHistIdx(i);
      setInput(i === -1 ? "" : cmdHistory[i]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = [
        "help", "ls", "whoami", "about", "skills",
        "projects", "experience", "certs", "stats", "contact", "clear",
      ];
      const match = cmds.find(
        (c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase()
      );
      if (match) setInput(match);
    }
  };

  /* ═══════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#050505] font-mono text-sm text-[#E2E2E2] flex items-start justify-center py-4 px-4 relative overflow-x-hidden">
      {/* CRT overlays */}
      <div className="crt-scanlines" />
      <div className="crt-vignette" />
      <div className="scanline-beam" />

      {/* ── Terminal window ── */}
      <div
        className="w-full max-w-5xl flex flex-col rounded-lg overflow-hidden border border-[#1C1C1C]"
        style={{
          height: "calc(100vh - 2rem)",
          boxShadow:
            "0 0 0 1px #111, 0 24px 80px rgba(0,0,0,0.92), 0 0 80px rgba(0,217,110,0.03)",
        }}
      >
        {/* ── Title bar ── */}
        <div className="flex items-center justify-between bg-[#0C0C0C] border-b border-[#1C1C1C] px-4 py-2.5 shrink-0 select-none">
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#BF3530]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#C79400]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#17A328]" />
          </div>
          {/* Title */}
          <div className="text-[#3A3A3A] text-xs tracking-widest">
            preet@portfolio — bash — 220×52
          </div>
          {/* Quick links */}
          <div className="flex items-center gap-4 text-[#3A3A3A] text-xs">
            <a
              href="https://github.com/iampreetdave-max"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D96E] transition-colors duration-200"
              title="GitHub"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/preet-dave-452023271/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#00D4FF] transition-colors duration-200"
              title="LinkedIn"
            >
              linkedin
            </a>
            <a
              href="mailto:iampreetdave@gmail.com"
              className="hover:text-[#F5A623] transition-colors duration-200"
              title="Email"
            >
              email
            </a>
          </div>
        </div>

        {/* ── Body ── */}
        <div
          ref={bodyRef}
          className="flex-1 overflow-y-auto p-5 pb-6 bg-[#050505] cursor-text"
          onClick={() => inputRef.current?.focus()}
          role="main"
          aria-label="Terminal portfolio — type help for commands"
        >

          {/* ══ BOOT SEQUENCE ══ */}
          <div className="space-y-0.5 mb-1" aria-live="polite" aria-label="Boot sequence">
            {BOOT_LINES.slice(0, bootCount).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                className={
                  line.color === "amber"
                    ? "text-[#F5A623] font-semibold"
                    : line.color === "green"
                    ? "text-[#00D96E]"
                    : line.color === "dim"
                    ? "text-[#1E1E1E]"
                    : "text-[#B0B0B0]"
                }
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* ══ PORTFOLIO SECTIONS (after boot) ══ */}
          {bootDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >

              {/* ─ HERO ─ */}
              <CmdLine cmd="whoami --full" />
              <div className="ml-2 mb-3 border border-[#F5A623]/20 p-4 bg-[#0A0A0A]">
                <div
                  className="text-[#F5A623] font-bold tracking-[0.25em] text-sm mb-1 glow-green"
                  style={{ textShadow: "0 0 12px rgba(245,166,35,0.5)" }}
                >
                  P R E E T &nbsp; G H A N S H Y A M &nbsp; D A V E
                </div>
                <div className="text-[#555] text-xs mb-0.5">
                  AI/ML Engineer &nbsp;·&nbsp; Automation Developer &nbsp;·&nbsp; Deep Learning
                </div>
                <div className="text-[#555] text-xs">
                  B.Tech CS(AI-ML) &nbsp;·&nbsp; Trainee SWE @ Agility Innovations
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
                  <span className="text-[#00D96E] font-bold">● Open to AI/ML Roles</span>
                  <span>
                    <span className="text-[#444]">loc: </span>
                    <span className="text-[#E2E2E2]">Ahmedabad, India</span>
                  </span>
                  <a href="mailto:iampreetdave@gmail.com" className="t-link">
                    iampreetdave@gmail.com
                  </a>
                  <a
                    href="https://github.com/iampreetdave-max"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-link"
                  >
                    github ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/preet-dave-452023271/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-link"
                  >
                    linkedin ↗
                  </a>
                  <a href="/resume.pdf" download className="t-link">
                    resume.pdf ↓
                  </a>
                </div>
              </div>

              {/* ─ ABOUT ─ */}
              <CmdLine cmd="cat about.txt" />
              <div className="ml-2 border-l-2 border-[#1A1A1A] pl-4 mb-1 hover:border-[#F5A623]/30 transition-colors duration-300">
                <p className="text-[#888] leading-relaxed max-w-2xl text-xs">
                  I&apos;m an AI-ML Engineer passionate about building intelligent systems that solve
                  real-world problems. With expertise in deep learning, computer vision, and NLP,
                  I develop end-to-end ML pipelines — from data preprocessing and feature engineering
                  to model deployment and optimization.
                </p>
                <p className="text-[#888] leading-relaxed max-w-2xl text-xs mt-2">
                  Currently pursuing B.Tech in CS (AI-ML) while gaining hands-on industry experience
                  as a Trainee Software Engineer, shipping production ML systems validated against
                  live data at scale.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {["Deep Learning", "Computer Vision", "NLP", "MLOps", "Full-Stack", "Automation"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-[10px] border border-[#00D96E]/20 text-[#00D96E] px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* ─ STATS ─ */}
              <CmdLine cmd="stats --live" />
              <div className="ml-2 mb-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { v: "14+",    l: "Projects" },
                  { v: "13+",    l: "Automations" },
                  { v: "4,084+", l: "Live Predictions" },
                  { v: "15mo+",  l: "Prod. Uptime" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="stat-card border border-[#1C1C1C] p-3 bg-[#0A0A0A]"
                  >
                    <div className="text-[#00D96E] font-bold text-xl tabular-nums">{s.v}</div>
                    <div className="text-[#3A3A3A] text-[10px] mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* ─ SKILLS ─ */}
              <CmdLine cmd="cat skills.json" />
              <div className="ml-2 mb-1">
                {SKILLS.map((s) => (
                  <SkillBar key={s.name} pct={s.pct} name={s.name} items={s.items} />
                ))}
              </div>

              {/* ─ PROJECTS ─ */}
              <CmdLine cmd="ls -la projects/" />
              <div className="ml-2 text-[#333] text-[10px] mb-2">
                total {PROJECTS.length} — click any project to open
              </div>
              <div className="ml-2 mb-1 space-y-2">
                {PROJECTS.map((p, i) => (
                  <motion.a
                    key={p.id}
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.25 }}
                    className="proj-card block border border-[#1C1C1C] p-3 bg-[#0A0A0A] rounded-sm no-underline"
                    aria-label={`${p.name} — ${p.category}`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] px-1.5 py-0.5 font-bold border ${
                            p.status === "LIVE"
                              ? "text-[#00D96E] border-[#00D96E]/22 bg-[#00D96E]/5"
                              : "text-[#555] border-[#333]/40 bg-transparent"
                          }`}
                        >
                          {p.status}
                        </span>
                        <span className="text-[#00D4FF] font-bold text-xs">{p.name}</span>
                      </div>
                      <span className="text-[#2A2A2A] text-[10px]">{p.category}</span>
                    </div>
                    <div className="text-[#666] text-[11px] leading-relaxed">{p.desc}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.tech.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-[#333] border border-[#1A1A1A] px-1.5 py-px bg-[#0D0D0D] rounded-sm"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 5 && (
                        <span className="text-[10px] text-[#272727]">
                          +{p.tech.length - 5} more
                        </span>
                      )}
                    </div>
                    {("roi" in p || "records" in p) && (
                      <div className="flex gap-4 mt-1.5 text-[10px]">
                        {"roi" in p && p.roi && (
                          <span>
                            <span className="text-[#3A3A3A]">roi: </span>
                            <span className="text-[#F5A623] font-bold">{p.roi}</span>
                          </span>
                        )}
                        {"records" in p && p.records && (
                          <span>
                            <span className="text-[#3A3A3A]">records: </span>
                            <span className="text-[#00D96E]">{p.records}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </motion.a>
                ))}
              </div>

              {/* ─ EXPERIENCE ─ */}
              <CmdLine cmd="cat experience.log" />
              <div className="ml-2 mb-1 space-y-4">
                {EXP.map((e, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-[#1A1A1A] pl-4 hover:border-[#F5A623]/35 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      {e.active && (
                        <span className="text-[10px] text-[#F5A623] border border-[#F5A623]/22 px-1.5 py-px">
                          ACTIVE
                        </span>
                      )}
                      <span className="text-[#E2E2E2] font-bold text-xs">{e.role}</span>
                    </div>
                    <div className="text-[#F5A623] text-xs">{e.company}</div>
                    <div className="text-[#3A3A3A] text-[10px] mt-0.5">
                      {e.period} &nbsp;·&nbsp; {e.location}
                    </div>
                    <div className="text-[#555] text-[11px] mt-1 leading-relaxed max-w-2xl">
                      {e.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* ─ CERTIFICATIONS ─ */}
              <CmdLine cmd="cat certifications.txt" />
              <div className="ml-2 mb-1">
                {CERTS.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs py-1.5 border-b border-[#0D0D0D]"
                  >
                    <span
                      className={`shrink-0 ${
                        c.verified ? "text-[#00D96E]" : "text-[#333]"
                      }`}
                    >
                      {c.verified ? "[✓]" : "[ ]"}
                    </span>
                    <span className="text-[#C0C0C0]">{c.name}</span>
                    <span className="text-[#2A2A2A]">—</span>
                    <span className="text-[#444]">{c.issuer}</span>
                    <span className="text-[#222] ml-auto tabular-nums">{c.year}</span>
                  </div>
                ))}
              </div>

              {/* ─ LIVE SYSTEMS ─ */}
              <CmdLine cmd="systemctl status --all" />
              <div className="ml-2 mb-1 space-y-2">
                {LIVE_SYSTEMS.map((s, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-[#00D96E]"
                        style={{ textShadow: "0 0 6px rgba(0,217,110,0.6)" }}
                      >
                        ●
                      </span>
                      <span className="text-[#E2E2E2] font-bold">{s.name}</span>
                      <span className="text-[#3A3A3A]">— active (running)</span>
                    </div>
                    <div className="pl-5 text-[#555] text-[10px] mt-0.5">
                      {s.desc}
                    </div>
                    <div className="pl-5 flex gap-5 text-[10px] mt-0.5">
                      <span>
                        <span className="text-[#2A2A2A]">uptime: </span>
                        <span className="text-[#00D96E]">{s.uptime}</span>
                      </span>
                      <span>
                        <span className="text-[#2A2A2A]">scale: </span>
                        <span className="text-[#F5A623]">{s.scale}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ─ CONTACT ─ */}
              <CmdLine cmd="contact --all" />
              <div className="ml-2 mb-1 space-y-1.5 text-xs">
                {([
                  { k: "email",    v: "iampreetdave@gmail.com",                  href: "mailto:iampreetdave@gmail.com" },
                  { k: "phone",    v: "+91 90810 25277",                         href: "tel:+919081025277" },
                  { k: "github",   v: "github.com/iampreetdave-max",             href: "https://github.com/iampreetdave-max" },
                  { k: "linkedin", v: "linkedin.com/in/preet-dave-452023271",    href: "https://www.linkedin.com/in/preet-dave-452023271/" },
                  { k: "location", v: "Ahmedabad, India",                        href: null },
                  { k: "resume",   v: "resume.pdf  ↓",                          href: "/resume.pdf" },
                ] as { k: string; v: string; href: string | null }[]).map(({ k, v, href }) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className="text-[#3A3A3A] w-16 text-right shrink-0">{k}:</span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        download={href === "/resume.pdf" || undefined}
                        className="t-link"
                      >
                        {v}
                      </a>
                    ) : (
                      <span className="text-[#E2E2E2]">{v}</span>
                    )}
                  </div>
                ))}
                <div className="mt-4 text-[#222] text-[10px]">
                  # Type &apos;help&apos; for interactive commands &nbsp;·&nbsp; ↑↓ history &nbsp;·&nbsp; Tab autocomplete
                </div>
              </div>

              {/* ─ FOOTER ─ */}
              <div className="border-t border-[#111] pt-4 mt-6">
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-[#252525]">
                  <span>© 2026 PREET GHANSHYAM DAVE</span>
                  <span>NEXT.JS · TAILWIND · FRAMER MOTION</span>
                  <Link href="/projects" className="t-link text-[10px]">
                    all-projects →
                  </Link>
                  <Link href="/fun" className="t-link text-[10px]">
                    fun-zone →
                  </Link>
                  <a
                    href="https://github.com/iampreetdave-max/ai-race-news"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-link text-[10px]"
                  >
                    ai-race-news ↗
                  </a>
                </div>
              </div>

            </motion.div>
          )}

          {/* ══ INTERACTIVE COMMAND LOG ══ */}
          {cmdLog.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4"
            >
              <div className="flex items-center">
                <Prompt />
                <span className="text-[#E2E2E2]">{entry.cmd}</span>
              </div>
              <div className="pl-4 mt-1 space-y-0.5">
                {entry.out.map((line, j) => (
                  <div key={j} className="text-[#00D96E] text-xs leading-relaxed">
                    {line || " "}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* ══ INPUT LINE ══ */}
          {bootDone && (
            <div className="flex items-center mt-4 pt-3 border-t border-[#0D0D0D]">
              <Prompt />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#E2E2E2] caret-[#00D96E] font-mono text-sm"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input — type help for commands"
              />
            </div>
          )}

        </div>{/* end body */}
      </div>{/* end terminal window */}
    </div>
  );
}
