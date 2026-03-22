# Handoff Master (Single Source of Truth)

Last updated: 2026-03-19

This file is the **single handoff file** for the WinBets stack. It includes the high‑level architecture and all operational pointers. Nothing else is required to onboard a new agent.

---

## 0) Architecture (High‑Level)
**Core pieces**
- **API Core**: `api.wbsports.ai` (VM `20.42.89.150`) — primary REST API + news endpoints.
- **Pooler VM**: `20.84.114.183` — news ingestor + predictions/odds scheduler + monitoring stack.
- **Live Widgets**: `livewidgets2` (frontend) + `livewidgets-data-service` (W1 API proxy/cache).
- **Tickets**: `tickets-service` (API + landing build) and `landingtickets.wbsports.ai`.
- **Base44**: main frontend app; embeds widgets and tickets iframe.

**Primary docs (authoritative, minimal set)**
- System map: `architecture/WORKFLOW.md`
- Databases: `architecture/DBS.md`
- Azure resources: `architecture/RESOURCES.md`
- Pooler detail: `architecture/pooler.md`
- Tickets detail: `architecture/tickets.md`
- Live widgets: `architecture/LIVEWIDGETS_ARCHITECTURE.md`
- Tickets landing notes: `architecture/tickets-landing-search.md`

**Access source of truth**
- Credentials + SSH: `api/.env`

---

## 0.1) Game Widget – Full Handoff (Corrected)

### 1) Frontend UI
- Repo: `livewidgets2`
- Main page: `src/pages/InGameLive.jsx`
- Widgets: `src/components/game-widgets/*`
- Tabs: All / Favorites / NBA / NCAAB / MLB / NHL / Soccer / F1 / UFC

Each tab renders game cards based on API responses.

### 2) Live Game Data (all sports)
All game data is pulled via our API gateway:

- `https://api.wbsports.ai/api/v1/{sport}/games` (basketball, hockey, baseball)
- `https://api.wbsports.ai/api/v1/soccer/fixtures` (soccer)

These endpoints proxy API‑Sports, normalize responses, and apply caching.  
Important: The widget never calls API‑Sports directly (CORS blocked). It always goes through `api.wbsports.ai`.

### 3) Odds Logic (Corrected)
Sports using Odds API:
- NBA
- NCAAB
- MLB
- NHL

Flow:
- Hourly pooler pulls Odds API events + odds.
- Maps Odds API events → API‑Sports `game_id`.
- Stores in `odds_api_*` tables.
- Widget reads from:  
  `https://api.wbsports.ai/api/v1/odds-api?sport=...&game_id=...`

Soccer odds (NOT Odds API):
- Soccer odds come from API‑Sports directly.
- Widget uses API‑Sports proxy endpoints (via `api.wbsports.ai`) for soccer odds.
- No Odds API mapping for soccer anymore.

### 4) Pooler (sportsdata‑pooler)
Hourly jobs:
- Odds API event map
  - Pulls Odds API events.
  - Resolves `game_id` using API‑Sports if possible.
  - Writes to `odds_api_event_map`.
- Odds pull per sport
  - NBA / NCAAB / MLB / NHL → Odds API tables.
- Cache busting
  - Busts Redis odds cache after updates.

Known issue:
NCAAB March Madness games appear in Odds API before API‑Sports updates, so `game_id` mapping is delayed.

### 5) Cache / Redis
- Odds API responses cached ~1 hour.
- Game data cached (same Redis used by Game Widget + Live Game Slider).

### 6) Standings
Standings are API‑Sports widgets, not our API. Embedded as widgets inside the game widget.

---

## 1) Live URLs
- Base44 (core app): Base44 UI + QA Base repo
- Game Widget: https://gamewidget.wbsports.ai
- Live Game Slider: https://livegameslider.wbsports.ai
- Tickets Landing: https://landingtickets.wbsports.ai
- Tickets API (service): https://tickets.wbsports.ai
- API Core (public): https://api.wbsports.ai

---

## 2) Repos (local)
- API Core: `/Users/krauseamus/Documents/Github/api`
- Sportsdata pooler: `/Users/krauseamus/Documents/Github/sportsdata-pooler ` (note trailing space)
- Tickets service: `/Users/krauseamus/Documents/Github/tickets-service`
- Tickets landing source: `/Users/krauseamus/Documents/Github/tickets landing/example design`
- Live widgets: `/Users/krauseamus/Documents/Github/livewidgets2`
- Live widgets data service: `/Users/krauseamus/Documents/Github/livewidgets-data-service`
- Base44 frontend: `/Users/krauseamus/Documents/Github/QA Base`
- News automation: `/Users/krauseamus/Documents/Github/ai-articles-automation` (if used)
- Clutch: `/Users/krauseamus/Documents/Github/clutch`
- WB news: `/Users/krauseamus/Documents/Github/wbnews`
- Tickets landing repo root: `/Users/krauseamus/Documents/Github/tickets landing`

