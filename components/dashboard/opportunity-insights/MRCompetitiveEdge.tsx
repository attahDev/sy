"use client";

// Adapted — react-router's useNavigate → next/navigation's useRouter.
// This is the real cross-module link into Business Plan: clicking "Build
// Business Plan" sets the current idea then routes to /dashboard/business-plan
// (already built), same as GMBTE.
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import AIDashboardButton from "@/components/dashboard/shared/AIDashboardButton";
import AIDashboardCard from "@/components/dashboard/shared/AIDashboardCard";
import { setCurrentIdeaId } from "@/lib/currentIdea";
import type { IdeaContent } from "@/lib/ideaEngineApi";

const defaultEdges = [
  "AI-first personalisation at a low cost point",
  "Affordable £20/month vs £149/month competitors",
  "Community + AI coaching hybrid model",
];

export default function MRCompetitiveEdge({ content, ideaId, onBuildPlan }: {
  content?: IdeaContent; ideaId?: string; onBuildPlan?: () => void;
}) {
  const router = useRouter();
  const edges = content?.competitive_edge?.length ? content.competitive_edge : defaultEdges;

  const handleBuildPlan = onBuildPlan ?? (() => {
    if (ideaId) setCurrentIdeaId(ideaId);
    router.push("/dashboard/business-plan");
  });

  return (
    <AIDashboardCard variant="default" padding="md">
      <h3 className="mb-4 text-base font-semibold text-[#001F3F]">Your Competitive Edge</h3>
      <div className="space-y-2.5">
        {edges.map((edge, i) => (
          <div key={i} className="rounded-xl border border-[#E4E8ED] bg-[#F7F8FA] px-4 py-3 text-xs leading-relaxed text-[#3D4A5C]">
            {edge}
          </div>
        ))}
      </div>
      <AIDashboardButton onClick={handleBuildPlan} className="mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-xl bg-[#D7263D] py-4 font-semibold text-white transition-colors hover:bg-[#B91C30]">
        <span className="leading-none">Build Business Plan</span>
        <ArrowRight className="relative top-px h-4 w-4 shrink-0" />
      </AIDashboardButton>
    </AIDashboardCard>
  );
}
