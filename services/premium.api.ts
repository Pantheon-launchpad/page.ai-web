import { mockResponse } from "@/lib/api";
import { premiumFeatures } from "@/lib/settings-data";

export const PremiumApi = {
  /**
   * GET /premium/plans
   */
  async getPlans() {
    return mockResponse(premiumFeatures);
  },

  /**
   * POST /premium/upgrade
   * Body: { planId, paymentMethodToken } - payment processor TBD.
   */
  async upgrade(): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },
};
