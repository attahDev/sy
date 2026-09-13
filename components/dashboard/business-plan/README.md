# Business Plan — status

First of Business Studio's 4 sub-tools (Studio dashboard, Idea Generator,
Opportunity Insights, Business Plan — see PR discussion for full scope).
Ported from GMBT-Updated-Frontend's MarketResearchDashboard/
BusinessPlanSection/*.

## Done
- All 3 tabs: Roadmap (`RMDashboardSection`), Financials
  (`FIDashboardSection`), Business Plan (`BPDashboardSection`) — same
  content, same GMBTE data shape (`IdeaContent`).
- Both entry points: viewing whatever idea is current in this browser
  session (`/dashboard/business-plan`) and viewing a specific saved plan
  by ID (`/dashboard/business-plan/:planId`), which resolves via the
  plan's `sourceIdeaId` — the real cross-device link, not session state.
- Next-action checklist with server-persisted progress
  (`updatePlanProgress`).
- "Previously generated ideas" quick-switch row.

## Two real API clients, ported faithfully as two different things
- `lib/businessPlannerApi.ts` — on the shared GMBTE backend
  (`/business-planner/*`), same `api` client/envelope as everything else.
- `lib/ideaEngineApi.ts` — a **separate, independently-deployed**
  FastAPI microservice (`ideaengiene-avcv.onrender.com`), manual fetch +
  manual Bearer token (reads the same `localStorage["token"]` key
  `lib/api.ts` writes, so no extra auth wiring needed, but it's a
  genuinely different HTTP client than the rest of this codebase talks
  to). Not a mistake — this is really how GMBTE is built.

## Deliberately not ported
- **AI mentor chat (`ChatSideBarPanel`/`ChatSideBar.tsx`, 286 lines,
  its own `mentorChatContext`)** — appears as a persistent right-column
  panel on every screen in the original. Dropped entirely rather than
  stubbed; every section here uses a single-column layout instead of the
  original's `[content, chat]` grid. This is real, separate scope — a
  whole AI chat subsystem, not a small extra.
- **`GenerateIdeaForm.tsx` is new, not a port.** GMBTE's actual empty
  state (`BPEmpty.tsx`) links to `/dashboard/ai-studio` to generate an
  idea via the chat UI — neither exists yet in this repo. Without
  something here, Business Plan would be a permanent dead end for every
  member (no way to ever get past the empty state). This is a plain form
  calling the same `generateIdea()` the chat would have, not a facsimile
  of GMBTE's actual generation UX.
