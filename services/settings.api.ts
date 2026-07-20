import { apiClient, mockResponse } from "@/lib/api";

export interface AppSettings {
  dailyReminder: boolean;
  streakAlerts: boolean;
  aiTips: boolean;
  timedByDefault: boolean;
  downloadOnWifi: boolean;
  theme: "light" | "soft" | "dark";
}

const DEFAULT_SETTINGS: AppSettings = {
  dailyReminder: true,
  streakAlerts: true,
  aiTips: false,
  timedByDefault: false,
  downloadOnWifi: true,
  theme: "light",
};

let mockSettings = { ...DEFAULT_SETTINGS };

export const SettingsApi = {
  /**
   * GET /settings
   */
  async getSettings(): Promise<AppSettings> {
    if (apiClient.mode === "production") {
      return apiClient.get<AppSettings>("/settings");
    }
    return mockResponse(mockSettings);
  },

  /**
   * PATCH /settings
   */
  async updateSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
    if (apiClient.mode === "production") {
      return apiClient.patch<AppSettings>("/settings", patch);
    }
    mockSettings = { ...mockSettings, ...patch };
    return mockResponse(mockSettings);
  },
};
