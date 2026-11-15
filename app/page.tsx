import { about } from "@/lib/content";
import { techWeb } from "@/lib/techweb";
import TechWeb from "@/components/TechWeb";
import AskBox from "@/components/AskBox";

export default function About() {
  return (
    <>
      <div className="prose">
        {about.map((para, i) => (
          <p key={i}>
            {para.map((s, j) =>
              typeof s === "string" ? s : s.href.startsWith("http")
                ? <a key={j} href={s.href} target="_blank" rel="noopener noreferrer">{s.text}</a>
                : <a key={j} href={s.href}>{s.text}</a>,
            )}
          </p>
        ))}
      </div>

      <h2 className="sec-label">What I work with</h2>
      <TechWeb web={techWeb()} />

      <h2 className="sec-label">Ask about my work</h2>
      <AskBox />
    </>
  );
}
