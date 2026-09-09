# Opportunity Insights — status

2nd of Business Studio's 4 sub-tools. Ported from GMBT-Updated-Frontend's
MarketResearchDashboard/MarketResearchSection/*.

**Naming note, inherited from GMBTE, not introduced here**: the nav label
"Opportunity Insights" maps to what's internally the Market Research
tool — component names (`MRDashboardSection`, `MRHero`, etc.) and content
are unchanged from the original. Worth a product decision on whether the
nav label should actually say "Market Research" instead, since anyone
reading the source next to the nav will see the mismatch.

## Done
- Market validation score hero, competitor analysis, target audience,
  competitive edge — same `IdeaContent` shape as Business Plan.
- "Build Business Plan" button is a real cross-module link — sets the
  current idea and routes to `/dashboard/business-plan` (already built).
- Falls back to the most recently generated idea if there's no
  session-current one (nicer default than Business Plan's, which just
  shows empty) — same as the original.

## Adapted / simplified, not straight copies
- `ChatSideBarPanel` dropped, same as Business Plan — single-column
  layout instead of `[content, chat]`.
- `MREmpty`'s dead-end link to `/dashboard/ai-studio` replaced with the
  shared `GenerateIdeaForm` (moved to `components/dashboard/shared/` in
  this PR since Business Plan and this tool both need it now).
- `MRHero.tsx`'s decorative background SVG watermark (a large inline
  path, purely visual) was dropped for brevity — no functional change,
  but worth knowing this isn't a pixel-exact visual port.
