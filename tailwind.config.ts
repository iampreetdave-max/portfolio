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
        "t-bg":     "#050505",
        "t-bg2":    "#0A0A0A",
        "t-bg3":    "#111111",
        "t-border": "#1C1C1C",
        "t-green":  "#00D96E",
        "t-amber":  "#F5A623",
        "t-white":  "#E2E2E2",
        "t-gray":   "#666666",
        "t-dim":    "#333333",
        "t-red":    "#FF4444",
        "t-cyan":   "#00D4FF",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
      },
      keyframes: {
        blink:    { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        scanline: { "0%": { transform: "translateY(-80px)" }, "100%": { transform: "translateY(100vh)" } },
        glow:     { from: { textShadow: "0 0 4px #00D96E" }, to: { textShadow: "0 0 14px #00D96E, 0 0 28px rgba(0,217,110,0.35)" } },
        fadeUp:   { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        flicker:  { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.97" } },
      },
      animation: {
        blink:    "blink 1s step-end infinite",
        scanline: "scanline 8s linear infinite",
        glow:     "glow 2.5s ease-in-out infinite alternate",
        fadeUp:   "fadeUp 0.3s ease-out",
        flicker:  "flicker 0.15s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
