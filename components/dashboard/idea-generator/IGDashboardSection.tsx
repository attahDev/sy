"use client";

// Mirrors opportunity-insights/MRDashboardSection.tsx's composition
// pattern — ChatSideBarPanel dropped (same reasoning: single-column,
// out of scope), GenerateIdeaForm shown when there's no idea yet
// instead of GMBTE's IGEmpty dead-end. Falls back to the most recently
// generated idea when there's no session-current one.
//
// "New idea" button added: hasIdea previously only flipped to false
// before a member's very first idea — once generated, there was no
// way back to GenerateIdeaForm to make another one. This lets the
// member explicitly clear the session-current idea and see the form
// again, without touching their saved idea history.
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import IGResultHero from "./IGResultHero";
import IGInsightCards from "./IGInsightCards";
import IGRevenueChart from "./IGRevenueChart";
import IGScoreBreakdown from "./IGScoreBreakdown";
import IGNextSteps from "./IGNextSteps";
import IGPreviousIdeas from "./IGPreviousIdeas";
import GenerateIdeaForm from "@/components/dashboard/shared/GenerateIdeaForm";
import { getIdea, listIdeas, type IdeaContent } from "@/lib/ideaEngineApi";
import { getCurrentIdeaId, setCurrentIdeaId, clearCurrentIdeaId } from "@/lib/currentIdea";

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

  const startNewIdea = () => {
    clearCurrentIdeaId();
    setContent(undefined);
    setHasIdea(false);
  };

  if (loading) return <div className="min-h-screen bg-[#F2F2EE]" />;

  return (
    <div className="min-h-screen bg-[#F2F2EE] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-[1100px] space-y-4 sm:space-y-6">
        {hasIdea ? (
          <>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={startNewIdea}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0D1B3E] px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-[#0D1B3E]/90"
              >
                <Plus className="h-3.5 w-3.5" />
                New idea
              </button>
            </div>
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
