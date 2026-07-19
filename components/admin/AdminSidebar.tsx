"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignalMark from "@/components/SignalMark";
import { Icon } from "@/components/dashboard/icons";
import { adminNavItems } from "./nav-data";

export default function AdminSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden" onClick={onClose} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col border-r border-ink/10 bg-surface-1 backdrop-blur-xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/admin" className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
            <SignalMark />
            <span>
              Page.AI <span className="text-ink-faint">Admin</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-surface-1 md:hidden"
          >
            <Icon name="arrowRight" className="h-3.5 w-3.5 rotate-180" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3.5 pb-4">
          <div className="flex flex-col gap-0.5">
            {adminNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                    active ? "bg-signal-soft font-medium text-signal-deep" : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <Icon
                    name={item.icon}
                    className={`h-[18px] w-[18px] shrink-0 ${active ? "text-signal" : "text-ink-faint group-hover:text-ink-soft"}`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="mx-3.5 mb-4 flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-surface-2 px-3.5 py-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-ink-soft hover:text-ink"
          >
            <Icon name="arrowRight" className="h-3.5 w-3.5 rotate-180" />
            Back to student app
          </Link>
        </div>
      </aside>
    </>
  );
}
