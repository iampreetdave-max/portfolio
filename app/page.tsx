"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import ProjectModal from "@/components/ProjectModal";
import AnimatedCounter from "@/components/AnimatedCounter";
import BackToTop from "@/components/BackToTop";
import type { Project } from "@/components/ProjectCard";
import {
  Brain, Eye, Cpu, Code2, Github, Linkedin, Mail, Phone,
  Send, MapPin, Calendar, ArrowRight, Award, BookOpen,
  FileText, PenTool, ChevronDown, FileDown, CheckCircle,
  Zap, Shield, AlertCircle,
} from "lucide-react";

const IMGS = "https://raw.githubusercontent.com/iampreetdave-max/portfolio/main/images";

const featuredProjects: Project[] = [
  {
    id: "1",
    title: "NBA Prediction Engine",
    category: "ML Engineering / Sports Analytics",
    image_url: `${IMGS}/1777094425982.jpeg`,
    description: "Production-deployed XGBoost model predicting NBA game outcomes — 1,064 settled games, live sportsbook odds, real P&L.",
    longDescription: `6+ months in production (Oct 2025 – Mar 2026). 1,064 NBA games settled. Real odds. Real outcomes. Real P&L.\n\nThe engine runs autonomously every morning before tip-off across 7 coordinated GitHub Actions workflows — fetching live team stats, pulling market odds, generating predictions, grading confidence tiers, and syncing results to a live Azure PostgreSQL database.\n\nResults:\n• Over/Under Grade A picks: +16.5% ROI across 95 bets\n• Moneyline win rate: 66.3% across all settled games\n• Custom A–D grading system that identifies market mispricing — not just winners\n• 9 engineered features on rolling 5-game team stats\n\nFully serverless. Zero human intervention daily.`,
    tech_tags: ["XGBoost", "Python 3.11", "PostgreSQL", "GitHub Actions", "SportsRadar API", "The Odds API", "Azure"],
  },
  {
    id: "2",
    title: "Soccer Prediction Models (V1 + V2)",
    category: "ML Engineering / Sports Analytics",
    image_url: `${IMGS}/Gemini_Generated_Image_bvspbvbvspbvbvsp.png`,
    description: "Dual-model system — Ridge Regression + GPU ensemble across 14+ leagues. 3,020 matches. +9.1% ROI on Grade A+B picks.",
    longDescription: `15+ months in production. 3,020 settled matches across 10 major leagues. Two models, one edge.\n\nV1 — Ridge Regression (21 weighted features):\n• 1,473 Grade A+B bets → +9.1% ROI\n• Grade A: 47.5% win rate, +14.8% ROI through contrarian value betting\n• Covers Premier League, La Liga, Serie A, MLS, Bundesliga, Champions League, and more\n• Mistral AI integration for real-time injury and news signal enrichment\n• 15+ consecutive automated daily runs with zero failures\n\nV2 — Ensemble (XGBoost + Gradient Boosting + Random Forest):\n• 40+ engineered features with dynamic Elo ratings (K=20)\n• GPU-accelerated training with CUDA\n• Separate ensemble models per market (Moneyline vs Over/Under)\n• Proprietary 0–100 confidence scoring\n\nBoth models run simultaneously. When both agree, confidence spikes significantly.`,
    tech_tags: ["Ridge Regression", "XGBoost", "Gradient Boosting", "Python 3.11", "PostgreSQL", "Mistral AI", "Streamlit", "GitHub Actions"],
  },
  {
    id: "3",
    title: "NASCAR Prediction Engine",
    category: "ML Engineering / Sports Analytics",
    image_url: `${IMGS}/Gemini_Generated_Image_w4jr6qw4jr6qw4jr%20(1).png`,
    description: "3 track-type ensembles predicting race outcomes across 5 markets. Odds from 9 sportsbooks. 7,566 historical records.",
    longDescription: `NASCAR isn't one sport — it's three. Superspeedways, road courses, and short tracks demand completely different dynamics. So we built three separate models.\n\nArchitecture:\n• 3 track-type ensembles: Superspeedway / Road Course / Short Track\n• 4 algorithms per model: XGBoost, LightGBM, Random Forest, Gradient Boosting\n• 17 engineered features — starting position (3x weighted), driver form, track history, team momentum\n• Platt Scaling calibration for trustworthy probabilities\n• Zero look-ahead bias\n\nPredicts: Winner, Top 3, Top 5, Top 10\nTrained on 7,566 historical race records.\n\nOdds scraped from 9 sportsbooks via Selenium + headless Chrome.`,
    tech_tags: ["XGBoost", "LightGBM", "Random Forest", "Python", "Selenium", "Platt Scaling", "BeautifulSoup"],
  },
  {
    id: "4",
    title: "AI Race News",
    category: "Data Engineering / Full-Stack",
    image_url: `${IMGS}/Gemini_Generated_Image_txnn91txnn91txnn.png`,
    description: "110+ sources scraped every 15 min. Audience-specific feeds, smart deduplication, auto-tagging across 12 categories.",
    longDescription: `The AI space moves faster than anyone can follow manually. So I automated the keeping-up part.\n\nEvery 15 minutes, a pipeline crawls 110+ sources — official blogs from top AI labs, arXiv, Hugging Face, Reddit, newsletters, and developer publications.\n\nKey features:\n• Audience filters: Developers, Business, Finance, Research, General\n• Auto-tagging across 12 categories: LLM, computer vision, robotics, funding, regulation\n• Smart deduplication: URL normalization + content hashing + title similarity\n• REST API: filter by audience, tag, source, or date\n• Docker deployment with APScheduler for 15-minute intervals`,
    tech_tags: ["FastAPI", "Python", "BeautifulSoup", "APScheduler", "SQLite", "Docker", "RSS/Atom"],
    repo_url: "https://github.com/iampreetdave-max/ai-race-news",
  },
  {
    id: "5",
    title: "TalkToNotes",
    category: "Computer Vision / NLP",
    description: "OCR system converting handwritten notes into searchable knowledge bases using TrOCR transformers and neural embeddings.",
    longDescription: "Intelligent document processing pipeline that transforms handwritten notes into structured, searchable knowledge bases using TrOCR transformer, neural embeddings, and a chatbot interface for natural language querying.",
    tech_tags: ["TrOCR", "Transformers", "Computer Vision", "NLP", "Vector Search", "Python"],
    repo_url: "https://github.com/iampreetdave/TalkNotes",
  },
  {
    id: "6",
    title: "StudBud",
    category: "Web / Full-Stack",
    description: "Full-stack academic platform with ML-powered study recommendations and adaptive scheduling.",
    longDescription: "Full-stack student management platform using machine learning for personalized study recommendations and adaptive scheduling. Built with TypeScript.",
    tech_tags: ["TypeScript", "Full-Stack", "Machine Learning", "Data Analysis"],
    repo_url: "https://github.com/iampreetdave/STUDBUD",
  },
  {
    id: "7",
    title: "Find Ranks",
    category: "Web / Streamlit",
    description: "Automates mark extraction from PDF mark sheets and generates ranked institutional analytics.",
    longDescription: "Data processing tool that automates extracting marks from PDF mark sheets, calculating cumulative student performance, and generating ranked analytics.",
    tech_tags: ["Streamlit", "PDF Processing", "Python", "Data Analytics"],
    repo_url: "https://github.com/iampreetdave-max/Find-Ranks",
  },
];

