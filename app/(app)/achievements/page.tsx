import type { Metadata } from "next";
import { Icon } from "@/components/dashboard/icons";
import PageHeader from "@/components/learn/PageHeader";
import { AchievementApi } from "@/services/achievement.api";
import { DashboardApi } from "@/services/dashboard.api";

export const metadata: Metadata = { title: "Achievements - Page.AI" };

export default async function AchievementsPage() {
  const [achievements, { student }] = await Promise.all([
    AchievementApi.getAchievements(),
    DashboardApi.getDashboard(),
  ]);
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Progress"
        icon="trophy"
        title="Achievements"
        description="Badges, milestones, and the level you've earned along the way."
      >
        <div className="glass-card rounded-2xl px-4 py-2.5 text-center">
          <div className="font-display text-lg font-semibold text-ink">
            {earnedCount}/{achievements.length}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            Unlocked
          </div>
        </div>
      </PageHeader>

      <div className="glass-card-deep flex items-center gap-5 rounded-3xl p-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-signal text-white">
          <Icon name="crown" className="h-7 w-7" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-semibold text-white">
            Level {student.level}
          </p>
          <p className="text-sm text-white/60">
            {student.coinsIntoLevel}/{student.coinsForNextLevel} coins to Level{" "}
            {student.level + 1}
          </p>
          <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-signal"
              style={{
                width: `${Math.round((student.coinsIntoLevel / student.coinsForNextLevel) * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {achievements.map((a) => (
          <div
            key={a.id}
            className={`glass-card flex flex-col items-center gap-2.5 rounded-3xl p-5 text-center ${
              a.earned ? "" : "opacity-70"
            }`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                a.earned
                  ? "bg-signal-soft text-signal-deep"
                  : "bg-ink/5 text-ink-faint"
              }`}
            >
              <Icon name={a.icon} className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-ink">{a.title}</p>
            <p className="text-xs leading-snug text-ink-soft">
              {a.description}
            </p>

            {a.earned ? (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-moss-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-moss">
                <Icon name="check" className="h-3 w-3" strokeWidth={2.2} />
                Earned
              </span>
            ) : (
              <div className="mt-1 w-full">
                <div className="h-1 w-full overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-ink/30"
                    style={{ width: `${a.progress ?? 0}%` }}
                  />
                </div>
                <span className="mt-1 block font-mono text-[10px] text-ink-faint">
                  {a.progress ?? 0}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
