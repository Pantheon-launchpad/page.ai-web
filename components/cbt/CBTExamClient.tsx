"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import Calculator from "./Calculator";
import QuestionNavigator from "./QuestionNavigator";
import CBTReviewScreen, { type ExamResult } from "./CBTReviewScreen";
import { questionBank, type ExamConfig, type Question } from "@/lib/practice-data";

function buildQuestions(config: ExamConfig): Question[] {
  const pool =
    config.subject === "All subjects"
      ? questionBank
      : questionBank.filter((q) => q.subject === config.subject);
  return pool.slice(0, Math.max(1, Math.min(config.questionCount, pool.length)));
}

function formatClock(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function CBTExamClient({ config, onExit }: { config: ExamConfig; onExit: () => void }) {
  const questions = useMemo(() => buildQuestions(config), [config]);
  const totalSeconds = config.durationMinutes * 60;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [showCalculator, setShowCalculator] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);

  useEffect(() => {
    if (result) return;
    if (timeLeft <= 0) {
      submit();
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, result]);

  function selectAnswer(optionIndex: number) {
    setAnswers((prev) => ({ ...prev, [index]: optionIndex }));
  }

  function toggleFlag() {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function submit() {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    questions.forEach((q, i) => {
      const chosen = answers[i];
      if (chosen === undefined || chosen === null) skipped += 1;
      else if (chosen === q.correctIndex) correct += 1;
      else wrong += 1;
    });
    setResult({
      correct,
      wrong,
      skipped,
      total: questions.length,
      timeTakenSeconds: totalSeconds - timeLeft,
    });
  }

  if (result) {
    return (
      <CBTReviewScreen
        title={config.title}
        result={result}
        onRetake={() => {
          setAnswers({});
          setFlagged(new Set());
          setTimeLeft(totalSeconds);
          setIndex(0);
          setResult(null);
        }}
      />
    );
  }

  const current = questions[index];
  const answeredIds = new Set(
    Object.entries(answers)
      .filter(([, v]) => v !== null && v !== undefined)
      .map(([k]) => Number(k))
  );
  const urgent = timeLeft <= 60;

  return (
    <div className="flex flex-col gap-5">
      <div className="glass-card flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <button onClick={onExit} className="flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
            <Icon name="close" className="h-4 w-4" />
            Exit
          </button>
          <span className="hidden text-sm font-semibold text-ink sm:inline">{config.title}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {config.hasCalculator && (
            <button
              onClick={() => setShowCalculator((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-white/50 text-ink-soft hover:border-ink/20"
              aria-label="Toggle calculator"
            >
              <Icon name="calculator" className="h-4 w-4" />
            </button>
          )}
          <div
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-sm font-semibold ${
              urgent ? "border-ember/40 bg-ember-soft text-ember" : "border-ink/10 bg-white/60 text-ink"
            }`}
          >
            <Icon name="clock" className="h-4 w-4" />
            {formatClock(timeLeft)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_240px]">
        <div className="flex flex-col gap-4">
          <div className="glass-card rounded-3xl p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                Question {index + 1} of {questions.length}
              </span>
              <button
                onClick={toggleFlag}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  flagged.has(index)
                    ? "border-ember/40 bg-ember-soft text-ember"
                    : "border-ink/10 bg-white/50 text-ink-soft hover:border-ink/20"
                }`}
              >
                <Icon name="flag" className="h-3.5 w-3.5" />
                {flagged.has(index) ? "Flagged" : "Flag"}
              </button>
            </div>

            <p className="mt-4 font-display text-lg font-medium leading-snug text-ink sm:text-xl">{current.prompt}</p>

            <div className="mt-5 flex flex-col gap-2.5">
              {current.options.map((option, i) => (
                <button
                  key={option}
                  onClick={() => selectAnswer(i)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium text-ink transition-colors ${
                    answers[index] === i
                      ? "border-signal/40 bg-signal-soft"
                      : "border-ink/10 bg-white/40 hover:border-signal/30 hover:bg-signal-soft/60"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              disabled={index === 0}
              className="rounded-full border border-ink/10 bg-white/50 px-4 py-2.5 text-sm font-medium text-ink disabled:opacity-40"
            >
              Previous
            </button>

            {index + 1 === questions.length ? (
              <button
                onClick={() => setConfirmSubmit(true)}
                className="rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
              >
                Submit exam
              </button>
            ) : (
              <button
                onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
              >
                Next
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <QuestionNavigator
            total={questions.length}
            current={index}
            answeredIds={answeredIds}
            flaggedIds={flagged}
            onJump={setIndex}
          />
          <button
            onClick={() => setConfirmSubmit(true)}
            className="rounded-full border border-ink/10 bg-white/50 py-2.5 text-sm font-medium text-ink hover:border-ink/20"
          >
            Submit exam
          </button>
        </div>
      </div>

      {showCalculator && (
        <div className="fixed bottom-6 right-6 z-40">
          <Calculator onClose={() => setShowCalculator(false)} />
        </div>
      )}

      {confirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm rounded-3xl p-6 text-center">
            <h3 className="font-display text-lg font-semibold text-ink">Submit this exam?</h3>
            <p className="mt-2 text-sm text-ink-soft">
              You&apos;ve answered {answeredIds.size} of {questions.length} questions. You can&apos;t change answers after submitting.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmSubmit(false)}
                className="flex-1 rounded-full border border-ink/10 bg-white/50 py-2.5 text-sm font-medium text-ink"
              >
                Keep going
              </button>
              <button
                onClick={submit}
                className="flex-1 rounded-full bg-signal py-2.5 text-sm font-medium text-white hover:bg-signal-deep"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
