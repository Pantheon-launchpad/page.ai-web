import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import FlashcardsClient from "@/components/learn/FlashcardsClient";
import { FlashcardApi } from "@/services/flashcard.api";

export const metadata: Metadata = { title: "Flashcards - Page.AI" };

export default async function FlashcardsPage() {
  const decks = await FlashcardApi.getDecks();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Learn"
        icon="flashcard"
        title="Flashcards"
        description="AI-generated and manual decks, reviewed with spaced repetition so things actually stick."
      />
      <FlashcardsClient decks={decks} />
    </div>
  );
}
