"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import NeuralNetwork from "@/components/NeuralNetwork";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/components/ProjectCard";
import { ArrowLeft, Zap } from "lucide-react";

/* ─── ALL PROJECTS ─── */

const allProjects: Project[] = [
  {
    id: "1",
    title: "Football Prediction System",
    category: "ML / Predictive Analytics",
    description:
      "Production-grade ML platform with Ridge Regression models, 21+ engineered features, automated daily predictions via GitHub Actions, and a live Streamlit dashboard. 7 stars on GitHub.",
    tech_tags: ["scikit-learn", "Streamlit", "Ridge Regression", "GitHub Actions", "Pandas"],
    repo_url: "https://github.com/iampreetdave-max/football-predictions",
  },
  {
    id: "2",
    title: "TalkToNotes",
    category: "Computer Vision / NLP",
    description:
      "OCR system using TrOCR transformer, neural embeddings, chatbot KB integration. Converts handwritten notes to searchable, queryable knowledge bases.",
    tech_tags: ["TrOCR", "Transformers", "Computer Vision", "NLP", "Vector Search"],
    repo_url: "https://github.com/iampreetdave/TalkNotes",
  },
  {
    id: "3",
    title: "WinBets Sports Platform",
    category: "Full-Stack / Professional",
    description:
      "Real-time sports analytics platform with live game widgets for NBA, NCAAB, MLB, NHL, Soccer, F1, and UFC. Features live odds processing, news aggregation, tickets marketplace, and automated data pipelines on Azure.",
    tech_tags: ["Go", "React", "Azure VMs", "Docker", "Redis", "PostgreSQL", "REST API"],
  },
  {
    id: "4",
    title: "CTMCL Predictions",
    category: "ML / Sports Analytics",
    description:
      "Novel football prediction approach using Consensus Total Market Goals Line derived from betting odds, xG comparison, and Random Forest classification across 6 Premier League seasons.",
    tech_tags: ["Random Forest", "scikit-learn", "Pandas", "NumPy", "xG Analytics"],
    repo_url: "https://github.com/iampreetdave/CTMCL-predictions",
  },
  {
    id: "5",
    title: "Goal Prediction Model",
    category: "ML / Regression",
    description:
      "6-algorithm regression benchmark pipeline with comprehensive feature engineering and statistical analysis for predictive modeling of football match outcomes.",
    tech_tags: ["Machine Learning", "Regression", "Statistical Modeling", "Python"],
    repo_url: "https://github.com/iampreetdave/Goal-Prediction-Model",
  },
  {
    id: "6",
    title: "StudBud",
    category: "Web / Full-Stack",
    description:
      "Student academic management platform with ML-powered recommendations and adaptive scheduling algorithms for better study planning.",
    tech_tags: ["TypeScript", "Web Development", "Machine Learning", "Full-Stack"],
    repo_url: "https://github.com/iampreetdave/STUDBUD",
  },
  {
    id: "7",
    title: "Find Ranks",
    category: "Web / Streamlit",
    description:
      "Streamlit web app that extracts marks from multiple PDF mark sheets, calculates cumulative performance, and generates rankings with analytics for institutions.",
    tech_tags: ["Streamlit", "PDF Processing", "Python", "Data Analytics"],
    repo_url: "https://github.com/iampreetdave-max/Find-Ranks",
  },
  {
    id: "8",
    title: "Automated Timesheet",
    category: "Automation",
    description:
      "Automated timesheet management system with SharePoint integration, daily summary generation, and reaction-based tracking via scheduled GitHub Actions.",
    tech_tags: ["Python", "Automation", "SharePoint API", "GitHub Actions"],
    repo_url: "https://github.com/iampreetdave-max/automated_timesheet",
  },
  {
    id: "9",
    title: "Bulk Email Tool",
    category: "Automation",
    description:
      "Professional cold email campaign tool built with Streamlit. Bulk emails with live progress tracking, PDF attachments, and multi-provider support (Gmail, Outlook, Yahoo).",
    tech_tags: ["Streamlit", "Python", "SMTP", "Email Automation"],
    repo_url: "https://github.com/iampreetdave-max/bulk-email",
  },
  {
    id: "10",
    title: "Claude Prompt Extension",
    category: "Browser Extension / AI",
    description:
      "Chrome browser extension for enhancing Claude AI interactions with prompt management, templates, and workflow optimization features.",
    tech_tags: ["JavaScript", "Chrome Extension", "AI", "Manifest V3"],
    repo_url: "https://github.com/iampreetdave-max/Claude-Prompt-extension",
  },
  {
    id: "11",
    title: "Chat Application",
    category: "Network / Python",
    description:
      "Real-time socket communication system built in Python. Low-latency message routing with a clean architecture, all implemented in a single file.",
    tech_tags: ["Python", "Socket Programming", "Network Architecture"],
    repo_url: "https://github.com/iampreetdave/chat-application",
  },
];

