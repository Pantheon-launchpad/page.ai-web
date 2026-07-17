"use client";

import { useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import { accent } from "./colors";
import type { FlashcardDeck } from "@/lib/learn-data";

const ratings = [
  { label: "Again", days: "10m", tone: "bg-ember-soft text-ember" },
  { label: "Hard", days: "1d", tone: "bg-ember-soft text-ember" },
  { label: "Good", days: "3d", tone: "bg-moss-soft text-moss" },
  { label: "Easy", days: "7d", tone: "bg-moss-soft text-moss" },
] as const;

export default function FlashcardReview({ deck, onExit }: { deck: FlashcardDeck; onExit: () => void }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const c = accent[deck.color];

  const card = deck.cards[index % deck.cards.length];
  const done = reviewed >= deck.cards.length;

  function rate() {
    setFlipped(false);
    setReviewed((n) => n + 1);
    setTimeout(() => setIndex((i) => i + 1), 180);
  }

  if (done) {
    return (
      <div className="glass-card flex flex-col items-center gap-3 rounded-3xl p-10 text-center">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.soft} ${c.text}`}>
          <Icon name="check" className="h-6 w-6" />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink">Deck reviewed</h3>
        <p className="text-sm text-ink-soft">
          You went through all {deck.cards.length} cards in {deck.title}. Nice consistency.
        </p>
        <button
          onClick={onExit}
          className="mt-2 rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-cta-text transition-transform hover:-translate-y-0.5"
        >
          Back to decks
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex w-full items-center justify-between">
        <button onClick={onExit} className="flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
          <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
          {deck.title}
        </button>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          {reviewed + 1} / {deck.cards.length}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-cta/10">
        <div
          className={`h-full rounded-full ${c.bar} transition-all duration-500`}
          style={{ width: `${(reviewed / deck.cards.length) * 100}%` }}
        />
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="glass-card flex h-64 w-full max-w-md items-center justify-center rounded-3xl p-8 text-center transition-transform duration-300 hover:-translate-y-0.5 sm:h-72"
        style={{ perspective: "1000px" }}
      >
        <div>
          <div className={`mx-auto mb-4 inline-flex rounded-full ${c.soft} px-3 py-1 font-mono text-[10px] uppercase tracking-wide ${c.text}`}>
            {flipped ? "Answer" : "Question"}
          </div>
          <p className="font-display text-lg font-medium leading-snug text-ink sm:text-xl">
            {flipped ? card.back : card.front}
          </p>
          {!flipped && <p className="mt-4 text-xs text-ink-faint">Tap to reveal</p>}
        </div>
      </button>

      {flipped ? (
        <div className="grid w-full max-w-md grid-cols-4 gap-2">
          {ratings.map((r) => (
            <button
              key={r.label}
              onClick={rate}
              className={`flex flex-col items-center gap-0.5 rounded-xl py-2.5 text-xs font-semibold transition-transform hover:-translate-y-0.5 ${r.tone}`}
            >
              {r.label}
              <span className="font-mono text-[10px] font-normal opacity-70">{r.days}</span>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-ink-faint">Flip the card, then rate how well you knew it.</p>
      )}
    </div>
  );
}
