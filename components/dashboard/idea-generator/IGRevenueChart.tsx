// Ported from GMBT-Updated-Frontend's MarketResearchDashboard/IdeaGenerator/
// IGRevenueChart.tsx — plain CSS bars, no charting library needed.
import AIDashboardCard from "@/components/dashboard/shared/AIDashboardCard";
import type { IdeaContent } from "@/lib/ideaEngineApi";

type Bar = { month: string; value: number; active?: boolean };

function fmt(v: number): string {
  if (v >= 1000) return `£${(v / 1000).toFixed(1)}k`;
  return `£${v}`;
}

export default function IGRevenueChart({ content }: { content?: IdeaContent }) {
  const projection = content?.revenue_chart.projection ?? [];
  if (projection.length === 0) return null;

  const bars: Bar[] = projection.map((p, i, arr) => ({
    month: p.month.replace("Month ", "M"),
    value: p.revenue,
    active: i === arr.length - 1,
  }));

  const maxVal = Math.max(...bars.map((b) => b.value), 1);
  const CHART_HEIGHT = 120;

  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-4 text-sm font-bold text-[#0D1B3E] sm:mb-5 sm:text-base">
        Revenue Projection — First {bars.length} Months
      </h3>
      <div className="scrollbar-hide -mx-1 overflow-x-auto px-1 sm:mx-0 sm:px-0">
        <div className="min-w-[480px] sm:min-w-0 sm:w-full">
          <div className="flex items-end gap-1.5 sm:gap-2" style={{ height: `${CHART_HEIGHT}px` }}>
            {bars.map((b) => {
              const barH = Math.max(4, (b.value / maxVal) * CHART_HEIGHT);
              return (
                <div key={b.month} className="flex flex-1 flex-col items-center justify-end" style={{ height: "100%" }}>
                  <span className={`mb-1 text-[9px] font-semibold leading-none ${b.active ? "text-[#0D1B3E]" : "text-[#9AA3B2]"}`}>
                    {fmt(b.value)}
                  </span>
                  <div
                    className={`w-full rounded-t-md transition-all ${b.active ? "bg-[#F6D04D]" : "bg-[#C8D1DC]"}`}
                    style={{ height: `${barH}px` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex gap-1.5 sm:gap-2">
            {bars.map((b) => (
              <div key={b.month} className={`flex-1 text-center text-[9px] font-semibold ${b.active ? "text-[#0D1B3E]" : "text-[#9AA3B2]"}`}>
                {b.month}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AIDashboardCard>
  );
}
