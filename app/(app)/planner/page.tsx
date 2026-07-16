import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import { Icon } from "@/components/dashboard/icons";
import { student } from "@/lib/dashboard-data";
import { weeklyPlan, upcomingExams, plannerRecommendations } from "@/lib/learn-data";

export const metadata: Metadata = { title: "Study Planner — Page.AI" };

export default function StudyPlannerPage() {
  const goalPercent = Math.min(100, Math.round((student.studyMinutesToday / student.studyGoalMinutes) * 100));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Learn"
        icon="planner"
        title="Study planner"
        description="Your week, planned around your goals — and quietly adjusted by the AI as you go."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[1.05rem] font-semibold text-ink">This week</h3>
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">7-day plan</span>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {weeklyPlan.map((d) => (
                <div
                  key={d.day}
                  className={`flex flex-col items-center gap-2 rounded-2xl border p-2.5 text-center ${
                    d.today ? "border-signal/40 bg-signal-soft" : "border-ink/10 bg-white/40"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">{d.day}</span>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full ${
                      d.done ? "bg-moss text-white" : d.today ? "bg-signal text-white" : "bg-ink/5 text-ink-faint"
                    }`}
                  >
                    <Icon name={d.done ? "check" : "book"} className="h-3.5 w-3.5" />
                  </div>
                  <div className="hidden text-[11px] font-medium leading-tight text-ink sm:block">{d.subject}</div>
                  <div className="hidden text-[10px] leading-tight text-ink-soft sm:block">{d.topic}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-deep rounded-3xl p-6">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/60">
              <Icon name="sparkle" className="h-3.5 w-3.5 text-signal" />
              AI recommendations
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {plannerRecommendations.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Icon name="bolt" className="h-3 w-3 text-signal" />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-display text-[1.05rem] font-semibold text-ink">Today&apos;s goal</h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-2xl font-semibold text-ink">
                {student.studyMinutesToday}
                <span className="text-sm font-normal text-ink-faint"> / {student.studyGoalMinutes} min</span>
              </span>
              <span className="font-mono text-xs text-ink-faint">{goalPercent}%</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
              <div className="h-full rounded-full bg-signal transition-all duration-700" style={{ width: `${goalPercent}%` }} />
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-display text-[1.05rem] font-semibold text-ink">Upcoming exams</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {upcomingExams.map((exam) => (
                <li
                  key={exam.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-white/40 px-3.5 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{exam.name}</p>
                    <p className="text-xs text-ink-soft">{exam.date}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-ember-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide text-ember">
                    {exam.daysLeft}d
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
