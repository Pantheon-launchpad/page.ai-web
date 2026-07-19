import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import TrendChart from "@/components/progress/TrendChart";
import { AdminApi } from "@/services/admin.api";

export const metadata: Metadata = { title: "Admin Dashboard - Page.AI" };

export default async function AdminDashboardPage() {
  const { stats, growthTrend, aiUsageBySubject, systemHealth } =
    await AdminApi.getDashboard();
  const maxUsage = Math.max(...aiUsageBySubject.map((s) => s.value));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Admin"
        icon="chart"
        title="Platform overview"
        description="Live snapshot of Page.AI across every student, subject, and system."
      />

      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4">
            <div className="font-display text-xl font-semibold text-ink">
              {s.value}
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              {s.label}
            </div>
            {s.delta && (
              <div
                className={`mt-1.5 text-xs font-medium ${s.trend === "up" ? "text-moss" : "text-ember"}`}
              >
                {s.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">
            Student growth
          </h3>
          <p className="mt-1 text-xs text-ink-soft">
            Total students, last 8 weeks
          </p>
          <div className="mt-4">
            <TrendChart data={growthTrend.map((d) => d.value)} />
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">
            System health
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {systemHealth.map((m) => (
              <li
                key={m.label}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      m.status === "operational"
                        ? "bg-moss"
                        : m.status === "degraded"
                          ? "bg-ember"
                          : "bg-ember"
                    }`}
                  />
                  <span className="text-ink-soft">{m.label}</span>
                </div>
                <span className="font-mono text-xs text-ink-faint">
                  {m.latencyMs ? `${m.latencyMs}ms · ` : ""}
                  {m.uptimePercent}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">
          AI usage by subject
        </h3>
        <p className="mt-1 text-xs text-ink-soft">
          Tutor + Chat with Book messages, last 30 days
        </p>
        <div className="mt-4 flex flex-col gap-3">
          {aiUsageBySubject.map((s) => (
            <div key={s.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-ink">{s.name}</span>
                <span className="font-mono text-xs text-ink-faint">
                  {s.value.toLocaleString()}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                <div
                  className={`h-full rounded-full ${
                    s.color === "signal"
                      ? "bg-signal"
                      : s.color === "ember"
                        ? "bg-ember"
                        : "bg-moss"
                  }`}
                  style={{ width: `${(s.value / maxUsage) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
