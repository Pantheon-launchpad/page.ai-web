import Link from "next/link";
import { Icon } from "@/components/dashboard/icons";
import type { Mission } from "@/lib/rewards-data";

export default function MissionsCard({ missions, limit }: { missions: Mission[]; limit?: number }) {
  const shown = limit ? missions.slice(0, limit) : missions;

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">Today&apos;s missions</h3>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          {missions.filter((m) => m.progress >= m.goal).length}/{missions.length} done
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {shown.map((m) => {
          const complete = m.progress >= m.goal;
          const percent = Math.min(100, Math.round((m.progress / m.goal) * 100));
          return (
            <Link
              key={m.id}
              href={m.href}
              className={`flex items-center gap-3.5 rounded-2xl border p-3.5 transition-colors ${
                complete ? "border-moss/25 bg-moss-soft" : "border-ink/10 bg-surface-2 hover:border-signal/25"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  complete ? "bg-moss text-white" : "bg-signal-soft text-signal-deep"
                }`}
              >
                <Icon name={complete ? "check" : m.icon} className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{m.label}</p>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-ink/10">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${complete ? "bg-moss" : "bg-signal"}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-ember-soft px-2.5 py-1 font-mono text-[10.5px] text-ember">
                <Icon name="coin" className="h-3 w-3" />+{m.reward}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
