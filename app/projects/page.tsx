// Minimal projects + automations list (dhruvchauhan.me style). Static; theme and
// header come from globals.css / SiteHeader.

const projects = [
  { name: "Therma Netra", cat: "Climate ML", href: null, note: "An AI digital twin of India’s climate, built entirely on national datasets (IMD, INSAT/MOSDAC, IMDAA, CPCB). One assimilated twin powers climate forecast, urban-heat mitigation, and air-quality apps. Built for ISRO BAH 2026.", tags: "Python · Streamlit · xarray · Climate ML" },
  { name: "CityShield · VisionScan", cat: "Computer Vision", href: "https://github.com/iampreetdave-max/Guardian-Angle", note: "A unified AI policing platform that fuses physical and cyber crime onto one GIS map, forecasts next-week risk, and closes the loop from a live CCTV anomaly to a dispatched patrol, fully offline on CPU. 77 backend tests. Built for KANAD S.H.I.E.L.D. 2026.", tags: "FastAPI · React · CLIP · FAISS · YOLOv8 · Docker" },
  { name: "Arbiter", cat: "Agentic AI", href: "https://github.com/iampreetdave-max/arbiter", note: "A full-stack AI legal assistant. Gemini agents on Google’s ADK research applicable law in real time and draft citation-backed documents across 6 types and 5 jurisdictions. Deployed on Cloud Run. Built for XPRIZE Build with Gemini.", tags: "Next.js · FastAPI · Gemini · Firebase · Cloud Run" },
  { name: "AI Race News", cat: "Data Engineering", href: "https://github.com/iampreetdave-max/ai-race-news", note: "A production pipeline that ingests 110+ AI/ML sources every 15 minutes, deduplicates and auto-tags articles, and serves audience-specific feeds through a public FastAPI REST API and a Next.js frontend.", tags: "FastAPI · BeautifulSoup · APScheduler · Docker" },
  { name: "Sports Match-Prediction Engines", cat: "ML", href: "https://github.com/iampreetdave-max/football-predictions", note: "A multi-sport ML suite (NBA, soccer, NASCAR) forecasting outcomes from engineered features and live odds, graded against real settled results. +16.5% tracked ROI on Grade-A NBA picks, 66.3% moneyline win rate over 1,064 games, 4,084+ predictions logged.", tags: "XGBoost · LightGBM · PostgreSQL · GitHub Actions" },
  { name: "CodeTransform", cat: "Developer Tools", href: "https://github.com/iampreetdave-max/code-convertor", note: "A web code converter between Python and JavaScript built on 122+ tested conversion rules, with auto language detection and confidence scoring. GTU state-level Design Engineering project.", tags: "FastAPI · Python · JavaScript · Tailwind" },
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

export default function ProjectsPage() {
  return (
    <main className="page-pad wrap">
      <p className="lead">
        Applied ML, computer-vision, and agentic-AI systems, plus the workflow
        automations I build for clients.
      </p>

      <h2 className="sec-label">Projects</h2>
      <div className="rowlist">
        {projects.map((p) => (
          <div className="row" key={p.name}>
            <div className="row-main">
              <div className="row-title">
                {p.href ? <a href={p.href} target="_blank" rel="noopener noreferrer">{p.name}</a> : p.name}
              </div>
              <div className="row-note">{p.note}</div>
              <div className="tags">{p.tags}</div>
            </div>
            <div className="row-when">{p.cat}</div>
          </div>
        ))}
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

      <footer className="foot">Preet Ghanshyam Dave</footer>
    </main>
  );
}
