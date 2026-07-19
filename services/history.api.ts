import { mockResponse } from "@/lib/api";
import { learningHistory } from "@/lib/progress-data";

export const HistoryApi = {
  /**
   * GET /history
   */
  async getHistory() {
    return mockResponse(learningHistory);
  },
};
