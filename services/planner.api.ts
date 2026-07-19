import { mockResponse } from "@/lib/api";
import { weeklyPlan, upcomingExams, plannerRecommendations } from "@/lib/learn-data";
import { student } from "@/lib/dashboard-data";

export const PlannerApi = {
  /**
   * GET /planner
   */
  async getPlan() {
    return mockResponse({
      weeklyPlan,
      upcomingExams,
      recommendations: plannerRecommendations,
      dailyGoal: { minutesToday: student.studyMinutesToday, goalMinutes: student.studyGoalMinutes },
    });
  },
};
