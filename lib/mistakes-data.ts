import { questionBank } from "./practice-data";

export type Mistake = {
  id: string;
  questionId: string;
  chosenIndex: number;
  date: string;
  mastery: number;
};

export const mistakes: Mistake[] = [
  { id: "m1", questionId: "q1", chosenIndex: 0, date: "2026-07-14", mastery: 62 },
  { id: "m2", questionId: "q3", chosenIndex: 0, date: "2026-07-13", mastery: 48 },
  { id: "m3", questionId: "q6", chosenIndex: 0, date: "2026-07-12", mastery: 55 },
  { id: "m4", questionId: "q8", chosenIndex: 3, date: "2026-07-10", mastery: 40 },
  { id: "m5", questionId: "q4", chosenIndex: 0, date: "2026-07-09", mastery: 58 },
  { id: "m6", questionId: "q10", chosenIndex: 0, date: "2026-07-08", mastery: 66 },
];

export function mistakesWithQuestions() {
  return mistakes
    .map((m) => {
      const question = questionBank.find((q) => q.id === m.questionId);
      if (!question) return null;
      return { ...m, question };
    })
    .filter((m): m is Mistake & { question: (typeof questionBank)[number] } => m !== null);
}
