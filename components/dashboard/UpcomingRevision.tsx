import { upcomingRevision } from "@/lib/dashboard-data";
import { Icon } from "./icons";

export default function UpcomingRevision() {
  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">Upcoming revision</h3>
        <Icon name="history" className="h-4 w-4 text-ink-faint" />
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {upcomingRevision.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white/40 px-3.5 py-3"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{item.topic}</p>
              <p className="text-xs text-ink-soft">{item.subject}</p>
            </div>
            <span className="shrink-0 rounded-full bg-ember-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide text-ember">
              {item.due}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
