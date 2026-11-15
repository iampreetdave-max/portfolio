// Published Claude Code skills (github.com/iampreetdave-max/agent-skills). Plain data, so the
// server pages and the client pack animation can both import it.
export const REPO = "https://github.com/iampreetdave-max/agent-skills";
export const MARKET = "preet-skills";

export type Skill = {
  id: string;
  note: string; // one paragraph: what it does
  headline: string; // the problem it solves, as people search for it (page title and h1)
  when: string; // short "use when" line for the list
  examples: string[]; // things you can say that make it load
  steps: string[]; // what it actually does, in order
  needs: string; // requirements
};

export const skills: Skill[] = [
  {
    id: "done-gate",
    note: "Stops an agent calling work finished until every ask is rebuilt from your own words, proven with file:line evidence, audited by a second agent that is not told what changed, and passed through the project's own checks.",
    headline: "Make Claude Code prove its work is really done",
    when: "Before anything is reported done, or when you ask \"did you do everything?\"",
    examples: ["Verify everything before you tell me it's done", "Did you do everything I asked?", "Check this is really finished"],
    steps: [
      "Rebuilds the list of asks from your original messages, not from its own summary, so nothing silently drops.",
      "Re-reads every changed file on disk and records file:line evidence for each ask.",
      "Sends one fresh subagent the list of asks only, never what changed, to find the work on its own.",
      "Runs the checks the project already has: type check, lint, tests, build.",
      "Reports a table where a missing item is shown as missing, never as \"mostly done\".",
    ],
    needs: "Nothing extra.",
  },
  {
    id: "loop-breaker",
    note: "Gets a stuck session out of a loop: stop editing, reproduce the failure by hand, test every assumption, prove the root cause with evidence, and hand off to a fresh session when the context itself is the problem.",
    headline: "Stop Claude Code going in circles on a bug",
    when: "The same error keeps coming back, or you say \"still broken\"",
    examples: ["Same error again", "We're going in circles", "Stop and find the real cause"],
    steps: [
      "Stops editing and lists every change made during the loop, offering to revert the unproven ones.",
      "Reproduces the failure itself from a clean state and captures the exact output.",
      "Writes down every assumption as VERIFIED or ASSUMED, then tests each one with a command.",
      "Proves the root cause (what, where at file:line, why, with evidence) before changing any code.",
      "If still stuck, writes a HANDOFF.md so a new session, ideally on a different model, starts from the reproduction.",
    ],
    needs: "Nothing extra.",
  },
  {
    id: "compliance-check",
    note: "Catches compliance gaps before a vibe-coded product ships: reads the code for personal data, payments, third parties and AI features, asks only what the code cannot answer, maps India's DPDP Act, GDPR, the EU AI Act, HIPAA, PCI DSS and more, and pushes a prioritised fix list. Not legal advice.",
    headline: "Catch compliance gaps in vibe-coded apps before launch",
    when: "Before launching, or when adding payments, accounts, AI features or user data",
    examples: ["Is this app compliant?", "What laws apply before I launch?", "Do I need a privacy policy for this?"],
    steps: [
      "Reads the codebase first: schemas and forms for personal data, dependencies and scripts for third parties, payments, AI calls and what lands in logs.",
      "Asks at most seven questions the code cannot answer: where users are, minors, payments, health or financial data, AI decisions about people, marketing messages.",
      "Maps what likely applies, from India's DPDP Act and CERT-In rules to GDPR, the EU AI Act, CCPA, COPPA, HIPAA, PCI DSS, accessibility and messaging consent.",
      "Lists concrete gaps with file:line evidence, such as analytics before consent, card data in logs, or no account deletion.",
      "Sorts fixes into before launch, before scaling and later, offers to make the code fixes, and records everything in COMPLIANCE.md.",
    ],
    needs: "Nothing extra. Not legal advice: confirm high-risk areas with a lawyer.",
  },
  {
    id: "skill-scout",
    note: "Finds skills that fit your project on GitHub, ranked by fit, then health, then stars, with their open issues read. Counts which installed skills you actually use and tells you what to remove.",
    headline: "Find the best Claude Code skills for your project",
    when: "Starting a new project, or the weekly check",
    examples: ["Find skills for this project", "Am I using too many skills?", "Audit my skills"],
    steps: [
      "Profiles the project: stack, domain, and what has been painful.",
      "Counts how often each installed skill was really used, from your local history (names and counts only).",
      "Searches GitHub by topic and for SKILL.md files, then checks stars, last push and open issues.",
      "Reads each candidate's SKILL.md and scripts for red flags before recommending it.",
      "Recommends at most five, flags unused or overlapping skills to remove, and proposes new skills from what you repeat.",
    ],
    needs: "The GitHub CLI (gh), signed in, and Python 3.9+.",
  },
  {
    id: "doc-extraction",
    note: "OCR and document extraction whose numbers you can trust: the PDF's own text first, each page read with context from the one before, and validators (running balance to the cent, checksums, totals) that decide what is correct.",
    headline: "Accurate OCR and document extraction with AI",
    when: "Extracting data from PDFs, scans, statements or invoices",
    examples: ["Extract the transactions from these bank statements", "Which OCR should I use for scanned invoices?", "The totals don't match after OCR"],
    steps: [
      "Reads the PDF's text layer first, and sends only scanned pages to OCR.",
      "Gives the OCR model the previous page's headers, last rows and running totals, so tables that span pages stay intact.",
      "Crops at 300 DPI, asks for a fixed JSON schema, and caches every call.",
      "Checks running balance to the cent, totals, checksums and amounts in words before anything counts as done.",
      "Keeps one adapter per layout and a human review step for what fails a check.",
    ],
    needs: "Nothing extra. Python with PyMuPDF helps.",
  },
  {
    id: "make-automation",
    note: "Make.com automations done right: when to use Make, Python or both, webhooks between them, Microsoft Teams, a human approval step, never acting twice, dry runs and error handling.",
    headline: "Build reliable Make.com automations with AI",
    when: "Building or fixing a Make scenario",
    examples: ["Build a Make scenario that posts approved wins to Teams", "Should this be Make or Python?", "My Make webhook fires twice"],
    steps: [
      "Checks Make's current docs for the modules involved before designing anything.",
      "Decides Make, Python or both, with Python doing the hard logic and Make doing the delivery.",
      "Secures webhooks with a shared secret and sends an idempotency key with every payload.",
      "Adds an approval step before anything goes out, and a data store so nothing runs twice.",
      "Builds in dry-run mode, error handlers and alerts, and exports the blueprint to git.",
    ],
    needs: "A Make.com account.",
  },
  {
    id: "honest-model-eval",
    note: "Stops vibe-coded ML models from leaking: audit the data first, check every feature exists at prediction time, split by time, beat the market, and report calibrated results with their uncertainty.",
    headline: "Catch data leakage in AI-built ML models",
    when: "Building or reviewing a predictive model",
    examples: ["Build a model to predict match winners from this CSV", "Is my model leaking?", "Why does it score 92% offline and fail live?"],
    steps: [
      "Runs a data audit script: size, balance, duplicates, ID columns and leak suspects.",
      "Writes a column dictionary marked VERIFIED or ASSUMED, and asks before trusting the assumed ones.",
      "Checks that every feature really exists at the moment of prediction, pre-match models especially.",
      "Splits by time (walk-forward) and scores the baselines, including the market, before the model.",
      "Reports calibration, confidence intervals, and what was dropped for leakage.",
    ],
    needs: "Python with pandas.",
  },
  {
    id: "hackathon-sprint",
    note: "Building to win a hackathon with an AI agent: the hard category, open source and papers first, one flawless demo path, a real deployed URL, and a sleek deck with a rehearsed three-minute demo.",
    headline: "Win a hackathon with an AI coding agent",
    when: "Entering a hackathon or a demo day",
    examples: ["We have a hackathon this weekend", "Help me pick a problem statement", "Make our demo flawless"],
    steps: [
      "Reads the rules and judging criteria, and weighs the hardest, least crowded category.",
      "Finds what already exists in open source and papers, and builds on top of it.",
      "Cuts scope to one demo path, with seed data and mocks for the slow or paid parts.",
      "Deploys to a real URL and makes it feel real.",
      "Writes a three-minute demo script, a backup video plan and a submission checklist.",
    ],
    needs: "Nothing extra.",
  },
  {
    id: "android-device-test",
    note: "Tests your app on a real Android phone over adb: installs the build, taps real UI elements, cuts the network, kills the process, and reports pass or fail with screenshots and logs.",
    headline: "Let Claude Code test your app on a real Android phone",
    when: "\"Test it on my phone\"",
    examples: ["Test it on my phone", "Install the build and check login", "Does it survive losing network?"],
    steps: [
      "Checks the phone is connected and authorised over adb.",
      "Builds and installs the app (Flutter, native Gradle, React Native or Expo).",
      "Taps real elements found in the view hierarchy, not guessed pixels, and screenshots every step.",
      "Runs cold start, network loss, background and return, process death and rotation.",
      "Reports pass or fail per flow with screenshots and log excerpts, and restores the phone's settings.",
    ],
    needs: "adb (Android platform-tools) and a phone with USB debugging on, or an emulator.",
  },
  {
    id: "exam-sheet",
    note: "Turns a syllabus and past papers into one printable revision page, chapters ranked by the marks they actually carried, every topic an exam-ready answer with a hand-drawn diagram.",
    headline: "Turn past papers into a ranked revision sheet",
    when: "Exam prep for any subject, with notes for GTU",
    examples: ["Make a revision sheet for Big Data Analytics", "Which chapters carry the most marks?", "Important questions for NLP"],
    steps: [
      "Reads the real syllabus and says exactly what the exam covers.",
      "Counts marks per unit across every past paper, OR questions included, and ranks chapters by them.",
      "Flags overdue topics that carry weight but have not come up lately.",
      "Writes every topic as eight blocks, from definition to how to answer it, with a hand-drawn SVG diagram.",
      "Builds one offline HTML page and runs a verifier that catches broken diagrams.",
    ],
    needs: "Python 3.9+. Playwright optional, for layout checks.",
  },
];

export const packs: { id: string; blurb: string; members: string[] }[] = [
  { id: "all-skills", blurb: "everything", members: skills.map((s) => s.id) },
  { id: "senior-pack", blurb: "for working engineers", members: ["done-gate", "loop-breaker", "compliance-check", "skill-scout", "doc-extraction", "make-automation", "honest-model-eval"] },
  { id: "student-pack", blurb: "for students", members: ["hackathon-sprint", "exam-sheet", "done-gate", "loop-breaker"] },
];
