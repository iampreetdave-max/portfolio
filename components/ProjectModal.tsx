"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/components/ProjectCard";
import { ArrowUpRight, X } from "lucide-react";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/[0.08] rounded-lg p-6 md:p-8 max-h-[85vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md border border-white/[0.08] text-gray-500 hover:text-white hover:border-white/[0.2] transition-all cursor-pointer"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <span className="inline-block font-mono text-[11px] px-2.5 py-1 border border-[#00FF41]/15 text-[#00FF41]/60 mb-4 tracking-wide rounded-sm bg-[#00FF41]/[0.03]">
          {project.category}
        </span>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight pr-8">
          {project.title}
        </h2>

        <p className="text-gray-300 text-[15px] leading-[1.85] mb-6">
          {project.longDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tech_tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] px-2.5 py-1 border border-white/[0.08] text-gray-400 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.repo_url && (
          <a
            href={project.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wider border border-[#00FF41]/40 text-[#00FF41] px-6 py-3 hover:bg-[#00FF41] hover:text-black transition-all duration-300 rounded-sm cursor-pointer"
          >
            VIEW REPOSITORY
            <ArrowUpRight size={14} />
          </a>
        )}
        {!project.repo_url && (
          <span className="inline-block font-mono text-[11px] text-gray-600 tracking-wider">
            Private / Client Project
          </span>
        )}
      </motion.div>
    </div>
  );
}
