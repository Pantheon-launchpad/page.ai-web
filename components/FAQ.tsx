"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SignalMark from "./SignalMark";

const faqs = [
  {
    q: "Does the AI tutor really work with no internet?",
    a: "Yes. The tutor model, lessons, and quizzes download to your device once. After that, everything runs locally, including tutor explanations. No connection required.",
  },
  {
    q: "How much storage does a subject take?",
    a: "Most subjects use between 150–400MB, less than a handful of photos. You can remove a subject any time and re-download it later without losing progress.",
  },
  {
    q: "Which devices does Page.AI support?",
    a: "Page.AI runs on Android 8 and up, and iOS 15 and up, including budget devices with as little as 3GB of RAM.",
  },
  {
    q: "Is it safe for kids?",
    a: "The AI tutor only discusses subject material, all content is curriculum-aligned and moderated, and parents can review progress from the Family plan's reports.",
  },
  {
    q: "Can I cancel the Family plan any time?",
    a: "Yes, cancel whenever you like from the app's account settings. You'll keep access until the end of your billing period, and downloaded lessons stay on your device.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line bg-paper-deep/60 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
            <SignalMark color="signal" />
            FAQ
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Questions? We&rsquo;ve got answers
          </h2>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className="glass-card overflow-hidden rounded-2xl">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-ink">{item.q}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-soft text-signal-deep transition-transform duration-300 ${
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
                      <p className="px-6 pb-5 text-[0.925rem] leading-relaxed text-ink-soft">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
