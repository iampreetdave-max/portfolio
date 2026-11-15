import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "AI Debate",
  description: "Debate any motion against an AI that takes the other side, with a neutral AI judge scoring every round. By Preet Dave.",
  path: "/fun",
});

export default function FunLayout({ children }: { children: React.ReactNode }) {
  return children;
}
