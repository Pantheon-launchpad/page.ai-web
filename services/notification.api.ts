import { mockResponse } from "@/lib/api";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  type: "reward" | "streak" | "system" | "referral" | "achievement";
}

const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", title: "Streak reminder", body: "Keep your 9-day streak alive today.", read: false, createdAt: new Date().toISOString(), type: "streak" },
  { id: "n2", title: "Reward earned", body: "You earned 40 Page Coins from Physics practice.", read: true, createdAt: new Date().toISOString(), type: "reward" },
];

export const NotificationApi = {
  /**
   * GET /notifications
   */
  async getNotifications(): Promise<AppNotification[]> {
    return mockResponse(MOCK_NOTIFICATIONS);
  },

  /**
   * POST /notifications/:id/read
   */
  async markRead(_id: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  /**
   * POST /notifications/read-all
   */
  async markAllRead(): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },
};
