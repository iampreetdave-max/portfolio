"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { ArrowLeft, Zap } from "lucide-react";

const allProjects: Project[] = [
  {
    id: "1",
    title: "Enterprise Sports Analytics Platform",
    category: "Full-Stack / ML Engineering",
    description:
      "Production-grade sports analytics platform with custom ML prediction models, live data pipelines, and real-time game tracking across 7+ professional sports leagues.",
    longDescription:
      "I architected and delivered a comprehensive real-time sports analytics platform for a leading betting company, covering NBA, NCAAB, MLB, NHL, Soccer, F1, and UFC. I built custom prediction models using Ridge Regression and Random Forest algorithms with 21+ engineered features including expected goals (xG) metrics, market odds intelligence, and team performance indicators. The system runs automated daily prediction pipelines via GitHub Actions, processes live odds through Redis caching layers, and serves predictions through an interactive Streamlit dashboard. The full stack spans Go REST APIs, React frontends, Azure VM infrastructure, Docker containers, and PostgreSQL databases. If you need someone who can own the entire pipeline from data ingestion and ML model design through production deployment and infrastructure management, this project demonstrates exactly that capability at enterprise scale.",
    tech_tags: ["Go", "React", "Ridge Regression", "Random Forest", "Azure", "Docker", "Redis", "PostgreSQL", "GitHub Actions", "Streamlit"],
  },
  {
    id: "2",
    title: "TalkToNotes",
    category: "Computer Vision / NLP",
    description:
      "Intelligent OCR system that converts handwritten notes into searchable, queryable knowledge bases using TrOCR transformers and neural embeddings.",
    longDescription:
      "I developed an intelligent document processing pipeline that transforms handwritten notes into structured, searchable knowledge bases. Using the TrOCR transformer for high-accuracy optical character recognition, neural embeddings for semantic understanding, and a chatbot interface for natural language querying, this system automates what would otherwise be hours of manual transcription. The architecture handles everything from image preprocessing through text extraction, embedding generation, and conversational retrieval. If you need someone who understands computer vision pipelines, transformer architectures, and NLP systems \u2014 and can turn them into products real users interact with \u2014 this is the kind of end-to-end AI engineering I specialize in.",
    tech_tags: ["TrOCR", "Transformers", "Computer Vision", "NLP", "Vector Search", "Python"],
    repo_url: "https://github.com/iampreetdave-max/TalkNotes",
  },
  {
    id: "3",
    title: "StudBud",
    category: "Web / Full-Stack",
    description:
      "Full-stack academic management platform with ML-powered study recommendations and adaptive scheduling algorithms.",
    longDescription:
      "I designed and built a full-stack student management platform that uses machine learning to provide personalized study recommendations and adaptive scheduling. Built with TypeScript for type-safe, maintainable code across the entire stack. The system analyzes student performance patterns and generates optimized study plans that adapt as new data comes in. This project demonstrates my ability to combine solid web engineering with practical AI features \u2014 the same approach I bring to any product that needs intelligent capabilities woven into a polished, user-facing experience. If your team needs someone who can bridge frontend development and machine learning into a cohesive product, this is how I work.",
    tech_tags: ["TypeScript", "Full-Stack", "Machine Learning", "Data Analysis"],
    repo_url: "https://github.com/iampreetdave-max/STUDBUD",
  },
  {
    id: "4",
    title: "Find Ranks",
    category: "Web / Streamlit",
    description:
      "Analytics tool that automates mark extraction from PDF mark sheets, calculates cumulative performance, and generates institutional rankings.",
    longDescription:
      "I built a practical data processing tool that automates the entire workflow of extracting marks from multiple PDF mark sheets, calculating cumulative student performance, and generating ranked analytics with visualizations. The Streamlit-based interface makes it immediately accessible to non-technical staff at educational institutions \u2014 no training needed. This project reflects my focus on building automation that saves real time and eliminates human error. If you have manual, data-heavy workflows that need to be streamlined into reliable, self-service tools, this is exactly the kind of solution I deliver.",
    tech_tags: ["Streamlit", "PDF Processing", "Python", "Data Analytics"],
    repo_url: "https://github.com/iampreetdave-max/Find-Ranks",
  },
  {
    id: "5",
    title: "Automated Timesheet",
    category: "Automation",
    description:
      "Hands-off timesheet automation with SharePoint integration and scheduled GitHub Actions workflows for daily reporting.",
    longDescription:
      "I engineered a fully automated timesheet management system that integrates with SharePoint APIs, generates daily summaries, and tracks team activity through reaction-based monitoring \u2014 all running autonomously via GitHub Actions. Zero manual intervention required once deployed. This project showcases my automation-first engineering mindset: I identify repetitive, time-consuming processes and build reliable, self-running systems that free teams to focus on higher-value work. If you have operational workflows that are eating up your team\u2019s time, I can automate them.",
    tech_tags: ["Python", "Automation", "SharePoint API", "GitHub Actions"],
    repo_url: "https://github.com/iampreetdave-max/automated_timesheet",
  },
  {
    id: "6",
    title: "Bulk Email Tool",
    category: "Automation",
    description:
      "Professional email campaign tool with live tracking, PDF attachments, and multi-provider support for business outreach.",
    longDescription:
      "I built a professional-grade email campaign tool using Streamlit that handles bulk sending with live progress tracking, PDF attachment support, and compatibility with Gmail, Outlook, and Yahoo. Non-technical business teams can run full campaigns without writing a single line of code. This demonstrates my ability to build practical business tools that solve real operational needs \u2014 if your team needs internal tools that are powerful under the hood but simple to use on the surface, this is the approach I take.",
    tech_tags: ["Streamlit", "Python", "SMTP", "Email Automation"],
    repo_url: "https://github.com/iampreetdave-max/bulk-email",
  },
  {
    id: "7",
    title: "Claude Prompt Extension",
    category: "Browser Extension / AI",
    description:
      "Chrome extension that enhances AI workflows with prompt management, templates, and productivity features.",
    longDescription:
      "I developed a Chrome browser extension using Manifest V3 that enhances Claude AI interactions with saved prompts, reusable templates, and workflow optimization features. It streamlines repetitive AI-assisted tasks by letting users store and recall effective prompts instantly. This shows my ability to identify productivity bottlenecks in AI-assisted workflows and build developer tools that solve them \u2014 a skill set that\u2019s increasingly valuable as teams integrate AI into their daily development processes.",
    tech_tags: ["JavaScript", "Chrome Extension", "AI", "Manifest V3"],
    repo_url: "https://github.com/iampreetdave-max/Claude-Prompt-extension",
  },
  {
    id: "8",
    title: "Chat Application",
    category: "Network / Python",
    description:
      "Real-time Python socket chat system with efficient message routing and clean, maintainable architecture.",
    longDescription:
      "I built a real-time communication system using Python socket programming, implementing low-latency message routing with clean, well-structured architecture. The entire system runs from a single well-organized file, demonstrating deep understanding of network protocols and concurrent programming. These are foundational skills for building real-time data systems, IoT platforms, and communication infrastructure \u2014 if your product involves live data streams or real-time user interactions, I bring the low-level networking expertise to make it work reliably.",
    tech_tags: ["Python", "Socket Programming", "Network Architecture"],
    repo_url: "https://github.com/iampreetdave-max/chat-application",
  },
];

