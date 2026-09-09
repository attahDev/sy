"use client";

// Adapted from GMBT-Updated-Frontend's MarketResearchSection/
// MRDashboardSection.tsx — ChatSideBarPanel dropped (single-column
// layout, same as Business Plan — see README), MREmpty's dead-end
// "go to /dashboard/ai-studio" replaced with the shared GenerateIdeaForm.
// Falls back to the most recently generated idea when there's no
// session-current one, same as the original — a nicer default than
// Business Plan's, which just shows the empty state.
import { useEffect, useState } from "react";
import MRCompetitiveEdge from "./MRCompetitiveEdge";
import MRCompetitorAnalysis from "./MRCompetitorAnalysis";
import MRResultHero from "./MRHero";
import MRPreviousReports from "./MRPreviousReport";
import MRTargetAudience from "./MRTargetAudience";
import GenerateIdeaForm from "@/components/dashboard/shared/GenerateIdeaForm";
import { getIdea, listIdeas, type IdeaContent } from "@/lib/ideaEngineApi";
import { getCurrentIdeaId, setCurrentIdeaId } from "@/lib/currentIdea";

export const MRDashboardSection = () => {
  const [content, setContent] = useState<IdeaContent | undefined>(undefined);
  const [ideaId, setIdeaId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasIdea, setHasIdea] = useState(false);

  const loadIdea = (id: string) => {
    setLoading(true);
    return getIdea(id)
      .then((idea) => {
        setContent(idea.content);
        setIdeaId(idea.id);
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
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[900px] space-y-6">
        {hasIdea ? (
          <>
            <div className="grid min-w-0 gap-6 lg:grid-cols-2">
              <MRResultHero content={content} />
              <MRCompetitorAnalysis content={content} />
            </div>
            <div className="grid min-w-0 gap-6 lg:grid-cols-2">
              <MRTargetAudience content={content} />
              <MRCompetitiveEdge content={content} ideaId={ideaId ?? undefined} />
            </div>
            <MRPreviousReports onSelect={loadIdea} />
          </>
        ) : (
          <GenerateIdeaForm />
        )}
      </div>
    </div>
  );
};
