import { mockResponse } from "@/lib/api";
import {
  student,
  pickGreeting,
  continueLearning,
  aiRecommendation,
  recentActivity,
  upcomingRevision,
  quickActions,
} from "@/lib/dashboard-data";

export const DashboardApi = {
  /**
   * GET /dashboard
   * Single aggregate endpoint - mirrors what the dashboard page renders in
   * one call rather than one round trip per widget.
   */
  async getDashboard() {
    return mockResponse({
      student,
      greeting: pickGreeting(),
      continueLearning,
      aiRecommendation,
      recentActivity,
      upcomingRevision,
      quickActions,
    });
  },
};
