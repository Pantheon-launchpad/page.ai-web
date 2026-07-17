import { Icon } from "@/components/dashboard/icons";
import type { StoreItem } from "@/lib/rewards-data";

export default function StoreItemCard({ item, balance }: { item: StoreItem; balance: number }) {
  const affordable = balance >= item.cost && !item.comingSoon;

  return (
    <div className="glass-card flex flex-col rounded-3xl p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-signal-soft text-signal-deep">
        <Icon name={item.icon} className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-ink">{item.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-ink-soft">{item.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-ember">
          <Icon name="coin" className="h-4 w-4" />
          {item.cost.toLocaleString()}
        </span>
        {item.comingSoon ? (
          <span className="rounded-full bg-ink/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">Soon</span>
        ) : (
          <button
            disabled={!affordable}
            className="rounded-full bg-cta px-4 py-2 text-xs font-medium text-cta-text transition-transform hover:-translate-y-0.5 hover:bg-signal-deep disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Redeem
          </button>
        )}
      </div>
    </div>
  );
}