const automations = [
  {
    title: "Change Request & Notifications",
    description: "Automated change request workflows with real-time completion notifications to stakeholders.",
    tags: ["Workflow", "Notifications", "Status Tracking"],
  },
  {
    title: "Dynamic Dropdown System",
    description: "Context-aware dynamic dropdown automation for client portal forms with cascading data dependencies.",
    tags: ["Forms", "Dynamic Data", "UI Automation"],
  },
  {
    title: "GNO Partners Integration",
    description: "Client wins tracking and team collaboration system with automated reporting and partner management.",
    tags: ["CRM", "Reporting", "Team Collaboration"],
  },
  {
    title: "GNO CloudBot",
    description: "Cloud-based bot automation for client operations, handling routine tasks and data processing workflows.",
    tags: ["Bot", "Cloud", "Task Automation"],
  },
  {
    title: "NPS Survey Automation",
    description: "Automated Net Promoter Score survey distribution, collection, and analytics pipeline for client feedback.",
    tags: ["Surveys", "Analytics", "Customer Feedback"],
  },
  {
    title: "Slack-CB Integration",
    description: "Bidirectional Slack integration for internal tools, syncing messages, updates, and alerts across platforms.",
    tags: ["Slack API", "Integration", "Messaging"],
  },
  {
    title: "Stop Service Notifications",
    description: "Automated Slack alerts triggered by service stop requests, ensuring rapid team awareness and response.",
    tags: ["Slack", "Alerts", "Service Management"],
  },
  {
    title: "Client Onboarding Pipeline",
    description: "New client update automation pushing onboarding data to BA and QA teams with structured notifications.",
    tags: ["Onboarding", "Pipeline", "Team Sync"],
  },
];

const filters = ["All", "ML & Analytics", "Automation", "Web & Tools", "Extensions", "Professional"];

const filterMap: Record<string, string[]> = {
  "ML & Analytics": ["ML", "Machine Learning", "Predictive", "Analytics", "Regression", "Computer Vision", "NLP", "xG", "Random Forest", "scikit-learn"],
  Automation: ["Automation", "Email", "Timesheet", "SMTP", "SharePoint"],
  "Web & Tools": ["Web", "Streamlit", "Full-Stack", "PDF", "TypeScript", "Socket"],
  Extensions: ["Extension", "Browser", "Chrome", "Manifest"],
  Professional: ["Professional", "Go", "Azure", "Docker"],
};

/* ─── PAGE ─── */

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? allProjects
      : allProjects.filter((p) => {
          const keywords = filterMap[filter] || [];
          return keywords.some(
            (kw) =>
              p.category.toLowerCase().includes(kw.toLowerCase()) ||
              p.tech_tags.some((t) => t.toLowerCase().includes(kw.toLowerCase()))
          );
        });

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <>
      <NeuralNetwork paused={false} />

      {/* TOP NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 border-b border-white/[0.06] backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <Link href="/" className="group flex items-center gap-1 font-mono text-base font-bold tracking-tight">
            <span className="text-white group-hover:text-[#00FF41] transition-colors duration-300">PD</span>
            <span className="text-[#00FF41]/50 animate-pulse">_</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-28 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/40 to-transparent" />
              <span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">Projects</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">All Projects</h1>
            <p className="text-gray-500 text-[15px] mb-10 max-w-2xl">
              A collection of ML models, automation tools, full-stack apps, browser extensions, and professional client work.
            </p>
          </motion.div>

          {/* FILTERS */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-mono text-[11px] tracking-wide px-4 py-2 border rounded-sm transition-all duration-300 cursor-pointer ${
                  filter === f
                    ? "bg-[#00FF41] text-black border-[#00FF41] shadow-[0_0_20px_rgba(0,255,65,0.15)]"
                    : "border-white/[0.08] text-gray-500 hover:border-white/[0.2] hover:text-gray-300 bg-white/[0.02]"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* PROJECT GRID */}
          <motion.div initial="hidden" animate="show" variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {filteredProjects.map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] py-12 text-center rounded-lg mb-20">
              <p className="text-gray-600 font-mono text-xs tracking-wider">NO PROJECTS MATCH THIS FILTER</p>
            </div>
          )}

          {/* AUTOMATIONS SECTION */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-gradient-to-r from-[#00FF41]/40 to-transparent" />
              <span className="font-mono text-[11px] text-[#00FF41]/70 tracking-[0.25em] uppercase">Client Work</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Automations</h2>
            <p className="text-gray-500 text-[15px] mb-8 max-w-2xl">
              Workflow automations built for clients at Agility Innovations — Slack integrations, notification pipelines, survey systems, and operational tools.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {automations.map((auto, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-5 rounded-lg hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-md bg-[#00FF41]/[0.08] border border-[#00FF41]/[0.15] flex items-center justify-center">
                      <Zap size={13} className="text-[#00FF41]/70" />
                    </div>
                    <h3 className="font-mono text-[12px] font-semibold text-white tracking-wide">
                      {auto.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-[13px] mb-4 leading-relaxed">
                    {auto.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {auto.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.06] text-gray-600 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.04] mt-20 pt-8">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[10px] text-gray-500 tracking-wider">\u00a9 2025 PREET GHANSHYAM DAVE</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41]/40" />
              <p className="font-mono text-[10px] text-gray-600 tracking-wider">BUILT WITH NEXT.JS + TAILWIND</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
