// Adapted from GMBT-Updated-Frontend's BusinessPlanSection/BP/
// BPDashboardSection.tsx — ChatSideBarPanel (AI mentor chat) dropped, see
// components/dashboard/business-plan/README.md. Layout simplified from a
// two-column [content, chat] grid to a single centered column.
import BPBusinessModel from "./BPBusinessModel";
import BPExecutiveSummary from "./BPExecutiveSummary";
import BPNextActions from "./BPNextActions";
import type { IdeaContent } from "@/lib/ideaEngineApi";

export const BPDashboardSection = ({ content, planId, initialCompletedIndexes }: {
  content?: IdeaContent; planId?: string; initialCompletedIndexes?: number[];
}) => {
  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[900px] space-y-6">
        <BPExecutiveSummary content={content} />
        <BPBusinessModel content={content} />
        <BPNextActions content={content} planId={planId} initialCompletedIndexes={initialCompletedIndexes} />
      </div>
    </div>
  );
};
