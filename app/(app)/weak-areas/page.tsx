import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/learn/PageHeader";
import { Icon } from "@/components/dashboard/icons";
import { weakAreas } from "@/lib/progress-data";

export const metadata: Metadata = { title: "Weak Areas - Page.AI" };

export default function WeakAreasPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Progress"
        icon="weak"
        title="Weak areas"
        description="Automatically identified from your practice history - lowest mastery first."
      />

      <div className="flex flex-col gap-4">
        {weakAreas.map((area) => (
          <div
            key={area.topic}
            className="glass-card flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ember-soft text-ember">
                <Icon name="weak" className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  {area.topic}
                </p>
                <p className="text-xs text-ink-soft">{area.subject}</p>
                <p className="mt-1.5 max-w-md text-sm text-ink-soft">
                  {area.note}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-ember"
                    style={{ width: `${area.mastery}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-ink-faint">
                  {area.mastery}%
                </span>
              </div>
              <Link
                href="/practice"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
              >
                Practice this
                <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
