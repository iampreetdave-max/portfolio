export const metadata = { title: "Writing · Preet Ghanshyam Dave" };

const writing = [
  {
    title: "Engineers Fear AI, As Mathematicians Once Feared Calculators",
    when: "Paper",
    href: null,
    note: "A comparative look at engineers’ anxiety about AI and the panic mathematicians felt when calculators arrived, and what the historical parallel says about deskilling, trust, and professional identity.",
  },
  {
    title: "Zipf’s Law for LLMs",
    when: "LinkedIn",
    href: "https://www.linkedin.com/posts/iampreetdave_ai-machinelearning-zipfslaw-ugcPost-7358579994941448193-dETg/",
    note: "Why the same power law that governs word frequency in human language keeps showing up in how language models behave.",
  },
  {
    title: "How GPS Works",
    when: "LinkedIn",
    href: "https://www.linkedin.com/posts/iampreetdave_did-you-know-your-phones-gps-finds-you-share-7367498895888732160-unkR/",
    note: "How your phone actually finds you, and why the answer involves relativity.",
  },
];

export default function Writing() {
  return (
    <div className="rowlist">
      {writing.map((a) => (
        <div className="row" key={a.title}>
          <div className="row-main">
            <div className="row-title">
              {a.href ? (
                <a href={a.href} target="_blank" rel="noopener noreferrer">{a.title}</a>
              ) : (
                a.title
              )}
            </div>
            <div className="row-note">{a.note}</div>
          </div>
          <div className="row-when">{a.when}</div>
        </div>
      ))}
    </div>
  );
}
