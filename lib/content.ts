// The site's content, in one place. The About, Work and Projects pages render it,
// the "Ask about my work" bot retrieves from it, and the tech web is drawn from its tags.
// Ids are stable: they are the page anchors (/projects#ledgerlens) and the bot's citations.

// About copy. A string is plain text; { text, href } is a link.
export const about: (string | { text: string; href: string })[][] = [
  ["Hi, I’m Preet Dave."],
  ["Right now I’m an AI/ML engineer at Agility, where I build machine-learning systems with clients and take them from raw data all the way to something running in production."],
  ["I joined as an intern and moved to full-time within a year. Most of what I learned there was not about models. It was about what “it works on my machine” actually costs, and how much of the job is talking to the person who has the problem."],
  ["Before that I interned at a stealth AI startup, where I owned the models and pipelines, built an MVP around reinforcement learning, and helped get it ready for a Y Combinator application. Small team, high trust, and a lot of learning very fast."],
  ["At university I led ", { text: "CodeTransform", href: "https://github.com/iampreetdave-max/code-convertor" }, ", a Python-to-JavaScript converter, from an idea to a state-level presentation. It was the first time I had to design something and build it at the same time."],
  ["These days I build at the edge of ML and real systems: a climate digital twin of India on national datasets, an offline computer-vision platform for a city police cyber-crime branch, and agentic legal AI. I like problems that are a little too big for me and the stubbornness it takes to finish them."],
  ["I also run ", { text: "Tensor Tapri", href: "https://tensortapri.org" }, ", a free weekly AI newsletter for India written from Ahmedabad, and publish ", { text: "open-source Claude Code skills", href: "/skills" }, " that install with one command."],
  ["Outside of work I take things apart to understand how they work, and then ", { text: "write about them", href: "/writing" }, ". Occasionally I lose an afternoon to a hackathon."],
];

export const work = [
  {
    id: "agility-engineer",
    role: "AI/ML Software Engineer, Agility",
    when: "2026 – Now",
    note: "I build machine-learning models directly with clients and get them into real products, owning the problem from data and modelling through to deployment.",
  },
  {
    id: "tensor-tapri-founder",
    role: "Founder, Tensor Tapri",
    href: "https://tensortapri.org",
    when: "2026 – Now",
    note: "A free weekly email on AI, ML, automation and data for India, written from Ahmedabad. Its “What’s brewing” page tracks the week’s AI news and benchmark progress.",
  },
  {
    id: "agility-intern",
    role: "Machine Learning Intern, Agility",
    when: "2025 – 2026",
    note: "Worked on client automation pipelines and predictive models. Moved to full-time after ten months.",
  },
  {
    id: "stealth-startup",
    role: "AI/ML Intern, stealth AI startup",
    when: "2025",
    note: "Owned the models and pipelines, applied reinforcement learning to the product’s core logic, built an MVP end to end, and helped prepare it for a Y Combinator application.",
  },
  {
    id: "gtu-project-lead",
    role: "Project Lead, Gujarat Technological University",
    when: "2023 – 2026",
    note: "Led CodeTransform, a Python-to-JavaScript converter, from inception to a state-level Design Engineering presentation. Designed the architecture while building the product.",
  },
  {
    id: "smart-india-hackathon",
    role: "Team Lead, Smart India Hackathon",
    when: "2024",
    note: "Led a team building a virtual herbal garden with detailed interactive 3D models, presented at the national level.",
  },
];

