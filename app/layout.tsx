import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

const DESCRIPTION =
  "Preet Dave is an AI/ML engineer in Ahmedabad, India, building applied machine learning, LLM and agentic-AI systems: a national-dataset climate digital twin, an offline computer-vision platform for city police, agentic legal AI, and an AI-news pipeline ingesting 110+ sources every 15 minutes.";

export const metadata: Metadata = {
  metadataBase: new URL("https://iampreetdave.me"),
  title: {
    default: "Preet Dave · AI/ML Engineer in Ahmedabad",
    template: "%s · Preet Dave",
  },
  icons: { icon: "/icon.svg" },
  description: DESCRIPTION,
  applicationName: "Preet Dave",
  keywords: [
    "Preet Dave", "Preet Ghanshyam Dave",
    "AI Engineer", "ML Engineer", "Machine Learning Engineer",
    "AI/ML Engineer Ahmedabad", "Machine Learning Engineer India",
    "Deep Learning", "LLM", "Agentic AI", "Computer Vision", "NLP", "RAG",
    "Model Context Protocol", "MLOps", "Portfolio",
  ],
  authors: [{ name: "Preet Ghanshyam Dave", url: "https://iampreetdave.me" }],
  creator: "Preet Ghanshyam Dave",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "https://iampreetdave.me",
    siteName: "Preet Dave",
    title: "Preet Dave · AI/ML Engineer in Ahmedabad",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Preet Dave · AI/ML Engineer in Ahmedabad",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Structured data. This is what actually helps search engines understand who you
// are and what you do, far more than a keywords meta tag (which Google ignores).
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Preet Ghanshyam Dave",
  alternateName: "Preet Dave",
  url: "https://iampreetdave.me",
  image: "https://iampreetdave.me/icon.svg",
  jobTitle: "AI/ML Engineer",
  email: "mailto:iampreetdave@gmail.com",
  worksFor: { "@type": "Organization", name: "Agility" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Gujarat Technological University",
  },
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Large Language Models",
    "Agentic AI",
    "Computer Vision",
    "Natural Language Processing",
    "Retrieval-Augmented Generation",
    "MLOps",
    "Python",
    "PyTorch",
    "TensorFlow",
  ],
  sameAs: [
    "https://github.com/iampreetdave-max",
    "https://www.linkedin.com/in/preet-dave-452023271/",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
