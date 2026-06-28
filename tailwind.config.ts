import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces — OLED monochrome
        ink:           "#0A0A0B",
        paper:         "#F2F2F3",
        bg:            "#0A0A0B",
        surface:       "#141416",
        "surface-2":   "#1C1C1F",
        line:          "#26262B",
        "line-strong": "#36363D",
        muted:         "#A0A0A6",
        faint:         "#5E5E66",
        // Accent — white / greyscale only
        accent:         "#FFFFFF",
        "accent-strong":"#E6E6E9",
        "accent-soft":  "#C9C9CF",
        cyan:           "#C9C9CF",
        violet:         "#C9C9CF",
        danger:         "#FF6B6B",
      },
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.14), 0 18px 60px -18px rgba(255,255,255,0.18)",
        card: "0 24px 60px -28px rgba(0,0,0,0.85)",
      },
      keyframes: {
        fadeUp:    { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        shimmer:   { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } },
        pulseSoft: { "0%,100%": { opacity: "0.55" }, "50%": { opacity: "1" } },
        gridDrift: { from: { backgroundPosition: "0 0" }, to: { backgroundPosition: "44px 44px" } },
        marquee:   { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        fadeUp:    "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both",
        float:     "float 6s ease-in-out infinite",
        shimmer:   "shimmer 8s linear infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
        gridDrift: "gridDrift 20s linear infinite",
        marquee:   "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
