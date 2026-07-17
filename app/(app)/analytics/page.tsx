import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import Heatmap from "@/components/progress/Heatmap";
import TrendChart from "@/components/progress/TrendChart";
import SubjectDistributionBar from "@/components/progress/SubjectDistributionBar";
import TopicPerformanceList from "@/components/progress/TopicPerformanceList";
import {
  heatmap,
  analyticsSummary,
  learningTrend,
  topicPerformance,
  subjectDistribution,
} from "@/lib/progress-data";

export const metadata: Metadata = { title: "Analytics - Page.AI" };

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Progress"
        icon="chart"
        title="Analytics"
        description="A clear-eyed view of how your learning is actually going."
      />

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <SummaryCard
          label="Time studied"
          value={`${analyticsSummary.timeStudiedHours}h`}
        />
        <SummaryCard label="Accuracy" value={`${analyticsSummary.accuracy}%`} />
        <SummaryCard
          label="Consistency"
          value={`${analyticsSummary.consistency}%`}
        />
        <SummaryCard
          label="Avg. mastery"
          value={`${analyticsSummary.avgMastery}%`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-display text-[1.05rem] font-semibold text-ink">
              Study heatmap
            </h3>
            <p className="mt-1 text-xs text-ink-soft">
              Last 12 weeks of activity
            </p>
            <div className="mt-4">
              <Heatmap data={heatmap} />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-display text-[1.05rem] font-semibold text-ink">
              Learning trend
            </h3>
            <p className="mt-1 text-xs text-ink-soft">
              Weekly accuracy, last 8 weeks
            </p>
            <div className="mt-4">
              <TrendChart data={learningTrend} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-display text-[1.05rem] font-semibold text-ink">
              Subject distribution
            </h3>
            <p className="mt-1 text-xs text-ink-soft">Time spent by subject</p>
            <div className="mt-4">
              <SubjectDistributionBar data={subjectDistribution} />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-display text-[1.05rem] font-semibold text-ink">
              Topic performance
            </h3>
            <p className="mt-1 text-xs text-ink-soft">Mastery by topic</p>
            <div className="mt-4">
              <TopicPerformanceList data={topicPerformance} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="font-display text-xl font-semibold text-ink">{value}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
        {label}
      </div>
    </div>
  );
}
