import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import { Icon } from "@/components/dashboard/icons";
import { HistoryApi } from "@/services/history.api";

export const metadata: Metadata = { title: "Learning History - Page.AI" };

export default async function LearningHistoryPage() {
  const learningHistory = await HistoryApi.getHistory();
  const groups = Array.from(new Set(learningHistory.map((h) => h.group)));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Progress"
        icon="history"
        title="Learning history"
        description="Every session, exam and win - a timeline of the work you've put in."
      />

      <div className="glass-card rounded-3xl p-6">
        {groups.map((group, gi) => (
          <div key={group} className={gi > 0 ? "mt-6" : ""}>
            <p className="font-mono text-[11px] uppercase tracking-wider text-signal">{group}</p>
            <ul className="mt-3 flex flex-col divide-y divide-ink/10">
              {learningHistory
                .filter((h) => h.group === group)
                .map((h) => (
                  <li key={h.id} className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                      <Icon name={h.icon} className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{h.label}</p>
                      <p className="text-xs text-ink-soft">{h.meta}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-ink-faint">{h.time}</span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
