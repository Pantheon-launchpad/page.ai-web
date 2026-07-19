import { mockResponse } from "@/lib/api";
import { flashcardDecks } from "@/lib/learn-data";
import type { FlashcardDeck } from "@/types";

export type ReviewRating = "again" | "hard" | "good" | "easy";

export const FlashcardApi = {
  /**
   * GET /flashcards/decks
   */
  async getDecks(): Promise<FlashcardDeck[]> {
    return mockResponse(flashcardDecks);
  },

  /**
   * POST /flashcards/:deckId/cards/:cardId/review
   * Body: { rating: ReviewRating }
   * Production implementation would run an SM-2-style spaced repetition
   * update server-side and return the next due date.
   */
  async reviewCard(
    _deckId: string,
    _cardId: string,
    _rating: ReviewRating,
  ): Promise<{ nextDueAt: string }> {
    return mockResponse({
      nextDueAt: new Date(Date.now() + 86_400_000).toISOString(),
    });
  },

  /**
   * POST /flashcards/generate - AI-generated deck from a topic
   */
  async generateDeck(_topic: string): Promise<FlashcardDeck> {
    return mockResponse(flashcardDecks[0]);
  },
};
