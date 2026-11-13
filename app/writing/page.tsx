export const metadata = { title: "Writing · Preet Ghanshyam Dave" };

const GA = "https://github.com/iampreetdave-max/Guardian-Angle/blob/main/docs/";

const writing = [
  {
    title: "Tensor Tapri",
    when: "Weekly",
    href: "https://tensortapri.org",
    note: "My weekly email on AI, ML, automation and data for India, written from Ahmedabad and sent every Monday. Each issue picks the five AI stories that matter for India that week and says why each one matters here.",
  },
  {
    title: "Prior Art and Positioning: Where Crime Hotspot Forecasting Comes From",
    when: "CityShield",
    href: `${GA}PRIOR_ART.md`,
    note: "Twenty years of hotspot-forecasting research, from near-repeat victimisation onward, with every claim sourced and dated, and a straight answer to what in my own system is actually new.",
  },
  {
    title: "Ablation Study of a Crime-Forecasting Model",
    when: "CityShield",
    href: `${GA}ABLATION.md`,
    note: "Six components removed one at a time, with bootstrap confidence intervals. Only recency decay made a measurable difference, and a couple of components pointed the wrong way.",
  },
  {
    title: "Security Testing Report",
    when: "CityShield",
    href: `${GA}SECURITY_TESTING_REPORT.md`,
    note: "A white-box review of an AI policing platform: middleware, upload and SSRF guards, LLM guards and auth hardening, each backed by an automated regression test.",
  },
  {
    title: "System Architecture of an Offline AI Policing Platform",
    when: "CityShield",
    href: `${GA}ARCHITECTURE.md`,
    note: "Every box in the diagrams mapped to a real file: how complaints, CCTV and government feeds flow through explainable engines to an officer’s screen.",
  },
  {
    title: "AI Where Needed, Determinism Where Not",
    when: "LedgerLens",
    href: "https://github.com/iampreetdave-max/ledgerlens-ai-bank-document-ocr#design-principle-ai-where-needed-determinism-where-not",
    note: "Why bank-document OCR should let models read and plain code check: matching written and numeric amounts, MICR checksums and balance reconciliation are solved problems, not guesses.",
  },
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
