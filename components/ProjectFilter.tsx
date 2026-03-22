"use client";

const filters = ["All", "ML & Analytics", "Automation", "Web & Tools", "Extensions"];

export default function ProjectFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (filter: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`font-mono text-[11px] tracking-wide px-4 py-2 border rounded-sm transition-all duration-300 cursor-pointer ${
            active === filter
              ? "bg-[#00FF41] text-black border-[#00FF41] shadow-[0_0_20px_rgba(0,255,65,0.15)]"
              : "border-white/[0.08] text-gray-500 hover:border-white/[0.2] hover:text-gray-300 bg-white/[0.02]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
