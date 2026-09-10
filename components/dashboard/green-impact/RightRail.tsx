// Ported as-is from GMBT-Updated-Frontend's ClimateDashboard/RightRail.tsx.
import GreenImpactProfile from "./GreenImpactProfile";
import SustainabilityAchievements from "./SustainabilityAchievements";
import SustainabilityLeaderboard from "./SustainabilityLeaderboard";
import AIGreenAdvisor from "./AIGreenAdvisor";

export default function RightRail() {
  return (
    <aside className="w-full space-y-5 sm:space-y-6 xl:max-w-[410px]">
      <GreenImpactProfile />
      <SustainabilityAchievements />
      <SustainabilityLeaderboard />
      <AIGreenAdvisor />
    </aside>
  );
}
