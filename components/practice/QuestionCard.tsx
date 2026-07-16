import { Icon } from "@/components/dashboard/icons";
import type { Question } from "@/lib/practice-data";

export default function QuestionCard({
  question,
  index,
  total,
  chosenIndex,
  locked,
  onSelect,
}: {
  question: Question;
  index: number;
  total: number;
  chosenIndex: number | null;
  locked: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          Question {index + 1} of {total}
        </span>
        <span className="rounded-full bg-signal-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide text-signal-deep">
          {question.topic}
        </span>
      </div>

      <p className="mt-4 font-display text-lg font-medium leading-snug text-ink sm:text-xl">{question.prompt}</p>

      <div className="mt-5 flex flex-col gap-2.5">
        {question.options.map((option, i) => {
          const isChosen = chosenIndex === i;
          const isCorrect = i === question.correctIndex;

          let style = "border-ink/10 bg-white/40 hover:border-signal/30 hover:bg-signal-soft";
          if (locked) {
            if (isCorrect) style = "border-moss/40 bg-moss-soft text-moss";
            else if (isChosen) style = "border-ember/40 bg-ember-soft text-ember";
            else style = "border-ink/10 bg-white/20 opacity-60";
          } else if (isChosen) {
            style = "border-signal/40 bg-signal-soft";
          }

          return (
            <button
              key={option}
              disabled={locked}
              onClick={() => onSelect(i)}
              className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium text-ink transition-colors ${style}`}
            >
              {option}
              {locked && isCorrect && <Icon name="check" className="h-4 w-4 shrink-0" />}
              {locked && isChosen && !isCorrect && <Icon name="close" className="h-4 w-4 shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
