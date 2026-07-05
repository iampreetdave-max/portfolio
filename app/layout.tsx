import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://iampreetdave.me"),
  title: "Preet Ghanshyam Dave Portfolio",
  description:
    "Preet Ghanshyam Dave is an AI/ML engineer in Ahmedabad building applied machine-learning and agentic-AI systems: a national-dataset climate digital twin, an offline computer-vision policing platform, agentic legal AI, and an AI-news pipeline ingesting 110+ sources every 15 minutes.",
  keywords: [
    "Preet Dave", "Preet Ghanshyam Dave", "AI Engineer", "Machine Learning Engineer",
    "Deep Learning", "LLM", "Agentic AI", "Computer Vision", "NLP", "RAG", "MCP", "Portfolio", "Ahmedabad",
  ],
  authors: [{ name: "Preet Ghanshyam Dave", url: "https://github.com/iampreetdave-max" }],
  creator: "Preet Ghanshyam Dave",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://iampreetdave.me",
    siteName: "Preet Ghanshyam Dave Portfolio",
    title: "Preet Ghanshyam Dave Portfolio",
    description:
      "Applied machine-learning and agentic-AI systems across climate, public safety, law, and media. Built for ISRO BAH 2026, KANAD S.H.I.E.L.D. 2026, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Preet Ghanshyam Dave Portfolio",
    description:
      "Applied machine-learning and agentic-AI systems across climate, public safety, law, and media.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="antialiased">
        <div className="bg-ambient" aria-hidden />
        <div className="bg-grid" aria-hidden />
        {children}
      </body>
    </html>
  );
}
