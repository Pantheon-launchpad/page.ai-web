export * from "./common";
export * from "./auth";
export * from "./admin";

// Existing domain types already live next to their mock data in /lib - they
// moved here conceptually would just be a re-export, so rather than
// duplicate definitions we re-export them from a single place. Services
// import from "@/types" either way, so this stays an implementation detail.
export type {
  Subject,
  ResourceType,
  Resource,
  ChatSource,
  Flashcard,
  FlashcardDeck,
} from "@/lib/learn-data";
export type { Mistake } from "@/lib/mistakes-data";
export type { Difficulty, Question, ExamConfig } from "@/lib/practice-data";
export type { Achievement } from "@/lib/progress-data";
export type { Mission, StoreItem } from "@/lib/rewards-data";
