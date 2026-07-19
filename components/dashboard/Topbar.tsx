"use client";

import { Icon } from "./icons";
import ThemeToggle from "@/components/theme/ThemeToggle";
import ProfileMenu from "./ProfileMenu";

interface TopbarStudent {
  name: string;
  initials: string;
  coins: number;
  level: number;
  streak: number;
}

export default function Topbar({ onMenu, student }: { onMenu: () => void; student: TopbarStudent }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-ink/10 bg-paper/80 px-5 py-4 backdrop-blur-xl md:px-8">
      <button
        onClick={onMenu}
        aria-label="Open menu"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-surface-1 md:hidden"
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
        <ThemeToggle />
        <div className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface-1 px-3 py-1.5 text-xs font-medium text-ink">
          <Icon name="flame" className="h-4 w-4 text-ember" />
          {student.streak}
        </div>
        <a
          href="/earn"
          className="flex items-center gap-1.5 rounded-full border border-ember/25 bg-ember-soft px-3 py-1.5 text-xs font-medium text-ember transition-colors hover:border-ember/40"
        >
          <Icon name="coin" className="h-4 w-4" />
          {student.coins.toLocaleString()}
        </a>
        <ProfileMenu student={student} />
      </div>
    </header>
  );
}