const automations = [
  { title: "Change Request & Notifications", description: "Automated change request workflows with real-time completion notifications to stakeholders, eliminating manual status tracking.", tags: ["Workflow", "Notifications", "Status Tracking"] },
  { title: "Dynamic Dropdown System", description: "Context-aware dynamic dropdown automation for client portal forms with cascading data dependencies and validation.", tags: ["Forms", "Dynamic Data", "UI Automation"] },
  { title: "GNO Partners Integration", description: "Client wins tracking and team collaboration system with automated reporting, partner management, and performance dashboards.", tags: ["CRM", "Reporting", "Collaboration"] },
  { title: "GNO CloudBot", description: "Cloud-based bot automation for client operations, handling routine data processing tasks and operational workflows autonomously.", tags: ["Bot", "Cloud", "Task Automation"] },
  { title: "NPS Survey Automation", description: "End-to-end Net Promoter Score survey pipeline \u2014 automated distribution, collection, scoring, and analytics for continuous customer feedback.", tags: ["Surveys", "Analytics", "Feedback"] },
  { title: "Slack-CB Integration", description: "Bidirectional Slack integration syncing messages, updates, and alerts across internal tools for seamless team communication.", tags: ["Slack API", "Integration", "Messaging"] },
  { title: "Stop Service Notifications", description: "Automated Slack alerts triggered by service stop requests, ensuring immediate team awareness and rapid incident response.", tags: ["Slack", "Alerts", "Incident Response"] },
  { title: "Client Onboarding Pipeline", description: "Automated new client onboarding that pushes structured updates to BA and QA teams, eliminating manual handoff delays.", tags: ["Onboarding", "Pipeline", "Team Sync"] },
];

