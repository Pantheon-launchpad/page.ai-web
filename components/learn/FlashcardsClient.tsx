"use client";

import { useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import { accent } from "./colors";
import FlashcardReview from "./FlashcardReview";
import { flashcardDecks, type FlashcardDeck } from "@/lib/learn-data";

export default function FlashcardsClient() {
  const [active, setActive] = useState<FlashcardDeck | null>(null);

  if (active) {
    return <FlashcardReview deck={active} onExit={() => setActive(null)} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {flashcardDecks.map((deck) => {
        const c = accent[deck.color];
        return (
          <div key={deck.id} className="glass-card flex flex-col rounded-3xl p-6">
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${c.soft} ${c.text}`}>
                <Icon name="flashcard" className="h-[18px] w-[18px]" />
              </div>
              {deck.dueToday > 0 ? (
                <span className={`rounded-full ${c.soft} ${c.text} px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide`}>
                  {deck.dueToday} due
                </span>
              ) : (
                <span className="rounded-full bg-ink/5 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
                  Up to date
                </span>
              )}
            </div>

            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{deck.title}</h3>
            <p className="text-xs text-ink-soft">{deck.subject} &middot; {deck.total} cards</p>

            <button
              onClick={() => setActive(deck)}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-cta py-2.5 text-sm font-medium text-cta-text transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
            >
              {deck.dueToday > 0 ? "Review now" : "Study anyway"}
              <Icon name="arrowRight" className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
