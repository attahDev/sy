// Adapted — ChatSideBarPanel dropped, single-column layout. See
// components/dashboard/business-plan/README.md.
import FinRevenueChart from "./FIRevenueCharts";
import FinStatCards from "./FIStats";
import type { IdeaContent } from "@/lib/ideaEngineApi";

export const FinDashboardSection = ({ content }: { content?: IdeaContent }) => {
  return (
    <div className="min-h-screen bg-[#F2F2EE] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[900px] space-y-6">
        <FinStatCards content={content} />
        <FinRevenueChart content={content} />
      </div>
    </div>
  );
};
