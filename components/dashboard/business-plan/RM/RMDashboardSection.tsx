// Adapted — ChatSideBarPanel dropped, single-column layout.
import RoadmapPreviousIdeas from "./RMPreviousIdeas";
import RoadmapTimeline from "./RMTimeline";
import type { IdeaContent } from "@/lib/ideaEngineApi";

export const RoadmapDashboardSection = ({ content }: { content?: IdeaContent }) => {
  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[900px] space-y-6">
        <RoadmapTimeline content={content} />
        <RoadmapPreviousIdeas />
      </div>
    </div>
  );
};
