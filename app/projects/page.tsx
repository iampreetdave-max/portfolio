// Minimal projects + automations list (dhruvchauhan.me style). Static; theme and
// header come from globals.css / SiteHeader.
import {
  Anchor, AudioLines, BrainCircuit, Cctv, CloudSun, CodeXml, Coffee, Flag, Goal, Handshake,
  Medal, Newspaper, NotebookPen, Scale, ScanText, Spade, Telescope, Trophy, Truck,
  createLucideIcon, type LucideIcon,
} from "lucide-react";

// lucide has no basketball; drawn in its 24px line style so it matches the rest
const Basketball = createLucideIcon("Basketball", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "ball" }],
  ["path", { d: "M12 2v20M2 12h20M4.9 4.9C7.5 7.6 8.5 9.8 8.5 12s-1 4.4-3.6 7.1M19.1 4.9C16.5 7.6 15.5 9.8 15.5 12s1 4.4 3.6 7.1", key: "seams" }],
]);

const ICONS: Record<string, LucideIcon> = {
  "Padosi": Handshake,
  "Q": AudioLines,
  "WinWall": Trophy,
  "CallBrain": BrainCircuit,
  "Marine Procurement ERP": Anchor,
  "LedgerLens": ScanText,
  "Real-Time Poker Platform": Spade,
  "Tensor Tapri": Coffee,
  "TransitOps": Truck,
  "Therma Netra": CloudSun,
  "CityShield · VisionScan": Cctv,
  "Arbiter": Scale,
  "AI Race News": Newspaper,
  "NBA Game Predictor": Basketball,
  "Soccer Match Predictor": Goal,
  "NASCAR Race Predictor": Flag,
  "CodeTransform": CodeXml,
  "Sky Alerts": Telescope,
  "Find-Ranks": Medal,
  "TalkToNotes": NotebookPen,
};