// `cv` holds extra detail copied verbatim from public/cv.html. The bot reads it; the
// Projects page does not show it. scripts/test-ask.mjs fails if it drifts from the CV.
export const projects: { id: string; name: string; cat: string; href: string | null; note: string; tags: string; cv?: string }[] = [
  { id: "claude-code-skills", name: "Claude Code Skills", cat: "Open Source", href: "https://github.com/iampreetdave-max/agent-skills", note: "My published skills for Claude Code, installed with one command from my own plugin marketplace, one at a time or as senior and student packs. done-gate stops an agent calling work finished until every ask is proven with file:line evidence and audited blind; loop-breaker gets a stuck session out by proving the root cause instead of guessing; honest-model-eval catches data leakage before a model ships; skill-scout finds skills that fit a project and prunes the ones never used. Others cover compliance checks, trustworthy OCR, Make.com automation, hackathon sprints, Android device testing and exam revision.", tags: "Claude Code · Agent Skills · Python · adb · Playwright" },
  { id: "open-data-finder", name: "Open Data Finder", cat: "Agentic AI", href: "https://tensortapri.org/data", note: "Finds real open datasets for a need in plain words, like daily rainfall by district in Gujarat, as a free tool on Tensor Tapri. A small, fast LLM plans the searches, eight open catalogs answer (Hugging Face, Zenodo, NASA Earthdata, Harvard Dataverse and more), every link is fetched before it is listed, and code stops the model adding anything a catalog did not return. In an 18-need benchmark every one of its top links resolved, against 81% for a frontier LLM with web search, at about 1/90th of the cost.", tags: "LLM · Pages Functions · D1 · Catalog APIs" },
  { id: "padosi", name: "Padosi", cat: "Full-Stack", href: null, note: "A peer-to-peer rental marketplace for India: rent drills, cameras or party gear from verified people nearby. Locations are fuzzed and grid-snapped so repeated searches cannot triangulate an address, handovers use photo checks and 6-digit codes, and deposits auto-release 48 hours after return. One typed API serves a Next.js site and an Expo mobile app.", tags: "Next.js · Expo · Hono · Postgres · Drizzle · TypeScript" },
  { id: "q", name: "Q", cat: "Agentic AI", href: null, note: "My meeting agent, in two parts. A bot on my own server joins Google Meet calls, saves the transcript, chat and screen shares into long-term memory, pulls out my action items, and flags risky talk for private review. Ask it what someone promised last month and it answers with verified citations to the exact meeting lines. A desktop copilot, extended from an open-source Electron app, transcribes on-device with Parakeet, drafts answers to questions as they are asked, and feeds every finished meeting into the same memory.", tags: "Python · LiteLLM · SQLite · Attendee · Electron · Parakeet STT" },
  { id: "winwall", name: "WinWall", cat: "Automation", href: null, note: "Keeps a live client-results wall on a website up to date with no developer in the loop. Claude scans Slack for client wins and posts them for approval; one emoji from the team approves a win, which is screenshotted, has reviewer names blurred, and is uploaded to WordPress into the right filter on the live wall. Loom and Wistia case-study videos are picked up automatically. 350+ wins and 390+ images published, all on GitHub Actions schedules.", tags: "Python · Claude API · Slack API · Playwright · WordPress REST · GitHub Actions" },
  { id: "nudge-ai", name: "Nudge AI", cat: "Agentic AI", href: null, note: "Turns every client conversation into actionables, so one manager can lead more account managers and each account manager can handle more clients. It checks whether clients actually understood what was agreed, builds agendas that surface each client’s latest wins, runs mid-week follow-ups with a dashboard scoped to each manager’s own accounts, flags churn risk early, and says which clients to ask for a referral. Built to scale with conversation volume.", tags: "Claude API · Python · Slack API · Google Workspace" },
  { id: "marine-procurement-erp", name: "Marine Procurement ERP", cat: "Document AI", href: null, note: "An AI-native ERP for ship suppliers. RFQs arrive by email or supplier portal and become priced PDF quotations against a master catalogue, then purchase orders. Vendor invoices are extracted by an LLM, checked by a person, and posted into FIFO stock layers that drive client invoicing and payables, with an in-app assistant on top.", tags: "Node.js · React · MongoDB · Mistral · Playwright · Jest" },
  { id: "ledgerlens", name: "LedgerLens", cat: "Document AI", href: "https://github.com/iampreetdave-max/ledgerlens-ai-bank-document-ocr", note: "Bank statements and scanned cheques to a reconciled ledger. Printed fields come straight from the PDF’s text layer, handwriting goes to OCR plus a vision-language model, and deterministic validators check MICR checksums, written-vs-numeric amounts and the closing balance before anything counts as done. Per-bank adapters, an editable grid with Excel export, and an invoice VAT/GL coder share one multi-tenant platform. The public repo is a clean-room version on synthetic data.", tags: "Python · FastAPI · Mistral OCR · Pixtral · PyMuPDF · Supabase" },
  { id: "poker-platform", name: "Real-Time Poker Platform", cat: "Realtime Systems", href: null, note: "A play-money poker app for a private card room: Texas Hold’em and pot-limit Omaha, multi-table play and tournaments on iOS, Android and web. The server is the only authority. Every chip movement runs inside a row-locked Postgres transaction and every state change broadcasts over Socket.IO, so a reconnect always rebuilds from the database.", tags: "Flutter · Next.js · Node.js · Socket.IO · Postgres · Redis" },
  { id: "tensor-tapri", name: "Tensor Tapri", cat: "Community", href: "https://tensortapri.org", note: "A free weekly AI/ML newsletter for India, starting in Ahmedabad. Its “What’s brewing” page ranks the week’s top world and India AI stories by outlet coverage, fed by the AI Race News scraper, alongside Epoch AI benchmark charts served from edge functions.", tags: "Cloudflare Pages · Pages Functions · D1 · Kit" },
  { id: "ai-news-globe", name: "AI News Globe", cat: "Data Viz", href: "https://tensortapri.org/globe", note: "A 3D globe of AI news for Tensor Tapri. Every story from the past 30 days is pinned to the city its outlet is based in, and light beams travel between cities whose outlets covered the same story. Drag or scroll it in any direction. Fed by AI Race News, whose scraper clusters headlines across 110+ sources and exports which outlets covered each one.", tags: "cobe · WebGL · SVG · Pages Functions" },
  { id: "transitops", name: "TransitOps", cat: "Full-Stack", href: null, note: "A fleet operations platform covering dispatch, maintenance, fuel and expenses for four roles, with every business rule enforced inside Postgres so no client can bypass it. Drivers share GPS from a phone browser and positions stream live to the ops map. Hackathon build.", tags: "Next.js · Supabase Realtime · Leaflet · Recharts · Vercel" },
  { id: "therma-netra", name: "Therma Netra", cat: "Climate ML", href: null, note: "An AI digital twin of India’s climate, built entirely on national datasets (IMD, INSAT/MOSDAC, IMDAA, CPCB). One assimilated twin powers climate forecast, urban-heat mitigation, and air-quality apps. Built for ISRO BAH 2026.", tags: "Python · Streamlit · xarray · Climate ML", cv: "One continuously-assimilated twin powers climate state & forecast, urban-heat mitigation, and surface air quality, achieving ~30% forecast skill over a persistence-of-anomaly baseline. Built for ISRO's Bharatiya Antariksh Hackathon (BAH) 2026, Problem Statement #5." },
  { id: "cityshield", name: "CityShield · VisionScan", cat: "Computer Vision", href: "https://github.com/iampreetdave-max/Guardian-Angle", note: "A unified AI policing platform that fuses physical and cyber crime onto one GIS map, forecasts next-week risk, and closes the loop from a live CCTV anomaly to a dispatched patrol, fully offline on CPU. Object tracking with zone and line-crossing analytics, and a per-user English, Hindi and Gujarati interface. 77 backend tests. Built for KANAD S.H.I.E.L.D. 2026.", tags: "FastAPI · React · CLIP · FAISS · YOLOv8 · Docker", cv: "Four CCTV search modes (CLIP to FAISS, ArcFace, YOLOv8), 7 generated statutory documents (en/hi/gu), a 4-layer OWASP middleware, and 77 passing backend tests. Risk model backtested on synthetic data (Hit-Rate@10 0.771, PAI@10 2.31x over 8 weekly folds) as a methodology demonstration. Built for KANAD S.H.I.E.L.D. 2026 with the Cyber Crime Branch, Ahmedabad City Police." },
  { id: "arbiter", name: "Arbiter", cat: "Agentic AI", href: "https://github.com/iampreetdave-max/arbiter", note: "A full-stack AI legal assistant. Gemini agents on Google’s ADK research applicable law in real time and draft citation-backed documents across 6 types and 5 jurisdictions. Deployed on Cloud Run. Built for XPRIZE Build with Gemini.", tags: "Next.js · FastAPI · Gemini · Firebase · Cloud Run", cv: "A full-stack AI legal assistant that turns a problem described in plain English or Hindi into a structured legal document with no upfront lawyer fees." },
  { id: "ai-race-news", name: "AI Race News", cat: "Data Engineering", href: "https://github.com/iampreetdave-max/ai-race-news", note: "A production pipeline that ingests 110+ AI/ML sources every 15 minutes, deduplicates and auto-tags articles, and serves audience-specific feeds through a public FastAPI REST API and a Next.js frontend.", tags: "FastAPI · BeautifulSoup · APScheduler · Docker", cv: "A production platform that ingests 110+ AI/ML sources every 15 minutes via APScheduler, deduplicates with a 3-layer pipeline (URL, content hash, title similarity), auto-tags across 12 categories, and serves 5 audience-specific feeds through a public FastAPI REST API and a Next.js frontend." },
  { id: "nba-predictor", name: "NBA Game Predictor", cat: "Sports ML", href: "https://github.com/iampreetdave-max/basketball-NBA", note: "A fully automated NBA pipeline that runs daily on GitHub Actions. Pre-game team stats and live sportsbook odds go in; two XGBoost regressors predict home and away points, which become moneyline, over/under and spread picks graded against final scores. Over 1,064 settled games: 66.3% moneyline accuracy, and Grade-A over/under picks returned +16.5% ROI across 95 bets.", tags: "XGBoost · Sportradar API · PostgreSQL · GitHub Actions" },
  { id: "soccer-predictor", name: "Soccer Match Predictor", cat: "Sports ML", href: "https://github.com/iampreetdave-max/football-predictions", note: "Scoreline predictions across 10 major leagues, turned into moneyline, over/under 2.5 and both-teams-to-score picks. 21 weighted features feed separate Ridge models for home and away goals, and market-aware grading rewards contrarian picks: +9.1% ROI on A and B grade moneyline picks over 1,473 settled bets. A second-generation Poisson and Elo model, tested walk-forward on 88,061 unseen matches across 38 leagues, now matches the closing line’s accuracy (57.4% on over/under).", tags: "Ridge · Poisson GLM · Elo · FootyStats API · GitHub Actions" },
  { id: "nascar-predictor", name: "NASCAR Race Predictor", cat: "Sports ML", href: "https://github.com/iampreetdave-max/NASCAR-USA", note: "Calibrated win and top-N probabilities for every driver in a race. Road courses, short tracks and superspeedways race differently, so each track type gets its own ensemble of XGBoost, LightGBM, random forest and gradient boosting, trained on 7,566 historical race records and compared live against odds from 9 sportsbooks.", tags: "XGBoost · LightGBM · scikit-learn · Sportradar API" },
  { id: "codetransform", name: "CodeTransform", cat: "Developer Tools", href: "https://github.com/iampreetdave-max/code-convertor", note: "A web code converter between Python and JavaScript built on 122+ tested conversion rules, with auto language detection and confidence scoring. GTU state-level Design Engineering project.", tags: "FastAPI · Python · JavaScript · Tailwind", cv: "Zero-build vanilla-JS + Tailwind frontend on a FastAPI backend. GTU state-level Design Engineering project (Project Lead)." },
  { id: "sky-alerts", name: "Sky Alerts", cat: "Full-Stack", href: null, note: "Subscribe with your location and interests (eclipses, meteor showers, ISS passes, planets, moon phases) and a scheduled Python job emails what is visible in your sky, daily, weekly or for major events only. Includes a no-signup “today’s sky” page and one-click unsubscribe.", tags: "Next.js · Supabase · Python · GitHub Actions" },
  { id: "find-ranks", name: "Find-Ranks", cat: "Utility", href: "https://github.com/iampreetdave-max/Find-Ranks", note: "A Streamlit utility that extracts marks from multiple PDF mark-sheets, computes cumulative performance, and generates rankings with analytics for institutions.", tags: "Streamlit · Python · pandas" },
  { id: "talktonotes", name: "TalkToNotes", cat: "NLP", href: null, note: "A hackathon project that digitizes handwritten and printed notes with TrOCR, then turns them into a searchable knowledge base powering a chatbot and one-click quiz generation.", tags: "TrOCR · Transformers · Vector Search · OCR", cv: "Built for the Rotaract Club Hackathon." },
];

