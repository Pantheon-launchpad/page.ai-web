"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon, type IconName } from "./icons";

const items: { label: string; href: string; icon: IconName }[] = [
  { label: "Profile", href: "/profile", icon: "profile" },
  { label: "Referrals", href: "/profile?tab=referrals", icon: "share" },
  { label: "Settings", href: "/settings", icon: "settings" },
];

interface MenuStudent {
  name: string;
  initials: string;
  coins: number;
  level: number;
}

export default function ProfileMenu({ student }: { student: MenuStudent }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-cta font-display text-sm font-semibold text-cta-text transition-transform hover:-translate-y-0.5"
      >
        {student.initials}
      </button>

      {/* Positioning lives on this outer wrapper, deliberately kept separate
          from the `glass-card` class below - `.glass-card` sets its own
          `position: relative` in plain (unlayered) CSS, which in a CSS
          Cascade Layers world beats a layered Tailwind utility like
          `absolute` no matter what order the classes are written in. Nesting
          avoids that fight entirely instead of fighting it with !important. */}
      {open && (
        <div className="absolute right-0 top-12 z-40 w-56">
          <div className="glass-card animate-pop-in rounded-2xl p-2">
            <div className="border-b border-ink/10 px-3 py-2.5">
              <p className="truncate text-sm font-semibold text-ink">
                {student.name}
              </p>
              <p className="text-xs text-ink-soft">
                Level {student.level} &middot; {student.coins.toLocaleString()}{" "}
                coins
              </p>
            </div>

            <div className="flex flex-col py-1.5">
              {items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="border-t border-ink/10 pt-1.5">
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/login");
                }}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-ember transition-colors hover:bg-ember-soft"
              >
                <Icon name="close" className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
