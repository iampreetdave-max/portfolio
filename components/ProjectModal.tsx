"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
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
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/[0.1] rounded-2xl max-h-[88vh] overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.1] text-gray-500 hover:text-white hover:border-white/[0.25] transition-all cursor-pointer z-10 bg-black/60 backdrop-blur-sm"
          aria-label="Close"
        >
          <X size={15} />
        </button>

        {project.image_url && (
          <div className="relative w-full h-60 overflow-hidden rounded-t-2xl">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <span className="inline-block font-mono text-[10px] px-3 py-1 border border-[#00FF41]/20 text-[#00FF41]/70 mb-4 tracking-[0.2em] rounded-full bg-[#00FF41]/[0.05] uppercase">
            {project.category}
          </span>

          <h2 className="text-2xl md:text-[28px] font-black mb-5 tracking-tight pr-8 leading-tight">
            {project.title}
          </h2>

          <div className="text-gray-300 text-[14px] leading-[1.9] mb-6 whitespace-pre-line">
            {project.longDescription}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tech_tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2.5 py-1 border border-white/[0.08] text-gray-400 rounded-md bg-white/[0.02]"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.repo_url ? (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] border border-[#00FF41]/50 text-[#00FF41] px-6 py-3 hover:bg-[#00FF41] hover:text-black transition-all duration-300 rounded-lg cursor-pointer uppercase"
            >
              View Repository
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-mono text-[11px] text-gray-600 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-700" />
              Confidential &middot; Production Project
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
