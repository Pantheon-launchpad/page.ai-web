import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import FlashcardsClient from "@/components/learn/FlashcardsClient";

export const metadata: Metadata = { title: "Flashcards - Page.AI" };

export default function FlashcardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Learn"
        icon="flashcard"
        title="Flashcards"
        description="AI-generated and manual decks, reviewed with spaced repetition so things actually stick."
      />
      <FlashcardsClient />
    </div>
  );
}
