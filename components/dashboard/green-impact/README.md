# Green Impact widgets — status (in progress)

`climateActionIndex.tsx` (the real `/dashboard/green-impact` landing page
in GMBTE) is a composite of 10 files, 2,339 lines total. Being ported in
chunks rather than one PR — see components/dashboard/courses/README.md
and business-plan/README.md for why (same pattern as Business Studio).

## Done this chunk
- `lib/greenImpactApi.ts`, `lib/greenImpactEvents.ts` — foundational API
  and pub/sub, ported as-is. Backs most of what's below.
- `ClimateToolkitHeader.tsx` (was `climateToolkits.tsx`)
- `SustainabilityStats.tsx` — top stat cards
- `SustainabilityLearning.tsx` — reuses the course engine's
  `fetchCourses("climate")`, same as `/dashboard/green-impact`'s course grid
- `SustainabilityLeaderboard.tsx`

## Two real bugs/mismatches fixed while porting, not just carried over
- **`LogGreenActionForm.tsx`**: `AREA_OPTIONS` listed Greater Manchester's
  boroughs (City Centre, Salford, Trafford, Stockport...) — wrong region
  for this site. Replaced with South Yorkshire's actual 4 metropolitan
  boroughs (Sheffield, Barnsley, Doncaster, Rotherham).
- **Same file**: the original defines `AREA_OPTIONS` and an `area` state
  variable but never renders a control for it — dead code, always sent
  empty. Added the missing `<select>` so "Impact by Area" data
  (`ClimateInsightsData`, not yet ported) can ever be populated.
- **`SustainabilityLeaderboard.tsx`**: no-initials fallback was hardcoded
  `"GM"` (Greater Manchester) — changed to a neutral `"?"`.

## Still to port
`GreenInnovationProject.tsx` (161), `MeasureYourImpact.tsx` (171),
`ExpertSupport.tsx` (189), `AIGreenAdvisor.tsx` (197 — likely another AI
chat subsystem, same shape as the mentor chat dropped from Business
Plan/Opportunity Insights; confirming before deciding whether to include
or cut it), `GreenExchange.tsx` (237), `GreenImpactProfile.tsx` (240),
`ClimateInsightsData.tsx` (342), `SustainabilityAchievements.tsx` (154),
`RightRail.tsx` (composite of the last 4), and `climateActionIndex.tsx`
itself (the page that assembles everything). Not wired into
`/dashboard/green-impact` yet — that route still shows the course grid
only, same as before this chunk.