export const automations = [
  { id: "crm-lead-sync", name: "CRM & Lead-Flow Sync", note: "Two-way CRM sync and lead routing across tools, keeping pipelines and contact records consistent automatically.", tags: "GoHighLevel · Make.com" },
  { id: "alerting-pipelines", name: "Notification & Alerting Pipelines", note: "Event-driven Slack and email alerting so the right people are notified the moment a status changes.", tags: "Slack API · Webhooks" },
  { id: "feedback-automation", name: "Survey & Feedback Automation", note: "End-to-end NPS and feedback pipelines: distribution, collection, scoring, and reporting without manual steps.", tags: "Surveys · Analytics" },
  { id: "client-onboarding", name: "Client Onboarding Workflows", note: "Structured onboarding flows that push updates to the right teams and track each step to completion.", tags: "Workflow · Status Tracking" },
  { id: "dynamic-forms", name: "Dynamic Forms & Data Routing", note: "Context-aware forms with cascading fields and rules that route submitted data to the correct destination.", tags: "Forms · Routing" },
  { id: "api-integrations", name: "Cross-Platform API Integrations", note: "Custom webhook and API integrations stitching together services that don’t natively talk to each other.", tags: "n8n · Zapier · REST" },
];

// CV sections the site pages do not carry, copied verbatim from public/cv.html.
// The phone number stays out on purpose.
const cv = [
  { id: "skills-languages", title: "Skills: languages and practice", text: "Languages: Python (advanced), C / C++ (advanced), JavaScript, TypeScript, SQL, HTML/CSS, PHP. Practice: MLOps, model deployment, backtesting & validation, Git." },
  { id: "skills-ml", title: "Skills: machine learning and computer vision", text: "ML & Deep Learning: scikit-learn, XGBoost, LightGBM, TensorFlow, PyTorch, Keras, pandas, NumPy, feature engineering, ensemble methods, regression & classification. Computer Vision: YOLOv8, CLIP, TrOCR, InsightFace / ArcFace, OCR." },
  { id: "skills-ai", title: "Skills: LLMs and agents", text: "AI / LLM & Agents: LLMs, RAG, Claude API, Claude Agent SDK, Model Context Protocol (MCP), Google Gemini ADK, Claude Code skills & plugins, prompt engineering, BM25 retrieval, vector search & embeddings (FAISS, ChromaDB), Mistral OCR / Pixtral, LiteLLM, on-device speech-to-text, NLP." },
  { id: "skills-engineering", title: "Skills: software, data and automation", text: "Backend & Full-stack: FastAPI, Next.js, React, Node.js, Express, Hono, Electron, Expo / React Native, Flutter, Socket.IO, REST APIs, Streamlit. Data & Infrastructure: PostgreSQL / Supabase, MongoDB, Redis, SQLite, Cloudflare Pages / D1, Playwright, Docker, Docker Compose, GitHub Actions / CI, Azure, Google Cloud Run, Netlify, Hugging Face. Automation: Make.com, n8n, Zapier, GoHighLevel, webhook & API integrations." },
  { id: "education", title: "Education", text: "B.Tech, Computer Science & Engineering (AI & ML). NLJIET, Gujarat Technological University (GTU), Ahmedabad, India. Coursework & focus: Large Language Models (LLMs), Data Structures & Algorithms, AI/ML, Mathematics for ML. Coordinator for multiple student-council events, owning end-to-end planning, execution, and marketing. Member of the college research group; co-authoring research papers with classmates." },
  { id: "certifications", title: "Certifications", text: "Building with the Claude API, Anthropic, 2026. Claude Code in Action, Anthropic, 2026. Introduction to Model Context Protocol, Anthropic, 2026. Introduction to Agent Skills, Anthropic, 2026. Data Literacy, IBM, 2026. Crash Course on Python, Google, 2023. Make Automation Certification, Make, 2026." },
  { id: "publications", title: "Publications", text: "Engineers Fear AI, As Mathematicians Once Feared Calculators, authored research paper. Zipf's Law for LLMs, technical essay. How GPS Works, technical essay." },
];

