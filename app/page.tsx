"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import TypewriterText from "@/components/TypewriterText";
import ProjectModal from "@/components/ProjectModal";
import type { Project } from "@/components/ProjectCard";
import {
  Brain, Eye, Cpu, Code2, Github, Linkedin, Mail, Phone,
  Send, MapPin, Calendar, ArrowRight, Award, BookOpen,
  FileText, PenTool, ChevronDown,
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
  { title: "Deep Learning & Neural Networks", Icon: Brain, items: ["TensorFlow", "PyTorch", "Keras", "CNNs", "Transformers", "Neural Network Optimization"] },
  { title: "Computer Vision & NLP", Icon: Eye, items: ["TrOCR", "Image Processing", "NLP", "Vector Embeddings & Search"] },
  { title: "Machine Learning", Icon: Cpu, items: ["Scikit-Learn", "XGBoost", "LightGBM", "Regression & Classification", "Feature Engineering", "Ensemble Methods"] },
  { title: "Development & Deployment", Icon: Code2, items: ["Python (Advanced)", "FastAPI", "JavaScript", "Full-Stack", "API Development", "ML Pipeline Automation"] },
];

const experience = [
  { role: "Trainee Software Engineer", period: "Sep 2025 – Present", company: "Agility Innovations Pvt. Ltd., Ahmedabad", description: "Building and shipping production ML systems — prediction engines, data pipelines, and full-stack applications deployed and validated against live data at scale.", active: true },
  { role: "Machine Learning Intern", period: "2025", company: "Oasis Infobyte, Remote", description: "Developed ML projects across neural network architectures, built end-to-end ML pipelines from data ingestion to deployment.", active: false },
  { role: "AI Research Lead", period: "2024 – 2025", company: "Smart India Hackathon & Rotaract Club Hackathon", description: "Led AI research teams in computer vision and TrOCR systems. Designed architectures for real-world document processing challenges.", active: false },
];

const certifications = [
  { title: "C, C++, C Advanced", detail: "Foundational programming courses completed in 2023", icon: Code2 },
  { title: "Python (4-Phase Mastery)", detail: "Ranked 1st in the last three phases of the Python course series", icon: Award },
  { title: "Machine Learning with Python", detail: "Comprehensive ML course covering algorithms, pipelines, and deployment", icon: Cpu },
  { title: "ML Engineering by Saikat Dutta", detail: "Currently studying advanced ML engineering practices and system design", icon: Brain },
  { title: "Natural Language Processing", detail: "Dedicated NLP course covering text processing, embeddings, and language models", icon: BookOpen },
];

const stats = [
  { value: "14+", label: "Projects" },
  { value: "13+", label: "Automations" },
  { value: "2",   label: "Internships" },
  { value: "1",   label: "Hackathon Won" },
];

