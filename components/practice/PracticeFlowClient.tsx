"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import Toggle from "@/components/ui/Toggle";
import QuestionCard from "./QuestionCard";
import AIExplanationPanel from "./AIExplanationPanel";
import {
  questionsFor,
  topicsFor,
  subjectList,
  type Difficulty,
  type Question,
} from "@/lib/practice-data";

type DifficultyChoice = Difficulty | "adaptive";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PracticeFlowClient() {
  const [screen, setScreen] = useState<"config" | "session" | "summary">(
    "config",
  );

  const [subject, setSubject] = useState("Physics");
  const [topic, setTopic] = useState("All topics");
  const [difficulty, setDifficulty] = useState<DifficultyChoice>("medium");
  const [randomOrder, setRandomOrder] = useState(true);
  const [timedMode, setTimedMode] = useState(false);
  const [count, setCount] = useState(5);

  const [session, setSession] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [chosenIndex, setChosenIndex] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const topics = useMemo(
    () => ["All topics", ...topicsFor(subject)],
    [subject],
  );
  const pool = useMemo(
    () => questionsFor({ subject, topic, difficulty }),
    [subject, topic, difficulty],
  );

  function startPractice() {
    const ordered = randomOrder ? shuffle(pool) : pool;
    const picked = ordered.slice(
      0,
      Math.max(1, Math.min(count, ordered.length)),
    );
    setSession(picked);
    setIndex(0);
    setChosenIndex(null);
    setLocked(false);
    setCorrectCount(0);
    setAnsweredCount(0);
    setScreen("session");
  }

  function selectAnswer(i: number) {
    if (locked) return;
    setChosenIndex(i);
    setLocked(true);
    setAnsweredCount((n) => n + 1);
    if (i === session[index].correctIndex) setCorrectCount((n) => n + 1);
  }

  function goNext(replacement?: Question) {
    if (replacement) {
      setSession((prev) => {
        const next = [...prev];
        next.splice(index + 1, 0, replacement);
        return next;
      });
    }
    if (index + 1 >= session.length) {
      setScreen("summary");
      return;
    }
    setIndex((i) => i + 1);
    setChosenIndex(null);
    setLocked(false);
  }

  function retryCurrent() {
    setChosenIndex(null);
    setLocked(false);
    setAnsweredCount((n) => Math.max(0, n - 1));
  }

  function practiceSimilar() {
    const current = session[index];
    const similar = questionsFor({
      subject: current.subject,
      topic: current.topic,
    }).find((q) => q.id !== current.id && !session.some((s) => s.id === q.id));
    goNext(similar);
  }

  if (screen === "config") {
    return (
      <div className="glass-card mx-auto max-w-xl rounded-3xl p-6 sm:p-7">
        <h2 className="font-display text-lg font-semibold text-ink">
          Customise your practice
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Set it up once - we&apos;ll remember your rhythm next time.
        </p>

        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-xs font-medium text-ink-soft">
              Subject
            </label>
            <div className="flex flex-wrap gap-2">
              {subjectList.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setSubject(s);
                    setTopic("All topics");
                  }}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    subject === s
                      ? "border-signal bg-signal text-white"
                      : "border-ink/10 bg-surface-1 text-ink-soft hover:border-ink/20"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-ink-soft">
              Topic
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    topic === t
                      ? "border-signal bg-signal text-white"
                      : "border-ink/10 bg-surface-1 text-ink-soft hover:border-ink/20"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-ink-soft">
              Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {(
                ["easy", "medium", "hard", "adaptive"] as DifficultyChoice[]
              ).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition-colors ${
                    difficulty === d
                      ? "border-signal bg-signal text-white"
                      : "border-ink/10 bg-surface-1 text-ink-soft hover:border-ink/20"
                  }`}
                >
                  {d === "adaptive" && (
                    <Icon name="sparkle" className="h-3.5 w-3.5" />
                  )}
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-surface-2 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-ink">Random order</p>
                <p className="text-xs text-ink-soft">
                  Shuffle questions instead of curriculum order.
                </p>
              </div>
              <Toggle checked={randomOrder} onChange={setRandomOrder} />
            </div>
            <div className="flex items-center justify-between border-t border-ink/10 pt-3">
              <div>
                <p className="text-sm font-medium text-ink">Timed mode</p>
                <p className="text-xs text-ink-soft">
                  Add a soft per-question timer for exam pressure.
                </p>
              </div>
              <Toggle checked={timedMode} onChange={setTimedMode} />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-medium text-ink-soft">
              Question count
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCount((c) => Math.max(1, c - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-surface-1 text-ink hover:border-ink/20"
              >
                −
              </button>
              <span className="w-10 text-center font-display text-lg font-semibold text-ink">
                {count}
              </span>
              <button
                onClick={() => setCount((c) => Math.min(20, c + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-surface-1 text-ink hover:border-ink/20"
              >
                +
              </button>
              <span className="ml-1 text-xs text-ink-faint">
                {pool.length} available with these filters
              </span>
            </div>
          </div>

          <button
            onClick={startPractice}
            disabled={pool.length === 0}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-signal py-3 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep disabled:opacity-50"
          >
            <Icon name="play" className="h-4 w-4" />
            Start practice
          </button>
        </div>
      </div>
    );
  }

  if (screen === "summary") {
    const percent = answeredCount
      ? Math.round((correctCount / answeredCount) * 100)
      : 0;
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center">
        <div className="glass-card w-full rounded-3xl p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-signal-soft text-signal-deep">
            <Icon name="trophy" className="h-7 w-7" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-semibold text-ink">
            {correctCount}/{answeredCount} correct
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {percent}% accuracy this session
          </p>

          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-cta/10">
            <div
              className="h-full rounded-full bg-signal transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="flex w-full gap-3">
          <button
            onClick={() => setScreen("config")}
            className="flex-1 rounded-full border border-ink/10 bg-surface-1 py-3 text-sm font-medium text-ink hover:border-ink/20"
          >
            Practice again
          </button>
          <a
            href="/mistakes"
            className="flex-1 rounded-full bg-cta py-3 text-center text-sm font-medium text-cta-text transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
          >
            Review mistakes
          </a>
        </div>
      </div>
    );
  }

  const current = session[index];

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-5">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setScreen("config")}
          className="flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
        >
          <Icon name="close" className="h-4 w-4" />
          End session
        </button>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          {correctCount}/{answeredCount} correct
        </span>
      </div>

      <QuestionCard
        question={current}
        index={index}
        total={session.length}
        chosenIndex={chosenIndex}
        locked={locked}
        onSelect={selectAnswer}
      />

      {locked && chosenIndex === current.correctIndex && (
        <div className="glass-card flex items-center justify-between rounded-2xl border border-moss/25 bg-moss-soft p-4">
          <span className="flex items-center gap-2 text-sm font-medium text-moss">
            <Icon name="check" className="h-4 w-4" />
            Correct! Nice work.
          </span>
          <button
            onClick={() => goNext()}
            className="inline-flex items-center gap-1.5 rounded-full bg-moss px-4 py-2 text-sm font-medium text-white"
          >
            Continue
            <Icon name="arrowRight" className="h-4 w-4" />
          </button>
        </div>
      )}

      {locked && chosenIndex !== current.correctIndex && (
        <AIExplanationPanel
          question={current}
          chosenIndex={chosenIndex}
          onRetry={retryCurrent}
          onPracticeSimilar={practiceSimilar}
          onContinue={() => goNext()}
        />
      )}
    </div>
  );
}