const projects = [
  { name: "Padosi", cat: "Full-Stack", href: null, note: "A peer-to-peer rental marketplace for India: rent drills, cameras or party gear from verified people nearby. Locations are fuzzed and grid-snapped so repeated searches cannot triangulate an address, handovers use photo checks and 6-digit codes, and deposits auto-release 48 hours after return. One typed API serves a Next.js site and an Expo mobile app.", tags: "Next.js · Expo · Hono · Postgres · Drizzle · TypeScript" },
  { name: "Q", cat: "Agentic AI", href: null, note: "My meeting agent, in two parts. A bot on my own server joins Google Meet calls, saves the transcript, chat and screen shares into long-term memory, pulls out my action items, and flags risky talk for private review. Ask it what someone promised last month and it answers with verified citations to the exact meeting lines. A desktop copilot, extended from an open-source Electron app, transcribes on-device with Parakeet, drafts answers to questions as they are asked, and feeds every finished meeting into the same memory.", tags: "Python · LiteLLM · SQLite · Attendee · Electron · Parakeet STT" },
  { name: "WinWall", cat: "Automation", href: null, note: "Keeps a live client-results wall on a website up to date with no developer in the loop. Claude scans Slack for client wins and posts them for approval; one emoji from the team approves a win, which is screenshotted, has reviewer names blurred, and is uploaded to WordPress into the right filter on the live wall. Loom and Wistia case-study videos are picked up automatically. 355 wins and 390+ images published so far, all on GitHub Actions schedules.", tags: "Python · Claude API · Slack API · Playwright · WordPress REST · GitHub Actions" },
  { name: "CallBrain", cat: "Agentic AI", href: null, note: "A team of LLM agents that listens to every client call, built for 60 to 90 calls a day. Multilingual call scoring that checks whether the client actually understood, pre-call agendas with a win detector, mid-week follow-up check-ins with a dashboard scoped to each manager’s own clients, churn-risk bands and referral prompts.", tags: "Claude API · Python · Slack API · Google Workspace" },
  { name: "Marine Procurement ERP", cat: "Document AI", href: null, note: "An AI-native ERP for ship suppliers. RFQs arrive by email or supplier portal and become priced PDF quotations against a master catalogue, then purchase orders. Vendor invoices are extracted by an LLM, checked by a person, and posted into FIFO stock layers that drive client invoicing and payables, with an in-app assistant on top.", tags: "Node.js · React · MongoDB · Mistral · Playwright · Jest" },
  { name: "LedgerLens", cat: "Document AI", href: "https://github.com/iampreetdave-max/ledgerlens-ai-bank-document-ocr", note: "Bank statements and scanned cheques to a reconciled ledger. Printed fields come straight from the PDF’s text layer, handwriting goes to OCR plus a vision-language model, and deterministic validators check MICR checksums, written-vs-numeric amounts and the closing balance before anything counts as done. Per-bank adapters, an editable grid with Excel export, and an invoice VAT/GL coder share one multi-tenant platform. The public repo is a clean-room version on synthetic data.", tags: "Python · FastAPI · Mistral OCR · Pixtral · PyMuPDF · Supabase" },
  { name: "Real-Time Poker Platform", cat: "Realtime Systems", href: null, note: "A play-money poker app for a private card room: Texas Hold’em and pot-limit Omaha, multi-table play and tournaments on iOS, Android and web. The server is the only authority. Every chip movement runs inside a row-locked Postgres transaction and every state change broadcasts over Socket.IO, so a reconnect always rebuilds from the database.", tags: "Flutter · Next.js · Node.js · Socket.IO · Postgres · Redis" },
  { name: "Tensor Tapri", cat: "Community", href: "https://tensortapri.org", note: "A free weekly AI/ML newsletter for India, starting in Ahmedabad. Its “What’s brewing” page ranks the week’s top world and India AI stories by outlet coverage, fed by the AI Race News scraper, alongside Epoch AI benchmark charts served from edge functions.", tags: "Cloudflare Pages · Pages Functions · D1 · Kit" },
  { name: "TransitOps", cat: "Full-Stack", href: null, note: "A fleet operations platform covering dispatch, maintenance, fuel and expenses for four roles, with every business rule enforced inside Postgres so no client can bypass it. Drivers share GPS from a phone browser and positions stream live to the ops map. Hackathon build.", tags: "Next.js · Supabase Realtime · Leaflet · Recharts · Vercel" },
  { name: "Therma Netra", cat: "Climate ML", href: null, note: "An AI digital twin of India’s climate, built entirely on national datasets (IMD, INSAT/MOSDAC, IMDAA, CPCB). One assimilated twin powers climate forecast, urban-heat mitigation, and air-quality apps. Built for ISRO BAH 2026.", tags: "Python · Streamlit · xarray · Climate ML" },
  { name: "CityShield · VisionScan", cat: "Computer Vision", href: "https://github.com/iampreetdave-max/Guardian-Angle", note: "A unified AI policing platform that fuses physical and cyber crime onto one GIS map, forecasts next-week risk, and closes the loop from a live CCTV anomaly to a dispatched patrol, fully offline on CPU. Object tracking with zone and line-crossing analytics, and a per-user English, Hindi and Gujarati interface. 77 backend tests. Built for KANAD S.H.I.E.L.D. 2026.", tags: "FastAPI · React · CLIP · FAISS · YOLOv8 · Docker" },
  { name: "Arbiter", cat: "Agentic AI", href: "https://github.com/iampreetdave-max/arbiter", note: "A full-stack AI legal assistant. Gemini agents on Google’s ADK research applicable law in real time and draft citation-backed documents across 6 types and 5 jurisdictions. Deployed on Cloud Run. Built for XPRIZE Build with Gemini.", tags: "Next.js · FastAPI · Gemini · Firebase · Cloud Run" },
  { name: "AI Race News", cat: "Data Engineering", href: "https://github.com/iampreetdave-max/ai-race-news", note: "A production pipeline that ingests 110+ AI/ML sources every 15 minutes, deduplicates and auto-tags articles, and serves audience-specific feeds through a public FastAPI REST API and a Next.js frontend.", tags: "FastAPI · BeautifulSoup · APScheduler · Docker" },
  { name: "NBA Game Predictor", cat: "Sports ML", href: "https://github.com/iampreetdave-max/basketball-NBA", note: "A fully automated NBA pipeline that runs daily on GitHub Actions. Pre-game team stats and live sportsbook odds go in; two XGBoost regressors predict home and away points, which become moneyline, over/under and spread picks graded against final scores. Over 1,064 settled games: 66.3% moneyline accuracy, and Grade-A over/under picks returned +16.5% ROI across 95 bets.", tags: "XGBoost · Sportradar API · PostgreSQL · GitHub Actions" },
  { name: "Soccer Match Predictor", cat: "Sports ML", href: "https://github.com/iampreetdave-max/football-predictions", note: "Scoreline predictions across 10 major leagues, turned into moneyline, over/under 2.5 and both-teams-to-score picks. 21 weighted features feed separate Ridge models for home and away goals, and market-aware grading rewards contrarian picks: +9.1% ROI on A and B grade moneyline picks over 1,473 settled bets. A second-generation Poisson and Elo model, tested walk-forward on 88,061 unseen matches across 38 leagues, now matches the closing line’s accuracy (57.4% on over/under).", tags: "Ridge · Poisson GLM · Elo · FootyStats API · GitHub Actions" },
  { name: "NASCAR Race Predictor", cat: "Sports ML", href: "https://github.com/iampreetdave-max/NASCAR-USA", note: "Calibrated win and top-N probabilities for every driver in a race. Road courses, short tracks and superspeedways race differently, so each track type gets its own ensemble of XGBoost, LightGBM, random forest and gradient boosting, trained on 7,566 historical race records and compared live against odds from 9 sportsbooks.", tags: "XGBoost · LightGBM · scikit-learn · Sportradar API" },
  { name: "CodeTransform", cat: "Developer Tools", href: "https://github.com/iampreetdave-max/code-convertor", note: "A web code converter between Python and JavaScript built on 122+ tested conversion rules, with auto language detection and confidence scoring. GTU state-level Design Engineering project.", tags: "FastAPI · Python · JavaScript · Tailwind" },
  { name: "Sky Alerts", cat: "Full-Stack", href: null, note: "Subscribe with your location and interests (eclipses, meteor showers, ISS passes, planets, moon phases) and a scheduled Python job emails what is visible in your sky, daily, weekly or for major events only. Includes a no-signup “today’s sky” page and one-click unsubscribe.", tags: "Next.js · Supabase · Python · GitHub Actions" },
  { name: "Find-Ranks", cat: "Utility", href: "https://github.com/iampreetdave-max/Find-Ranks", note: "A Streamlit utility that extracts marks from multiple PDF mark-sheets, computes cumulative performance, and generates rankings with analytics for institutions.", tags: "Streamlit · Python · pandas" },
  { name: "TalkToNotes", cat: "NLP", href: null, note: "A hackathon project that digitizes handwritten and printed notes with TrOCR, then turns them into a searchable knowledge base powering a chatbot and one-click quiz generation.", tags: "TrOCR · Transformers · Vector Search · OCR" },
];

