import { student } from "@/lib/dashboard-data";
import { Icon } from "./icons";

function StatCard({
  icon,
  iconClass,
  label,
  value,
  sub,
  children,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  iconClass: string;
  label: string;
  value: string;
  sub?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="glass-card flex flex-col rounded-2xl p-[18px]">
      <div className="flex items-center gap-2">
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${iconClass}`}>
          <Icon name={icon} className="h-4 w-4" />
        </div>
        <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">{label}</span>
      </div>
      <div className="mt-3 font-display text-xl font-semibold text-ink">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-ink-soft">{sub}</div>}
      {children}
    </div>
  );
}

export default function StatsRow() {
  const goalPercent = Math.min(100, Math.round((student.studyMinutesToday / student.studyGoalMinutes) * 100));
  const levelPercent = Math.round((student.coinsIntoLevel / student.coinsForNextLevel) * 100);

  return (
    <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
      <div className="glass-card col-span-2 flex flex-col justify-between rounded-2xl p-[18px] sm:col-span-1 lg:col-span-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
            <Icon name="target" className="h-4 w-4" />
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">Today&apos;s goal</span>
        </div>
        <div className="mt-3 font-display text-xl font-semibold text-ink">
          {student.studyMinutesToday}
          <span className="text-sm font-normal text-ink-faint"> / {student.studyGoalMinutes} min</span>
        </div>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-signal transition-all duration-700"
            style={{ width: `${goalPercent}%` }}
          />
        </div>
      </div>

      <StatCard
        icon="coin"
        iconClass="bg-ember-soft text-ember"
        label="Page coins"
        value={student.coins.toLocaleString()}
        sub={`${student.coinsIntoLevel}/${student.coinsForNextLevel} to next level`}
      />

      <StatCard
        icon="trophy"
        iconClass="bg-ember-soft text-ember"
        label="Level"
        value={`Lvl ${student.level}`}
        sub={`${levelPercent}% to Lvl ${student.level + 1}`}
      />

      <StatCard
        icon="flame"
        iconClass="bg-ember-soft text-ember"
        label="Daily streak"
        value={`${student.streak} days`}
        sub="Keep it alive today"
      />

      <StatCard
        icon="clock"
        iconClass="bg-moss-soft text-moss"
        label="Study time"
        value={`${student.studyMinutesToday}m`}
        sub="today"
      />
    </div>
  );
}
