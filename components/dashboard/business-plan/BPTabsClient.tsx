"use client";

// Adapted from GMBT-Updated-Frontend's BusinessPlanSection/BPTabs.tsx —
// useParams (planId from the URL) becomes a prop from the server page.tsx;
// ChatSideBarPanel dropped from the empty state; BPEmpty's dead-end
// "go to /dashboard/ai-studio" link replaced with GenerateIdeaForm since
// that destination isn't built yet. Everything else (loading a specific
// saved plan by ID vs. whatever idea is current in this session,
// prioritizing sourceIdeaId as the real cross-device link) is unchanged.
import { useEffect, useState } from "react";
import { BPDashboardSection } from "./BP/BPDashboardSection";
import { FinDashboardSection } from "./FI/FIDashboardSection";
import { RoadmapDashboardSection } from "./RM/RMDashboardSection";
import GenerateIdeaForm from "./GenerateIdeaForm";
import { getIdea, type IdeaContent } from "@/lib/ideaEngineApi";
import { getCurrentIdeaId } from "@/lib/currentIdea";
import { getBusinessPlanById } from "@/lib/businessPlannerApi";

type Tab = "roadmap" | "financials" | "business-plan";
const tabs: { id: Tab; label: string }[] = [
  { id: "roadmap", label: "Roadmap" },
  { id: "financials", label: "Financials" },
  { id: "business-plan", label: "Business Plan" },
];

export default function BPTabsClient({ routePlanId }: { routePlanId?: string }) {
  const [active, setActive] = useState<Tab>("roadmap");
  const [content, setContent] = useState<IdeaContent | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [hasIdea, setHasIdea] = useState(false);
  const [planId, setPlanId] = useState<string | undefined>(undefined);
  const [initialCompletedIndexes, setInitialCompletedIndexes] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;

    const loadContentFromIdea = (ideaId: string) =>
      getIdea(ideaId)
        .then((idea) => { if (!cancelled) { setContent(idea.content); setHasIdea(true); } })
        .catch(() => { if (!cancelled) setHasIdea(false); });

    const run = async () => {
      if (routePlanId) {
        try {
          const plan = await getBusinessPlanById(routePlanId);
          if (cancelled) return;
          setPlanId(plan.id);
          setInitialCompletedIndexes(plan.completedActionIndexes || []);
          if (plan.sourceIdeaId) {
            await loadContentFromIdea(plan.sourceIdeaId);
          } else {
            setHasIdea(false);
          }
        } catch {
          if (!cancelled) setHasIdea(false);
        }
      } else {
        const ideaId = getCurrentIdeaId();
        if (!ideaId) setHasIdea(false);
        else await loadContentFromIdea(ideaId);
      }
    };

    run().finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [routePlanId]);

  if (loading) return <div className="min-h-screen bg-[#F2F2EE]" />;

  if (!hasIdea) {
    return (
      <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[900px]">
          <GenerateIdeaForm />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b border-[#E5E7EB] bg-[#F2F2EE] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1600px] gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`-mb-px border-b-2 py-3 text-sm font-semibold transition-colors duration-150 ${
                active === tab.id ? "border-[#F6D04D] text-[#0D1B3E]" : "border-transparent text-[#9CA3AF] hover:text-[#5B6472]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {active === "roadmap" && <RoadmapDashboardSection content={content} />}
      {active === "financials" && <FinDashboardSection content={content} />}
      {active === "business-plan" && (
        <BPDashboardSection content={content} planId={planId} initialCompletedIndexes={initialCompletedIndexes} />
      )}
    </div>
  );
}
