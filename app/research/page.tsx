import PaperCards from "@/components/PaperCards";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Research",
  description: "Research papers by Preet Ghanshyam Dave on betting markets, playlist shuffle, AI assistants, scam e-mail and dataset search, each with the PDF, key results and an interactive demo.",
  path: "/research",
});

export default function Research() {
  return (
    <>
      <h1 className="sr-only">Research papers by Preet Ghanshyam Dave</h1>
      <PaperCards />
    </>
  );
}