const automations = [
  { name: "CRM & Lead-Flow Sync", note: "Two-way CRM sync and lead routing across tools, keeping pipelines and contact records consistent automatically.", tags: "GoHighLevel · Make.com" },
  { name: "Notification & Alerting Pipelines", note: "Event-driven Slack and email alerting so the right people are notified the moment a status changes.", tags: "Slack API · Webhooks" },
  { name: "Survey & Feedback Automation", note: "End-to-end NPS and feedback pipelines: distribution, collection, scoring, and reporting without manual steps.", tags: "Surveys · Analytics" },
  { name: "Client Onboarding Workflows", note: "Structured onboarding flows that push updates to the right teams and track each step to completion.", tags: "Workflow · Status Tracking" },
  { name: "Dynamic Forms & Data Routing", note: "Context-aware forms with cascading fields and rules that route submitted data to the correct destination.", tags: "Forms · Routing" },
  { name: "Cross-Platform API Integrations", note: "Custom webhook and API integrations stitching together services that don’t natively talk to each other.", tags: "n8n · Zapier · REST" },
];

export const metadata = { title: "Projects · Preet Ghanshyam Dave" };

export default function ProjectsPage() {
  return (
    <>
      <div className="rowlist">
        {projects.map((p) => {
          const Icon = ICONS[p.name];
          return (
          <div className="row" key={p.name}>
            <div className="row-main">
              <div className="row-title">
                {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a> : p.name}
              </div>
              <div className="row-note">{p.note}</div>
              <div className="tags">{p.tags}</div>
            </div>
            <div className="row-when row-side">
              {p.cat}
              {Icon && <span className="row-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.5} /></span>}
            </div>
          </div>
          );
        })}
      </div>

      <h2 className="sec-label">Automations</h2>
      <div className="rowlist">
        {automations.map((a) => (
          <div className="row" key={a.name}>
            <div className="row-main">
              <div className="row-title">{a.name}</div>
              <div className="row-note">{a.note}</div>
              <div className="tags">{a.tags}</div>
            </div>
          </div>
        ))}
      </div>

    </>
  );
}
