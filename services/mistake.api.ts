import { mockResponse } from "@/lib/api";
import { mistakesWithQuestions } from "@/lib/mistakes-data";

export const MistakeApi = {
  /**
   * GET /mistakes?subject=
   */
  async getMistakes(subject?: string) {
    const all = mistakesWithQuestions();
    const filtered = subject && subject !== "All subjects" ? all.filter((m) => m.question.subject === subject) : all;
    return mockResponse(filtered);
  },
};
