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
        // Monochrome surface scale — true blacks rising to near-white
        ink: {
          DEFAULT: "#0A0A0A",
          50:  "#0A0A0A",
          100: "#0E0E0E",
          200: "#141414",
          300: "#1A1A1A",
          400: "#262626",
          500: "#3A3A3A",
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
        bg: "#0A0A0A",
        surface: "rgba(255, 255, 255, 0.025)",
        border: "rgba(255, 255, 255, 0.07)",
        hairline: "rgba(255, 255, 255, 0.04)",
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
