// Ported from GMBT-Updated-Frontend's MarketResearchDashboard/IdeaGenerator/
// IGNextSteps.tsx.
import type { IdeaContent } from "@/lib/ideaEngineApi";

const palette = [
  { bgClass: "bg-[#FFF5F6]", borderClass: "border-[#F2C7CC]" },
  { bgClass: "bg-[#F2F7FF]", borderClass: "border-[#C8DBFA]" },
  { bgClass: "bg-[#FFFDF4]", borderClass: "border-[#E7DFC2]" },
  { bgClass: "bg-[#F5FFF6]", borderClass: "border-[#C7E8CC]" },
];
const titles = ["Validate the Idea", "Build MVP", "Launch & Market"];

export default function IGNextSteps({ content }: { content?: IdeaContent }) {
  const steps = content?.next_steps ?? [];
  if (steps.length === 0) return null;

  return (
    <section className="min-w-0">
      <h3 className="mb-3 text-sm font-semibold text-[#0D1B3E] sm:mb-4 sm:text-base">Next Steps</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {steps.map((description, i) => {
          const style = palette[i % palette.length];
          return (
            <article
              key={i}
              className={`rounded-2xl border p-4 sm:p-5 shadow-[0_8px_18px_rgba(15,23,42,0.06)] transition-transform duration-200 hover:-translate-y-0.5 ${style.bgClass} ${style.borderClass}`}
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#0D1B3E] text-xs font-extrabold text-[#F6D04D] shadow-sm">
                {i + 1}
              </div>
              <h4 className="text-sm font-bold text-[#0D1B3E]">{titles[i] ?? `Step ${i + 1}`}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-[#6C7480]">{description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
