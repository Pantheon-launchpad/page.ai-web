import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import { Icon } from "@/components/dashboard/icons";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import MissionsCard from "@/components/rewards/MissionsCard";
import StoreItemCard from "@/components/rewards/StoreItemCard";
import TransactionList from "@/components/rewards/TransactionList";
import { accent } from "@/components/learn/colors";
import {
  dailyMissions,
  wallet,
  storeItems,
  coinsByCategory,
  transactions,
} from "@/lib/rewards-data";

export const metadata: Metadata = { title: "Earn - Page.AI" };

export default function EarnPage() {
  const totalCategoryCoins =
    coinsByCategory.reduce((sum, c) => sum + c.coins, 0) || 1;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Earn"
        icon="coin"
        title="Learn. Earn. Grow."
        description="Complete learning goals to earn Page Coins - spend them inside Page.AI on Premium time, bonus content, and Lumo extras."
      />

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <HeroStat label="Today" value={wallet.todayCoins} prefix="+" />
        <HeroStat label="Lifetime" value={wallet.lifetimeCoins} />
        <HeroStat label="Pending sync" value={wallet.pendingSync} prefix="+" />
        <HeroStat label="Store credit" value={wallet.storeCredit} />
      </div>

      <section>
        <h2 className="mb-4 font-display text-lg font-semibold text-ink">
          Daily learning missions
        </h2>
        <MissionsCard missions={dailyMissions} />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            Rewards store
          </h2>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ember-soft px-3 py-1.5 font-mono text-xs text-ember">
            <Icon name="coin" className="h-3.5 w-3.5" />
            {wallet.storeCredit.toLocaleString()} available
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {storeItems.map((item) => (
            <StoreItemCard
              key={item.id}
              item={item}
              balance={wallet.storeCredit}
            />
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          Coins spend inside Page.AI only - no cash, airtime, or data payouts.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">
            Where your coins come from
          </h3>
          <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-ink/5">
            {coinsByCategory.map((c) => (
              <div
                key={c.name}
                className={accent[c.color].bar}
                style={{ width: `${(c.coins / totalCategoryCoins) * 100}%` }}
                title={`${c.name}: ${c.coins}`}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            {coinsByCategory.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2 text-sm text-ink-soft"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${accent[c.color].bar}`}
                />
                <span className="flex-1">{c.name}</span>
                <span className="font-mono text-ink-faint">
                  {c.coins.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">
            Transaction history
          </h3>
          <div className="mt-4">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroStat({
  label,
  value,
  prefix = "",
}: {
  label: string;
  value: number;
  prefix?: string;
}) {
  return (
    <div className="glass-card-deep rounded-2xl p-4">
      <div className="font-display text-xl font-semibold text-white">
        {prefix}
        <AnimatedCounter value={value} />
      </div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-white/50">
        {label}
      </div>
    </div>
  );
}