---

## 3) VMs + What Runs Where
- API Core VM: `20.42.89.150`
  - Repo: `/home/azureuser/api`
  - Docker: `api-core` container
- Pooler VM: `20.84.114.183`
  - Repo: `/home/azureuser/sportsdata-pooler`
  - Runs: news ingestor (hourly), predictions scheduler (daily)
  - Monitoring: prometheus (9090), grafana (3000), node_exporter (9100)
- Tickets Service VM: `172.173.64.164` (DNS: `landingtickets.wbsports.ai`)
  - Repo: `/home/azureuser/tickets-service`
  - Docker: `tickets-service` container (port 8091)
- Base44 hosting: Base44 platform (repo `QA Base`)
- Live widgets hosting: static app (served from its own hosting stack)

---

## 4) News System (Current)
- **Source of truth:** Main WB DB (`all_news`, `player_wire_news`)
- **Ingestor:** `sportsdata-pooler` news ingestor (hourly)
- **API Core endpoints:**
  - `/api/v1/news/top-stories`
  - `/api/v1/news/all-sports`
  - `/api/v1/player-wire`
- **Caching:** API Core uses Redis `wb-news-redis` for these endpoints.

News ingestor schedule:
- Runs hourly via `./main -continuous-scheduler`
- Daily Slack report at **23:45 UTC**

---

## 4.1) Pooler VM (Current Running Parts)
**VM:** `20.84.114.183`

**Containers running:**
- `sportsdata-pooler-app` (`./main -continuous-scheduler`)
- `sportsdata-predictions-scheduler` (`./predictions-scheduler`)
- Monitoring stack: `sportsdata-prometheus`, `sportsdata-grafana`, `sportsdata-alertmanager`, `sportsdata-node-exporter`
- `tickets-pooler` (separate service)

### What Each Piece Does
**sportsdata-pooler-app**
- Runs the news ingestor on a 1‑hour loop and posts a daily Slack summary at **23:45 UTC**.
- Exposes metrics on port 8080.
- Does **not** run odds, games, or stats by itself.

**sportsdata-predictions-scheduler**
- **Hourly:**
  - Odds API event map (`odds_api_event_map`)
  - Odds API tables for NBA / NCAAB / NHL / MLB / Soccer
- **Every 6 hours:**
  - `game_widget_calendar_map`
- **Daily at 5:00 AM Mountain:**
  - ESPN team + player stats for NBA, NHL, NCAAB, MLB
  - ESPN soccer team + player stats (multiple leagues)
  - ESPN injuries (NBA/NHL/NFL)
  - Odds event map again
- This container is the **main driver of odds + calendar data** for the widget.

### Data Sources + DBs
- **ESPN client** for stats, injuries, and team/game datasets.
- **Odds API** for odds + odds event mapping.
- **API Sports** for calendar and game sync (via `APISPORTS_API_KEY`).
- **TicketNetwork** wired but only used by the legacy scheduler.
- `DATABASE_URL`: main pooler DB.
- `PREDICTIONS_DATABASE_URL`: odds + predictions data (odds API tables live here).

### Legacy / Not-Running Code Paths
- `cmd/schedular` (legacy odds + TicketNetwork) exists but is **not** running in Docker.
- Only used if `ENABLE_LEGACY_ODDS_API=true`.

---

## 5) Tickets System (Current)
- **Landing UI:** static build in `tickets-service/public`
- **Tickets service:** TNWS + maps proxy
- **Caching:** Redis-backed cache for events, tickets, pricing, and maps
 - **Tickets landing DNS:** `landingtickets.wbsports.ai` → `172.173.64.164`

Tickets service cache TTLs:
- `/api/tnws/events` → 2 minutes
- `/api/tnws/tickets` → 30 seconds
- `/api/tnws/pricing` → 2 minutes
- `/api/maps/MapAndLayout` → 15 minutes
- `/api/maps/MapWidget` → 15 minutes

---

## 5.1) Live Widgets Data Service (W1) + Odds
- **Frontend (gamewidget + slider):** `livewidgets2` → `https://gamewidget.wbsports.ai`
- **Data service (W1):** `livewidgets-data-service` → `https://api.wbsports.ai`
- **Purpose:** API‑Sports proxy + response shaping + Redis cache.
- **Core odds (table‑backed):**
  - `/api/v1/nba/odds-api`, `/api/v1/ncaab/odds-api`, `/api/v1/nhl/odds-api`, `/api/v1/mlb/odds-api`, `/api/v1/soccer/odds-api`
  - Raw odds payload (if needed): `/api/v1/odds-api?game_key=...&book=...`
