// Ported as-is from GMBT-Updated-Frontend's MarketResearchSection/MRHero.tsx.
import type { IdeaContent } from "@/lib/ideaEngineApi";

export default function MRResultHero({ content }: { content?: IdeaContent }) {
  const summary = content?.summary_card ?? {
    title: "Market Validation Score",
    description: "AI Fitness Coaching App — Full market assessment",
    confidence_score: 78,
  };
  const insights = content?.market_insights;
  const score = summary.confidence_score;
  const badge = score >= 70 ? "Strong Opportunity" : score >= 40 ? "Moderate Opportunity" : "Needs Work";

  const stats = [
    { label: "MARKET DEMAND", value: insights ? `${insights.demand.label} ↑` : "High ↑", valueClass: "text-[#5AA34A]" },
    { label: "COMPETITION", value: insights?.competition.label ?? "Medium", valueClass: "text-[#F5A623]" },
    { label: "STARTUP COST", value: insights?.startup_cost ?? "Low–Med", valueClass: "text-[#4A9EE8]" },
    { label: "PROFIT POTENTIAL", value: insights ? `${insights.profit_potential} ↑` : "High ↑", valueClass: "text-[#F5A623]" },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0B2545] w-full min-w-0 px-4 py-5 shadow-[0_8px_32px_rgba(11,37,69,0.18)] sm:px-6 sm:py-7">
      <div className="relative z-10">
        <p className="text-base font-bold text-white sm:text-lg">{summary.title}</p>
        <p className="mt-0.5 text-xs text-[#8AA4BF] break-words">{summary.description}</p>

        <div className="mt-5 flex flex-wrap items-end gap-3">
          <span className="text-5xl font-extrabold leading-none text-[#F6D04D] sm:text-[64px]">{score}</span>
          <div className="mb-2 space-y-1">
            <p className="text-xs text-[#8AA4BF]">out of 100</p>
            <span className="inline-block rounded-full border border-[#5AA34A] px-3 py-0.5 text-xs font-semibold text-[#5AA34A]">{badge}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3">
              <p className="text-[9px] font-semibold tracking-widest text-[#8AA4BF] uppercase sm:text-[10px]">{stat.label}</p>
              <p className={`mt-1 text-xs font-bold sm:text-sm ${stat.valueClass}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
