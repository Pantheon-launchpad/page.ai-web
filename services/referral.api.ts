import { mockResponse } from "@/lib/api";
import { referral, referralSteps, referralMilestones, recentReferrals } from "@/lib/rewards-data";

export const ReferralApi = {
  /**
   * GET /referrals
   */
  async getReferralSummary() {
    return mockResponse({ referral, steps: referralSteps, milestones: referralMilestones });
  },

  /**
   * GET /referrals/recent
   */
  async getRecentReferrals() {
    return mockResponse(recentReferrals);
  },

  /**
   * POST /referrals/apply
   * Body: { code: string } - applied during onboarding.
   */
  async applyCode(code: string): Promise<{ valid: boolean }> {
    return mockResponse({ valid: code.trim().length > 0 });
  },
};
