"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/components/ProjectCard";
import { ArrowUpRight, X } from "lucide-react";
import GitHubBadge from "@/components/GitHubBadge";

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
        className="relative w-full max-w-2xl bg-[#0F0D0B] border border-white/[0.12] rounded-2xl max-h-[88vh] overflow-y-auto shadow-2xl"
        style={{ boxShadow: "0 40px 80px -20px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,250,240,0.06)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.12] text-white/55 hover:text-white hover:border-white/[0.30] transition-all cursor-pointer z-10 bg-black/60 backdrop-blur-sm"
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
              style={{ filter: "saturate(1.04) contrast(1.02)" }}
            />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0F0D0B] to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8">
          <span className="inline-block font-mono text-[10px] px-3 py-1 border border-[#C9A86A]/35 text-[#C9A86A] mb-4 tracking-[0.2em] rounded-full bg-[#C9A86A]/[0.08] uppercase">
            {project.category}
          </span>

          <h2 className="text-2xl md:text-[28px] font-black mb-5 tracking-tight pr-8 leading-tight text-white">
            {project.title}
          </h2>

          <div className="text-white/75 text-[14px] leading-[1.9] mb-6 whitespace-pre-line">
            {project.longDescription}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tech_tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] px-2.5 py-1 border border-white/[0.10] text-white/65 rounded-md bg-white/[0.025]"
              >
                {tag}
              </span>
            ))}
          </div>

          <GitHubBadge repoUrl={project.repo_url} />

          <div className="mt-7">
            {project.repo_url ? (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] border border-white/80 text-white px-6 py-3 hover:bg-[#C9A86A] hover:text-black hover:border-[#C9A86A] transition-all duration-300 rounded-lg cursor-pointer uppercase"
              >
                View Repository
                <ArrowUpRight size={14} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 font-mono text-[11px] text-white/45 tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]/55" />
                Confidential &middot; Production Project
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
