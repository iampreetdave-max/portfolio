"use client";

import { ArrowUpRight } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech_tags: string[];
  repo_url?: string | null;
  demo_url?: string | null;
}

export default function ProjectCard({ project }: { project: Project }) {
  const linkUrl = project.repo_url || "https://github.com/iampreetdave";

  return (
    <div className="group bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 rounded-lg hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_0_40px_rgba(0,255,65,0.04)] transition-all duration-500">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
        <span className="font-mono text-[10px] tracking-wider text-[#00FF41]/40 mt-1">
          0{project.id}
        </span>
      </div>
      <span className="inline-block font-mono text-[11px] px-2.5 py-1 border border-[#00FF41]/15 text-[#00FF41]/60 mb-4 tracking-wide rounded-sm bg-[#00FF41]/[0.03]">
        {project.category}
      </span>
      <p className="text-gray-400 text-sm mb-5 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tech_tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] px-2 py-0.5 border border-white/[0.06] text-gray-600 rounded-sm group-hover:border-white/[0.1] group-hover:text-gray-500 transition-all duration-500"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-xs border border-white/[0.1] px-4 py-1.5 text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded-sm cursor-pointer"
      >
        View Source
        <ArrowUpRight size={12} />
      </a>
    </div>
  );
}
