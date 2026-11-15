// Published Claude Code skills (github.com/iampreetdave-max/agent-skills). Plain data, so the
// server page and the client pack animation can both import it.
export const REPO = "https://github.com/iampreetdave-max/agent-skills";
export const MARKET = "preet-skills";

export type Skill = { id: string; note: string; when: string };

export const skills: Skill[] = [
  { id: "done-gate", note: "Stops an agent calling work finished until every ask is rebuilt from your own words, proven with file:line evidence, audited by a second agent that is not told what changed, and passed through the project's own checks.", when: "Before anything is reported done, or when you ask \"did you do everything?\"" },
  { id: "loop-breaker", note: "Gets a stuck session out of a loop: stop editing, reproduce the failure by hand, test every assumption, prove the root cause with evidence, and hand off to a fresh session when the context itself is the problem.", when: "The same error keeps coming back, or you say \"still broken\"" },
  { id: "skill-scout", note: "Finds skills that fit your project on GitHub, ranked by fit, then health, then stars, with their open issues read. Counts which installed skills you actually use and tells you what to remove.", when: "Starting a new project, or the weekly check" },
  { id: "doc-extraction", note: "OCR and document extraction whose numbers you can trust: the PDF's own text first, each page read with context from the one before, and validators (running balance to the cent, checksums, totals) that decide what is correct.", when: "Extracting data from PDFs, scans, statements or invoices" },
  { id: "make-automation", note: "Make.com automations done right: when to use Make, Python or both, webhooks between them, Microsoft Teams, a human approval step, never acting twice, dry runs and error handling.", when: "Building or fixing a Make scenario" },
  { id: "honest-model-eval", note: "Stops vibe-coded ML models from leaking: audit the data first, check every feature exists at prediction time, split by time, beat the market, and report calibrated results with their uncertainty.", when: "Building or reviewing a predictive model" },
  { id: "hackathon-sprint", note: "Building to win a hackathon with an AI agent: the hard category, open source and papers first, one flawless demo path, a real deployed URL, and a sleek deck with a rehearsed three-minute demo.", when: "Entering a hackathon or a demo day" },
  { id: "android-device-test", note: "Tests your app on a real Android phone over adb: installs the build, taps real UI elements, cuts the network, kills the process, and reports pass or fail with screenshots and logs.", when: "\"Test it on my phone\"" },
  { id: "exam-sheet", note: "Turns a syllabus and past papers into one printable revision page, chapters ranked by the marks they actually carried, every topic an exam-ready answer with a hand-drawn diagram.", when: "Exam prep for any subject, with notes for GTU" },
];

export const packs: { id: string; blurb: string; members: string[] }[] = [
  { id: "all-skills", blurb: "everything", members: skills.map((s) => s.id) },
  { id: "senior-pack", blurb: "for working engineers", members: ["done-gate", "loop-breaker", "skill-scout", "doc-extraction", "make-automation", "honest-model-eval"] },
  { id: "student-pack", blurb: "for students", members: ["hackathon-sprint", "exam-sheet", "done-gate", "loop-breaker"] },
];
