"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { ArrowLeft, Zap, Code2, X, Brain, Eye, Cpu, Code } from "lucide-react";

const allProjects: Project[] = [
  { id: "1", title: "Enterprise Sports Analytics Platform", category: "Full-Stack / ML Engineering", description: "Production-grade sports analytics platform with custom ML models, live data pipelines, and real-time game tracking across 7+ leagues.", longDescription: "I architected and delivered a real-time sports analytics platform for a leading betting company covering NBA, NCAAB, MLB, NHL, Soccer, F1, and UFC. The full stack spans Go REST APIs, React frontends, Azure VM infrastructure, Docker containers, Redis caching, and PostgreSQL databases. This is the umbrella project that includes all the individual prediction models and scrapers listed below.", tech_tags: ["Go", "React", "Azure", "Docker", "Redis", "PostgreSQL", "REST API", "ML Engineering"] },
  { id: "2", title: "Football Prediction System", category: "ML / Predictive Analytics", description: "Ridge Regression models with 21+ engineered features, automated daily predictions via GitHub Actions, and a live Streamlit dashboard. 7 GitHub stars.", longDescription: "I built a production-ready football match prediction system using Ridge Regression with 21+ engineered features including xG metrics, market odds intelligence, and team performance stats. Features confidence scoring, BTTS predictions, and profit optimization. This demonstrates my ability to build ML systems that run autonomously in production with zero manual intervention.", tech_tags: ["scikit-learn", "Ridge Regression", "Streamlit", "GitHub Actions", "Pandas", "Feature Engineering"], repo_url: "https://github.com/iampreetdave-max/football-predictions" },
  { id: "3", title: "CTMCL Predictions", category: "ML / Sports Analytics", description: "Novel consensus goals line method using Random Forest classification and xG analysis across 6 Premier League seasons.", longDescription: "I developed a novel approach to football match prediction by creating the CTMCL (Consensus Total Market Goals Line) method. It derives custom total goals lines from betting odds using linear interpolation, then compares against pre-match xG data. Includes a Random Forest Classifier variant. This demonstrates my ability to develop original analytical methods \u2014 not just apply existing models, but create new approaches.", tech_tags: ["Random Forest", "scikit-learn", "Pandas", "NumPy", "xG Analytics", "Linear Interpolation"], repo_url: "https://github.com/iampreetdave/CTMCL-predictions" },
  { id: "4", title: "Goal Prediction Model", category: "ML / Regression", description: "6-algorithm regression benchmark pipeline with comprehensive feature engineering and statistical analysis for match outcome prediction.", longDescription: "I built a rigorous ML benchmarking pipeline that tests 6 different regression algorithms with full feature engineering and statistical evaluation. This shows my methodical approach \u2014 I systematically evaluate options and choose what performs best for the data.", tech_tags: ["Machine Learning", "Regression", "Statistical Modeling", "Python", "Benchmarking"], repo_url: "https://github.com/iampreetdave/Goal-Prediction-Model" },
  { id: "5", title: "NBA Prediction Model", category: "ML / Sports Analytics", description: "NBA game prediction system with pre-match feature engineering, odds integration from DraftKings, and ML-based score forecasting with validation.", longDescription: "I built an NBA prediction model combining pre-match feature engineering with live odds data from DraftKings. The system extracts team performance metrics, integrates betting market intelligence, generates predictions, and validates against actual outcomes. Demonstrates my ability to work with real-time sports data APIs and build models that integrate market signals.", tech_tags: ["Python", "ML Models", "Odds API", "Feature Engineering", "Validation", "DraftKings"], repo_url: "https://github.com/iampreetdave-max/basketball-NBA" },
  { id: "6", title: "NBA Analytics & Odds Scraper", category: "Data Engineering / Scraping", description: "Complete NBA data pipeline: odds scraping, database building, ensemble models with P/L tracking, and pre-match analysis.", longDescription: "I built the full data engineering backbone for NBA analytics: odds scraping from multiple sportsbooks, database building for historical data, ensemble ML models with profit/loss tracking, and pre-match feature extraction. This shows my data engineering skills \u2014 building reliable pipelines that feed ML systems with clean, structured data at scale.", tech_tags: ["Python", "Web Scraping", "Database Building", "Ensemble Models", "Data Pipeline"], repo_url: "https://github.com/iampreetdave-max/basketball" },
  { id: "7", title: "Multi-Sport Scraper Suite", category: "Data Engineering / Scraping", description: "Custom data scrapers and prediction dashboards for NHL, MLB, and NCAAB with multi-version dashboard iterations.", longDescription: "I built a comprehensive scraper suite: NHL hockey (scraper, model, validation), MLB baseball (data pipeline), and NCAAB college basketball (games, dashboards). Includes 3 iterative dashboard versions and data sync utilities. Demonstrates my ability to build scalable data collection across domains and iterate rapidly on dashboards.", tech_tags: ["Python", "NHL Scraper", "MLB Scraper", "NCAAB Scraper", "Dashboards", "Data Sync"] },
  { id: "8", title: "TalkToNotes", category: "Computer Vision / NLP", description: "Intelligent OCR system converting handwritten notes into searchable knowledge bases using TrOCR transformers and neural embeddings.", longDescription: "I developed an intelligent document processing pipeline using TrOCR for high-accuracy OCR, neural embeddings for semantic understanding, and a chatbot for natural language querying. If you need someone who understands computer vision, transformers, and NLP \u2014 and can turn them into real products \u2014 this is what I do.", tech_tags: ["TrOCR", "Transformers", "Computer Vision", "NLP", "Vector Search", "Python"], repo_url: "https://github.com/iampreetdave/TalkNotes" },
  { id: "9", title: "StudBud", category: "Web / Full-Stack", description: "Full-stack academic management platform with ML-powered study recommendations and adaptive scheduling.", longDescription: "Full-stack student management platform with ML-powered recommendations and adaptive scheduling. Built with TypeScript for maintainability. Demonstrates combining web engineering with AI features into a polished user experience.", tech_tags: ["TypeScript", "Full-Stack", "Machine Learning", "Data Analysis"], repo_url: "https://github.com/iampreetdave/STUDBUD" },
  { id: "10", title: "Find Ranks", category: "Web / Streamlit", description: "Automates mark extraction from PDF mark sheets, calculates performance, and generates institutional rankings.", longDescription: "Automates extracting marks from PDFs, calculating cumulative performance, and generating ranked analytics. Streamlit-based for non-technical users. If you have manual data workflows that need streamlining, this is the kind of solution I deliver.", tech_tags: ["Streamlit", "PDF Processing", "Python", "Data Analytics"], repo_url: "https://github.com/iampreetdave-max/Find-Ranks" },
  { id: "11", title: "Automated Timesheet", category: "Automation", description: "Hands-off timesheet automation with SharePoint integration and scheduled GitHub Actions workflows.", longDescription: "Fully automated timesheet system with SharePoint API, daily summaries, reaction-based tracking \u2014 all via GitHub Actions. Zero manual intervention. I find repetitive processes and build reliable, self-running systems.", tech_tags: ["Python", "Automation", "SharePoint API", "GitHub Actions"], repo_url: "https://github.com/iampreetdave-max/automated_timesheet" },
  { id: "12", title: "Bulk Email Tool", category: "Automation", description: "Professional email campaign tool with live tracking, PDF attachments, and multi-provider support.", longDescription: "Professional email campaign tool via Streamlit: bulk sending, live progress, PDF attachments, Gmail/Outlook/Yahoo support. Non-technical teams run campaigns without code. Practical business tools that are powerful but simple to use.", tech_tags: ["Streamlit", "Python", "SMTP", "Email Automation"], repo_url: "https://github.com/iampreetdave-max/bulk-email" },
  { id: "13", title: "Claude Prompt Extension", category: "Browser Extension / AI", description: "Chrome extension enhancing AI workflows with prompt management, templates, and productivity features.", longDescription: "Chrome extension (Manifest V3) enhancing Claude AI with saved prompts, templates, and workflow optimization. Shows my ability to identify AI workflow bottlenecks and build tools that solve them.", tech_tags: ["JavaScript", "Chrome Extension", "AI", "Manifest V3"], repo_url: "https://github.com/iampreetdave-max/Claude-Prompt-extension" },
  { id: "14", title: "Chat Application", category: "Network / Python", description: "Real-time Python socket chat system with efficient message routing and clean architecture.", longDescription: "Real-time communication via Python socket programming with low-latency message routing. Foundational skills for real-time data systems, IoT, and communication infrastructure.", tech_tags: ["Python", "Socket Programming", "Network Architecture"], repo_url: "https://github.com/iampreetdave/chat-application" },
];

