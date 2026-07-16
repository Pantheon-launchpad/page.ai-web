"use client";

import { useState } from "react";
import SignalMark from "./SignalMark";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-4 rounded-full border border-ink/10 bg-white/50 py-2 pl-4 pr-5 backdrop-blur-xl md:hidden">
          <a href="#top" className="flex items-center gap-2 font-display text-[1.05rem] font-semibold text-ink">
            <SignalMark animated />
            Page.AI
          </a>
        </div>

        <a href="#top" className="hidden items-center gap-2.5 font-display text-lg font-semibold text-ink md:flex">
          <SignalMark animated />
          Page.AI
        </a>

        <div className="hidden items-center gap-8 rounded-full border border-ink/10 bg-white/50 px-7 py-3 font-mono text-[13px] uppercase tracking-wide text-ink-soft backdrop-blur-xl md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link transition-colors hover:text-signal">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#pricing"
          className="hidden items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-0.5 hover:bg-signal-deep md:inline-flex"
        >
          Get the app
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/50 backdrop-blur-xl md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-4 bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-[1.5px] w-4 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div className="mx-6 mb-4 flex flex-col gap-1 rounded-2xl border border-ink/10 bg-white/70 p-4 font-mono text-sm uppercase tracking-wide text-ink-soft backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 transition-colors hover:bg-signal-soft hover:text-signal-deep"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="mt-1 rounded-lg bg-ink px-3 py-2.5 text-center normal-case tracking-normal text-paper"
          >
            Get the app
          </a>
        </div>
      )}
    </header>
  );
}