const skills = [
  { title: "Deep Learning & Neural Networks", Icon: Brain, proficiency: 85, items: ["TensorFlow", "PyTorch", "Keras", "CNNs", "Transformers", "Neural Network Optimization"] },
  { title: "Computer Vision & NLP", Icon: Eye, proficiency: 80, items: ["TrOCR", "Image Processing", "NLP", "Vector Embeddings & Search"] },
  { title: "Machine Learning", Icon: Cpu, proficiency: 90, items: ["Scikit-Learn", "XGBoost", "LightGBM", "Regression & Classification", "Feature Engineering", "Ensemble Methods"] },
  { title: "Development & Deployment", Icon: Code2, proficiency: 85, items: ["Python (Advanced)", "FastAPI", "JavaScript", "Full-Stack", "API Development", "ML Pipeline Automation"] },
  { title: "Automation & Integrations", Icon: Zap, proficiency: 88, items: ["Make.com", "GoHighLevel", "Zapier", "n8n", "ActiveCampaign", "API & Webhook Integrations"] },
];

const experience = [
  { role: "Trainee Software Engineer", period: "Sep 2025 – Present", company: "Agility Innovations Pvt. Ltd., Ahmedabad", description: "Building and shipping production ML systems — prediction engines, data pipelines, and full-stack applications deployed and validated against live data at scale.", active: true },
  { role: "Machine Learning Intern", period: "2025", company: "Oasis Infobyte, Remote", description: "Developed ML projects across neural network architectures, built end-to-end ML pipelines from data ingestion to deployment.", active: false },
  { role: "AI Research Lead", period: "2024 – 2025", company: "Smart India Hackathon & Rotaract Club Hackathon", description: "Led AI research teams in computer vision and TrOCR systems. Designed architectures for real-world document processing challenges.", active: false },
];

const certifications = [
  {
    title: "Claude AI / Anthropic",
    detail: "Certified in building and deploying production AI applications with the Anthropic Claude API — prompt engineering, tool use, and agentic workflows.",
    icon: Brain,
    issuer: "Anthropic",
    issueDate: "2025",
    verified: true,
    featured: true,
    verificationUrl: null as string | null,
  },
  {
    title: "C, C++, C Advanced",
    detail: "Foundational programming courses completed in 2023.",
    icon: Code2,
    issuer: "Programming Institute",
    issueDate: "2023",
    verified: true,
    featured: false,
    verificationUrl: null as string | null,
  },
  {
    title: "Python (4-Phase Mastery)",
    detail: "Ranked 1st in the last three phases of the Python course series.",
    icon: Award,
    issuer: "Training Institute",
    issueDate: "2024",
    verified: true,
    featured: false,
    verificationUrl: null as string | null,
  },
  {
    title: "Machine Learning with Python",
    detail: "Comprehensive ML course covering algorithms, pipelines, and deployment.",
    icon: Cpu,
    issuer: "Online Platform",
    issueDate: "2024",
    verified: true,
    featured: false,
    verificationUrl: null as string | null,
  },
  {
    title: "ML Engineering by Saikat Dutta",
    detail: "Currently studying advanced ML engineering practices and system design.",
    icon: Brain,
    issuer: "Saikat Dutta",
    issueDate: "2025",
    verified: false,
    featured: false,
    verificationUrl: null as string | null,
  },
  {
    title: "Natural Language Processing",
    detail: "Dedicated NLP course covering text processing, embeddings, and language models.",
    icon: BookOpen,
    issuer: "Online Platform",
    issueDate: "2024",
    verified: true,
    featured: false,
    verificationUrl: null as string | null,
  },
];

const stats = [
  { num: 14, suffix: "+", label: "Projects" },
  { num: 13, suffix: "+", label: "Automations" },
  { num: 2,  suffix: "",  label: "Internships" },
  { num: 1,  suffix: "",  label: "Hackathon Won" },
];

const liveProducts = [
  {
    name: "Sports Prediction Platform",
    category: "ML Engineering",
    description: "Multi-sport prediction engines running autonomously in production — live odds, real match data, real P&L across 3 sports and 15+ leagues.",
    scale: "10,000+ events settled",
    uptime: "15+ months active",
    visual: "chart" as const,
    tech: ["XGBoost", "Python", "PostgreSQL", "GitHub Actions"],
  },
  {
    name: "Enterprise Automation Suite",
    category: "Business Process Automation",
    description: "Production automation pipelines for clients — CRM sync, dynamic notifications, and cross-platform integrations running 24/7.",
    scale: "8+ active workflows",
    uptime: "Zero downtime SLA",
    visual: "flow" as const,
    tech: ["Make.com", "GoHighLevel", "REST APIs", "Webhooks"],
  },
  {
    name: "AI Intelligence Pipeline",
    category: "Data Engineering / NLP",
    description: "Real-time intelligence system monitoring 110+ sources — smart dedup, auto-tagging, and audience-targeted content filtering every 15 minutes.",
    scale: "110+ sources monitored",
    uptime: "15-min update cycles",
    visual: "feed" as const,
    tech: ["FastAPI", "Python", "Docker", "NLP"],
  },
];

const autoTools = ["Make.com", "GoHighLevel", "Zapier", "n8n", "ActiveCampaign", "Airtable", "HubSpot", "Other"];