const automations = [
  { title: "Change Request & Notifications", description: "Automated change request workflows with real-time completion notifications to stakeholders.", tags: ["Workflow", "Notifications", "Status Tracking"] },
  { title: "Dynamic Dropdown System", description: "Context-aware dynamic dropdown automation for client portal forms with cascading data dependencies.", tags: ["Forms", "Dynamic Data", "UI Automation"] },
  { title: "GNO Partners Integration", description: "Client wins tracking and team collaboration system with automated reporting and partner management.", tags: ["CRM", "Reporting", "Collaboration"] },
  { title: "GNO CloudBot", description: "Cloud-based bot automation for client operations, handling routine data processing tasks autonomously.", tags: ["Bot", "Cloud", "Task Automation"] },
  { title: "NPS Survey Automation", description: "End-to-end Net Promoter Score survey pipeline \u2014 automated distribution, collection, scoring, and analytics.", tags: ["Surveys", "Analytics", "Feedback"] },
  { title: "Slack-CB Integration", description: "Bidirectional Slack integration syncing messages, updates, and alerts across internal tools.", tags: ["Slack API", "Integration", "Messaging"] },
  { title: "Stop Service Notifications", description: "Automated Slack alerts triggered by service stop requests for immediate team awareness.", tags: ["Slack", "Alerts", "Incident Response"] },
  { title: "Client Onboarding Pipeline", description: "Automated new client onboarding pushing structured updates to BA and QA teams.", tags: ["Onboarding", "Pipeline", "Team Sync"] },
];

