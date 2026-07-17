import Link from "next/link";
import { Icon } from "@/components/dashboard/icons";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { wallet, recentRewards, dailyMissions, referral } from "@/lib/rewards-data";

export default function RewardsSection() {
  const tasksAvailable = dailyMissions.filter((m) => m.progress < m.goal).length;

  return (
    <div className="glass-card-deep rounded-3xl p-6">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/60">
          <Icon name="coin" className="h-3.5 w-3.5 text-ember" />
          Page coins
        </div>
        <Link
          href="/earn"
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-ink transition-transform hover:-translate-y-0.5"
        >
          Earn more
          <Icon name="arrowRight" className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <AnimatedCounter value={wallet.storeCredit} className="font-display text-3xl font-semibold text-white" />
        <span className="text-sm text-white/60">coins available</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <MiniStat label="Today" value={`+${wallet.todayCoins}`} />
        <MiniStat label="Tasks today" value={String(tasksAvailable)} />
        <MiniStat label="From referrals" value={referral.coinsEarned.toLocaleString()} />
        <MiniStat label="Pending sync" value={`+${wallet.pendingSync}`} />
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="mb-2.5 font-mono text-[10px] uppercase tracking-wide text-white/50">Recent rewards</p>
        <ul className="flex flex-col gap-2">
          {recentRewards.slice(0, 3).map((r) => (
            <li key={r.id} className="flex items-center gap-2.5 text-sm text-white/85">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                <Icon name={r.icon} className="h-3 w-3 text-signal" />
              </span>
              <span className="min-w-0 flex-1 truncate">{r.label}</span>
              <span className="shrink-0 font-mono text-xs text-ember">+{r.coins}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-3 py-2.5">
      <div className="font-display text-sm font-semibold text-white">{value}</div>
      <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-white/50">{label}</div>
    </div>
  );
}
