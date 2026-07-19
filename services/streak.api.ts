import { mockResponse } from "@/lib/api";
import { streakDays, streakHistory, streakStats } from "@/lib/progress-data";

export const StreakApi = {
  /**
   * GET /streaks
   */
  async getStreak() {
    return mockResponse({ days: streakDays, history: streakHistory, stats: streakStats });
  },
};
