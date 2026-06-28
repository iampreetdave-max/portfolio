"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Zap, Code2, Workflow } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import BackToTop from "@/components/BackToTop";

/* ── Real, verified projects ── */
const allProjects: Project[] = [
  {
    id: "therma-netra",
    title: "Therma Netra — Digital Twin of India's Climate",
    category: "Climate ML · Digital Twin",
    description:
      "An AI-powered digital twin of India's climate, built entirely on national datasets (IMD, INSAT/MOSDAC, IMDAA, CPCB). One continuously-assimilated twin powers climate forecast, urban-heat mitigation, and air-quality apps.",
    longDescription:
      "Therma Netra is an AI-powered digital twin of India's climate, built entirely on national datasets — IMD gridded rainfall (0.25°) and temperature (1°), INSAT/MOSDAC satellite data, IMDAA reanalysis, and CPCB air quality. It continuously fuses incoming observations into a live virtual climate state using observation-guided nudging plus bias correction. A single twin powers three connected applications: climate state and short-term forecast, urban-heat mitigation, and surface air quality. The short-term forecast uses a persistence-of-anomaly baseline (~30% skill over persistence) and is architected to upgrade to a ConvLSTM on BharatBench/IMDAA, while a what-if simulator drives live Heat-Stress and AQI impacts with urban °C-cooling maps.\n\nFramed honestly throughout: an AI nowcast (not a full GCM), observation nudging (not 4D-Var/EnKF), and physics-informed proxies (NWS heat index, CPCB AQI). Built for ISRO's Bharatiya Antariksh Hackathon (BAH) 2026, Problem Statement #5.",
    tech_tags: ["Python", "Streamlit", "xarray", "imdlib", "Pydeck", "Climate ML", "Digital Twin"],
    repo_url: null,
    demo_url: null,
  },
  {
    id: "cityshield",
    title: "CityShield · VisionScan — Unified AI Policing Platform",
    category: "Computer Vision · GovTech",
    description:
      "A unified AI policing platform that fuses physical and cyber crime onto one GIS map, forecasts next-week risk, and closes the loop from live CCTV anomaly to dispatched patrol unit — running fully offline on CPU.",
    longDescription:
      "CityShield unifies physical and cyber crime on a single GIS map, forecasts next-week risk, and converts it into optimized patrol routes — all offline on CPU. It runs as a closed loop: a live CCTV anomaly (a hybrid CLIP+YOLO detector for fire, smoke, accident, weapon, and violence) auto-opens a geo-tagged case, bumps the predictive risk surface, and dispatches the nearest unit. The forecasting model is transparent and auditable (recency-weighted risk + priors + anomaly boost) and was validated with rolling-origin walk-forward cross-validation; backtested on synthetic demo data it captured ~77% of next-week crime within 33% of the city (Hit-Rate@10 0.771, PAI@10 2.31x over 8 weekly folds) — a methodology demonstration, not real-world accuracy.\n\nVisionScan adds a four-mode CCTV semantic search over one offline index — natural-language and reference-image retrieval (CLIP ViT-B/32 → FAISS), suspect face re-ID (InsightFace ArcFace), and object search (YOLOv8). CrimeGPT generates 7 statutory Gujarat-police documents in English/Hindi/Gujarati. Ships as a FastAPI + SQLite backend, React + react-leaflet frontend, one-command Docker, 77 passing backend tests, and a 4-layer OWASP security middleware. Built for KANAD S.H.I.E.L.D. 2026 with the Cyber Crime Branch, Ahmedabad City Police.",
    tech_tags: ["FastAPI", "React", "CLIP", "FAISS", "YOLOv8", "InsightFace", "RAG", "Docker"],
    repo_url: "https://github.com/iampreetdave-max/Guardian-Angle",
    demo_url: "https://visionscan.centralindia.cloudapp.azure.com",
  },
  {
    id: "arbiter",
    title: "Arbiter — Agentic Legal AI",
    category: "Agentic AI · Legal Tech",
    description:
      "A full-stack AI legal assistant that turns a problem described in plain English or Hindi into a properly structured, citation-backed legal document — no upfront lawyer fees.",
    longDescription:
      "Arbiter converts a problem described in plain language into a properly structured legal document, removing the barrier of upfront lawyer fees. Built on Google's Agent Development Kit, its Gemini 2.0 agents research applicable law in real time using Google Search grounding, then draft documents with relevant citations and stream the output back. It generates 6 document types — demand letters, legal notices, RTI applications, consumer complaints, cease & desist, and employment complaints — with plain-English or Hindi intake aimed at users across India, the US, UK, Canada, and Australia.\n\nA Next.js 14 frontend pairs with a FastAPI backend, Firebase Auth + Firestore, Google Cloud Storage, and Razorpay payments, deployed on Google Cloud Run (asia-south1). Built for the XPRIZE \"Build with Gemini\" 2026 program (Professional Services Access track).",
    tech_tags: ["Next.js 14", "FastAPI", "Google Gemini 2.0", "Agent ADK", "Firebase", "Cloud Run", "Razorpay"],
    repo_url: "https://github.com/iampreetdave-max/arbiter",
    demo_url: null,
  },
  {
    id: "ai-race-news",
    title: "AI Race News — AI/ML News Aggregation Platform",
    category: "Data Engineering · Backend",
    description:
      "A production pipeline that ingests 110+ AI/ML sources every 15 minutes, deduplicates and auto-tags articles, and serves audience-specific feeds through a public FastAPI REST API and a Next.js frontend.",
    longDescription:
      "AI Race News is a production news-aggregation platform built around a scheduled ingestion pipeline that pulls from 110+ AI/ML sources every 15 minutes. Articles pass through a three-layer deduplication system — URL normalization, content hashing, and title-similarity matching — to keep feeds clean across overlapping sources. Each story is run through audience classification (developers, business, finance, research, general) and auto-tagged across 12 topic categories.\n\nThe platform exposes a public FastAPI REST API with filtering and pagination, backed by a Next.js frontend. APScheduler orchestrates the full ingest-dedupe-tag cycle, and the API and scraper run as Dockerized services covered by a pytest suite.",
    tech_tags: ["FastAPI", "Python", "BeautifulSoup", "APScheduler", "Docker", "Next.js", "SQLite", "pytest"],
    repo_url: "https://github.com/iampreetdave-max/ai-race-news",
    demo_url: "https://ai-race-news.pages.dev/",
  },
  {
    id: "football-predictions",
    title: "Sports Match-Prediction Engines",
    category: "ML · Sports Analytics",
    description:
      "A production ML suite forecasting NBA, soccer, and NASCAR outcomes from engineered pre-match features and live sportsbook odds, with predictions logged to PostgreSQL and graded against real settled results. +16.5% tracked ROI on Grade-A NBA picks.",
    longDescription:
      "A multi-sport machine-learning suite that forecasts match and race outcomes from engineered pre-match features and live sportsbook odds. Each engine fetches fixtures, builds features, predicts, and logs every prediction to PostgreSQL before grading it against the real settled result with full profit-and-loss tracking. The engines run autonomously on daily GitHub Actions workflows.\n\nTracked results across the suite: the NBA engine reached +16.5% ROI on Grade-A picks and a 66.3% moneyline win rate over 1,064 settled games; the soccer models (15+ leagues, 3,020 matches) reached +9.1% ROI on Grade A+B picks; and the NASCAR engine spans 7,566 historical records with odds scraped from multiple sportsbooks. In total the suite has logged 4,084+ live predictions over 15+ months of uptime. Models range from Ridge regression (soccer) to XGBoost / LightGBM / Random Forest ensembles (NBA, NASCAR), with Platt scaling for probability calibration.",
    tech_tags: ["XGBoost", "LightGBM", "Ridge Regression", "Python", "PostgreSQL", "GitHub Actions", "Streamlit"],
    repo_url: "https://github.com/iampreetdave-max/football-predictions",
    demo_url: null,
  },
  {
    id: "code-convertor",
    title: "CodeTransform — Python ↔ JavaScript Converter",
    category: "Developer Tools",
    description:
      "A web-based code converter that transforms code between Python and JavaScript using 122+ tested conversion rules, with auto language detection and color-coded confidence scoring.",
    longDescription:
      "CodeTransform translates source between Python and JavaScript, driven by 122+ tested conversion rules and color-coded confidence scoring that flags how reliable each translation is. It auto-detects the source language from code patterns and file extension, and supports file upload, one-click download with the correct extension, copy-to-clipboard, conversion history, and swap-direction.\n\nThe system pairs a FastAPI Python backend with a vanilla JavaScript and Tailwind CSS frontend, deliberately requiring no build tools. Led from inception through a state-level GTU Design Engineering presentation as Project Lead.",
    tech_tags: ["FastAPI", "Python", "JavaScript", "Tailwind CSS", "Language Detection"],
    repo_url: "https://github.com/iampreetdave-max/code-convertor",
    demo_url: null,
  },
  {
    id: "find-ranks",
    title: "Find-Ranks — PDF Marksheet Analytics",
    category: "Utility · Python",
    description:
      "A Streamlit utility that extracts marks from multiple PDF mark-sheets, computes cumulative performance, and generates rankings with analytics for educational institutions.",
    longDescription:
      "Find-Ranks aggregates student results spread across many PDF mark-sheets. It ingests multiple PDFs, extracts the marks from each document, and computes cumulative performance per student, then generates rankings together with supporting analytics — all through a Streamlit interface. The project spans the full flow, from PDF text extraction and data handling with pandas to the ranking logic and presentation layer.",
    tech_tags: ["Streamlit", "Python", "PDF Processing", "pandas"],
    repo_url: "https://github.com/iampreetdave-max/Find-Ranks",
    demo_url: null,
  },
  {
    id: "talktonotes",
    title: "TalkToNotes — Handwriting to Knowledge Base",
    category: "NLP · Document Intelligence",
    description:
      "A hackathon project that digitizes handwritten and printed notes with TrOCR, then turns them into a searchable knowledge base powering a chatbot and one-click quiz generation.",
    longDescription:
      "TalkToNotes, built for the Rotaract Club Hackathon, bridges the gap between messy handwritten study notes and usable digital knowledge. It uses Microsoft's TrOCR transformer to recognize handwritten and printed text and convert it into editable content. The notes are organized into a searchable knowledge base, with vector search experimented on to ground a chatbot over a user's own material, and the system generates quizzes from the captured notes in a single click — closing the loop from capture to study aid.",
    tech_tags: ["TrOCR", "Transformers", "Vector Search", "Python", "NLP", "OCR"],
    repo_url: null,
    demo_url: null,
  },
];

