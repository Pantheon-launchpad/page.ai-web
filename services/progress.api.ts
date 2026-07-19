import { mockResponse } from "@/lib/api";
import {
  heatmap,
  analyticsSummary,
  learningTrend,
  topicPerformance,
  subjectDistribution,
  weakAreas,
} from "@/lib/progress-data";

export const ProgressApi = {
  /**
   * GET /progress/analytics
   */
  async getAnalytics() {
    return mockResponse({
      heatmap,
      summary: analyticsSummary,
      learningTrend,
      topicPerformance,
      subjectDistribution,
    });
  },

  /**
   * GET /progress/weak-areas
   */
  async getWeakAreas() {
    return mockResponse(weakAreas);
  },
};
