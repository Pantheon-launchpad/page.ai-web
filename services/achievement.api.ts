import { mockResponse } from "@/lib/api";
import { achievements } from "@/lib/progress-data";
import type { Achievement } from "@/types";

export const AchievementApi = {
  /**
   * GET /achievements
   */
  async getAchievements(): Promise<Achievement[]> {
    return mockResponse(achievements);
  },
};
