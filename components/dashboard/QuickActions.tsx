import Link from "next/link";
import { quickActions } from "@/lib/dashboard-data";
import { Icon } from "./icons";
import { builtRoutes } from "./nav-data";

export default function QuickActions() {
  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="font-display text-[1.05rem] font-semibold text-ink">Quick actions</h3>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {quickActions.map((action) => {
          const built = builtRoutes.has(action.href);
          const href = built
            ? action.href
            : `/coming-soon?title=${encodeURIComponent(action.label)}&icon=${action.icon}`;

          return (
            <Link
              key={action.label}
              href={href}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white/40 px-3 py-4 text-center transition-colors hover:border-signal/30 hover:bg-signal-soft"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal-soft text-signal-deep transition-colors group-hover:bg-signal group-hover:text-white">
                <Icon name={action.icon} className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium leading-tight text-ink">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
