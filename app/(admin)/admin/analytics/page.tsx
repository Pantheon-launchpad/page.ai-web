import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import TrendChart from "@/components/progress/TrendChart";
import { AdminApi } from "@/services/admin.api";

export const metadata: Metadata = { title: "Analytics - Admin - Page.AI" };

export default async function AdminAnalyticsPage() {
  const { growthTrend, aiUsageBySubject, stats } = await AdminApi.getAnalytics();
  const totalAiUsage = aiUsageBySubject.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Admin"
        icon="chart"
        title="Analytics"
        description="Platform-wide learning, engagement, and AI usage trends."
      />

      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4">
            <div className="font-display text-xl font-semibold text-ink">{s.value}</div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">Growth trend</h3>
        <p className="mt-1 text-xs text-ink-soft">Cumulative students, last 8 weeks</p>
        <div className="mt-4">
          <TrendChart data={growthTrend.map((d) => d.value)} />
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">AI usage distribution</h3>
        <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-ink/5">
          {aiUsageBySubject.map((s) => (
            <div
              key={s.name}
              className={s.color === "signal" ? "bg-signal" : s.color === "ember" ? "bg-ember" : "bg-moss"}
              style={{ width: `${(s.value / totalAiUsage) * 100}%` }}
              title={`${s.name}: ${s.value}`}
            />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
          {aiUsageBySubject.map((s) => (
            <div key={s.name} className="flex items-center gap-2 text-xs text-ink-soft">
              <span className={`h-2.5 w-2.5 rounded-full ${s.color === "signal" ? "bg-signal" : s.color === "ember" ? "bg-ember" : "bg-moss"}`} />
              <span className="truncate">{s.name}</span>
              <span className="ml-auto font-mono text-ink-faint">{Math.round((s.value / totalAiUsage) * 100)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
