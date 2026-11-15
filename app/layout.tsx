import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
import { SITE, pageMeta } from "@/lib/seo";

const HOME_DESCRIPTION =
  "AI/ML engineer in Ahmedabad, India. Preet Dave builds LLM agents, document AI and ML models that ship, publishes open-source Claude Code skills and runs Tensor Tapri.";
const home = pageMeta({ description: HOME_DESCRIPTION, path: "/" });

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Preet Dave · AI/ML Engineer in Ahmedabad", template: "%s · Preet Dave" },
  icons: { icon: "/icon.svg?v=2" },
  description: HOME_DESCRIPTION,
  keywords: [
    "Preet Dave", "Preet Ghanshyam Dave", "AI engineer Ahmedabad", "AI/ML engineer India", "Machine learning engineer",
    "LLM agents", "Agentic AI", "Claude Code", "Claude Code skills", "Document AI", "OCR", "Computer vision", "RAG",
    "Tensor Tapri", "Ahmedabad", "Gujarat",
  ],
  authors: [{ name: "Preet Dave", url: SITE }],
  creator: "Preet Dave",
  robots: { index: true, follow: true },
  // Social cards only; canonical URLs are set per page, or every page would point at "/".
  openGraph: home.openGraph,
  twitter: home.twitter,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
      </head>
      <body className="antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
