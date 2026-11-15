// Short copy for the Projects list and each project's page. Facts come only from lib/content.ts
// and the CV; the wording was drafted by three writers and settled by a judge.
export type ProjectCopy = { hook: string; proof: string; highlights: string[] };

export const PROJECT_COPY: Record<string, ProjectCopy> = {
  "claude-code-skills": {
    "hook": "Open-source Claude Code skills, each installed with one command from a personal plugin marketplace. The flagship, done-gate, stops an agent calling work finished until every ask is proven with file:line evidence and audited blind.",
    "proof": "Alongside it, loop-breaker proves a stuck session’s root cause instead of guessing, and honest-model-eval catches data leakage before shipping.",
    "highlights": [
      "Installs with one command, singly or as senior and student packs, from a personal plugin marketplace.",
      "done-gate blocks a finished claim until each ask has file:line evidence, then audits the work blind.",
      "loop-breaker gets a stuck session out by proving the root cause instead of guessing.",
      "honest-model-eval catches data leakage before a model ships; skill-scout finds fitting skills and prunes unused ones.",
      "Other skills cover trustworthy OCR, Make.com automation, hackathon sprints, Android device testing and exam revision."
    ]
  },
  "open-data-finder": {
    "hook": "In an 18-need benchmark every top link resolved, against 81% for Claude Sonnet 5.5 with web search, at about 1/90th of the cost. Claude Haiku 5.5 plans the searches and eight open catalogs supply the datasets.",
    "proof": "Every link is fetched before it is listed, and code stops the model adding anything a catalog did not return.",
    "highlights": [
      "Takes a need in plain words, like daily rainfall by district in Gujarat, and returns real open datasets.",
      "Claude Haiku 5.5 plans the searches; eight open catalogs answer, including Hugging Face, Zenodo, NASA Earthdata and Harvard Dataverse.",
      "Every link is fetched before it is listed, and code blocks anything a catalog did not return.",
      "18-need benchmark: every top link resolved, versus 81% for Claude Sonnet 5.5 with web search, at about 1/90th the cost.",
      "Runs on the Next.js Edge runtime, written in TypeScript."
    ]
  },
  "padosi": {
    "hook": "Rent drills, cameras or party gear from verified people nearby, on a peer-to-peer marketplace for India. Locations are fuzzed and grid-snapped so repeated searches cannot triangulate an address.",
    "proof": "Handovers use photo checks and 6-digit codes, and deposits auto-release 48 hours after return.",
    "highlights": [
      "Verified people nearby rent out drills, cameras and party gear, peer to peer.",
      "Locations are fuzzed and grid-snapped so repeated searches cannot triangulate an address.",
      "Handovers use photo checks and 6-digit codes.",
      "Deposits auto-release 48 hours after return.",
      "One typed Hono API over Postgres and Drizzle serves a Next.js site and an Expo mobile app."
    ]
  },
  "q": {
    "hook": "Ask Q what someone promised last month and it answers with verified citations to the exact meeting lines. A self-hosted bot joins Google Meet calls and saves transcript, chat and screen shares to long-term memory.",
    "proof": "A desktop copilot transcribes on-device with Parakeet, drafts answers as questions are asked, and feeds each meeting into the same memory.",
    "highlights": [
      "A self-hosted bot joins Google Meet and saves transcript, chat and screen shares into long-term memory.",
      "Pulls out action items and flags risky talk for private review.",
      "Answers questions about past meetings with verified citations to the exact lines.",
      "A desktop copilot, extended from an open-source Electron app, transcribes on-device with Parakeet.",
      "The copilot drafts answers to questions as they are asked and feeds each finished meeting into the same memory."
    ]
  },
  "winwall": {
    "hook": "350+ client wins have reached a live WordPress results wall with no developer in the loop. One team emoji in Slack approves each, and the pipeline screenshots it and blurs reviewer names.",
    "proof": "Claude finds the wins in Slack, and Loom and Wistia case-study videos are picked up automatically.",
    "highlights": [
      "Claude scans Slack for client wins and posts them for approval.",
      "One team emoji approves a win; it is screenshotted with Playwright and reviewer names are blurred.",
      "Each win uploads through the WordPress REST API into the right filter on the live wall.",
      "Loom and Wistia case-study videos are picked up automatically.",
      "350+ wins and 390+ images published, all on GitHub Actions schedules."
    ]
  },
  "nudge-ai": {
    "hook": "Built for 60 to 90 client conversations a day, it pulls action items out of each and checks whether the client actually understood what was agreed, so one manager can lead more account managers.",
    "proof": "It flags churn risk early and says which clients to ask for a referral.",
    "highlights": [
      "Built for 60 to 90 client conversations a day, turning each into action items.",
      "Checks whether clients actually understood what was agreed.",
      "Builds agendas that surface each client’s newest wins.",
      "Runs mid-week follow-ups with a dashboard scoped to each manager’s own accounts.",
      "Flags churn risk early and says which clients to ask for a referral."
    ]
  },
  "marine-procurement-erp": {
    "hook": "For ship suppliers, RFQs arriving by email or supplier portal become priced PDF quotations, then purchase orders. Each LLM-extracted vendor invoice is checked by a person before it posts into FIFO stock layers.",
    "proof": "The FIFO layers drive client invoicing and payables, with an in-app assistant on top.",
    "highlights": [
      "RFQs from email or a supplier portal become priced PDF quotations, then purchase orders.",
      "Quotations are priced against a master catalogue.",
      "An LLM extracts vendor invoices and a person checks them before they post.",
      "Invoices post into FIFO stock layers that drive client invoicing and payables.",
      "An in-app assistant sits on top of a Node.js, React and MongoDB stack."
    ]
  },
  "ledgerlens": {
    "hook": "Bank statements and scanned cheques come out as a reconciled ledger, and nothing counts as done until deterministic validators pass: MICR checksums, written-versus-numeric amounts and the closing balance.",
    "proof": "Printed fields are read from the PDF text layer, while handwriting goes to OCR plus a vision-language model.",
    "highlights": [
      "Printed fields come straight from the PDF text layer.",
      "Handwriting goes to Mistral OCR plus Pixtral, a vision-language model.",
      "Deterministic validators check MICR checksums, written-versus-numeric amounts and the closing balance before anything counts as done.",
      "Per-bank adapters, an editable grid with Excel export and an invoice VAT/GL coder share one multi-tenant platform.",
      "The public repo is a clean-room version on synthetic data."
    ]
  },
  "poker-platform": {
    "hook": "The server is the only authority in this play-money Texas Hold’em and pot-limit Omaha app: every chip movement runs inside a row-locked Postgres transaction, so a reconnect always rebuilds from the database.",
    "proof": "Multi-table play and tournaments run on iOS, Android and web, with every state change broadcast over Socket.IO.",
    "highlights": [
      "Texas Hold’em and pot-limit Omaha, with multi-table play and tournaments, for a private card room.",
      "Play-money app on iOS, Android and web, built with Flutter and Next.js.",
      "The server is the only authority; every chip movement runs inside a row-locked Postgres transaction.",
      "Every state change broadcasts over Socket.IO, so a reconnect always rebuilds from the database."
    ]
  },
  "tensor-tapri": {
    "hook": "A free weekly newsletter on AI, ML, automation and data for India, written from Ahmedabad. Its “What’s brewing” page ranks the week’s top world and India AI stories by outlet coverage.",
    "proof": "Stories come from the AI Race News scraper, and Epoch AI benchmark charts are served from Cloudflare edge functions.",
    "highlights": [
      "A free weekly email on AI, ML, automation and data for India, written from Ahmedabad.",
      "“What’s brewing” ranks the week’s top world and India AI stories by outlet coverage.",
      "Stories come from the AI Race News scraper.",
      "Epoch AI benchmark charts are served from Cloudflare edge functions.",
      "Runs on Cloudflare Pages, Pages Functions and D1, with Kit for email."
    ]
  },
  "ai-news-globe": {
    "hook": "Every AI story from the past 30 days is pinned to its outlet’s home city on a 3D globe, and light beams travel between cities whose outlets covered the same story.",
    "proof": "Fed by AI Race News, whose scraper clusters headlines across 110+ sources and exports which outlets covered each one.",
    "highlights": [
      "A 3D globe of AI news for Tensor Tapri, at tensortapri.org/globe.",
      "Pins every story from the past 30 days to the city its outlet is based in.",
      "Light beams travel between cities whose outlets covered the same story.",
      "Drag or scroll it in any direction; drawn with cobe, WebGL and SVG.",
      "Data comes from AI Race News, which clusters headlines across 110+ sources."
    ]
  },
  "transitops": {
    "hook": "No client app can bypass a business rule, because every rule is enforced inside Postgres. The hackathon-built fleet platform covers dispatch, maintenance, fuel and expenses for four roles.",
    "proof": "Drivers share GPS from a phone browser and positions stream live over Supabase Realtime to a Leaflet ops map.",
    "highlights": [
      "Covers dispatch, maintenance, fuel and expenses for four roles.",
      "Every business rule is enforced inside Postgres, so no client app can bypass it.",
      "Drivers share GPS from a phone browser.",
      "Positions stream live to the ops map over Supabase Realtime.",
      "A hackathon build on Next.js, deployed to Vercel."
    ]
  },
  "therma-netra": {
    "hook": "One continuously assimilated digital twin of India’s climate, built for ISRO’s Bharatiya Antariksh Hackathon 2026, reaches about 30% forecast skill over a persistence-of-anomaly baseline.",
    "proof": "The same twin powers forecast, urban-heat mitigation and air-quality apps, using only IMD, INSAT/MOSDAC, IMDAA and CPCB data.",
    "highlights": [
      "One continuously assimilated twin powers climate forecast, urban-heat mitigation and surface air-quality apps.",
      "Built entirely on national datasets: IMD, INSAT/MOSDAC, IMDAA and CPCB.",
      "Reaches about 30% forecast skill over a persistence-of-anomaly baseline.",
      "Built for ISRO’s Bharatiya Antariksh Hackathon 2026, Problem Statement 5.",
      "Stack: Python, xarray, imdlib, Streamlit and Pydeck."
    ]
  },
  "cityshield": {
    "hook": "Fully offline on CPU, it closes the loop from live CCTV anomaly to dispatched patrol, with physical and cyber crime on one GIS map. Built with the Cyber Crime Branch of Ahmedabad City Police for KANAD S.H.I.E.L.D. 2026.",
    "proof": "It also forecasts next-week risk, generates 7 statutory documents in three languages and passes 77 backend tests.",
    "highlights": [
      "Four CCTV search modes built on CLIP with FAISS, ArcFace and YOLOv8.",
      "Object tracking with zone and line-crossing analytics.",
      "Generates 7 statutory documents in English, Hindi and Gujarati, with a per-user language interface.",
      "Ships a 4-layer OWASP middleware and 77 passing backend tests.",
      "Risk model backtested on synthetic data as a methodology demo: Hit-Rate@10 0.771, PAI@10 2.31x over 8 weekly folds."
    ]
  },
  "arbiter": {
    "hook": "A legal problem described in plain English or Hindi goes to Gemini agents on Google’s ADK, which research the applicable law in real time and draft a citation-backed document.",
    "proof": "It covers 6 document types across 5 jurisdictions and was deployed to Google Cloud Run for XPRIZE Build with Gemini.",
    "highlights": [
      "Turns a problem described in plain English or Hindi into a structured legal document, with no upfront lawyer fees.",
      "Gemini agents on Google’s ADK research applicable law in real time.",
      "Drafts citation-backed documents across 6 document types and 5 jurisdictions.",
      "Next.js and FastAPI with Firebase and Razorpay, deployed on Google Cloud Run in asia-south1.",
      "Built for XPRIZE Build with Gemini 2026."
    ]
  },
  "ai-race-news": {
    "hook": "Scrapes 110+ AI/ML sources every 15 minutes in production, then removes duplicates in three layers (URL, content hash, title similarity). Articles are auto-tagged across 12 categories and served as 5 audience-specific feeds.",
    "proof": "Its scraper also feeds Tensor Tapri’s “What’s brewing” ranking and the AI News Globe.",
    "highlights": [
      "Ingests 110+ AI/ML sources every 15 minutes on APScheduler.",
      "Deduplicates in three layers: URL, content hash and title similarity.",
      "Auto-tags articles across 12 categories.",
      "Serves 5 audience-specific feeds through a public FastAPI REST API and a Next.js frontend.",
      "Feeds Tensor Tapri’s “What’s brewing” ranking and the AI News Globe."
    ]
  },
  "nba-predictor": {
    "hook": "Moneyline picks hit 66.3% across 1,064 settled games, and Grade-A over/under picks returned +16.5% ROI on 95 bets. The pipeline runs itself daily on GitHub Actions.",
    "proof": "Two XGBoost regressors turn pre-game team stats and live sportsbook odds into predicted home and away points.",
    "highlights": [
      "Fully automated: runs daily on GitHub Actions.",
      "Inputs are pre-game team stats and live sportsbook odds.",
      "Two XGBoost regressors predict home and away points.",
      "Points become moneyline, over/under and spread picks, graded against final scores.",
      "66.3% moneyline accuracy over 1,064 settled games; Grade-A over/under picks returned +16.5% ROI on 95 bets."
    ]
  },
  "soccer-predictor": {
    "hook": "Tested walk-forward on 88,061 unseen matches across 38 leagues, a second-generation Poisson and Elo model equals the closing line’s accuracy, 57.4% on over/under.",
    "proof": "The first-generation Ridge models returned +9.1% ROI on A and B grade moneyline picks over 1,473 settled bets.",
    "highlights": [
      "Scoreline predictions across 10 major leagues become moneyline, over/under 2.5 and both-teams-to-score picks.",
      "21 weighted features feed separate Ridge models for home and away goals.",
      "Market-aware grading rewards contrarian picks: +9.1% ROI on A and B grade moneyline picks over 1,473 settled bets.",
      "A second-generation Poisson and Elo model was tested walk-forward on 88,061 unseen matches across 38 leagues.",
      "It matches the closing line’s accuracy: 57.4% on over/under."
    ]
  },
  "nascar-predictor": {
    "hook": "Road courses, short tracks and superspeedways race differently, so each track type gets its own four-model ensemble, which outputs calibrated win and top-N probabilities for every driver.",
    "proof": "Trained on 7,566 historical race records and compared live against odds from 9 sportsbooks.",
    "highlights": [
      "Calibrated win and top-N probabilities for every driver in a race.",
      "Road courses, short tracks and superspeedways each get their own ensemble, since they race differently.",
      "Each ensemble combines XGBoost, LightGBM, random forest and gradient boosting.",
      "Trained on 7,566 historical race records.",
      "Compared live against odds from 9 sportsbooks."
    ]
  },
  "codetransform": {
    "hook": "Converts Python to JavaScript and back through 122+ tested rules, detecting the source language automatically. Led from idea to a GTU state-level Design Engineering presentation.",
    "proof": "Each conversion gets a color-coded confidence score, and the frontend is zero-build vanilla JS and Tailwind on a FastAPI backend.",
    "highlights": [
      "Converts between Python and JavaScript in both directions using 122+ tested conversion rules.",
      "Detects the source language automatically.",
      "Scores each conversion with a color-coded confidence rating.",
      "Zero-build vanilla-JS and Tailwind frontend on a FastAPI backend.",
      "GTU state-level Design Engineering project, led from inception as Project Lead."
    ]
  },
  "sky-alerts": {
    "hook": "Subscribers set a location and interests, and a scheduled Python job emails what is visible in their sky: eclipses, meteor showers, ISS passes, planets or moon phases.",
    "proof": "Emails go out daily, weekly or for major events only, with one-click unsubscribe and a no-signup “today’s sky” page.",
    "highlights": [
      "Subscribers choose a location and interests: eclipses, meteor showers, ISS passes, planets and moon phases.",
      "A scheduled Python job on GitHub Actions emails what is visible in each subscriber’s sky.",
      "Cadence is daily, weekly or major events only.",
      "A no-signup “today’s sky” page and one-click unsubscribe.",
      "Built with Next.js and Supabase."
    ]
  },
  "find-ranks": {
    "hook": "Marks are pulled from a batch of PDF mark-sheets, combined into each student’s cumulative performance and ranked, with analytics for educational institutions.",
    "proof": "The code is public on GitHub: a Streamlit app over Python and pandas.",
    "highlights": [
      "Extracts marks from multiple PDF mark-sheets.",
      "Computes cumulative performance across the sheets.",
      "Generates rankings with analytics for educational institutions.",
      "A Streamlit app on Python and pandas, public on GitHub."
    ]
  },
  "talktonotes": {
    "hook": "TrOCR digitizes handwritten and printed notes, which are then indexed into a searchable knowledge base that answers questions through a chatbot and generates quizzes in one click.",
    "proof": "Vector search over the digitized notes sits behind the chatbot; the project was built for the Rotaract Club Hackathon.",
    "highlights": [
      "Digitizes handwritten and printed notes with TrOCR.",
      "Indexes the text into a searchable knowledge base with vector search.",
      "A chatbot answers questions from the notes.",
      "Generates a quiz from the notes in one click.",
      "Built for the Rotaract Club Hackathon."
    ]
  }
};

