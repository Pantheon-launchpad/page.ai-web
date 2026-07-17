import { Icon } from "@/components/dashboard/icons";

export default function QuestionNavigator({
  total,
  current,
  answeredIds,
  flaggedIds,
  onJump,
}: {
  total: number;
  current: number;
  answeredIds: Set<number>;
  flaggedIds: Set<number>;
  onJump: (i: number) => void;
}) {
  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
        <Icon name="grid" className="h-3.5 w-3.5" />
        Question navigator
      </div>
      <div className="grid grid-cols-6 gap-1.5 lg:grid-cols-5">
        {Array.from({ length: total }).map((_, i) => {
          const isCurrent = i === current;
          const answered = answeredIds.has(i);
          const flagged = flaggedIds.has(i);

          let style = "border-ink/10 bg-surface-2 text-ink-soft";
          if (answered) style = "border-moss/30 bg-moss-soft text-moss";
          if (flagged) style = "border-ember/40 bg-ember-soft text-ember";
          if (isCurrent) style = "border-signal bg-signal text-white";

          return (
            <button
              key={i}
              onClick={() => onJump(i)}
              className={`relative flex h-9 items-center justify-center rounded-lg border text-xs font-semibold transition-colors ${style}`}
            >
              {i + 1}
              {flagged && !isCurrent && (
                <Icon name="flag" className="absolute -right-1 -top-1 h-3 w-3 text-ember" strokeWidth={2.2} />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-1.5 border-t border-ink/10 pt-3 text-xs text-ink-soft">
        <LegendRow swatch="bg-signal" label="Current" />
        <LegendRow swatch="bg-moss-soft border border-moss/30" label="Answered" />
        <LegendRow swatch="bg-ember-soft border border-ember/40" label="Flagged" />
        <LegendRow swatch="bg-surface-2 border border-ink/10" label="Unanswered" />
      </div>
    </div>
  );
}

function LegendRow({ swatch, label }: { swatch: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${swatch}`} />
      {label}
    </div>
  );
}
