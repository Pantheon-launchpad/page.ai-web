"use client";

import { Icon } from "@/components/dashboard/icons";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function AdminTopbar({ onMenu }: { onMenu: () => void }) {
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

      <div className="hidden items-center gap-2 rounded-full border border-signal/25 bg-signal-soft px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide text-signal-deep md:flex">
        <Icon name="settings" className="h-3.5 w-3.5" />
        Admin mode
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cta font-display text-sm font-semibold text-cta-text">
          D
        </div>
      </div>
    </header>
  );
}