/* ── Automation capabilities (no client names — generalized & honest) ── */
const automations = [
  { title: "CRM & Lead-Flow Sync", description: "Two-way CRM synchronization and lead routing across tools, keeping pipelines and contact records consistent automatically.", tags: ["GoHighLevel", "Make.com", "CRM"] },
  { title: "Notification & Alerting Pipelines", description: "Event-driven Slack and email alerting so the right people are notified the moment a status changes.", tags: ["Slack API", "Webhooks", "Alerts"] },
  { title: "Survey & Feedback Automation", description: "End-to-end NPS / feedback pipelines — distribution, collection, scoring, and reporting without manual steps.", tags: ["Surveys", "Analytics", "Reporting"] },
  { title: "Client Onboarding Workflows", description: "Structured onboarding flows that push updates to the right teams and track each step to completion.", tags: ["Onboarding", "Workflow", "Status Tracking"] },
  { title: "Dynamic Forms & Data Routing", description: "Context-aware forms with cascading fields and rules that route submitted data to the correct destination.", tags: ["Forms", "Dynamic Data", "Routing"] },
  { title: "Cross-Platform API Integrations", description: "Custom webhook and API integrations stitching together services that don't natively talk to each other.", tags: ["n8n", "Zapier", "REST / Webhooks"] },
];

