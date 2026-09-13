import ClimateActionIndex from "@/components/dashboard/green-impact/ClimateActionIndex";

// Replaces the interim course-grid-only version — this is now the real
// composite landing page (SustainabilityStats, GreenInnovationProjects,
// MeasureYourImpact, ClimateInsightsData, plus RightRail: profile,
// achievements, leaderboard, AI advisor), matching GMBTE's actual
// /dashboard/green-impact. GreenExchange and ExpertSupport were pulled
// for now — ported as-is from GMBTE but not wired to anything real here.
export default function GreenImpactPage() {
  return <ClimateActionIndex />;
}
