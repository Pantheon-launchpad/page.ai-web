"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/dashboard/icons";

const STORAGE_WELCOME = "pageai-nudge-welcome-seen";
const STORAGE_FIRST_VISIT = "pageai-first-visit-at";
const STORAGE_HOURS_SEEN = "pageai-nudge-hours-seen";
const HOURS_THRESHOLD_MS = 2 * 60 * 60 * 1000; // a couple of hours

const WELCOME_MESSAGE =
  "Hi love, welcome 💛 If the brightness is ever too much on your eyes, tap here - there's a softer, gentler look waiting for you.";
const HOURS_MESSAGE =
  "You've been working hard for a while now 🥹 Don't forget to rest your eyes for a second - tap here if you'd like something gentler. I'm proud of you.";

export default function ThemeNudge() {
  const [message, setMessage] = useState<string | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show(text: string, ms: number) {
    setMessage(text);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setMessage(null), ms);
  }

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    try {
      const now = Date.now();
      let firstVisit = window.localStorage.getItem(STORAGE_FIRST_VISIT);
      if (!firstVisit) {
        firstVisit = String(now);
        window.localStorage.setItem(STORAGE_FIRST_VISIT, firstVisit);
      }

      const welcomeSeen = window.localStorage.getItem(STORAGE_WELCOME);
      if (!welcomeSeen) {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            window.localStorage.setItem(STORAGE_WELCOME, "1");
            show(WELCOME_MESSAGE, 9000);
          }, 1800),
        );
        return () => {
          cancelled = true;
          timers.forEach(clearTimeout);
        };
      }

      const hoursSeen = window.localStorage.getItem(STORAGE_HOURS_SEEN);
      if (!hoursSeen) {
        const elapsed = now - Number(firstVisit);
        const remaining = Math.max(0, HOURS_THRESHOLD_MS - elapsed);
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            window.localStorage.setItem(STORAGE_HOURS_SEEN, "1");
            show(HOURS_MESSAGE, 10000);
          }, remaining),
        );
      }
    } catch {
      // localStorage unavailable - simply skip the nudge for this session.
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  if (!message) return null;

  function dismiss() {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setMessage(null);
  }

  return (
    <div className="absolute right-0 top-full z-40 mt-3 w-[19rem] max-w-[85vw]">
      {/* thought-bubble tail, trailing up toward the toggle */}
      <span className="animate-float-sm absolute -top-3 right-8 h-2.5 w-2.5 rounded-full bg-ember-soft" />
      <span
        className="animate-float-sm absolute -top-6 right-11 h-1.5 w-1.5 rounded-full bg-ember-soft"
        style={{ animationDelay: "0.3s" }}
      />

      <div className="glass-card animate-pop-in relative rounded-[28px] p-4">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-ink/5 hover:text-ink-soft"
        >
          <Icon name="close" className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-start gap-2.5 pr-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ember-soft text-ember">
            <Icon name="lumo" className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
              Lumo
            </p>
            <p className="mt-1 text-sm leading-relaxed text-ink">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
