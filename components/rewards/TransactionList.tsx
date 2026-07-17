import { Icon } from "@/components/dashboard/icons";
import type { transactions as TxType } from "@/lib/rewards-data";

export default function TransactionList({ transactions }: { transactions: typeof TxType }) {
  return (
    <ul className="flex flex-col divide-y divide-ink/10">
      {transactions.map((t) => (
        <li key={t.id} className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              t.type === "earned" ? "bg-moss-soft text-moss" : "bg-ember-soft text-ember"
            }`}
          >
            <Icon name={t.type === "earned" ? "coin" : "gift"} className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{t.label}</p>
            <p className="text-xs text-ink-soft">{t.date}</p>
          </div>
          <span className={`shrink-0 font-mono text-sm font-semibold ${t.type === "earned" ? "text-moss" : "text-ember"}`}>
            {t.coins > 0 ? "+" : ""}
            {t.coins}
          </span>
        </li>
      ))}
    </ul>
  );
}