- **Env (frontend):**
  - `VITE_W1_API_BASE=https://api.wbsports.ai`
  - `VITE_ODDS_API_BASE=http://api-core-winbets.eastus.cloudapp.azure.com:8080`
  - `VITE_API_TIMEZONE=America/New_York`

---

## 5.2) Base44 ↔ Slider Favorites Sync
**Message contract** (sent via `postMessage`):
```json
{
  "type": "FAVORITES_UPDATED",
  "favorite_sports": ["football", "basketball", "hockey"]
}
```
Accepted values: `football`→soccer, `basketball`→nba/ncaab, `hockey`→nhl, `baseball`→mlb, `racing`→f1, `fighting`→ufc.  
Empty list defaults slider to `all`.

---

## 6) Redis (Production)
- **News:** `wb-news-redis` (Central US, Standard C1)
- **Tickets:** `wb-tickets-redis` (Central US, Standard C1)
- **Live widgets cache:** `w1-livewidgets-redis` (Azure)

---

## 7) Key Databases
- **Main WB DB:** `DATABASE_URL` (core data, tickets catalog, news tables)
- **Predictions DB:** `PREDICTIONS_DATABASE_URL` (odds_api_event_map + predictions scheduler data)

---

## 8) Quick Operational Checks
- News ingestor (pooler VM):
  - `sudo docker compose logs --since 2h sportsdata-pooler | egrep -i 'news ingestor completed|daily report'`
- API Core endpoints (public):
  - `/api/v1/news/top-stories`
  - `/api/v1/news/all-sports`
  - `/api/v1/player-wire`
- Tickets service (VM):
  - `sudo docker ps | grep tickets-service`
  - `curl -I http://localhost:8091/healthz`

---

## 9) Standard Deploy Scripts (One Command Each)
All deploy scripts require `STAMPED_AND_TESTED=1`.

- API Core: `STAMPED_AND_TESTED=1 scripts/deploy_api_core.sh`
- Pooler: `STAMPED_AND_TESTED=1 scripts/deploy_pooler.sh`
- Tickets service: `STAMPED_AND_TESTED=1 scripts/deploy_tickets_service.sh`

---

## 10) Azure Resources (Exhaustive)
For the full authoritative list (RGs, VMs, Redis, DBs, IPs), read:
- `architecture/RESOURCES.md`

---

## 11) Access + Infra Pointers
- All local repos: `/Users/krauseamus/Documents/Github/`
- VM access credentials: `/Users/krauseamus/Documents/GitHub/api/.env`
- SSH key path: `/Users/krauseamus/Documents/GitHub/api/mkkey.pem`
- API Core VM: `20.42.89.150`
- Pooler VM: `20.84.114.183`
- Tickets Service VM: `172.173.64.164`

---

## 13) Troubleshooting Checklist (Quick)
1) Verify DNS → VM mapping for the service.
2) Check container status on the VM (`docker ps`).
3) Check recent logs for errors.
4) Validate the public endpoint returns HTTP 200.
5) Confirm Redis/DB env vars are set when caching or persistence is expected.

---

## 14) Odds + Cache Stability (API / Pooler / Data Service)

### Goal
- Fix stale odds + wrong responses by enforcing cache bust on pooler updates and reducing odds cache TTL.
- Ensure odds API pulls are fresh and consistent across `api.wbsports.ai` and widgets.

### Key Changes (Code)
**Pooler cache bust after odds updates**
- Repo: `/Users/krauseamus/Documents/Github/sportsdata-pooler ` (note trailing space)
- New file: `odds_cache.go`
- Added cache bust calls after each odds insert batch in:
  - `service_basketball.go` (NBA + NCAAB)
  - `service_hockey.go`
  - `service_baseball.go`
  - `service_soccer.go`
- Cache bust deletes Redis keys: `cache:{sport}:odds-api:v2:{gameKey}*`
- Commit: `65e4a5b` (“Bust odds cache after pooler updates”)

**Data service odds cache TTL reduced**
- Repo: `/Users/krauseamus/Documents/Github/livewidgets-data-service`
- File: `internal/api/handlers.go`
- `oddsApiCacheTTL` reduced to 1 hour
- Commit: `bd9ea09` (“Reduce odds cache TTL to 1h”)

### Deploys / Runtime
- Pooler VM: `20.84.114.183`
  - Deploy via `scripts/deploy_pooler.sh` (requires `STAMPED_AND_TESTED=1`)
  - Containers: `sportsdata-pooler-app`, `sportsdata-predictions-scheduler`
  - `.env` includes `REDIS_URL` so cache busting is active
- Data service (Azure App Service): `w1-livewidgets-api`
  - Container image tag: `bd9ea096be04fa89349e6ffd0cc8d09f301d3810`

