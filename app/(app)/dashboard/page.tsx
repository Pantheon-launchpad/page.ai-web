import type { Metadata } from "next";
import Greeting from "@/components/dashboard/Greeting";
import ContinueLearningCard from "@/components/dashboard/ContinueLearningCard";
import StatsRow from "@/components/dashboard/StatsRow";
import AIRecommendationCard from "@/components/dashboard/AIRecommendationCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import UpcomingRevision from "@/components/dashboard/UpcomingRevision";
import QuickActions from "@/components/dashboard/QuickActions";

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
          <RecentActivity />
        </div>
        <div className="flex flex-col gap-6">
          <UpcomingRevision />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
