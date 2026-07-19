import { mockResponse } from "@/lib/api";
import { cbtPapers, mockExams, questionBank } from "@/lib/practice-data";
import type { ExamConfig } from "@/types";

export interface SubmitExamRequest {
  examId: string;
  answers: Record<number, number | null>;
  timeTakenSeconds: number;
}

export interface SubmitExamResponse {
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
  coinsEarned: number;
}

export const CbtApi = {
  /**
   * GET /cbt/papers
   */
  async getPapers(): Promise<ExamConfig[]> {
    return mockResponse(cbtPapers);
  },

  /**
   * GET /cbt/mock-exams
   */
  async getMockExams(): Promise<ExamConfig[]> {
    return mockResponse(mockExams);
  },

  /**
   * GET /cbt/:examId/questions
   */
  async getExamQuestions(config: ExamConfig) {
    const pool = config.subject === "All subjects" ? questionBank : questionBank.filter((q) => q.subject === config.subject);
    return mockResponse(pool.slice(0, Math.max(1, Math.min(config.questionCount, pool.length))));
  },

  /**
   * POST /cbt/:examId/submit
   */
  async submitExam(payload: SubmitExamRequest): Promise<SubmitExamResponse> {
    const total = Object.keys(payload.answers).length;
    const correct = Object.values(payload.answers).filter((v) => v !== null).length; // real scoring happens client-side today
    return mockResponse({
      correct,
      wrong: total - correct,
      skipped: 0,
      total,
      coinsEarned: 20 + correct * 8,
    });
  },
};
