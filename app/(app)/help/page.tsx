"use client";

import { useState } from "react";
import PageHeader from "@/components/learn/PageHeader";
import { Icon } from "@/components/dashboard/icons";
import { useApi } from "@/hooks/useApi";
import { HelpApi } from "@/services/help.api";

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  const { data: helpFaqs } = useApi(() => HelpApi.getFaqs(), []);

  if (!helpFaqs) return null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Settings" icon="help" title="Help & FAQ" description="Answers to what people ask us most." />

      <div className="flex flex-col gap-3">
        {helpFaqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="glass-card overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-ink">{item.q}</span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-soft text-signal-deep transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-sm leading-relaxed text-ink-soft">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card-deep flex flex-col items-center gap-3 rounded-3xl p-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-semibold text-white">Still stuck?</p>
          <p className="mt-1 text-sm text-white/60">Our support team usually replies within a day.</p>
        </div>
        <a
          href="mailto:support@page.ai"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
        >
          <Icon name="mail" className="h-4 w-4" />
          Contact support
        </a>
      </div>
    </div>
  );
}