const skillNames: Record<string, string> = {
  "deep-learning": "Deep Learning & Neural Networks",
  "cv-nlp": "Computer Vision & NLP",
  "machine-learning": "Machine Learning",
  "dev-deploy": "Development & Deployment",
};

const skillIcons: Record<string, typeof Brain> = {
  "deep-learning": Brain,
  "cv-nlp": Eye,
  "machine-learning": Cpu,
  "dev-deploy": Code,
};

const skillKeywords: Record<string, string[]> = {
  "deep-learning": ["Ridge Regression", "Random Forest", "Regression", "ML Models", "Ensemble", "Neural", "Transformers", "TrOCR", "ML Engineering", "scikit-learn", "Machine Learning"],
  "cv-nlp": ["Computer Vision", "NLP", "TrOCR", "Transformers", "Vector Search", "OCR", "Image"],
  "machine-learning": ["scikit-learn", "Machine Learning", "Regression", "Random Forest", "Ridge", "Feature Engineering", "ML Models", "Ensemble", "Benchmarking", "Pandas", "NumPy", "Statistical", "xG", "Validation", "ML Engineering"],
  "dev-deploy": ["Python", "JavaScript", "TypeScript", "Full-Stack", "Go", "React", "Docker", "Azure", "GitHub Actions", "Chrome Extension", "Socket", "Network", "REST API", "Streamlit", "SMTP", "SharePoint", "Automation"],
};

