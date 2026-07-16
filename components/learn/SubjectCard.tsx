import Link from "next/link";
import { Icon } from "@/components/dashboard/icons";
import RingProgress from "@/components/dashboard/RingProgress";
import { accent } from "./colors";
import type { Subject } from "@/lib/learn-data";

export default function SubjectCard({ subject }: { subject: Subject }) {
  const c = accent[subject.color];

  return (
    <Link
      href={`/coming-soon?title=${encodeURIComponent(subject.name)}&icon=${subject.icon}`}
      className="group glass-card flex flex-col rounded-3xl p-6 transition-shadow hover:shadow-lift"
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.soft} ${c.text}`}>
          <Icon name={subject.icon} className="h-5 w-5" />
        </div>
        <RingProgress percent={subject.progress} size={48} stroke={4.5} />
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{subject.name}</h3>
      <p className="mt-1 text-xs text-ink-soft">
        {subject.topicsDone}/{subject.topics} topics &middot; {subject.hoursSpent}h spent
      </p>

      <div className="mt-4 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
          <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${subject.mastery}%` }} />
        </div>
        <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
          {subject.mastery}% mastery
        </span>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-ink transition-transform group-hover:translate-x-0.5">
        Open subject
        <Icon name="arrowRight" className="h-4 w-4" />
      </div>
    </Link>
  );
}