const sectionIds = ["home", "about", "skills", "projects", "experience", "certifications", "contact"];
const navItems   = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onMove = (e: MouseEvent) => { el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(0,255,65,0.028), transparent 40%)`; };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="fixed inset-0 pointer-events-none z-[1]" />;
}

function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => { const total = document.documentElement.scrollHeight - window.innerHeight; setPct(total > 0 ? (window.scrollY / total) * 100 : 0); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9998] h-[2px] pointer-events-none">
      <div className="h-full bg-gradient-to-r from-[#00FF41] to-[#00D4FF]" style={{ width: `${pct}%`, transition: "width 0.1s linear" }} />
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/50 to-transparent" />
      <span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">{text}</span>
    </div>
  );
}

function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-white/[0.025] backdrop-blur-xl rounded-xl border border-white/[0.07] ${ hover ? "hover:bg-white/[0.04] hover:border-white/[0.12] hover:shadow-[0_0_40px_rgba(0,255,65,0.04)] transition-all duration-500" : "" } ${className}`}>
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen]               = useState(false);
  const [scrolled, setScrolled]               = useState(false);
  const [activeSection, setActiveSection]     = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
      const obs = new IntersectionObserver((entries) => { for (const e of entries) { if (e.isIntersecting) setActiveSection(id); } }, { threshold: 0.3 });
      obs.observe(el); observers.push(obs);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const imageProjects = featuredProjects.filter(p => p.image_url);
  const textProjects  = featuredProjects.filter(p => !p.image_url);

  return (
    <>
      <MouseSpotlight />
      <ScrollProgress />
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scanlines"     aria-hidden="true" />
      <NeuralNetwork paused={false} />

      {/* NAV */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ background: scrolled ? "rgba(5,5,5,0.92)" : "transparent", borderBottom: scrolled ? "1px solid rgba(0,255,65,0.06)" : "1px solid transparent", backdropFilter: scrolled ? "blur(24px)" : "none", WebkitBackdropFilter: scrolled ? "blur(24px)" : "none" }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="group flex items-center gap-1 font-mono text-sm font-black tracking-tight">
            <span className="text-white group-hover:text-[#00FF41] transition-colors duration-300">PD</span>
            <span className="text-[#00FF41]/60 animate-pulse">_</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className={`nav-link font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${ activeSection === item.toLowerCase() ? "active text-[#00FF41]" : "text-gray-600 hover:text-gray-300" }`}>
                {item}
              </a>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden font-mono text-sm border border-white/10 w-10 h-10 flex items-center justify-center hover:border-[#00FF41]/30 hover:text-[#00FF41] transition-all duration-300 rounded-lg" aria-label="Toggle menu">
            {menuOpen ? "×" : "≡"}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
              className="md:hidden border-t border-white/[0.05] bg-[#050505]/98 backdrop-blur-3xl overflow-hidden">
              <div className="px-6 py-6 flex flex-col gap-5">
                {navItems.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                    className={`font-mono text-sm tracking-wider transition-colors ${ activeSection === item.toLowerCase() ? "text-[#00FF41]" : "text-gray-400 hover:text-white" }`}>
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10">

        {/* HERO */}
        <section id="home" className="min-h-[100dvh] flex items-center justify-center px-6 pt-16 relative overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#00FF41]/[0.022] blur-[130px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#00D4FF]/[0.016] blur-[100px] pointer-events-none" />
          <div className="max-w-5xl w-full relative">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-[#00FF41]/70 border border-[#00FF41]/20 bg-[#00FF41]/[0.05] px-4 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" /> Available for AI / ML Roles
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }} className="mb-8">
              <h1 className="font-black leading-[0.88] tracking-[-0.04em]" style={{ fontSize: "clamp(72px, 11vw, 120px)" }}>
                <span className="text-white">Preet</span><br /><span className="text-white/20">Dave</span>
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="mb-8 h-8">
              <TypewriterText />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="mb-10 max-w-xl">
              <p className="text-gray-400 text-[15px] leading-[1.85]">Building intelligent systems with deep learning, computer vision, and advanced ML algorithms. B.Tech CS (AI-ML) student &middot; Trainee SWE at Agility Innovations.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.7 }} className="flex flex-wrap gap-3 items-center">
              <a href="#contact" className="group font-mono text-[11px] tracking-[0.15em] border border-[#00FF41]/60 text-[#00FF41] px-7 py-3.5 hover:bg-[#00FF41] hover:text-black transition-all duration-300 rounded-lg flex items-center gap-2 uppercase">
                Contact Me <Send size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="https://github.com/iampreetdave-max" target="_blank" rel="noopener noreferrer" className="group font-mono text-[11px] tracking-[0.15em] border border-white/[0.08] px-7 py-3.5 text-gray-500 hover:border-white/20 hover:text-white transition-all duration-300 rounded-lg flex items-center gap-2 uppercase">
                <Github size={13} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/preet-dave-452023271/" target="_blank" rel="noopener noreferrer" className="group font-mono text-[11px] tracking-[0.15em] border border-white/[0.08] px-7 py-3.5 text-gray-500 hover:border-white/20 hover:text-white transition-all duration-300 rounded-lg flex items-center gap-2 uppercase">
                <Linkedin size={13} /> LinkedIn
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] tracking-[0.3em] text-gray-700 uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown size={16} className="text-gray-700" />
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="About" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Who I Am</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div variants={fadeUp} className="md:col-span-2">
                <GlassCard className="p-8 h-full" hover={false}>
                  <p className="text-gray-300 leading-[1.9] text-[15px] mb-5">I&apos;m an AI-ML Engineer passionate about building intelligent systems that solve real-world problems. With expertise in deep learning, computer vision, and NLP, I develop end-to-end ML pipelines &mdash; from data preprocessing and feature engineering to model deployment and optimization.</p>
                  <p className="text-gray-500 leading-[1.9] text-[14px] mb-7">Currently pursuing B.Tech in Computer Science (AI-ML) while gaining hands-on industry experience as a Trainee Software Engineer, shipping production ML systems validated against live data at scale.</p>
                  <div className="flex flex-wrap gap-2">
                    {["Deep Learning", "Computer Vision", "NLP", "MLOps", "Full-Stack"].map((tag) => (
                      <span key={tag} className="font-mono text-[10px] px-3 py-1.5 rounded-full border border-[#00FF41]/15 text-[#00FF41]/70 bg-[#00FF41]/[0.04]">{tag}</span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp} className="md:row-span-2">
                <GlassCard className="p-5 h-full flex flex-col" hover={false}>
                  <div className="relative flex-1 min-h-[220px] rounded-lg overflow-hidden mb-4">
                    <Image src="https://raw.githubusercontent.com/iampreetdave-max/portfolio/main/images/profile%20picture.jpeg" alt="Preet Dave" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 to-transparent" />
                  </div>
                  <div className="space-y-2 px-1">
                    <div className="font-bold text-sm text-white">Preet Dave</div>
                    <div className="font-mono text-[11px] text-[#00FF41]/70 tracking-wider">AI-ML Engineer</div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-600"><MapPin size={11} /> Ahmedabad, India</div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00FF41]/60 pt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse flex-shrink-0" /> Open to opportunities
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp} className="md:col-span-2">
                <div className="grid grid-cols-4 gap-3">
                  {stats.map((s) => (
                    <GlassCard key={s.label} className="p-4 text-center">
                      <div className="font-mono text-2xl font-black text-[#00FF41] leading-none mb-2">{s.value}</div>
                      <div className="font-mono text-[9px] text-gray-600 tracking-[0.12em] uppercase leading-tight">{s.label}</div>
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
            <motion.div variants={fadeUp}><SectionLabel text="Skills" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Technical Expertise</motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-4">
              {skills.map((cat) => (
                <motion.div key={cat.title} variants={fadeUp}>
                  <GlassCard className="p-7 group">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#00FF41]/[0.07] border border-[#00FF41]/[0.12] flex items-center justify-center shrink-0 group-hover:bg-[#00FF41]/[0.13] group-hover:border-[#00FF41]/[0.28] transition-all duration-500">
                        <cat.Icon size={20} className="text-[#00FF41]/60 group-hover:text-[#00FF41] transition-colors duration-500" />
                      </div>
                      <h3 className="font-mono text-[13px] font-bold text-white tracking-wide">{cat.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item) => (
                        <span key={item} className="font-mono text-[11px] px-3 py-1.5 border border-white/[0.06] text-gray-500 rounded-lg group-hover:border-white/[0.14] group-hover:text-gray-300 transition-all duration-300">{item}</span>
                      ))}
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
            <motion.div variants={fadeUp}><SectionLabel text="Projects" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Featured Work</motion.h2>

            {/* Top 2 — wide editorial hero cards */}
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {imageProjects.slice(0, 2).map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <div
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/[0.07] hover:border-[#00FF41]/30 transition-all duration-500"
                    style={{ height: "340px" }}
                    role="button" tabIndex={0}
                    onClick={() => setSelectedProject(p)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedProject(p); }}
                  >
                    {/* Full-card image */}
                    <Image
                      src={p.image_url!}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Dark gradient — bottom only, content lives here */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/10" />
                    {/* Content overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <span className="self-start font-mono text-[9px] tracking-[0.2em] text-[#00FF41] border border-[#00FF41]/40 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase mb-3">
                        {p.category}
                      </span>
                      <h3 className="text-[20px] font-black text-white mb-2 leading-tight">{p.title}</h3>
                      <p className="text-gray-300 text-[13px] leading-relaxed mb-4 line-clamp-2">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech_tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-white/20 text-gray-300 rounded-md bg-black/40 backdrop-blur-sm">{tag}</span>
                        ))}
                        {p.tech_tags.length > 4 && <span className="font-mono text-[9px] text-gray-500">+{p.tech_tags.length - 4}</span>}
                      </div>
                    </div>
                    {/* Hover arrow */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight size={14} className="text-[#00FF41]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom 2 image projects — standard cards with top image */}
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {imageProjects.slice(2).map((p) => (
                <motion.div key={p.id} variants={fadeUp}>
                  <div
                    className="group relative bg-[#0d0d0d] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-[#00FF41]/25 hover:shadow-[0_0_40px_rgba(0,255,65,0.06)] transition-all duration-500 cursor-pointer"
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
                      />
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
                      <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.18em] text-[#00FF41] border border-[#00FF41]/30 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full uppercase">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[15px] font-bold mb-2 group-hover:text-white transition-colors">{p.title}</h3>
                      <p className="text-gray-500 text-[12px] leading-relaxed mb-3">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.tech_tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.07] text-gray-600 rounded-md group-hover:text-gray-400 transition-colors">{tag}</span>
                        ))}
                        {p.tech_tags.length > 4 && <span className="font-mono text-[9px] text-gray-600">+{p.tech_tags.length - 4}</span>}
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
                    className="group relative border border-white/[0.06] bg-white/[0.015] backdrop-blur-xl rounded-xl px-6 py-4 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-400 cursor-pointer flex items-center gap-4"
                    role="button" tabIndex={0}
                    onClick={() => setSelectedProject(p)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelectedProject(p); }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-xl bg-gradient-to-b from-transparent via-[#00FF41]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-[9px] tracking-[0.18em] text-[#00FF41]/60 border border-[#00FF41]/15 bg-[#00FF41]/[0.04] px-2 py-0.5 rounded-full uppercase shrink-0">{p.category}</span>
                        <h3 className="text-[14px] font-bold group-hover:text-white transition-colors">{p.title}</h3>
                      </div>
                      <p className="text-gray-600 text-[12px] truncate">{p.description}</p>
                    </div>
                    <div className="hidden sm:flex flex-wrap gap-1.5 shrink-0">
                      {p.tech_tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.06] text-gray-600 rounded-md">{tag}</span>
                      ))}
                    </div>
                    <ArrowRight size={13} className="text-gray-700 group-hover:text-[#00FF41]/70 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="mt-8 text-center">
              <Link href="/projects" className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] border border-white/[0.08] px-8 py-3.5 text-gray-500 hover:border-[#00FF41]/40 hover:text-[#00FF41] transition-all duration-300 rounded-xl uppercase">
                View All Projects <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Experience" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Work History</motion.h2>
            <div className="relative">
              <div className="absolute left-[6px] top-4 bottom-16 w-px bg-gradient-to-b from-[#00FF41]/25 via-white/[0.05] to-transparent hidden sm:block" />
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <motion.div key={i} variants={fadeUp} className="relative sm:pl-12">
                    <div className={`absolute left-0 top-6 w-3 h-3 rounded-full border-2 transition-all duration-500 hidden sm:block ${ exp.active ? "bg-[#00FF41] border-[#00FF41] shadow-[0_0_16px_rgba(0,255,65,0.6)]" : "bg-[#050505] border-white/20" }`} />
                    {exp.active && <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-[#00FF41] animate-ping opacity-25 hidden sm:block" />}
                    <GlassCard className="p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="font-mono text-[11px] text-gray-600 flex items-center gap-1.5"><Calendar size={11} />{exp.period}</span>
                        {exp.active && <span className="font-mono text-[9px] tracking-[0.2em] text-[#00FF41]/70 border border-[#00FF41]/20 bg-[#00FF41]/[0.05] px-2.5 py-0.5 rounded-full uppercase">Current</span>}
                      </div>
                      <h3 className="text-[17px] font-bold mb-1">{exp.role}</h3>
                      <div className="font-mono text-[11px] text-gray-500 mb-3 flex items-center gap-1.5"><MapPin size={11} />{exp.company}</div>
                      <p className="text-gray-400 text-[13px] leading-relaxed">{exp.description}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="py-28 px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeUp}><SectionLabel text="Certifications" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Certificates &amp; Learnings</motion.h2>
            <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-24">
              {certifications.map((cert) => (
                <motion.div key={cert.title} variants={fadeUp}>
                  <GlassCard className="p-6 group h-full">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#00FF41]/[0.07] border border-[#00FF41]/[0.12] flex items-center justify-center shrink-0 group-hover:bg-[#00FF41]/[0.14] group-hover:border-[#00FF41]/[0.28] transition-all duration-300">
                        <cert.icon size={15} className="text-[#00FF41]/60 group-hover:text-[#00FF41] transition-colors duration-300" />
                      </div>
                      <h3 className="font-mono text-[12px] font-bold text-white tracking-wide leading-snug">{cert.title}</h3>
                    </div>
                    <p className="text-gray-500 text-[12px] leading-relaxed">{cert.detail}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUp}><SectionLabel text="Publications" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-12 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Research &amp; Writing</motion.h2>
            <motion.div variants={stagger} className="space-y-4">
              <motion.div variants={fadeUp}>
                <GlassCard className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00FF41]/[0.07] border border-[#00FF41]/[0.12] flex items-center justify-center shrink-0"><FileText size={17} className="text-[#00FF41]/60" /></div>
                    <div>
                      <div className="font-mono text-[10px] text-[#00FF41]/60 tracking-[0.2em] uppercase mb-2">Research Paper</div>
                      <h3 className="font-bold text-[15px] mb-2">&ldquo;Engineers Fear AI, As Mathematicians Once Feared Calculators&rdquo;</h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed">A perspective on how engineering professionals can embrace AI as a tool for amplification rather than replacement, drawing historical parallels with the adoption of calculators in mathematics.</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
              <motion.div variants={fadeUp}>
                <GlassCard className="p-7">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00FF41]/[0.07] border border-[#00FF41]/[0.12] flex items-center justify-center shrink-0"><PenTool size={17} className="text-[#00FF41]/60" /></div>
                    <div>
                      <div className="font-mono text-[10px] text-[#00FF41]/60 tracking-[0.2em] uppercase mb-2">LinkedIn Research Blogs</div>
                      <h3 className="font-bold text-[15px] mb-2">Technical Deep-Dives</h3>
                      <p className="text-gray-500 text-[13px] leading-relaxed mb-4">Published deep-dives including <span className="text-gray-300">How GPS Works</span>, <span className="text-gray-300">Zipf&apos;s Law for LLMs</span>, and other explorations at the intersection of math, physics, and AI.</p>
                      <a href="https://www.linkedin.com/in/preet-dave-452023271/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#00FF41]/60 hover:text-[#00FF41] transition-colors">
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
            <span className="font-black text-white/[0.016] tracking-tighter leading-none whitespace-nowrap" style={{ fontSize: "clamp(80px, 18vw, 200px)" }}>HELLO</span>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="max-w-5xl mx-auto relative">
            <motion.div variants={fadeUp}><SectionLabel text="Contact" /></motion.div>
            <motion.h2 variants={fadeUp} className="font-black mb-4 tracking-tight" style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>Get In Touch</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-[15px] mb-12 max-w-md">Open to AI/ML engineering roles, research collaborations, and interesting projects.</motion.p>
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
              <motion.div variants={fadeUp}>
                <div className="space-y-3">
                  {[
                    { Icon: Mail,     label: "Email",    href: "mailto:iampreetdave@gmail.com",                     text: "iampreetdave@gmail.com" },
                    { Icon: Phone,    label: "Phone",    href: "tel:+919081025277",                                 text: "+91 90810 25277" },
                    { Icon: Github,   label: "GitHub",   href: "https://github.com/iampreetdave-max",               text: "iampreetdave-max" },
                    { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/preet-dave-452023271/", text: "preet-dave" },
                  ].map((link) => (
                    <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex items-center gap-4 text-gray-500 hover:text-white transition-all duration-300">
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.025] border border-white/[0.07] shrink-0 group-hover:border-[#00FF41]/25 group-hover:bg-[#00FF41]/[0.06] transition-all duration-300">
                        <link.Icon size={16} className="group-hover:text-[#00FF41] transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-gray-700 tracking-[0.15em] uppercase mb-0.5">{link.label}</div>
                        <div className="text-sm">{link.text}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <form name="contact" method="POST" data-netlify="true" action="/success" className="space-y-5">
                  <input type="hidden" name="form-name" value="contact" />
                  {[
                    { label: "Name",  type: "text",  name: "name",  placeholder: "Your name" },
                    { label: "Email", type: "email", name: "email", placeholder: "your@email.com" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-[0.15em] uppercase">{f.label}</label>
                      <input type={f.type} name={f.name} required placeholder={f.placeholder} className="w-full bg-white/[0.025] border border-white/[0.07] p-4 text-white text-sm rounded-xl transition-all duration-300 placeholder-gray-800" />
                    </div>
                  ))}
                  <div>
                    <label className="block font-mono text-[10px] text-gray-600 mb-2 tracking-[0.15em] uppercase">Message</label>
                    <textarea name="message" required rows={5} placeholder="What's on your mind?" className="w-full bg-white/[0.025] border border-white/[0.07] p-4 text-white text-sm rounded-xl transition-all duration-300 resize-none placeholder-gray-800" />
                  </div>
                  <button type="submit" className="w-full font-mono text-[11px] tracking-[0.15em] border border-[#00FF41]/60 text-[#00FF41] px-6 py-4 hover:bg-[#00FF41] hover:text-black transition-all duration-300 uppercase rounded-xl flex items-center justify-center gap-2">
                    <Send size={13} /> Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <footer className="border-t border-white/[0.04] py-8 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-gray-600 tracking-widest">© 2026 PREET GHANSHYAM DAVE</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/30" />
              <p className="font-mono text-[10px] text-gray-700 tracking-widest">NEXT.JS + TAILWIND + FRAMER MOTION</p>
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