export type Doc = { id: string; title: string; link: string; text: string };

const plain = (p: (typeof about)[number]) => p.map((s) => (typeof s === "string" ? s : s.text)).join("");
const list = (tags: string) => tags.split(" · ").join(", ");

// The bot's corpus: one short doc per row, plus the About copy and the CV-only sections.
export const docs: Doc[] = [
  { id: "about", title: "About", link: "/", text: about.map(plain).join(" ") },
  ...work.map((w) => ({ id: w.id, title: w.role, link: `/work#${w.id}`, text: `${w.role} (${w.when}). ${w.note}` })),
  ...projects.map((p) => ({
    id: p.id, title: p.name, link: `/projects#${p.id}`,
    text: `${p.name} (${p.cat} project). ${p.note}${p.cv ? ` ${p.cv}` : ""} Built with ${list(p.tags)}.`,
  })),
  ...automations.map((a) => ({ id: a.id, title: a.name, link: `/projects#${a.id}`, text: `${a.name} (automation). ${a.note} Tools: ${list(a.tags)}.` })),
  ...cv.map((c) => ({ ...c, link: "/cv.pdf" })),
];

// Tag -> the technologies it stands for. Tags not listed are a technology as written;
// null drops tags that are a method, a data vendor or a generic word, not a technology.
const TECH: Record<string, string[] | null> = {
  "PostgreSQL": ["Postgres"], "Supabase Realtime": ["Supabase"], "Mistral OCR": ["Mistral", "OCR"], "Pixtral": ["Mistral"],
  "Claude API": ["Claude"], "Cloud Run": ["Google Cloud"], "Cloudflare Pages": ["Cloudflare"], "Pages Functions": ["Cloudflare"],
  "D1": ["Cloudflare"], "Slack API": ["Slack"], "WordPress REST": ["WordPress"], "TrOCR": ["OCR"], "Transformers": ["Hugging Face"],
  "Parakeet STT": ["Parakeet"], "Make.com": ["Make"], "Tailwind": ["Tailwind CSS"],
  "Ridge": null, "Poisson GLM": null, "Elo": null, "Climate ML": null, "Vector Search": null, "Sportradar API": null,
  "FootyStats API": null, "Webhooks": null, "REST": null, "Surveys": null, "Analytics": null, "Workflow": null,
  "Status Tracking": null, "Forms": null, "Routing": null,
};

// Every technology in the tags, with the projects (and automations) that use it.
export function techUses() {
  const uses = new Map<string, string[]>();
  for (const p of [...projects, ...automations]) {
    const techs = new Set(p.tags.split(" · ").flatMap((t) => (t in TECH ? TECH[t] ?? [] : [t])));
    techs.forEach((t) => uses.set(t, [...(uses.get(t) ?? []), p.id]));
  }
  return Array.from(uses, ([name, ids]) => ({ name, projects: ids }));
}
