// Ported as-is.
import AIDashboardCard from "@/components/dashboard/shared/AIDashboardCard";
import type { IdeaContent } from "@/lib/ideaEngineApi";

const fallback =
  "AI Fitness Coaching App is a mobile-first SaaS platform that delivers personalized fitness " +
  "and nutrition coaching powered by AI. We target busy professionals aged 25–40 who want " +
  "effective, affordable, and flexible coaching without the cost of a personal trainer.";

export default function BPExecutiveSummary({ content }: { content?: IdeaContent }) {
  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-3 text-sm font-extrabold tracking-wide text-[#0D1B3E]">Executive Summary</h3>
      <p className="text-sm leading-relaxed text-[#5B6472]">{content?.executive_summary || fallback}</p>
    </AIDashboardCard>
  );
}
