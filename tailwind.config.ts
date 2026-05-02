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
        // Monochrome surface scale — near-blacks with a barely-warm shift
        ink: {
          DEFAULT: "#0B0908",
          50:  "#0B0908",
          100: "#0F0D0B",
          200: "#14110E",
          300: "#1A1714",
          400: "#272320",
          500: "#3A3530",
        },
        paper: {
          DEFAULT: "#FAFAFA",
          100: "#FAFAFA",
          200: "#D4D4D4",
          300: "#A3A3A3",
          400: "#737373",
          500: "#525252",
          600: "#3F3F3F",
          700: "#2A2A2A",
        },
        // Single brand accent — muted amber
        accent: {
          DEFAULT: "#C9A86A",
          soft:    "#E5C994",
          deep:    "#B8965A",
        },
        bg: "#0B0908",
        // Warm-cream glass surface — white tint replaced with cream tint.
        // Per element the shift is invisible; across the page it reads rich
        // instead of clinical.
        surface: "rgba(255, 250, 240, 0.030)",
        border: "rgba(255, 250, 240, 0.075)",
        hairline: "rgba(255, 250, 240, 0.045)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
