"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/dashboard/icons";
import AIExplanationPanel from "@/components/practice/AIExplanationPanel";
import { mistakesWithQuestions } from "@/lib/mistakes-data";
import { subjectList } from "@/lib/practice-data";

export default function MistakeBookClient() {
  const router = useRouter();
  const [subjectFilter, setSubjectFilter] = useState("All subjects");
  const [expanded, setExpanded] = useState<string | null>(null);

  const all = useMemo(() => mistakesWithQuestions(), []);
  const filtered = useMemo(
    () => all.filter((m) => subjectFilter === "All subjects" || m.question.subject === subjectFilter),
    [all, subjectFilter]
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {["All subjects", ...subjectList].map((s) => (
          <button
            key={s}
            onClick={() => setSubjectFilter(s)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              subjectFilter === s
                ? "border-signal bg-signal text-white"
                : "border-ink/10 bg-surface-1 text-ink-soft hover:border-ink/20"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card flex flex-col items-center gap-2 rounded-3xl p-10 text-center">
          <Icon name="check" className="h-6 w-6 text-moss" />
          <p className="text-sm text-ink-soft">No mistakes logged for this subject. Keep it that way.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((m) => {
            const isOpen = expanded === m.id;
            return (
              <div key={m.id} className="flex flex-col gap-3">
                <button
                  onClick={() => setExpanded(isOpen ? null : m.id)}
                  className="glass-card flex w-full items-center gap-3.5 rounded-2xl p-4 text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
                    <Icon name="mistake" className="h-[18px] w-[18px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{m.question.prompt}</p>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {m.question.subject} &middot; {m.question.topic} &middot; {m.date}
                    </p>
                  </div>
                  <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <span className="rounded-full bg-signal-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide text-signal-deep">
                      {m.mastery}% mastery
                    </span>
                  </div>
                  <Icon
                    name="arrowRight"
                    className={`h-4 w-4 shrink-0 text-ink-faint transition-transform ${isOpen ? "rotate-90" : ""}`}
                  />
                </button>

                {isOpen && (
                  <AIExplanationPanel
                    question={m.question}
                    chosenIndex={m.chosenIndex}
                    onPracticeSimilar={() => router.push("/practice")}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
