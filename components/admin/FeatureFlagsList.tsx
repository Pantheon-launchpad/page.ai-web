"use client";

import { useState } from "react";
import Toggle from "@/components/ui/Toggle";
import { AdminApi } from "@/services/admin.api";
import type { FeatureFlag } from "@/types/admin";

export default function FeatureFlagsList({ initialFlags }: { initialFlags: FeatureFlag[] }) {
  const [flags, setFlags] = useState(initialFlags);

  async function toggle(flag: FeatureFlag) {
    const enabled = !flag.enabled;
    setFlags((prev) => prev.map((f) => (f.id === flag.id ? { ...f, enabled } : f)));
    await AdminApi.updateFeatureFlag(flag.id, { enabled }).catch(() => {});
  }

  return (
    <div className="flex flex-col divide-y divide-ink/10">
      {flags.map((flag) => (
        <div key={flag.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink">{flag.label}</p>
            <p className="mt-0.5 text-xs text-ink-soft">{flag.description}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              {flag.key} &middot; {flag.rolloutPercent}% rollout
            </p>
          </div>
          <Toggle checked={flag.enabled} onChange={() => toggle(flag)} />
        </div>
      ))}
    </div>
  );
}
