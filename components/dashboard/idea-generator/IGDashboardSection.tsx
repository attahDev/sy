"use client";

// Mirrors opportunity-insights/MRDashboardSection.tsx's composition
// pattern — ChatSideBarPanel dropped (same reasoning: single-column,
// out of scope), GenerateIdeaForm shown when there's no idea yet
// instead of GMBTE's IGEmpty dead-end. Falls back to the most recently
// generated idea when there's no session-current one.
import { useEffect, useState } from "react";
import IGResultHero from "./IGResultHero";
import IGInsightCards from "./IGInsightCards";
import IGRevenueChart from "./IGRevenueChart";
import IGScoreBreakdown from "./IGScoreBreakdown";
import IGNextSteps from "./IGNextSteps";
import IGPreviousIdeas from "./IGPreviousIdeas";
import GenerateIdeaForm from "@/components/dashboard/shared/GenerateIdeaForm";
import { getIdea, listIdeas, type IdeaContent } from "@/lib/ideaEngineApi";
import { getCurrentIdeaId, setCurrentIdeaId } from "@/lib/currentIdea";

export default function IGDashboardSection() {
  const [content, setContent] = useState<IdeaContent | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [hasIdea, setHasIdea] = useState(false);

  const loadIdea = (id: string) => {
    setLoading(true);
    return getIdea(id)
      .then((idea) => {
        setContent(idea.content);
        setHasIdea(true);
        setCurrentIdeaId(idea.id);
      })
      .catch(() => setHasIdea(false))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const current = getCurrentIdeaId();
    if (current) {
      loadIdea(current);
      return;
    }
    listIdeas()
      .then((ideas) => {
        if (ideas.length > 0) return loadIdea(ideas[0].id);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-[#F2F2EE]" />;

  return (
    <div className="min-h-screen bg-[#F2F2EE] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-[1100px] space-y-4 sm:space-y-6">
        {hasIdea ? (
          <>
            <IGResultHero content={content} />
            <IGInsightCards content={content} />
            <IGRevenueChart content={content} />
            <IGScoreBreakdown content={content} />
            <IGNextSteps content={content} />
            <IGPreviousIdeas onSelect={loadIdea} />
          </>
        ) : (
          <GenerateIdeaForm />
        )}
      </div>
    </div>
  );
}