const projectFilters = ["All", "AI / ML", "Computer Vision", "Data & Backend", "Developer Tools"];
const filterMap: Record<string, string[]> = {
  "AI / ML": ["Climate", "Agentic", "Sports", "NLP", "RAG", "Digital Twin", "Document Intelligence"],
  "Computer Vision": ["Computer Vision", "CLIP", "YOLOv8", "TrOCR", "OCR", "InsightFace"],
  "Data & Backend": ["Data Engineering", "Backend", "FastAPI", "APScheduler"],
  "Developer Tools": ["Developer Tools", "Utility"],
};

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "automations">("projects");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    filter === "All"
      ? allProjects
      : allProjects.filter((p) => {
          const kws = filterMap[filter] || [];
          return kws.some(
            (kw) =>
              p.category.toLowerCase().includes(kw.toLowerCase()) ||
              p.tech_tags.some((t) => t.toLowerCase().includes(kw.toLowerCase()))
          );
        });

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
  const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

  return (
    <div className="relative z-10 min-h-screen">
      <nav className="fixed top-0 inset-x-0 z-50 bg-ink/80 border-b border-line backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-[13px] text-muted hover:text-paper transition-colors">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Home
          </Link>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent/[0.12] border border-accent/30 font-mono text-sm font-bold text-accent">PD</span>
            <span className="font-display text-[15px] font-semibold tracking-tight">Preet Dave</span>
          </Link>
          <Link href="/fun" className="text-[12px] font-mono tracking-wider text-muted hover:text-accent transition-colors">
            Fun Zone ↗
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="kicker mb-3">Work</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Projects &amp; Automations
          </h1>
          <p className="text-muted text-[15px] max-w-2xl leading-relaxed">
            Applied ML, computer-vision, and agentic-AI systems — plus the workflow automations I build for clients. Click any project for the full write-up.
          </p>
        </motion.div>

        <div className="mt-9 inline-flex gap-1 rounded-xl border border-line bg-surface/60 p-1">
          <button
            onClick={() => { setActiveTab("projects"); setFilter("All"); }}
            className={`inline-flex items-center gap-2 text-[13px] px-4 py-2 rounded-lg transition-colors ${activeTab === "projects" ? "bg-accent text-ink font-semibold" : "text-muted hover:text-paper"}`}
          >
            <Code2 size={14} /> Projects <span className="opacity-70">({allProjects.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("automations")}
            className={`inline-flex items-center gap-2 text-[13px] px-4 py-2 rounded-lg transition-colors ${activeTab === "automations" ? "bg-accent text-ink font-semibold" : "text-muted hover:text-paper"}`}
          >
            <Workflow size={14} /> Automations <span className="opacity-70">({automations.length})</span>
          </button>
        </div>

        {activeTab === "projects" && (
          <>
            <div className="mt-8 flex flex-wrap gap-2">
              {projectFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`font-mono text-[11px] tracking-wide px-3.5 py-2 rounded-lg border transition-colors ${
                    filter === f
                      ? "border-accent/45 text-accent bg-accent/[0.08]"
                      : "border-line text-muted hover:text-paper hover:border-line-strong"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <motion.div key={filter} initial="hidden" animate="show" variants={stagger} className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <ProjectCard project={p} onClick={() => setSelected(p)} />
                </motion.div>
              ))}
            </motion.div>
            {filtered.length === 0 && (
              <div className="mt-8 card py-14 text-center">
                <p className="text-muted font-mono text-xs tracking-wider">NO PROJECTS MATCH THIS FILTER</p>
              </div>
            )}
          </>
        )}

        {activeTab === "automations" && (
          <motion.div initial="hidden" animate="show" variants={stagger} className="mt-8">
            <motion.p variants={fadeUp} className="text-muted text-[14px] mb-7 max-w-2xl leading-relaxed">
              Workflow automations I build with Make.com, n8n, Zapier, and GoHighLevel — the kinds of self-running systems I deliver for clients.
            </motion.p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {automations.map((a, i) => (
                <motion.div key={i} variants={fadeUp} className="card p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="grid place-items-center w-8 h-8 rounded-lg bg-accent/[0.1] border border-accent/25">
                      <Zap size={14} className="text-accent" />
                    </span>
                    <h3 className="font-display text-[14px] font-semibold text-paper">{a.title}</h3>
                  </div>
                  <p className="text-muted text-[13px] leading-relaxed mb-4">{a.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-line text-faint">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <footer className="mt-20 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-faint tracking-wider">© 2026 Preet Dave</p>
          <div className="flex items-center gap-5">
            <Link href="/fun" className="font-mono text-[11px] text-faint hover:text-accent transition-colors tracking-wider">Fun Zone →</Link>
            <a href="https://github.com/iampreetdave-max" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-faint hover:text-accent transition-colors tracking-wider">GitHub →</a>
          </div>
        </footer>
      </main>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
      <BackToTop />
    </div>
  );
}
