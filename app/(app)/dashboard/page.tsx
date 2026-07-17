import type { Metadata } from "next";
import Greeting from "@/components/dashboard/Greeting";
import ContinueLearningCard from "@/components/dashboard/ContinueLearningCard";
import StatsRow from "@/components/dashboard/StatsRow";
import AIRecommendationCard from "@/components/dashboard/AIRecommendationCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingRevision from "@/components/dashboard/UpcomingRevision";
import QuickActions from "@/components/dashboard/QuickActions";
import RewardsSection from "@/components/rewards/RewardsSection";
import MissionsCard from "@/components/rewards/MissionsCard";
import { dailyMissions } from "@/lib/rewards-data";

export const metadata: Metadata = {
  title: "Dashboard — Page.AI",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Greeting />
      <ContinueLearningCard />
      <StatsRow />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <AIRecommendationCard />
          <MissionsCard missions={dailyMissions} limit={4} />
          <RecentActivity />
        </div>
        <div className="flex flex-col gap-6">
          <RewardsSection />
          <UpcomingRevision />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
