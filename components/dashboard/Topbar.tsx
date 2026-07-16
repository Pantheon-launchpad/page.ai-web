"use client";

import { Icon } from "./icons";
import { student } from "@/lib/dashboard-data";

export default function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-ink/10 bg-paper/80 px-5 py-4 backdrop-blur-xl md:px-8">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white/60 md:hidden"
      >
        <span className="relative block h-3 w-4">
          <span className="absolute left-0 top-0 h-[1.5px] w-4 bg-ink" />
          <span className="absolute left-0 top-[5px] h-[1.5px] w-4 bg-ink" />
          <span className="absolute left-0 bottom-0 h-[1.5px] w-4 bg-ink" />
        </span>
      </button>

      <div className="hidden items-center gap-2 rounded-full border border-moss/25 bg-moss-soft px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-moss md:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-moss" />
        </span>
        Running completely offline
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-ink">
          <Icon name="flame" className="h-4 w-4 text-ember" />
          {student.streak}
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-ink">
          <Icon name="bolt" className="h-4 w-4 text-signal" />
          {student.xp.toLocaleString()} XP
        </div>
        <button
          aria-label="Profile"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-paper"
        >
          {student.initials}
        </button>
      </div>
    </header>
  );
}
