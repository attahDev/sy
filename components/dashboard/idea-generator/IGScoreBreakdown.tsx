// Ported from GMBT-Updated-Frontend's MarketResearchDashboard/IdeaGenerator/
// IGScoreBreakdown.tsx.
import AIDashboardCard from "@/components/dashboard/shared/AIDashboardCard";
import type { IdeaContent } from "@/lib/ideaEngineApi";

const descriptions: Record<string, string> = {
  Market: "Strong demand and growing industry",
  Profit: "Good margins with subscription model",
  Execution: "Feasible given the stated skills and budget",
  Scalability: "High potential for growth",
};

const styleByLabel: Record<string, { color: string; bg: string; border: string }> = {
  Market: { color: "#2F6DB3", bg: "bg-[#FAFBFD]", border: "border-[#E4E8EE]" },
  Profit: { color: "#4A9B52", bg: "bg-[#FBFCFA]", border: "border-[#E5EADF]" },
  Execution: { color: "#D05C67", bg: "bg-[#FFF9FA]", border: "border-[#F0DADF]" },
  Scalability: { color: "#9A58A5", bg: "bg-[#FCFAFD]", border: "border-[#E9DDF0]" },
};

const R = 28, CX = 36, CY = 36, SIZE = 72, STROKE_W = 5;
const CIRCUMFERENCE = 2 * Math.PI * R;

function CircleProgress({ score, color }: { score: number; color: string }) {
  const progress = (score / 10) * CIRCUMFERENCE;
  const remaining = CIRCUMFERENCE - progress;
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="drop-shadow-sm">
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#E7EAF0" strokeWidth={STROKE_W} />
      <circle
        cx={CX} cy={CY} r={R} fill="none" stroke={color} strokeWidth={STROKE_W} strokeLinecap="round"
        strokeDasharray={`${progress} ${remaining}`} transform={`rotate(-90 ${CX} ${CY})`}
      />
    </svg>
  );
}

export default function IGScoreBreakdown({ content }: { content?: IdeaContent }) {
  if (!content?.score_breakdown) return null;
  const breakdown = content.score_breakdown;

  const scores = (["Market", "Profit", "Execution", "Scalability"] as const).map((label) => {
    const key = label.toLowerCase() as keyof typeof breakdown;
    return { label, score: breakdown[key], description: descriptions[label], ...styleByLabel[label] };
  });

  return (
    <section className="min-w-0">
      <h3 className="mb-3 text-base font-semibold text-[#0D1B3E] sm:mb-4 sm:text-lg">Score Breakdown</h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {scores.map((s) => (
          <AIDashboardCard
            key={s.label}
            variant="default"
            padding="md"
            className={`flex min-w-0 flex-col items-center rounded-2xl border text-center shadow-[0_8px_18px_rgba(15,23,42,0.06)] ${s.bg} ${s.border}`}
          >
            <div className="relative scale-90 sm:scale-100">
              <CircleProgress score={s.score} color={s.color} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-extrabold tracking-tight text-[#0D1B3E] sm:text-[22px]">{s.score}</span>
              </div>
            </div>
            <h4 className="mt-1.5 text-xs font-bold text-[#0D1B3E] sm:mt-2 sm:text-sm">{s.label}</h4>
            <p className="mt-1 max-w-[120px] text-[10px] leading-relaxed text-[#98A2B3] sm:max-w-[140px] sm:text-xs">{s.description}</p>
          </AIDashboardCard>
        ))}
      </div>
    </section>
  );
}
