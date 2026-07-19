"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import ResourceCard from "./ResourceCard";
import { ResourceApi } from "@/services/resource.api";
import {
  resourceTypeLabels,
  type Resource,
  type ResourceType,
} from "@/lib/learn-data";

const allTypes = Object.keys(resourceTypeLabels) as ResourceType[];

export default function ResourceLibraryClient({
  initialResources,
}: {
  initialResources: Resource[];
}) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<
    ResourceType | "all" | "bookmarked"
  >("all");
  const [bookmarks, setBookmarks] = useState<Set<string>>(
    () =>
      new Set(initialResources.filter((r) => r.bookmarked).map((r) => r.id)),
  );

  const filtered = useMemo(() => {
    return initialResources.filter((r) => {
      if (activeType === "bookmarked" && !bookmarks.has(r.id)) return false;
      if (
        activeType !== "all" &&
        activeType !== "bookmarked" &&
        r.type !== activeType
      )
        return false;
      if (
        query &&
        !`${r.title} ${r.subject}`.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, activeType, bookmarks, initialResources]);

  const toggleBookmark = (id: string) => {
    const nowBookmarked = !bookmarks.has(id);
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    ResourceApi.toggleBookmark(id, nowBookmarked).catch(() => {
      // best-effort - mock mode never fails; production should reconcile on error
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            name="search"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, past questions, formula sheets..."
            className="w-full rounded-full border border-ink/10 bg-surface-1 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-signal/40 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "bookmarked", ...allTypes] as const).map((type) => {
          const label =
            type === "all"
              ? "All"
              : type === "bookmarked"
                ? "Bookmarked"
                : resourceTypeLabels[type];
          const active = activeType === type;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-colors ${
                active
                  ? "border-signal bg-signal text-white"
                  : "border-ink/10 bg-surface-1 text-ink-soft hover:border-ink/20"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card flex flex-col items-center gap-2 rounded-3xl p-10 text-center">
          <Icon name="filter" className="h-6 w-6 text-ink-faint" />
          <p className="text-sm text-ink-soft">
            Nothing matches that filter. Try a different search or category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              bookmarked={bookmarks.has(resource.id)}
              onToggleBookmark={() => toggleBookmark(resource.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
