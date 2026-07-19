"use client";

import { useState } from "react";
import PageHeader from "@/components/learn/PageHeader";
import { Icon } from "@/components/dashboard/icons";
import { useApi } from "@/hooks/useApi";
import { DownloadsApi } from "@/services/downloads.api";

export default function DownloadsPage() {
  const { data } = useApi(() => DownloadsApi.getDownloads(), []);
  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

  const items = (data?.items ?? []).filter((i) => !removedIds.has(i.id));
  const storageTotalMB = data?.storageTotalMB ?? 0;
  const used = items.reduce((sum, i) => sum + i.size, 0);
  const percent = storageTotalMB ? Math.min(100, Math.round((used / storageTotalMB) * 100)) : 0;

  function remove(id: string) {
    setRemovedIds((prev) => new Set(prev).add(id));
    DownloadsApi.removeDownload(id).catch(() => {});
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Settings"
        icon="download"
        title="Downloads"
        description="Everything saved to this device for fully offline access."
      />

      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink">{(used / 1000).toFixed(2)} GB used</span>
          <span className="text-ink-faint">{(storageTotalMB / 1000).toFixed(1)} GB total</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink/10">
          <div className="h-full rounded-full bg-signal transition-all duration-700" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="glass-card rounded-3xl p-2">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-8 text-center">
            <Icon name="download" className="h-6 w-6 text-ink-faint" />
            <p className="text-sm text-ink-soft">Nothing downloaded yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-ink/10">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3.5 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                  <Icon name={item.type === "Model" ? "sparkle" : item.type === "Subject" ? "book" : "pdf"} className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                  <p className="text-xs text-ink-soft">
                    {item.type} &middot; {item.size} MB
                  </p>
                </div>
                <button
                  onClick={() => remove(item.id)}
                  className="shrink-0 rounded-full border border-ink/10 bg-surface-1 px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-ember/40 hover:text-ember"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
