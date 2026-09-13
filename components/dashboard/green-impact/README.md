# Green Impact widgets — status: complete

`climateActionIndex.tsx` (GMBTE's real `/dashboard/green-impact` landing
page — 2,339 lines across 15 files) is now fully ported and wired in,
replacing the interim course-grid-only version from the course-engine PR.

## What's here
- `lib/greenImpactApi.ts`, `lib/greenImpactEvents.ts`, `lib/greenAdvisorApi.ts`
- `ClimateToolkitHeader`, `SustainabilityStats`, `SustainabilityLearning`
  (reuses `fetchCourses("climate")` from the course engine), `MeasureYourImpact`,
  `GreenExchange`, `ExpertSupport`, `GreenInnovationProject`,
  `ClimateInsightsData`
- Right rail: `GreenImpactProfile`, `SustainabilityAchievements`,
  `SustainabilityLeaderboard`, `AIGreenAdvisor`, `LogGreenActionForm`
- `RightRail.tsx` and `ClimateActionIndex.tsx` assemble all of the above,
  same composition as the original.

## Real bugs/mismatches fixed while porting, not just carried over
- **`LogGreenActionForm.tsx`**: `AREA_OPTIONS` listed Greater Manchester's
  boroughs — replaced with South Yorkshire's actual 4 metropolitan
  boroughs (Sheffield, Barnsley, Doncaster, Rotherham). The original also
  defined this list and an `area` state variable but never rendered a
  control for it — dead code, always sent empty. Added the missing
  `<select>`.
- **`SustainabilityLeaderboard.tsx`**: no-initials fallback was hardcoded
  `"GM"` — changed to a neutral `"?"`.
- **`ClimateInsightsData.tsx`**: "Greater Manchester" appeared 3x in
  copy (page subtitle, section heading, modal's data-source line) —
  changed to "South Yorkshire".
- Colors corrected `#001F3F` → `#0D1B3E` throughout (this site's actual
  navy, same fix applied everywhere else in this codebase).

## Kept, not cut — different from the mentor chat decision
`AIGreenAdvisor` looks like the same shape as `ChatSideBarPanel` (dropped
twice from Business Studio) at a glance, but it's genuinely self-contained
— one widget, two plain endpoints (`/green-ai/advice`, `/green-ai/chat`),
no separate context provider spanning multiple screens. Ported in full.

## Known as-is from the original, not a bug introduced here
`ExpertSupport.tsx` is entirely static — hardcoded placeholder
consultants, no backend, and none of its three buttons have an `onClick`.
Ported faithfully; flagged in the component's own header comment.

## Still not ported
None of Green Impact's own scope — this section is done. Business
Studio's remaining 2 sub-tools (Studio dashboard, Idea Generator) are the
next thing on the list, unrelated to this PR.
