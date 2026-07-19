import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import { Icon } from "@/components/dashboard/icons";
import { StreakApi } from "@/services/streak.api";

export const metadata: Metadata = { title: "Streaks - Page.AI" };

export default async function StreaksPage() {
  const { days: streakDays, history: streakHistory, stats: streakStats } = await StreakApi.getStreak();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Progress"
        icon="flame"
        title="Streaks"
        description="Consistency compounds. Here's a record of yours."
      />

      <div className="glass-card-deep flex flex-col items-center gap-3 rounded-3xl p-8 text-center">
        <div className="animate-flame-flicker flex h-16 w-16 items-center justify-center rounded-3xl bg-ember/20 text-ember">
          <Icon name="flame" className="h-9 w-9" />
        </div>
        <p className="font-display text-3xl font-semibold text-white">{streakStats.current} days</p>
        <p className="text-sm text-white/60">Current streak - keep showing up today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3">
        <Stat label="Current streak" value={`${streakStats.current}d`} />
        <Stat label="Longest streak" value={`${streakStats.longest}d`} />
        <Stat label="Total active days" value={`${streakStats.totalActiveDays}`} />
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">Last 4 weeks</h3>
        <div className="mt-4 grid grid-cols-7 gap-2 text-center">
          {streakDays.map((d, i) => (
            <span key={i} className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              {d}
            </span>
          ))}
          {streakHistory.map((week, wi) =>
            week.map((studied, di) => (
              <div
                key={`${wi}-${di}`}
                className={`flex h-9 items-center justify-center rounded-lg ${
                  studied ? "bg-ember-soft text-ember" : "bg-ink/5 text-ink-faint"
                }`}
              >
                <Icon name="flame" className="h-4 w-4" strokeWidth={studied ? 2 : 1.4} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-2xl p-4 text-center">
      <div className="font-display text-xl font-semibold text-ink">{value}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">{label}</div>
    </div>
  );
}
