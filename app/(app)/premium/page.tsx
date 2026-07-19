"use client";

import { useState } from "react";
import PageHeader from "@/components/learn/PageHeader";
import { Icon } from "@/components/dashboard/icons";
import { useApi } from "@/hooks/useApi";
import { PremiumApi } from "@/services/premium.api";

export default function PremiumPage() {
  const { data: premiumFeatures } = useApi(() => PremiumApi.getPlans(), []);
  const [upgraded, setUpgraded] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  async function handleUpgrade() {
    setUpgrading(true);
    await PremiumApi.upgrade();
    setUpgrading(false);
    setUpgraded(true);
  }

  if (!premiumFeatures) return null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Settings"
        icon="crown"
        title="Premium"
        description="Unlock unlimited AI tutoring, full offline subjects, and deeper analytics."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">Free</span>
          <div className="mt-2 font-display text-2xl font-semibold text-ink">₦0</div>
          <p className="text-xs text-ink-soft">forever</p>

          <ul className="mt-5 flex flex-col gap-2.5 text-sm text-ink-soft">
            {premiumFeatures.free.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" />
                {f}
              </li>
            ))}
          </ul>

          <button
            disabled
            className="mt-6 w-full rounded-full border border-ink/10 bg-surface-2 py-2.5 text-sm font-medium text-ink-faint"
          >
            Current plan
          </button>
        </div>

        <div className="glass-card-deep relative rounded-3xl p-6">
          <span className="absolute -top-3 right-6 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-white">
            Recommended
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-white/60">Premium</span>
          <div className="mt-2 font-display text-2xl font-semibold text-white">₦2,500</div>
          <p className="text-xs text-white/60">per month</p>

          <ul className="mt-5 flex flex-col gap-2.5 text-sm text-white/90">
            {premiumFeatures.premium.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Icon name="sparkle" className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                {f}
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgrade}
            disabled={upgraded || upgrading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-signal-deep disabled:opacity-70"
          >
            {upgraded ? (
              <>
                <Icon name="check" className="h-4 w-4" />
                You&apos;re on Premium
              </>
            ) : upgrading ? (
              "Upgrading..."
            ) : (
              "Upgrade to Premium"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