// Projects with a public screenshot in public/projects/<id>.jpg, with the page it shows.
// Client work and private local apps have none on purpose.
// Captions say what the image is: the running app, a rebuild from the app's own code, or an
// interface illustration (designed for this page because the project has no UI to show).
export const PROJECT_SHOTS: Record<string, string> = {
  "claude-code-skills": "The Skills page: every skill, the three install packs, and one-command installs.",
  "open-data-finder": "A real search for satellite land surface temperature; every result's link was fetched before it was listed.",
  "padosi": "The running app, with an added map panel: verified neighbours’ gear near Koramangala, shown as approximate 1 km areas, never addresses.",
  "q": "Interface illustration: Q joins a Google Meet call and answers what was promised, citing the exact meeting lines.",
  "winwall": "Interface illustration: one Slack emoji approves a client win, which lands on the live results wall with names blurred.",
  "nudge-ai": "Interface illustration: a manager’s accounts view with agreements to recheck, mid-week follow-ups, churn risk and referral candidates.",
  "marine-procurement-erp": "Interface illustration, unbranded: an emailed RFQ priced against the catalogue, with an invoice check and FIFO stock layers.",
  "ledgerlens": "Interface illustration with results from the repo’s own validators: MICR, written amounts and closing balance pass; handwriting goes to review.",
  "poker-platform": "Interface illustration, unbranded: a play-money Hold’em hand on the turn, with three tables open in the switcher.",
  "tensor-tapri": "tensortapri.org, the home of the weekly email.",
  "ai-news-globe": "tensortapri.org/globe: each beam joins two cities whose outlets covered the same story.",
  "transitops": "Interface illustration: the live fleet map with phone GPS, speeding and break alerts, and the dispatch desk. Fictional fleet.",
  "therma-netra": "Interface illustration with a real forecast: maximum temperature across India for 21 May 2023, from IMD data.",
  "cityshield": "Running locally on synthetic demo data: a risk forecast over Ahmedabad with patrol routes to the top hotspots. Map data © OpenStreetMap contributors.",
  "arbiter": "The real frontend with a sample case: a drafted legal notice backed by three verified citations.",
  "ai-race-news": "The AI Race News homepage.",
  "nba-predictor": "Interface illustration with real model output: one night’s slate with predicted scores, win probabilities and grades.",
  "soccer-predictor": "Interface illustration with real walk-forward output: fixtures by league with over/under and both-teams-to-score probabilities.",
  "nascar-predictor": "Interface illustration with sample probabilities: win and top-N chances for every driver from a per-track-type ensemble.",
  "codetransform": "code-convertor.pages.dev, the live converter.",
  "sky-alerts": "The no-signup tonight’s sky page, on the night the Leonids peak.",
  "find-ranks": "Interface illustration with a fictional class: four mark-sheet PDFs in, cumulative totals and tie-aware rankings out.",
  "talktonotes": "Rebuilt from the app’s code: handwritten notes digitized with TrOCR, answered in chat and turned into a quiz.",
};

// Extra public links beyond the row's own href (live demos of Preet's own deployments only).
export const PROJECT_LINKS: Record<string, [string, string][]> = {
  "claude-code-skills": [["/skills", "Browse the skills"]],
  "ai-race-news": [["https://ai-race-news.pages.dev", "Visit the live site"]],
  "codetransform": [["https://code-convertor.pages.dev", "Try it live"]],
};