### Why This Fix Matters
- Previous odds responses were stale due to 24h Redis TTL.
- Pooler updates did not invalidate cache, so `api.wbsports.ai` served old odds.
- Now: hourly pooler updates trigger cache bust; TTL is 1 hour as backstop.

### Verification
- Manual Redis key delete confirmed fixes stale odds.
- Post‑deploy: odds endpoints return updated rows after pooler runs.

### Tests
- livewidgets-data-service: `go test ./...` passed.
- Pooler tests: internal/pooler passed (scheduler tests have pre‑existing failures).

### Paths / References
- Architecture docs: `architecture/LIVEWIDGETS_ARCHITECTURE.md`
- Pooler deployment: `scripts/deploy_pooler.sh`
- Pooler VM: `/home/azureuser/sportsdata-pooler`
- Data service: `w1-livewidgets-api` App Service

### Next Checks (Optional)
1) Run pooler odds job and confirm Redis bust in logs.
2) Hit `https://api.wbsports.ai/api/v1/odds-api?sport=mlb&game_id=180449&sportsbook_slug=draftkings` to verify fresh odds payload.

---

## 15) GameWidget Work (Mar 16–17, 2026)

### Goal
- Make All tab use the exact same card UI as each sport tab (NBA/NCAAB/MLB/NHL), keep mixed ordering (live → start time → final), and preserve odds behavior.
- Keep soccer unchanged for now (per request).

### What Changed
**Exported sport card components + raw fetch helpers**
- NBA/NCAAB/MLB/NHL cards are now exported from their widgets and reusable.
- Raw fetch helpers exported so All can use the same data source the sport widgets use.
- Files:
  - `livewidgets2/src/components/game-widgets/NbaGamesWidget.jsx`
  - `livewidgets2/src/components/game-widgets/NcaabGamesWidget.jsx`
  - `livewidgets2/src/components/game-widgets/MlbGamesWidget.jsx`
  - `livewidgets2/src/components/game-widgets/NhlGamesWidget.jsx`

**All tab now renders sport cards for NBA/NCAAB/MLB/NHL**
- Uses raw fetches (same API Sports endpoints/params as widgets).
- Builds `allCardEntries` for those sports and mixes with existing normalized feed for others.
- Orders by live → start time → final.
- Files:
  - `livewidgets2/src/pages/InGameLive.jsx`

**Fix for broken All tab layout (huge logos)**
- Sport cards depend on inline widget styles; styles weren’t present when rendering cards alone.
- Extracted widget `<style>` blocks into exported style components and injected into All tab.
- Files:
  - `livewidgets2/src/components/game-widgets/NbaGamesWidget.jsx`
  - `livewidgets2/src/components/game-widgets/NcaabGamesWidget.jsx`
  - `livewidgets2/src/components/game-widgets/MlbGamesWidget.jsx`
  - `livewidgets2/src/components/game-widgets/NhlGamesWidget.jsx`
  - `livewidgets2/src/pages/InGameLive.jsx`

### What Did NOT Change
- Soccer remains on the generic All card for now (per request). The soccer card is tightly coupled to its own state and needs a larger refactor to extract safely.
- No change to odds API logic in this pass.

### Key Behavior
- All tab now displays NBA/NCAAB/MLB/NHL with the same card UI and odds logic as their sport tabs.
- Ordering remains: live first → start time → finals at bottom.
- Favorites-only still works on All by matching favorite team names.

### Live Test Summary
- Live tested `https://gamewidget.wbsports.ai`
- Tabs checked: All, NBA, NCAAB, MLB, NHL, Soccer, F1, UFC
- No console errors observed.
- NCAAB had zero games for the tested date (expected).

### Commits
- `6e612157` Align All tab with sport cards
- `308f7c5d` Fix All tab card styling (inject widget styles)

### Next Steps / Open Items
1) If needed: extract Soccer card into a reusable component to fully sync All with Soccer tab.
2) If needed: confirm odds rendering for specific game IDs on live.

---

## Daily Snapshot (Latest)
Timestamp (UTC): 2026-03-14 18:55:38Z

- http://20.42.89.150:8080/health/ready -> 200
- http://20.42.89.150:8080/health/redis -> 200
- http://20.42.89.150:8080/api/v1/news/top-stories -> 200
- http://20.42.89.150:8080/api/v1/news/all-sports -> 200
- http://20.42.89.150:8080/api/v1/player-wire -> 200
- https://landingtickets.wbsports.ai/ -> 200
- http://172.173.64.164:8091/healthz -> 200
- http://172.173.64.164:8091/healthz/redis -> 200
- https://gamewidget.wbsports.ai/ -> 200
- https://livegameslider.wbsports.ai/ -> 200
