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
          className={`font-mono text-[11px] tracking-wide px-4 py-2 border rounded-md transition-all duration-300 cursor-pointer ${
            active === filter
              ? "bg-white text-black border-white"
              : "border-white/[0.10] text-white/50 hover:border-white/[0.25] hover:text-white bg-white/[0.02]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
