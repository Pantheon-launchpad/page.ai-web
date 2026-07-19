import { DashboardApi } from "@/services/dashboard.api";
import { Icon } from "./icons";

export default async function RecentActivity() {
  const { recentActivity } = await DashboardApi.getDashboard();

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">Recent activity</h3>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">Last 3 days</span>
      </div>

      <ul className="mt-4 flex flex-col divide-y divide-ink/10">
        {recentActivity.map((item) => (
          <li key={item.id} className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
              <Icon name={item.icon} className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{item.label}</p>
              <p className="text-xs text-ink-soft">{item.meta}</p>
            </div>
            <span className="shrink-0 font-mono text-[11px] text-ink-faint">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
