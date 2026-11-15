import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AI Arcade",
  description: "Play against AI: debate any topic with a Claude opponent and a live judge, plus geopolitical market and country-risk games by Preet Dave.",
  path: "/fun",
});

export default function FunLayout({ children }: { children: React.ReactNode }) {
  return children;
}