const filters = ["All", "ML & Analytics", "Automation", "Web & Tools", "Extensions", "Professional"];
const filterMap: Record<string, string[]> = {
  "ML & Analytics": ["ML", "Machine Learning", "Predictive", "Analytics", "Computer Vision", "NLP", "Random Forest", "scikit-learn", "Regression"],
  Automation: ["Automation", "Email", "Timesheet", "SMTP", "SharePoint"],
  "Web & Tools": ["Web", "Streamlit", "Full-Stack", "PDF", "TypeScript", "Socket"],
  Extensions: ["Extension", "Browser", "Chrome", "Manifest"],
  Professional: ["Professional", "Go", "Azure", "Docker"],
};

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === "All" ? allProjects : allProjects.filter((p) => {
    const kws = filterMap[filter] || [];
    return kws.some((kw) => p.category.toLowerCase().includes(kw.toLowerCase()) || p.tech_tags.some((t) => t.toLowerCase().includes(kw.toLowerCase())));
  });

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
  const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } } };

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
            <div className="flex items-center gap-3 mb-4"><div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/40 to-transparent" /><span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">Projects</span></div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">All Projects</h1>
            <p className="text-gray-500 text-[15px] mb-10 max-w-2xl">Click any project to see how my skills and expertise were applied \u2014 and how they can work for you.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (<button key={f} onClick={() => setFilter(f)} className={`font-mono text-[11px] tracking-wide px-4 py-2 border rounded-sm transition-all duration-300 cursor-pointer ${filter === f ? "bg-[#00FF41] text-black border-[#00FF41] shadow-[0_0_20px_rgba(0,255,65,0.15)]" : "border-white/[0.08] text-gray-500 hover:border-white/[0.2] hover:text-gray-300 bg-white/[0.02]"}`}>{f}</button>))}
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {filteredProjects.map((p) => (<motion.div key={p.id} variants={fadeUp}><ProjectCard project={p} onClick={() => setSelectedProject(p)} /></motion.div>))}
          </motion.div>

          {filteredProjects.length === 0 && (<div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] py-12 text-center rounded-lg mb-20"><p className="text-gray-600 font-mono text-xs tracking-wider">NO PROJECTS MATCH THIS FILTER</p></div>)}

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4"><div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/40 to-transparent" /><span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">Client Work</span></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Automations</h2>
            <p className="text-gray-500 text-[15px] mb-8 max-w-2xl">Workflow automations I built for clients at Agility Innovations \u2014 Slack integrations, notification pipelines, survey systems, and operational tools that run without manual intervention.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {automations.map((a, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-5 rounded-lg hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 h-full">
                  <div className="flex items-center gap-2 mb-3"><div className="w-7 h-7 rounded-md bg-[#00FF41]/[0.08] border border-[#00FF41]/[0.15] flex items-center justify-center"><Zap size={13} className="text-[#00FF41]/70" /></div><h3 className="font-mono text-[12px] font-semibold text-white tracking-wide">{a.title}</h3></div>
                  <p className="text-gray-400 text-[13px] mb-4 leading-relaxed">{a.description}</p>
                  <div className="flex flex-wrap gap-1.5">{a.tags.map((t) => (<span key={t} className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.06] text-gray-600 rounded-sm">{t}</span>))}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <footer className="border-t border-white/[0.04] mt-20 pt-8">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-gray-500 tracking-wider">\u00a9 2025 PREET GHANSHYAM DAVE</p>
            <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/40" /><p className="font-mono text-[10px] text-gray-600 tracking-wider">BUILT WITH NEXT.JS + TAILWIND</p></div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
}
