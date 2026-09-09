import { MRDashboardSection } from "@/components/dashboard/opportunity-insights/MRDashboardSection";

// Replaces the ComingSoon placeholder. Note the nav label
// "Opportunity Insights" maps to what's actually the Market Research
// tool internally (component names MRxxx, route content unchanged from
// GMBTE) — that naming split is inherited from the original, not
// introduced here.
export default function OpportunityInsightsPage() {
  return <MRDashboardSection />;
}
