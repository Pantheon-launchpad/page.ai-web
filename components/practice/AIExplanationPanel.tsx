import { Icon } from "@/components/dashboard/icons";
import type { Question } from "@/lib/practice-data";

export default function AIExplanationPanel({
  question,
  chosenIndex,
  onRetry,
  onPracticeSimilar,
  onContinue,
}: {
  question: Question;
  chosenIndex: number | null;
  onRetry?: () => void;
  onPracticeSimilar?: () => void;
  onContinue?: () => void;
}) {
  const correct = chosenIndex === question.correctIndex;

  return (
    <div className="glass-card rounded-3xl p-6">
      <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
        <Icon name="sparkle" className="h-3.5 w-3.5" />
        AI explanation
      </div>

      <p className="mt-3 text-sm font-medium leading-relaxed text-ink">{question.prompt}</p>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div
          className={`rounded-xl border px-3.5 py-2.5 text-sm ${
            correct ? "border-moss/25 bg-moss-soft text-moss" : "border-ember/25 bg-ember-soft text-ember"
          }`}
        >
          <div className="font-mono text-[10px] uppercase tracking-wide opacity-70">Your answer</div>
          {chosenIndex === null ? "Skipped" : question.options[chosenIndex]}
        </div>
        <div className="rounded-xl border border-moss/25 bg-moss-soft px-3.5 py-2.5 text-sm text-moss">
          <div className="font-mono text-[10px] uppercase tracking-wide opacity-70">Correct answer</div>
          {question.options[question.correctIndex]}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-soft text-signal-deep">
            <Icon name="tutor" className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Explanation</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{question.explanation}</p>
          </div>
        </div>

        {!correct && (
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember-soft text-ember">
              <Icon name="mistake" className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Likely misconception</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{question.misconception}</p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ember-soft text-ember">
            <Icon name="lightbulb" className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Memory hook</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{question.memoryHook}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-moss-soft text-moss">
            <Icon name="link" className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Related concepts</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {question.relatedConcepts.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-ink/10 bg-white/50 px-2.5 py-1 text-xs text-ink-soft"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/50 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/20"
          >
            <Icon name="refresh" className="h-4 w-4" />
            Retry
          </button>
        )}
        {onPracticeSimilar && (
          <button
            onClick={onPracticeSimilar}
            className="inline-flex items-center gap-1.5 rounded-full border border-signal/25 bg-signal-soft px-4 py-2.5 text-sm font-medium text-signal-deep transition-colors hover:border-signal/40"
          >
            <Icon name="target" className="h-4 w-4" />
            Practice similar question
          </button>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
          >
            Continue
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
