import { mockResponse } from "@/lib/api";
import { questionsFor, topicsFor, subjectList, type Difficulty, type Question } from "@/lib/practice-data";

export interface PracticeFilter {
  subject?: string;
  topic?: string;
  difficulty?: Difficulty | "adaptive";
}

export const PracticeApi = {
  /**
   * GET /practice/subjects
   */
  async getSubjectList(): Promise<string[]> {
    return mockResponse(subjectList);
  },

  /**
   * GET /practice/subjects/:subject/topics
   */
  async getTopics(subject: string): Promise<string[]> {
    return mockResponse(topicsFor(subject));
  },

  /**
   * GET /practice/questions?subject=&topic=&difficulty=
   */
  async getQuestions(filter: PracticeFilter): Promise<Question[]> {
    return mockResponse(questionsFor(filter));
  },

  /**
   * POST /practice/attempts
   * Body: { questionId, chosenIndex }
   * Records an attempt server-side for analytics/mastery - fire-and-forget
   * from the UI's perspective.
   */
  async recordAttempt(_questionId: string, _chosenIndex: number | null): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },
};
