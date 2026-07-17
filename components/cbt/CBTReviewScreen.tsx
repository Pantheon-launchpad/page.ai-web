import Link from "next/link";
import { Icon } from "@/components/dashboard/icons";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export type ExamResult = {
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
  timeTakenSeconds: number;
};

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export default function CBTReviewScreen({
  title,
  result,
  onRetake,
}: {
  title: string;
  result: ExamResult;
  onRetake: () => void;
}) {
  const accuracy = result.total
    ? Math.round((result.correct / result.total) * 100)
    : 0;
  const coinsEarned = 20 + result.correct * 8;

  const recommendation =
    accuracy >= 80
      ? "Strong performance - you're ready for tougher timed sets in this subject."
      : accuracy >= 50
        ? "Solid attempt. Revisit the topics behind your wrong answers before the next mock."
        : "Let's slow down and rebuild the fundamentals here before the next attempt - that's how mastery sticks.";

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div className="glass-card rounded-3xl p-7 text-center sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-signal-soft text-signal-deep">
          <Icon name="exam" className="h-7 w-7" />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-ink">
          {title} - Results
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Score: {result.correct}/{result.total}
        </p>

        <div className="animate-pop-in mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-ember-soft px-4 py-2 font-mono text-sm font-semibold text-ember">
          <Icon name="coin" className="h-4 w-4" />+
          <AnimatedCounter value={coinsEarned} /> Page Coins earned
        </div>

        <div className="mx-auto mt-5 max-w-xs">
          <div className="flex items-center justify-between text-xs text-ink-faint">
            <span>Accuracy</span>
            <span>{accuracy}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-cta/10">
            <div
              className="h-full rounded-full bg-signal transition-all duration-700"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
        <Stat label="Correct" value={result.correct} tone="moss" />
        <Stat label="Wrong" value={result.wrong} tone="ember" />
        <Stat label="Skipped" value={result.skipped} tone="signal" />
        <Stat
          label="Time taken"
          value={formatTime(result.timeTakenSeconds)}
          tone="signal"
        />
      </div>

      <div className="glass-card-deep rounded-3xl p-6">
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/60">
          <Icon name="sparkle" className="h-3.5 w-3.5 text-signal" />
          Performance summary
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/90">
          {recommendation}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRetake}
          className="flex-1 rounded-full border border-ink/10 bg-surface-1 py-3 text-sm font-medium text-ink hover:border-ink/20"
        >
          Retake exam
        </button>
        <Link
          href="/mistakes"
          className="flex-1 rounded-full bg-cta py-3 text-center text-sm font-medium text-cta-text transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
        >
          Review mistakes
        </Link>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "moss" | "ember" | "signal";
}) {
  const toneClass =
    tone === "moss"
      ? "text-moss"
      : tone === "ember"
        ? "text-ember"
        : "text-signal-deep";
  return (
    <div className="glass-card rounded-2xl p-4 text-center">
      <div className={`font-display text-xl font-semibold ${toneClass}`}>
        {value}
      </div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
        {label}
      </div>
    </div>
  );
}
