import CoursesGrid from "../../../components/dashboard/courses/CoursesGrid";

// Replaces the ComingSoon placeholder with the shared course engine
// (category="climate"). GMBT-Updated-Frontend's real /dashboard/green-impact
// (ClimateActionIndex) is a much bigger composite page — 8 sections beyond
// courses: SustainabilityStats, GreenExchange, ExpertSupport,
// GreenInnovationProjects, MeasureYourImpact, ClimateInsightsData, plus a
// RightRail (leaderboard, AI advisor, log-a-green-action form, achievements).
// None of those are ported yet — see components/dashboard/courses/README.
export default function GreenImpactPage() {
  return (
    <CoursesGrid
      category="climate"
      basePath="/dashboard/green-impact"
      title="Sustainability Courses & Learning Materials"
      eyebrow="Green Impact"
      breadcrumbLabel="Climate Change"
    />
  );
}
