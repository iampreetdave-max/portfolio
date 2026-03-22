"use client";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech_tags: string[];
  repo_url?: string | null;
  demo_url?: string | null;
}

export default function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] p-6 rounded-lg hover:bg-white/[0.04] hover:border-white/[0.1] hover:shadow-[0_0_40px_rgba(0,255,65,0.04)] transition-all duration-500 cursor-pointer h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold group-hover:text-white transition-colors duration-300 leading-tight">
          {project.title}
        </h3>
      </div>
      <span className="inline-block self-start font-mono text-[10px] px-2 py-0.5 border border-[#00FF41]/15 text-[#00FF41]/60 mb-3 tracking-wide rounded-sm bg-[#00FF41]/[0.03]">
        {project.category}
      </span>
      <p className="text-gray-400 text-[13px] mb-4 leading-relaxed flex-grow">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech_tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] px-2 py-0.5 border border-white/[0.06] text-gray-600 rounded-sm group-hover:border-white/[0.1] group-hover:text-gray-500 transition-all duration-500"
          >
            {tag}
          </span>
        ))}
        {project.tech_tags.length > 4 && (
          <span className="font-mono text-[9px] px-2 py-0.5 text-gray-600">+{project.tech_tags.length - 4}</span>
        )}
      </div>
    </div>
  );
}
