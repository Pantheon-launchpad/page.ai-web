"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import { AdminApi } from "@/services/admin.api";
import type { AdminContentItem, ContentType } from "@/types/admin";

const statusTone: Record<AdminContentItem["status"], string> = {
  published: "bg-moss-soft text-moss",
  draft: "bg-ink/10 text-ink-faint",
  flagged: "bg-ember-soft text-ember",
  archived: "bg-ink/10 text-ink-faint",
};

const typeLabels: Record<ContentType, string> = {
  subject: "Subject",
  topic: "Topic",
  question: "Question",
  resource: "Resource",
  flashcard_deck: "Flashcard deck",
};

export default function ContentTable({ initialContent }: { initialContent: AdminContentItem[] }) {
  const [content, setContent] = useState(initialContent);
  const [filter, setFilter] = useState<"all" | AdminContentItem["status"]>("all");

  const filtered = useMemo(
    () => (filter === "all" ? content : content.filter((c) => c.status === filter)),
    [content, filter]
  );

  async function setStatus(id: string, status: AdminContentItem["status"]) {
    await AdminApi.updateContentStatus(id, status);
    setContent((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  async function remove(id: string) {
    await AdminApi.deleteContent(id);
    setContent((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "published", "draft", "flagged", "archived"] as const).map((s) => (
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

      <div className="flex flex-col gap-3">
        {filtered.map((item) => (
          <div key={item.id} className="glass-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                <Icon name="book" className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{item.title}</p>
                <p className="text-xs text-ink-soft">
                  {typeLabels[item.type]} &middot; {item.subject} &middot; {item.author}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide ${statusTone[item.status]}`}>
                {item.status}
              </span>
              {item.status === "flagged" && (
                <button
                  onClick={() => setStatus(item.id, "published")}
                  className="rounded-full border border-moss/30 bg-moss-soft px-3 py-1.5 text-xs font-medium text-moss"
                >
                  Approve
                </button>
              )}
              {item.status === "draft" && (
                <button
                  onClick={() => setStatus(item.id, "published")}
                  className="rounded-full border border-ink/10 bg-surface-1 px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-ink/20"
                >
                  Publish
                </button>
              )}
              <button
                onClick={() => remove(item.id)}
                aria-label={`Delete ${item.title}`}
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-ember-soft hover:text-ember"
              >
                <Icon name="close" className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