const sectionIds = ["home", "about", "skills", "projects", "experience", "services", "certifications", "contact"];
const navItems   = ["Home", "About", "Skills", "Projects", "Experience", "Services", "Contact"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

/* ── Mini demo visualizations for live products ── */
function ChartViz() {
  const heights = [55, 40, 72, 50, 85, 38, 68, 80, 45, 65, 55, 78];
  return (
    <div className="flex items-end gap-0.5 h-10 w-full">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-gradient-to-t from-[#C9A86A]/50 to-[#C9A86A]/10 rounded-sm"
          initial={{ scaleY: 0.15 }}
          animate={{ scaleY: [h / 100 * 0.7, h / 100, h / 100 * 0.82] }}
          transition={{ duration: 1.6 + i * 0.12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: i * 0.07 }}
          style={{ transformOrigin: "bottom" }}
        />
      ))}
    </div>
  );
}

function FlowViz() {
  const nodes = ["Source", "Filter", "Transform", "Output"];
  return (
    <div className="flex items-center justify-center gap-1 w-full">
      {nodes.map((node, i) => (
        <div key={node} className="flex items-center gap-1">
          <div className="px-1.5 py-0.5 rounded font-mono text-[8px] bg-white/[0.04] border border-white/[0.10] text-white/50">{node}</div>
          {i < nodes.length - 1 && (
            <motion.span
              animate={{ opacity: [0.25, 1, 0.25], x: [0, 1.5, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.28 }}
              className="text-[#C9A86A]/70 text-[11px] font-mono"
            >→</motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

function FeedViz() {
  const items = ["Reuters · AI Update", "OpenAI · Dev Blog", "arXiv · NLP Paper", "HuggingFace · Release", "TechCrunch · Funding"];
  return (
    <div className="overflow-hidden h-10 w-full">
      <motion.div
        animate={{ y: [0, -56] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 0.4 }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 py-[3px]">
            <span className="w-1 h-1 rounded-full bg-[#C9A86A]/55 shrink-0" />
            <span className="font-mono text-[8px] text-white/40 truncate">{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(80px circle at ${e.clientX}px ${e.clientY}px, rgba(201,168,106,0.04), transparent 100%), radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.028), transparent 40%)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="fixed inset-0 pointer-events-none z-[1]" />;
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] pointer-events-none">
      <div className="h-full bg-[#C9A86A]" style={{ width: `${pct}%`, transition: "width 0.1s linear" }} />
    </div>
  );
}

function SectionLabel({ text, num }: { text: string; num?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-[1px] bg-gradient-to-r from-[#C9A86A]/65 to-transparent" />
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/65">
        {num && <span className="text-[#C9A86A] mr-2 font-bold">{num}</span>}
        {text}
      </span>
    </div>
  );
}

function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={`bg-white/[0.025] backdrop-blur-xl rounded-xl border border-white/[0.07] ${
        hover
          ? "lift hover:bg-white/[0.04] hover:border-white/[0.16] hover:shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen]               = useState(false);
  const [scrolled, setScrolled]               = useState(false);
  const [activeSection, setActiveSection]     = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [formStatus, setFormStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData]       = useState({ name: "", email: "", message: "" });

  const [autoStatus, setAutoStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [autoData, setAutoData]       = useState({
    name: "", email: "", business: "", tools: [] as string[],
    hasSetup: "no", description: "", budget: "", timeline: "",
  });

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setMenuOpen(false); };
    const key   = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", key); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id); if (!el) continue;
      const obs = new IntersectionObserver(
        (entries) => { for (const e of entries) { if (e.isIntersecting) setActiveSection(id); } },
        { threshold: 0.3 }
      );
      obs.observe(el); observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const handleAutoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAutoStatus("loading");
    try {
      const res = await fetch("/api/automation-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(autoData),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setAutoStatus("success");
        setAutoData({ name: "", email: "", business: "", tools: [], hasSetup: "no", description: "", budget: "", timeline: "" });
      } else {
        setAutoStatus("error");
      }
    } catch {
      setAutoStatus("error");
    }
  };

  const toggleTool = (tool: string) => {
    setAutoData(prev => ({
      ...prev,
      tools: prev.tools.includes(tool) ? prev.tools.filter(t => t !== tool) : [...prev.tools, tool],
    }));
  };

  const onTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    e.currentTarget.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) translateY(-3px)`;
  };
  const onTiltLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  const imageProjects = featuredProjects.filter(p => p.image_url);
  const textProjects  = featuredProjects.filter(p => !p.image_url);

  const inputCls = "w-full bg-white/[0.025] border border-white/[0.07] p-4 text-white text-sm rounded-xl transition-all duration-300 placeholder-white/20";
  const selectCls = "w-full bg-[#0e0e0e] border border-white/[0.07] p-4 text-white/75 text-sm rounded-xl transition-all duration-300 appearance-none cursor-pointer focus:border-white/30 focus:outline-none";

  return (
    <>
      <MouseSpotlight />
      <ScrollProgress />
      <BackToTop />
      <div className="warm-vignette" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <NeuralNetwork paused={false} />

      {/* NAV */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-2 font-mono text-sm font-bold tracking-tight">
            <span className="text-white">PD</span>
            <span className="text-white/30 font-light">/</span>
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Folio</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`nav-link font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
                  activeSection === item.toLowerCase() ? "active" : "text-white/45 hover:text-white/85"
                }`}
              >
                {item}
              </a>
            ))}
            {/* Divider */}
            <span className="text-white/[0.12] font-light">|</span>
            {/* Page links */}
            <Link
              href="/projects"
              className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/45 hover:text-[#C9A86A] transition-colors duration-300"
            >
              All Projects
            </Link>
            <Link
              href="/fun"
              className="font-mono text-[11px] tracking-[0.15em] border border-white/[0.10] px-3 py-1.5 text-white/45 hover:border-[#C9A86A]/45 hover:text-[#C9A86A] transition-all duration-300 rounded-md uppercase"
            >
              Fun Zone
            </Link>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden font-mono text-sm border border-white/10 w-10 h-10 flex items-center justify-center hover:border-white/30 hover:text-white transition-all duration-300 rounded-lg"
            aria-label="Toggle menu"
          >
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/[0.05] bg-[#0B0908]/98 backdrop-blur-3xl overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`font-mono text-sm tracking-wider transition-colors ${
                      activeSection === item.toLowerCase() ? "text-[#C9A86A]" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {item}
                  </a>
                ))}
                {/* Divider */}
                <div className="border-t border-white/[0.06]" />
                {/* Page links in mobile menu */}
                <Link
                  href="/projects"
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm tracking-wider text-white/55 hover:text-[#C9A86A] transition-colors flex items-center gap-2"
                >
                  All Projects <ArrowRight size={13} />
                </Link>
                <Link
                  href="/fun"
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm tracking-wider text-white/55 hover:text-[#C9A86A] transition-colors flex items-center gap-2"
                >
                  Fun Zone <span className="text-[10px] opacity-60">(AI games)</span>
                </Link>
                <a
                  href="https://github.com/iampreetdave-max/ai-race-news"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm tracking-wider text-white/55 hover:text-[#C9A86A] transition-colors flex items-center gap-2"
                >
                  AI Race News <span className="text-[10px] opacity-60">(GitHub ↗)</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10">

        {/* HERO */}
        <section id="home" className="min-h-[100dvh] flex items-center justify-center px-6 pt-16 relative overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#C9A86A]/[0.045] blur-[140px] pointer-events-none" />
          <div className="max-w-5xl w-full relative">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <a
                href="#contact"
                className="availability-badge inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-white/70 border border-white/[0.12] bg-white/[0.025] px-4 py-1.5 rounded-full group hover:text-white/90 transition-colors duration-300"
              >
                <span className="relative flex w-1.5 h-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-50" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A86A]" />
                </span>
                Open to AI / ML Roles
                <span className="text-[#C9A86A]/0 group-hover:text-[#C9A86A]/80 transition-colors duration-300 text-[10px]">→ Let&apos;s talk</span>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }} className="mb-8">
              <h1 className="font-black leading-[0.88] tracking-[-0.04em]" style={{ fontSize: "clamp(72px, 11vw, 120px)" }}>
                <span className="text-white">Preet</span><br /><span className="text-white/20">Dave</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="mb-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] md:text-[13px] tracking-[0.05em] text-white/70">
                <span>AI / ML Engineer</span>
                <span className="text-white/20">—</span>
                <span>Automation Developer</span>
                <span className="text-white/20">—</span>
                <span>Deep Learning</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="mb-10 max-w-xl">
              <p className="text-white/55 text-[15px] leading-[1.85]">
                Building intelligent systems with deep learning, computer vision, and advanced ML algorithms. B.Tech CS (AI-ML) student &middot; Trainee SWE at Agility Innovations.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="flex flex-wrap gap-3 items-center">
              <a
                href="#contact"
                className="group font-mono text-[11px] tracking-[0.15em] border border-white/80 text-white px-7 py-3.5 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-all duration-300 rounded-lg flex items-center gap-2 uppercase"
              >
                Contact Me <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/iampreetdave-max"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-mono text-[11px] tracking-[0.15em] border border-white/[0.12] px-7 py-3.5 text-white/60 hover:border-white/40 hover:text-white transition-all duration-300 rounded-lg flex items-center gap-2 uppercase"
              >
                <Github size={13} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/preet-dave-452023271/"
                target="_blank"
                rel="noopener noreferrer"
                className="group font-mono text-[11px] tracking-[0.15em] border border-white/[0.12] px-7 py-3.5 text-white/60 hover:border-white/40 hover:text-white transition-all duration-300 rounded-lg flex items-center gap-2 uppercase"
              >
                <Linkedin size={13} /> LinkedIn
              </a>
              {/* Resume download buttons */}
              <a
                href="/resume.pdf"
                download
                className="group font-mono text-[11px] tracking-[0.15em] border border-white/[0.12] px-5 py-3.5 text-white/60 hover:border-[#C9A86A]/50 hover:text-[#C9A86A] transition-all duration-300 rounded-lg flex items-center gap-2 uppercase"
              >
                <FileDown size={12} /> PDF
              </a>
              <a
                href="/resume.docx"
                download
                className="group font-mono text-[11px] tracking-[0.15em] border border-white/[0.12] px-5 py-3.5 text-white/60 hover:border-[#C9A86A]/50 hover:text-[#C9A86A] transition-all duration-300 rounded-lg flex items-center gap-2 uppercase"
              >
                <FileText size={12} /> DOCX
              </a>
            </motion.div>

            {/* Quick page links below hero CTA */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }} className="flex flex-wrap gap-4 items-center mt-6">
              <Link
                href="/projects"
                className="font-mono text-[10px] tracking-[0.15em] text-white/35 hover:text-white/70 transition-colors uppercase flex items-center gap-1.5"
              >
                All Projects ({14}+) →
              </Link>
              <Link
                href="/fun"
                className="font-mono text-[10px] tracking-[0.15em] text-white/35 hover:text-[#C9A86A] transition-colors uppercase flex items-center gap-1.5"
              >
                Fun Zone — AI games →
              </Link>
              <a
                href="https://github.com/iampreetdave-max/ai-race-news"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] tracking-[0.15em] text-white/35 hover:text-[#C9A86A] transition-colors uppercase flex items-center gap-1.5"
              >
                AI Race News ↗
              </a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={16} className="text-white/30" />
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel num="01" text="About" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Who I Am</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={fadeUp} className="md:col-span-2">
                <GlassCard className="p-8 h-full" hover={false}>
                  <p className="text-white/80 leading-[1.9] text-[15px] mb-5">
                    I&apos;m an AI-ML Engineer passionate about building intelligent systems that solve real-world problems. With expertise in deep learning, computer vision, and NLP, I develop end-to-end ML pipelines &mdash; from data preprocessing and feature engineering to model deployment and optimization.
                  </p>
                  <p className="text-white/45 leading-[1.9] text-[14px] mb-7">
                    Currently pursuing B.Tech in Computer Science (AI-ML) while gaining hands-on industry experience as a Trainee Software Engineer, shipping production ML systems validated against live data at scale.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Deep Learning", "Computer Vision", "NLP", "MLOps", "Full-Stack"].map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-white/[0.12] text-white/65 bg-white/[0.025]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp} className="md:row-span-2">
                <GlassCard className="p-5 h-full flex flex-col" hover={false}>
                  <div className="relative flex-1 min-h-[220px] rounded-lg overflow-hidden mb-4">
                    <Image
                      src="https://raw.githubusercontent.com/iampreetdave-max/portfolio/main/images/profile%20picture.jpeg"
                      alt="Preet Dave"
                      fill
                      className="object-cover"
                      style={{ filter: "saturate(1.06) contrast(1.03)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0908]/80 to-transparent" />
                  </div>
                  <div className="space-y-2 px-1">
                    <div className="font-bold text-sm text-white">Preet Dave</div>
                    <div className="font-mono text-[11px] text-white/55 tracking-wider">AI-ML Engineer</div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-white/40"><MapPin size={11} /> Ahmedabad, India</div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/55 pt-1">
                      <span className="relative flex w-1.5 h-1.5 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A86A] opacity-50" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C9A86A]" />
                      </span>
                      Open to opportunities
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp} className="md:col-span-2">
                <div className="grid grid-cols-4 gap-3">
                  {stats.map((s) => (
                    <GlassCard key={s.label} className="p-4 text-center">
                      <div className="font-mono text-2xl font-black text-white leading-none mb-2 tabular">
                        <AnimatedCounter target={s.num} suffix={s.suffix} />
                      </div>
                      <div className="font-mono text-[9px] text-white/40 tracking-[0.12em] uppercase leading-tight">{s.label}</div>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel num="02" text="Skills" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Technical Expertise</motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <motion.div key={cat.title} variants={fadeUp}>
                  <GlassCard className="p-7 group">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.10] flex items-center justify-center shrink-0 group-hover:bg-white/[0.08] group-hover:border-white/[0.22] transition-all duration-500">
                        <cat.Icon size={20} className="text-white/55 group-hover:text-white transition-colors duration-500" />
                      </div>
                      <h3 className="font-mono text-[13px] font-bold text-white tracking-wide">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="font-mono text-[11px] px-3 py-1.5 border border-white/[0.07] text-white/55 rounded-lg group-hover:border-white/[0.18] group-hover:text-white/85 transition-all duration-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    {/* Proficiency bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between font-mono text-[9px] text-white/30">
                        <span>Proficiency</span>
                        <span>{cat.proficiency}%</span>
                      </div>
                      <div className="h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#C9A86A]/80 to-[#C9A86A]/20 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${cat.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                        />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel num="03" text="Projects" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Featured Work</motion.h2>

            {/* Top 2 — hero cards with tilt effect */}
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {imageProjects.slice(0, 2).map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <div
                    className="tilt-card group relative rounded-2xl overflow-hidden cursor-pointer border border-white/[0.07] hover:border-white/[0.30] hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)] transition-border duration-500"
                    style={{ height: "340px" }}
                    role="button" tabIndex={0}
                    onClick={() => setSelectedProject(p)}
                    onMouseMove={onTiltMove}
                    onMouseLeave={onTiltLeave}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedProject(p); }}
                  >
                    <Image
                      src={p.image_url!}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      style={{ filter: "saturate(1.04) contrast(1.02)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <span className="self-start font-mono text-[9px] tracking-[0.2em] text-white/85 border border-white/30 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase mb-3">
                        {p.category}
                      </span>
                      <h3 className="text-[20px] font-black text-white mb-2 leading-tight">{p.title}</h3>
                      <p className="text-white/75 text-[13px] leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech_tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-white/25 text-white/85 rounded-md bg-black/40 backdrop-blur-sm">{tag}</span>
                        ))}
                        {p.tech_tags.length > 4 && <span className="font-mono text-[9px] text-white/40">+{p.tech_tags.length - 4}</span>}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/55 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight size={14} className="text-[#C9A86A]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom image projects */}
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {imageProjects.slice(2).map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <div
                    className="group relative bg-[#0e0e0e] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.22] hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.7)] transition-all duration-500 cursor-pointer lift"
                    role="button" tabIndex={0}
                    onClick={() => setSelectedProject(p)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedProject(p); }}
                  >
                    <div className="relative w-full overflow-hidden" style={{ height: "180px" }}>
                      <Image
                        src={p.image_url!}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ filter: "saturate(1.04) contrast(1.02)" }}
                      />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
                      <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.18em] text-white/85 border border-white/25 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full uppercase">
                        {p.category}
                      </span>
                      {/* AI Race News repo badge */}
                      {p.repo_url && (
                        <a
                          href={p.repo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="absolute top-3 right-3 font-mono text-[9px] tracking-wider border border-white/25 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-white/75 hover:border-[#C9A86A]/60 hover:text-[#C9A86A] transition-colors"
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-[15px] font-bold mb-2 text-white/85 group-hover:text-white transition-colors">{p.title}</h3>
                      <p className="text-white/45 text-[12px] leading-relaxed mb-3">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech_tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.07] text-white/45 rounded-md group-hover:text-white/75 group-hover:border-white/[0.18] transition-colors">{tag}</span>
                        ))}
                        {p.tech_tags.length > 4 && <span className="font-mono text-[9px] text-white/40">+{p.tech_tags.length - 4}</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Text-only projects */}
            <div className="space-y-2">
              {textProjects.map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <div
                    className="group relative border border-white/[0.07] bg-white/[0.015] backdrop-blur-xl rounded-xl px-6 py-4 hover:border-white/[0.18] hover:bg-white/[0.035] transition-all duration-400 cursor-pointer flex items-center gap-4"
                    role="button" tabIndex={0}
                    onClick={() => setSelectedProject(p)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedProject(p); }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-xl bg-gradient-to-b from-transparent via-[#C9A86A]/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-[9px] tracking-[0.18em] text-white/55 border border-white/[0.12] bg-white/[0.025] px-2 py-0.5 rounded-full uppercase shrink-0">{p.category}</span>
                        <h3 className="text-[14px] font-bold text-white/85 group-hover:text-white transition-colors">{p.title}</h3>
                      </div>
                      <p className="text-white/45 text-[12px] truncate">{p.description}</p>
                    </div>
                    <div className="hidden sm:flex flex-wrap gap-1.5 shrink-0">
                      {p.tech_tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.07] text-white/45 rounded-md">{tag}</span>
                      ))}
                    </div>
                    {p.repo_url ? (
                      <a
                        href={p.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono text-[9px] text-white/30 hover:text-[#C9A86A] transition-colors shrink-0 border border-white/[0.07] px-2 py-1 rounded-md hover:border-[#C9A86A]/40"
                      >
                        GitHub ↗
                      </a>
                    ) : (
                      <ArrowRight size={13} className="text-white/30 group-hover:text-[#C9A86A] group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] border border-white/[0.12] px-8 py-3.5 text-white/65 hover:border-[#C9A86A]/45 hover:text-[#C9A86A] transition-all duration-300 rounded-xl uppercase"
              >
                View All Projects <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/fun"
                className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] border border-white/[0.07] px-8 py-3.5 text-white/45 hover:border-white/[0.20] hover:text-white/75 transition-all duration-300 rounded-xl uppercase"
              >
                Try Fun Zone
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel num="04" text="Experience" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Work History</motion.h2>
            <div className="relative">
              <div className="absolute left-[6px] top-4 bottom-16 w-px bg-gradient-to-b from-[#C9A86A]/45 via-white/[0.05] to-transparent hidden sm:block" />
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <motion.div key={i} variants={fadeUp} className="relative sm:pl-12">
                    <div
                      className={`absolute left-0 top-6 w-3 h-3 rounded-full border-2 transition-all duration-500 hidden sm:block ${
                        exp.active
                          ? "bg-[#C9A86A] border-[#C9A86A] shadow-[0_0_0_4px_rgba(201,168,106,0.18)]"
                          : "bg-[#0B0908] border-white/20"
                      }`}
                    />
                    {exp.active && <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-[#C9A86A] animate-ping opacity-25 hidden sm:block" />}
                    <GlassCard className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-mono text-[11px] text-white/40 flex items-center gap-1.5"><Calendar size={11} />{exp.period}</span>
                        {exp.active && <span className="font-mono text-[9px] tracking-[0.2em] text-[#C9A86A] border border-[#C9A86A]/40 bg-[#C9A86A]/[0.06] px-2.5 py-0.5 rounded-full uppercase">Current</span>}
                      </div>
                      <h3 className="text-[17px] font-bold mb-1">{exp.role}</h3>
                      <div className="font-mono text-[11px] text-white/45 mb-3 flex items-center gap-1.5"><MapPin size={11} />{exp.company}</div>
                      <p className="text-white/65 text-[13px] leading-relaxed">{exp.description}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* SERVICES — Live Deployments + Automation Request */}
        <section id="services" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">

            {/* Live Deployments subsection */}
            <motion.div variants={fadeUp}><SectionLabel num="05" text="Services" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-4 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Live Deployments</motion.h2>
            <motion.p variants={fadeUp} className="text-white/45 text-[14px] mb-12 max-w-lg leading-relaxed">
              Production systems I&apos;ve built and currently maintain — shown at high level to respect confidentiality agreements.
            </motion.p>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
              {liveProducts.map((product, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <GlassCard className="p-6 h-full group flex flex-col">
                    {/* Mini animated demo visual */}
                    <div className="rounded-lg bg-black/30 border border-white/[0.05] overflow-hidden mb-4 p-3 h-16 flex items-center">
                      {product.visual === "chart" && <ChartViz />}
                      {product.visual === "flow" && <FlowViz />}
                      {product.visual === "feed" && <FeedViz />}
                    </div>
                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="font-mono text-[9px] tracking-[0.15em] text-white/45 border border-white/[0.08] bg-white/[0.015] px-2 py-0.5 rounded-full uppercase">{product.category}</span>
                      <span className="flex items-center gap-1 font-mono text-[9px] text-white/30 border border-white/[0.07] bg-white/[0.015] px-2 py-0.5 rounded-full">
                        <Shield size={8} /> NDA
                      </span>
                    </div>
                    <h3 className="font-bold text-[15px] text-white/90 mb-2 group-hover:text-white transition-colors">{product.name}</h3>
                    <p className="text-white/50 text-[12px] leading-relaxed mb-4 flex-grow">{product.description}</p>
                    {/* Scale stats */}
                    <div className="flex gap-1 flex-wrap mb-4 font-mono text-[10px]">
                      <span className="text-[#C9A86A]/80">{product.scale}</span>
                      <span className="text-white/20 mx-1">·</span>
                      <span className="text-white/35">{product.uptime}</span>
                    </div>
                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.tech.map(t => (
                        <span key={t} className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.07] text-white/40 rounded-md group-hover:border-white/[0.15] group-hover:text-white/65 transition-all duration-300">{t}</span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            {/* Automation request form subsection */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-[1px] bg-gradient-to-r from-[#C9A86A]/40 to-transparent" />
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/40">Automation Services</span>
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-4 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Get a Quote</motion.h2>
            <motion.p variants={fadeUp} className="text-white/45 text-[14px] mb-10 max-w-lg leading-relaxed">
              I build custom automations with Make.com, GoHighLevel, Zapier, n8n, and more. Tell me what you need and I&apos;ll send a quote within 48 hours.
            </motion.p>

            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                {autoStatus === "success" ? (
                  <motion.div
                    key="auto-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center mb-5">
                      <CheckCircle size={24} className="text-[#C9A86A]" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Request Sent!</h3>
                    <p className="text-white/50 text-sm max-w-sm">I&apos;ll review your automation request and reply with a quote within 48 hours.</p>
                    <button onClick={() => setAutoStatus("idle")} className="mt-6 font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors underline underline-offset-4">Submit another request</button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="auto-form"
                    onSubmit={handleAutoSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                  >
                    {/* Name */}
                    <div>
                      <label className="block font-mono text-[10px] text-white/45 mb-2 tracking-[0.15em] uppercase">Name *</label>
                      <input
                        type="text"
                        required
                        value={autoData.name}
                        onChange={e => setAutoData(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        className={inputCls}
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block font-mono text-[10px] text-white/45 mb-2 tracking-[0.15em] uppercase">Email *</label>
                      <input
                        type="email"
                        required
                        value={autoData.email}
                        onChange={e => setAutoData(p => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        className={inputCls}
                      />
                    </div>
                    {/* Business */}
                    <div className="md:col-span-2">
                      <label className="block font-mono text-[10px] text-white/45 mb-2 tracking-[0.15em] uppercase">Business / Use Case</label>
                      <input
                        type="text"
                        value={autoData.business}
                        onChange={e => setAutoData(p => ({ ...p, business: e.target.value }))}
                        placeholder="e.g. Real estate agency, e-commerce store..."
                        className={inputCls}
                      />
                    </div>
                    {/* Tools */}
                    <div className="md:col-span-2">
                      <label className="block font-mono text-[10px] text-white/45 mb-3 tracking-[0.15em] uppercase">Tools you currently use</label>
                      <div className="flex flex-wrap gap-2">
                        {autoTools.map(tool => (
                          <button
                            key={tool}
                            type="button"
                            onClick={() => toggleTool(tool)}
                            className={`font-mono text-[11px] px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                              autoData.tools.includes(tool)
                                ? "bg-[#C9A86A]/10 border-[#C9A86A]/45 text-[#C9A86A]"
                                : "bg-white/[0.02] border-white/[0.07] text-white/50 hover:border-white/[0.18] hover:text-white/80"
                            }`}
                          >
                            {tool}
                          </button>
                        ))}
                      </div>
                    </div>
                    {/* Existing setup */}
                    <div>
                      <label className="block font-mono text-[10px] text-white/45 mb-3 tracking-[0.15em] uppercase">Existing automation setup?</label>
                      <div className="flex gap-4">
                        {["yes", "no"].map(val => (
                          <label key={val} className="flex items-center gap-2.5 cursor-pointer group">
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center border-2 transition-all ${
                                autoData.hasSetup === val ? "border-[#C9A86A]" : "border-white/[0.15] group-hover:border-white/[0.30]"
                              }`}
                            >
                              {autoData.hasSetup === val && <div className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" />}
                            </div>
                            <span className="font-mono text-[12px] capitalize text-white/60">{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {/* Budget */}
                    <div>
                      <label className="block font-mono text-[10px] text-white/45 mb-2 tracking-[0.15em] uppercase">Budget Range</label>
                      <select
                        value={autoData.budget}
                        onChange={e => setAutoData(p => ({ ...p, budget: e.target.value }))}
                        className={selectCls}
                      >
                        <option value="">Select budget...</option>
                        <option value="Under $100">Under $100</option>
                        <option value="$100 – $500">$100 – $500</option>
                        <option value="$500 – $2,000">$500 – $2,000</option>
                        <option value="$2,000+">$2,000+</option>
                        <option value="Open to discussion">Open to discussion</option>
                      </select>
                    </div>
                    {/* Timeline */}
                    <div>
                      <label className="block font-mono text-[10px] text-white/45 mb-2 tracking-[0.15em] uppercase">Timeline</label>
                      <select
                        value={autoData.timeline}
                        onChange={e => setAutoData(p => ({ ...p, timeline: e.target.value }))}
                        className={selectCls}
                      >
                        <option value="">Select timeline...</option>
                        <option value="ASAP">ASAP</option>
                        <option value="Within a month">Within a month</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block font-mono text-[10px] text-white/45 mb-2 tracking-[0.15em] uppercase">Describe what needs to be automated *</label>
                      <textarea
                        required
                        rows={4}
                        value={autoData.description}
                        onChange={e => setAutoData(p => ({ ...p, description: e.target.value }))}
                        placeholder="Describe your workflow, what triggers it, what it should do, and what the output should be..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    {/* Error */}
                    {autoStatus === "error" && (
                      <div className="md:col-span-2 flex items-center gap-2 text-red-400/80 font-mono text-[12px]">
                        <AlertCircle size={13} /> Failed to send. Please try again or email me directly.
                      </div>
                    )}
                    {/* Submit */}
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={autoStatus === "loading"}
                        className="w-full font-mono text-[11px] tracking-[0.15em] border border-white/80 text-white px-6 py-4 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase rounded-xl flex items-center justify-center gap-2"
                      >
                        {autoStatus === "loading" ? (
                          <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full" /> Sending...</>
                        ) : (
                          <><Zap size={13} /> Request a Quote</>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel num="06" text="Certifications" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Certificates &amp; Learnings</motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
              {certifications.map((cert) => (
                <motion.div key={cert.title} variants={fadeUp}>
                  <GlassCard
                    className={`p-6 group h-full flex flex-col ${cert.featured ? "ring-1 ring-[#C9A86A]/30 bg-[#C9A86A]/[0.02]" : ""}`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${cert.featured ? "bg-[#C9A86A]/[0.08] border border-[#C9A86A]/25 group-hover:bg-[#C9A86A]/[0.15]" : "bg-white/[0.04] border border-white/[0.10] group-hover:bg-white/[0.08] group-hover:border-white/[0.22]"}`}>
                        <cert.icon size={15} className={`transition-colors duration-300 ${cert.featured ? "text-[#C9A86A]/80 group-hover:text-[#C9A86A]" : "text-white/55 group-hover:text-white"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-mono text-[12px] font-bold text-white tracking-wide leading-snug">{cert.title}</h3>
                        {cert.featured && (
                          <span className="font-mono text-[9px] text-[#C9A86A]/80 tracking-[0.12em]">{cert.issuer}</span>
                        )}
                      </div>
                    </div>
                    <p className="text-white/45 text-[12px] leading-relaxed flex-grow mb-4">{cert.detail}</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-mono text-[9px] text-white/30">{cert.issueDate}</span>
                      {cert.verified && (
                        <span className="flex items-center gap-1 font-mono text-[9px] text-green-400/80 bg-green-500/[0.07] border border-green-500/[0.18] px-2 py-0.5 rounded-full">
                          <CheckCircle size={8} /> Verified
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}><SectionLabel num="—" text="Publications" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Research &amp; Writing</motion.h2>
            <motion.div variants={stagger} className="space-y-4">
              <motion.div variants={fadeUp}>
                <GlassCard className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.10] flex items-center justify-center shrink-0"><FileText size={17} className="text-white/55" /></div>
                    <div>
                      <div className="font-mono text-[10px] text-white/55 tracking-[0.2em] uppercase mb-2">Research Paper</div>
                      <h3 className="font-bold text-[15px] mb-2">&ldquo;Engineers Fear AI, As Mathematicians Once Feared Calculators&rdquo;</h3>
                      <p className="text-white/45 text-[13px] leading-relaxed">A perspective on how engineering professionals can embrace AI as a tool for amplification rather than replacement, drawing historical parallels with the adoption of calculators in mathematics.</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp}>
                <GlassCard className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.10] flex items-center justify-center shrink-0"><PenTool size={17} className="text-white/55" /></div>
                    <div>
                      <div className="font-mono text-[10px] text-white/55 tracking-[0.2em] uppercase mb-2">LinkedIn Research Blogs</div>
                      <h3 className="font-bold text-[15px] mb-2">Technical Deep-Dives</h3>
                      <p className="text-white/45 text-[13px] leading-relaxed mb-4">Published deep-dives including <span className="text-white/85">How GPS Works</span>, <span className="text-white/85">Zipf&apos;s Law for LLMs</span>, and other explorations at the intersection of math, physics, and AI.</p>
                      <a href="https://www.linkedin.com/in/preet-dave-452023271/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/55 hover:text-[#C9A86A] transition-colors">
                        <Linkedin size={12} /> Follow on LinkedIn
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-28 px-6 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="font-black text-white/[0.018] tracking-tighter leading-none whitespace-nowrap" style={{ fontSize: "clamp(80px, 18vw, 200px)" }}>HELLO</span>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto relative">
            <motion.div variants={fadeUp}><SectionLabel num="07" text="Contact" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-4 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Get In Touch</motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 text-[15px] mb-12 max-w-md">Open to AI/ML engineering roles, research collaborations, and interesting projects.</motion.p>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <motion.div variants={fadeUp}>
                <div className="space-y-3">
                  {[
                    { Icon: Mail,     label: "Email",    href: "mailto:iampreetdave@gmail.com",                     text: "iampreetdave@gmail.com" },
                    { Icon: Phone,    label: "Phone",    href: "tel:+919081025277",                                 text: "+91 90810 25277" },
                    { Icon: Github,   label: "GitHub",   href: "https://github.com/iampreetdave-max",               text: "iampreetdave-max" },
                    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/preet-dave-452023271/", text: "preet-dave" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 text-white/55 hover:text-white transition-all duration-300"
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.025] border border-white/[0.07] shrink-0 group-hover:border-[#C9A86A]/45 group-hover:bg-[#C9A86A]/[0.06] transition-all duration-300">
                        <link.Icon size={16} className="group-hover:text-[#C9A86A] transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-white/35 tracking-[0.15em] uppercase mb-0.5">{link.label}</div>
                        <div className="text-sm">{link.text}</div>
                      </div>
                    </a>
                  ))}
                  {/* Resume download in contact section */}
                  <div className="flex gap-3 pt-2">
                    <a
                      href="/resume.pdf"
                      download
                      className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] border border-white/[0.12] px-4 py-2.5 text-white/55 hover:border-[#C9A86A]/45 hover:text-[#C9A86A] transition-all duration-300 rounded-lg uppercase"
                    >
                      <FileDown size={12} /> Resume PDF
                    </a>
                    <a
                      href="/resume.docx"
                      download
                      className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] border border-white/[0.12] px-4 py-2.5 text-white/55 hover:border-[#C9A86A]/45 hover:text-[#C9A86A] transition-all duration-300 rounded-lg uppercase"
                    >
                      <FileText size={12} /> Resume DOCX
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact form — controlled, sends via API */}
              <motion.div variants={fadeUp}>
                <AnimatePresence mode="wait">
                  {formStatus === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center h-full py-12 text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center mb-5">
                        <CheckCircle size={24} className="text-[#C9A86A]" />
                      </div>
                      <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                      <p className="text-white/50 text-sm max-w-xs">Thanks for reaching out — I&apos;ll get back to you as soon as possible.</p>
                      <button onClick={() => setFormStatus("idle")} className="mt-6 font-mono text-[11px] text-white/40 hover:text-white/70 transition-colors underline underline-offset-4">Send another message</button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleContactSubmit}
                      className="space-y-5"
                    >
                      {[
                        { label: "Name",  type: "text",  field: "name" as const,  placeholder: "Your name" },
                        { label: "Email", type: "email", field: "email" as const, placeholder: "your@email.com" },
                      ].map((f) => (
                        <div key={f.field}>
                          <label className="block font-mono text-[10px] text-white/45 mb-2 tracking-[0.15em] uppercase">{f.label}</label>
                          <input
                            type={f.type}
                            required
                            value={formData[f.field]}
                            onChange={e => setFormData(p => ({ ...p, [f.field]: e.target.value }))}
                            placeholder={f.placeholder}
                            className={inputCls}
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block font-mono text-[10px] text-white/45 mb-2 tracking-[0.15em] uppercase">Message</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                          placeholder="What&apos;s on your mind?"
                          className={`${inputCls} resize-none`}
                        />
                      </div>
                      {formStatus === "error" && (
                        <div className="flex items-center gap-2 text-red-400/80 font-mono text-[12px]">
                          <AlertCircle size={13} /> Failed to send. Please email me directly at iampreetdave@gmail.com
                        </div>
                      )}
                      <button
                        type="submit"
                        disabled={formStatus === "loading"}
                        className="w-full font-mono text-[11px] tracking-[0.15em] border border-white/80 text-white px-6 py-4 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 uppercase rounded-xl flex items-center justify-center gap-2"
                      >
                        {formStatus === "loading" ? (
                          <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full" /> Sending...</>
                        ) : (
                          <><Send size={13} /> Send Message</>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-white/[0.05] py-10 px-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Site links row */}
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-6">
                <Link href="/projects" className="font-mono text-[10px] text-white/35 hover:text-white/70 tracking-wider transition-colors uppercase">
                  All Projects →
                </Link>
                <Link href="/fun" className="font-mono text-[10px] text-white/35 hover:text-[#C9A86A] tracking-wider transition-colors uppercase">
                  Fun Zone →
                </Link>
                <a
                  href="https://github.com/iampreetdave-max/ai-race-news"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-white/35 hover:text-[#C9A86A] tracking-wider transition-colors uppercase flex items-center gap-1"
                >
                  AI Race News ↗
                </a>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://github.com/iampreetdave-max" target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/60 transition-colors">
                  <Github size={14} />
                </a>
                <a href="https://www.linkedin.com/in/preet-dave-452023271/" target="_blank" rel="noopener noreferrer" className="text-white/25 hover:text-white/60 transition-colors">
                  <Linkedin size={14} />
                </a>
                <a href="mailto:iampreetdave@gmail.com" className="text-white/25 hover:text-white/60 transition-colors">
                  <Mail size={14} />
                </a>
              </div>
            </div>
            {/* Copyright row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.04]">
              <p className="font-mono text-[10px] text-white/35 tracking-widest">© 2026 PREET GHANSHYAM DAVE</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]/60" />
                <p className="font-mono text-[10px] text-white/30 tracking-widest">NEXT.JS · TAILWIND · FRAMER MOTION</p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
}
