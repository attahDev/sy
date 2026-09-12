// Ported from GMBT-Updated-Frontend's MarketResearchDashboard/IdeaGenerator/
// IGResultHero.tsx — same 4-stat layout, using the shared AIDashboardCard
// (panel variant, already SY-navy #0D1B3E) instead of GMBTE's own copy.
import { TrendingUp } from "lucide-react";
import AIDashboardCard from "@/components/dashboard/shared/AIDashboardCard";
import type { IdeaContent } from "@/lib/ideaEngineApi";

export default function IGResultHero({ content }: { content?: IdeaContent }) {
  const summary = content?.summary_card ?? {
    title: "Your idea, scored and broken down",
    description: "Generate an idea to see it here.",
    confidence_score: 0,
  };
  const demand = content?.market_insights.demand ?? { label: "—", score: 0 };
  const difficulty = content?.feasibility_card.difficulty ?? "—";
  const profitPotential = content?.market_insights.profit_potential ?? "—";

  const confidenceLabel =
    summary.confidence_score >= 70 ? "Strong opportunity" : summary.confidence_score >= 40 ? "Moderate opportunity" : "Needs work";

  const stats = [
    { label: "CONFIDENCE SCORE", value: `${summary.confidence_score}/100`, sub: confidenceLabel, showTrend: false },
    { label: "MARKET DEMAND", value: demand.label, sub: `${demand.score}/10`, showTrend: true },
    { label: "DIFFICULTY", value: difficulty, sub: difficulty === "Easy" ? "Straightforward" : difficulty === "Hard" ? "Challenging" : "Achievable", showTrend: false },
    { label: "PROFIT POTENTIAL", value: profitPotential, sub: "Scalable", showTrend: true },
  ];

  return (
    <AIDashboardCard variant="panel" padding="lg" className="relative overflow-hidden">
      <div className="relative z-10 flex flex-col justify-between gap-6 sm:gap-8">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#F6D04D]/15 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[#F6D04D] sm:mb-4 sm:px-3 sm:text-xs">
            <span className="text-[9px] sm:text-[10px]">✦</span>
            Your Result
          </div>
          <h2 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:text-[28px]">{summary.title}</h2>
          <p className="mt-1.5 text-xs text-white/55 sm:mt-2 sm:text-sm">{summary.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="min-w-0 rounded-xl bg-white/[0.07] px-2.5 py-2.5 sm:rounded-2xl sm:px-4 sm:py-3">
              <p className="truncate text-[8px] font-bold tracking-[0.08em] text-white/40 uppercase sm:text-[9px] sm:tracking-[0.1em]">{s.label}</p>
              <p className="mt-1 flex items-center gap-0.5 text-base font-extrabold text-[#F6D04D] sm:mt-1.5 sm:gap-1 sm:text-xl">
                <span className="truncate">{s.value}</span>
                {s.showTrend && <TrendingUp className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-white/45 sm:text-xs">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </AIDashboardCard>
  );
}
