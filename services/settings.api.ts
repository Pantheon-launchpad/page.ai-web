import { mockResponse } from "@/lib/api";

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

export const SettingsApi = {
  /**
   * GET /settings
   */
  async getSettings(): Promise<AppSettings> {
    return mockResponse(DEFAULT_SETTINGS);
  },

  /**
   * PATCH /settings
   */
  async updateSettings(patch: Partial<AppSettings>): Promise<AppSettings> {
    return mockResponse({ ...DEFAULT_SETTINGS, ...patch });
  },
};
