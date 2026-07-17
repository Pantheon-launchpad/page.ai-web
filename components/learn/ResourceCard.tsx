import { Icon } from "@/components/dashboard/icons";
import { resourceTypeLabels, type Resource } from "@/lib/learn-data";

const typeIcon = {
  notes: "book",
  "past-questions": "exam",
  formula: "sparkle",
  definitions: "library",
  reference: "book",
  pdf: "pdf",
  "cheat-sheet": "star",
} as const;

export default function ResourceCard({
  resource,
  bookmarked,
  onToggleBookmark,
}: {
  resource: Resource;
  bookmarked: boolean;
  onToggleBookmark: () => void;
}) {
  return (
    <div className="glass-card flex items-start gap-3.5 rounded-2xl p-[18px]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
        <Icon name={typeIcon[resource.type]} className="h-[18px] w-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{resource.title}</p>
        <p className="mt-0.5 text-xs text-ink-soft">
          {resource.subject} &middot; {resourceTypeLabels[resource.type]} &middot; {resource.size}
        </p>
      </div>
      <button
        onClick={onToggleBookmark}
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
        aria-pressed={bookmarked}
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
          bookmarked ? "bg-ember-soft text-ember" : "text-ink-faint hover:bg-ink/5 hover:text-ink-soft"
        }`}
      >
        <Icon name="bookmark" className="h-4 w-4" strokeWidth={bookmarked ? 2.2 : 1.7} />
      </button>
    </div>
  );
}
