"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignalMark from "@/components/SignalMark";
import { Icon } from "./icons";
import { navSections, builtRoutes } from "./nav-data";

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] shrink-0 flex-col border-r border-ink/10 bg-white/60 backdrop-blur-xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link href="/dashboard" className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
            <SignalMark animated />
            Page.AI
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 bg-white/60 md:hidden"
          >
            <Icon name="arrowRight" className="h-3.5 w-3.5 rotate-180" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3.5 pb-4">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <div className="px-3 pb-2 font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
                {section.label}
              </div>
              <div className="flex flex-col gap-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  const built = builtRoutes.has(item.href);
                  const href = built
                    ? item.href
                    : `/coming-soon?title=${encodeURIComponent(item.label)}&icon=${item.icon}${
                        item.soon ? "&soon=1" : ""
                      }`;

                  return (
                    <Link
                      key={item.label}
                      href={href}
                      onClick={onClose}
                      className={`group flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                        active
                          ? "bg-signal-soft font-medium text-signal-deep"
                          : "text-ink-soft hover:bg-ink/5 hover:text-ink"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon
                          name={item.icon}
                          className={`h-[18px] w-[18px] shrink-0 ${active ? "text-signal" : "text-ink-faint group-hover:text-ink-soft"}`}
                        />
                        {item.label}
                      </span>
                      {item.soon && (
                        <span className="rounded-full bg-ink/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-ink-faint">
                          Soon
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mx-3.5 mb-4 flex items-center gap-2.5 rounded-2xl border border-moss/25 bg-moss-soft px-3.5 py-3 font-mono text-[11px] uppercase tracking-wide text-moss">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-moss" />
          </span>
          Running completely offline
        </div>
      </aside>
    </>
  );
}
