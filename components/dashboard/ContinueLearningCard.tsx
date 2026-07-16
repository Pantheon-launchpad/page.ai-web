import Link from "next/link";
import { continueLearning } from "@/lib/dashboard-data";
import { Icon } from "./icons";
import RingProgress from "./RingProgress";

export default function ContinueLearningCard() {
  return (
    <div className="glass-card relative overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-signal/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
            <Icon name="play" className="h-3.5 w-3.5" />
            Continue learning
          </div>
          <h2 className="mt-3 font-display text-xl font-semibold text-ink sm:text-2xl">
            {continueLearning.subject} &middot; {continueLearning.topic}
          </h2>
          <p className="mt-1.5 text-sm text-ink-soft">
            About {continueLearning.estimatedMinutesLeft} minutes left to finish this topic.
          </p>

          <Link
            href="/subjects"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
          >
            Continue
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="flex items-center gap-4 self-start rounded-2xl border border-ink/10 bg-white/50 p-4 sm:self-center">
          <RingProgress percent={continueLearning.progressPercent} label={`${continueLearning.progressPercent}%`} />
          <div className="font-mono text-[11px] uppercase leading-relaxed tracking-wide text-ink-faint">
            Topic
            <br />
            progress
          </div>
        </div>
      </div>
    </div>
  );
}
