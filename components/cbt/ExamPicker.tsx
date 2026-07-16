"use client";

import { useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import CBTExamClient from "./CBTExamClient";
import type { ExamConfig } from "@/lib/practice-data";

const boardTone: Record<ExamConfig["board"], string> = {
  WAEC: "bg-signal-soft text-signal-deep",
  JAMB: "bg-ember-soft text-ember",
  Mock: "bg-moss-soft text-moss",
};

export default function ExamPicker({ exams }: { exams: ExamConfig[] }) {
  const [active, setActive] = useState<ExamConfig | null>(null);

  if (active) {
    return <CBTExamClient config={active} onExit={() => setActive(null)} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {exams.map((exam) => (
        <div key={exam.id} className="glass-card flex flex-col rounded-3xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-signal-soft text-signal-deep">
              <Icon name="exam" className="h-4.5 w-4.5" />
            </div>
            <span className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide ${boardTone[exam.board]}`}>
              {exam.board}
            </span>
          </div>

          <h3 className="mt-4 font-display text-lg font-semibold text-ink">{exam.title}</h3>
          <p className="mt-1 text-xs text-ink-soft">
            {exam.questionCount} questions &middot; {exam.durationMinutes} min
            {exam.hasCalculator ? " · Calculator allowed" : ""}
          </p>

          <button
            onClick={() => setActive(exam)}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-ink py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
          >
            <Icon name="play" className="h-4 w-4" />
            Start exam
          </button>
        </div>
      ))}
    </div>
  );
}