const projectFilters = ["All", "ML & Analytics", "Data Engineering", "Automation", "Web & Tools", "Extensions"];
const projectFilterMap: Record<string, string[]> = {
  "ML & Analytics": ["ML", "Predictive", "Analytics", "Regression", "Computer Vision", "NLP", "Random Forest", "Ridge"],
  "Data Engineering": ["Scraping", "Scraper", "Data Engineering", "Database", "Pipeline"],
  Automation: ["Automation", "Email", "Timesheet", "SMTP", "SharePoint"],
  "Web & Tools": ["Web", "Streamlit", "Full-Stack", "PDF", "TypeScript", "Socket", "Network"],
  Extensions: ["Extension", "Browser", "Chrome", "Manifest"],
};

function ProjectsContent() {
  const searchParams = useSearchParams();
  const skillParam = searchParams.get("skill");

  const [activeTab, setActiveTab] = useState<"projects" | "automations">("projects");
  const [filter, setFilter] = useState("All");
  const [activeSkill, setActiveSkill] = useState<string | null>(skillParam);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (skillParam && skillKeywords[skillParam]) {
      setActiveSkill(skillParam);
      setActiveTab("projects");
    }
  }, [skillParam]);

  const getFilteredProjects = () => {
    if (activeSkill && skillKeywords[activeSkill]) {
      const kws = skillKeywords[activeSkill];
      return allProjects.filter((p) =>
        kws.some((kw) =>
          p.category.toLowerCase().includes(kw.toLowerCase()) ||
          p.tech_tags.some((t) => t.toLowerCase().includes(kw.toLowerCase()))
        )
      );
    }
    if (filter === "All") return allProjects;
    const kws = projectFilterMap[filter] || [];
    return allProjects.filter((p) =>
      kws.some((kw) =>
        p.category.toLowerCase().includes(kw.toLowerCase()) ||
        p.tech_tags.some((t) => t.toLowerCase().includes(kw.toLowerCase()))
      )
    );
  };

  const filteredProjects = getFilteredProjects();
  const SkillIcon = activeSkill ? skillIcons[activeSkill] : null;

  const clearSkillFilter = () => {
    setActiveSkill(null);
    setFilter("All");
    window.history.replaceState(null, "", "/projects");
  };

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
  const fadeUp = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } } };

  return (
    <>
      <NeuralNetwork paused={false} />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 border-b border-white/[0.06] backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"><ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home</Link>
          <Link href="/" className="group flex items-center gap-1 font-mono text-base font-bold tracking-tight"><span className="text-white group-hover:text-[#00FF41] transition-colors duration-300">PD</span><span className="text-[#00FF41]/50 animate-pulse">_</span></Link>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4"><div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/40 to-transparent" /><span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">Work</span></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">All Projects & Automations</h1>
            <p className="text-gray-500 text-[15px] mb-8 max-w-2xl">Click any project to see how my skills and expertise were applied.</p>
          </motion.div>

          {/* SKILL FILTER BANNER */}
          <AnimatePresence>
            {activeSkill && skillNames[activeSkill] && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mb-6 flex items-center gap-3 bg-[#00FF41]/[0.05] border border-[#00FF41]/[0.15] rounded-lg px-5 py-3">
                {SkillIcon && <SkillIcon size={18} className="text-[#00FF41]/70" />}
                <div className="flex-1">
                  <span className="font-mono text-[11px] text-gray-500 tracking-wider uppercase">Showing projects for</span>
                  <span className="font-mono text-[13px] text-[#00FF41] ml-2 font-semibold">{skillNames[activeSkill]}</span>
                  <span className="font-mono text-[11px] text-gray-600 ml-2">({filteredProjects.length} projects)</span>
                </div>
                <button onClick={clearSkillFilter} className="flex items-center gap-1.5 font-mono text-[11px] text-gray-500 hover:text-white border border-white/[0.08] px-3 py-1.5 rounded-sm hover:border-white/[0.2] transition-all cursor-pointer"><X size={12} /> Clear</button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB NAVIGATION */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.5 }} className="flex gap-1 mb-8 bg-white/[0.02] border border-white/[0.06] rounded-lg p-1 w-fit">
            <button onClick={() => { setActiveTab("projects"); setFilter("All"); }} className={`flex items-center gap-2 font-mono text-[12px] tracking-wide px-5 py-2.5 rounded-md transition-all duration-300 cursor-pointer ${activeTab === "projects" ? "bg-[#00FF41] text-black shadow-[0_0_20px_rgba(0,255,65,0.15)]" : "text-gray-500 hover:text-white"}`}><Code2 size={14} /> Projects <span className="text-[10px] opacity-70">({allProjects.length})</span></button>
            <button onClick={() => { setActiveTab("automations"); setActiveSkill(null); window.history.replaceState(null, "", "/projects"); }} className={`flex items-center gap-2 font-mono text-[12px] tracking-wide px-5 py-2.5 rounded-md transition-all duration-300 cursor-pointer ${activeTab === "automations" ? "bg-[#00FF41] text-black shadow-[0_0_20px_rgba(0,255,65,0.15)]" : "text-gray-500 hover:text-white"}`}><Zap size={14} /> Automations <span className="text-[10px] opacity-70">({automations.length})</span></button>
          </motion.div>

          {activeTab === "projects" && (
            <>
              {!activeSkill && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="flex flex-wrap gap-2 mb-8">
                  {projectFilters.map((f) => (<button key={f} onClick={() => setFilter(f)} className={`font-mono text-[11px] tracking-wide px-4 py-2 border rounded-sm transition-all duration-300 cursor-pointer ${filter === f ? "bg-white/[0.1] text-white border-white/[0.2]" : "border-white/[0.06] text-gray-600 hover:border-white/[0.15] hover:text-gray-400 bg-white/[0.01]"}`}>{f}</button>))}
                </motion.div>
              )}
              <motion.div key={activeSkill || filter} initial="hidden" animate="show" variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.map((p) => (<motion.div key={p.id} variants={fadeUp}><ProjectCard project={p} onClick={() => setSelectedProject(p)} /></motion.div>))}
              </motion.div>
              {filteredProjects.length === 0 && (<div className="bg-white/[0.02] border border-white/[0.06] py-12 text-center rounded-lg"><p className="text-gray-600 font-mono text-xs tracking-wider">NO PROJECTS MATCH THIS FILTER</p></div>)}
            </>
          )}

          {activeTab === "automations" && (
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.p variants={fadeUp} className="text-gray-500 text-[15px] mb-8 max-w-2xl">Workflow automations I built for clients at Agility Innovations \u2014 Slack integrations, notification pipelines, survey systems, and operational tools.</motion.p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {automations.map((a, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-5 rounded-lg hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 h-full">
                      <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-md bg-[#00FF41]/[0.08] border border-[#00FF41]/[0.15] flex items-center justify-center"><Zap size={13} className="text-[#00FF41]/70" /></div><h3 className="font-mono text-[12px] font-semibold text-white tracking-wide">{a.title}</h3></div>
                      <p className="text-gray-400 text-[13px] mb-4 leading-relaxed">{a.description}</p>
                      <div className="flex flex-wrap gap-1.5">{a.tags.map((t) => (<span key={t} className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.06] text-gray-600 rounded-sm">{t}</span>))}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <footer className="border-t border-white/[0.04] mt-20 pt-8"><div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><p className="font-mono text-[10px] text-gray-500 tracking-wider">\u00a9 2025 PREET GHANSHYAM DAVE</p><div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/40" /><p className="font-mono text-[10px] text-gray-600 tracking-wider">BUILT WITH NEXT.JS + TAILWIND</p></div></div></footer>
      </main>

      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}</AnimatePresence>
    </>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <ProjectsContent />
    </Suspense>
  );
}
