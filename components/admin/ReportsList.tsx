"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import { AdminApi } from "@/services/admin.api";
import type { Report, ReportStatus } from "@/types/admin";

const statusTone: Record<ReportStatus, string> = {
  open: "bg-ember-soft text-ember",
  reviewing: "bg-signal-soft text-signal-deep",
  resolved: "bg-moss-soft text-moss",
  dismissed: "bg-ink/10 text-ink-faint",
};

const reasonLabels: Record<Report["reason"], string> = {
  inappropriate_content: "Inappropriate content",
  harassment: "Harassment",
  spam: "Spam",
  cheating: "Cheating",
  bug: "Bug report",
  other: "Other",
};

export default function ReportsList({ initialReports }: { initialReports: Report[] }) {
  const [reports, setReports] = useState(initialReports);
  const [filter, setFilter] = useState<"all" | ReportStatus>("all");

  const filtered = useMemo(
    () => (filter === "all" ? reports : reports.filter((r) => r.status === filter)),
    [reports, filter]
  );

  async function setStatus(id: string, status: ReportStatus) {
    await AdminApi.updateReportStatus(id, status);
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "open", "reviewing", "resolved", "dismissed"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === s ? "border-signal bg-signal text-white" : "border-ink/10 bg-surface-2 text-ink-soft hover:border-ink/20"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card flex flex-col items-center gap-2 rounded-3xl p-10 text-center">
          <Icon name="check" className="h-6 w-6 text-moss" />
          <p className="text-sm text-ink-soft">Nothing here - the queue is clear.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((r) => (
            <div key={r.id} className="glass-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
                  <Icon name="mistake" className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">
                    {reasonLabels[r.reason]} &middot; {r.targetType.replace("_", " ")}
                  </p>
                  <p className="text-xs text-ink-soft">
                    Reported by {r.reportedBy} &middot; {new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  {r.notes && <p className="mt-1 max-w-md text-xs text-ink-soft">{r.notes}</p>}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide ${statusTone[r.status]}`}>
                  {r.status}
                </span>
                {(r.status === "open" || r.status === "reviewing") && (
                  <>
                    <button
                      onClick={() => setStatus(r.id, "resolved")}
                      className="rounded-full border border-moss/30 bg-moss-soft px-3 py-1.5 text-xs font-medium text-moss"
                    >
                      Resolve
                    </button>
                    <button
                      onClick={() => setStatus(r.id, "dismissed")}
                      className="rounded-full border border-ink/10 bg-surface-1 px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-ink/20"
                    >
                      Dismiss
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
