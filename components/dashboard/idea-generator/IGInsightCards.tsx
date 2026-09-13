// Ported from GMBT-Updated-Frontend's MarketResearchDashboard/IdeaGenerator/
// IGInsightCards.tsx.
import { BarChart2, CheckCircle, Star } from "lucide-react";
import AIDashboardCard from "@/components/dashboard/shared/AIDashboardCard";
import type { IdeaContent } from "@/lib/ideaEngineApi";

function Row({ label, value, valueClass }: { label: string; value: string; valueClass: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-2">
      <span className="text-xs text-[#5B6472] sm:text-sm">{label}</span>
      <span className={`shrink-0 text-xs font-bold sm:text-sm ${valueClass}`}>{value}</span>
    </div>
  );
}

function CardHeader({ icon, iconBg, iconColor, title }: { icon: React.ReactNode; iconBg: string; iconColor: string; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className={`flex h-7 w-7 items-center justify-center rounded-full ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <span className="text-xs font-extrabold tracking-[0.08em] text-[#0D1B3E] uppercase">{title}</span>
    </div>
  );
}

export default function IGInsightCards({ content }: { content?: IdeaContent }) {
  const demand = content?.market_insights.demand ?? { label: "—", score: 0 };
  const competition = content?.market_insights.competition ?? { label: "—", score: 0 };
  const opportunity = content?.market_insights.opportunity ?? "Generate an idea to see this analysis.";

  const fitScore = content?.feasibility_card.fit_score ?? 0;
  const strengths = content?.feasibility_card.strengths ?? [];
  const difficulty = content?.feasibility_card.difficulty ?? "—";

  const revenueModel = content?.revenue_chart.model ?? "—";
  const scalability = content?.revenue_chart.scalability ?? "—";
  const month6 = content?.revenue_chart.projection?.[5]?.revenue;
  const month6Label = month6 != null ? `£${month6.toLocaleString()}` : "—";

  return (
    <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-3">
      <AIDashboardCard variant="default" padding="md">
        <CardHeader icon={<BarChart2 className="h-4 w-4" />} iconBg="bg-[#FFECC1]" iconColor="text-[#D7263D]" title="Market Insights" />
        <div className="space-y-2.5">
          <Row label="Demand" value={`${demand.label} ${demand.score}/10`} valueClass="text-[#D7263D]" />
          <Row label="Competition" value={`${competition.label} ${competition.score}/10`} valueClass="text-[#F5A623]" />
        </div>
        <div className="mt-3 rounded-xl bg-[#F7F8FA] p-3">
          <p className="text-xs leading-relaxed text-[#5B6472]">
            <span className="font-semibold text-[#0D1B3E]">Opportunity:</span> {opportunity}
          </p>
        </div>
      </AIDashboardCard>

      <AIDashboardCard variant="default" padding="md">
        <CardHeader icon={<CheckCircle className="h-4 w-4" />} iconBg="bg-[#E8F5E9]" iconColor="text-[#5AA34A]" title="Feasibility" />
        <div className="space-y-2.5">
          <Row label="Difficulty" value={difficulty} valueClass="text-[#F5A623]" />
          <Row label="Fit Score" value={`${fitScore}/100`} valueClass="text-[#D7263D]" />
        </div>
        {strengths.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {strengths.slice(0, 2).map((s, i) => (
              <p key={i} className="text-xs text-[#5B6472]">
                <span className="font-semibold text-[#5AA34A]">Strengths:</span> {s}
              </p>
            ))}
          </div>
        )}
      </AIDashboardCard>

      <AIDashboardCard variant="default" padding="md">
        <CardHeader icon={<Star className="h-4 w-4" />} iconBg="bg-[#FFFBEA]" iconColor="text-[#F6D04D]" title="Revenue Projection" />
        <div className="space-y-2.5">
          <Row label="Model" value={revenueModel} valueClass="text-[#0D1B3E]" />
          <Row label="Month 6 Target" value={month6Label} valueClass="text-[#5AA34A]" />
          <Row label="Scalability" value={scalability} valueClass="text-[#D7263D]" />
        </div>
      </AIDashboardCard>
    </div>
  );
}
