import { mockResponse, mockFailure } from "@/lib/api";
import { dailyMissions, wallet, recentRewards, storeItems, coinsByCategory, transactions } from "@/lib/rewards-data";
import type { Mission, StoreItem } from "@/types";

export const WalletApi = {
  /**
   * GET /wallet
   */
  async getWallet() {
    return mockResponse(wallet);
  },

  /**
   * GET /wallet/missions
   */
  async getMissions(): Promise<Mission[]> {
    return mockResponse(dailyMissions);
  },

  /**
   * POST /wallet/missions/:id/claim
   */
  async claimMission(missionId: string): Promise<{ coinsAwarded: number }> {
    const mission = dailyMissions.find((m) => m.id === missionId);
    if (!mission || mission.progress < mission.goal) {
      return mockFailure("This mission isn't complete yet.", "VALIDATION_ERROR");
    }
    return mockResponse({ coinsAwarded: mission.reward });
  },

  /**
   * GET /wallet/rewards/recent
   */
  async getRecentRewards() {
    return mockResponse(recentRewards);
  },

  /**
   * GET /wallet/store
   */
  async getStoreItems(): Promise<StoreItem[]> {
    return mockResponse(storeItems);
  },

  /**
   * POST /wallet/store/:itemId/redeem
   * In-app redemptions only - no cash, airtime, or data payouts by design.
   */
  async redeemItem(itemId: string): Promise<{ success: true; newBalance: number }> {
    const item = storeItems.find((i) => i.id === itemId);
    if (!item) return mockFailure("Item not found.", "NOT_FOUND");
    if (item.comingSoon) return mockFailure("This item isn't available yet.", "VALIDATION_ERROR");
    if (wallet.storeCredit < item.cost) return mockFailure("Not enough coins.", "VALIDATION_ERROR");
    return mockResponse({ success: true as const, newBalance: wallet.storeCredit - item.cost });
  },

  /**
   * GET /wallet/breakdown
   */
  async getCoinsByCategory() {
    return mockResponse(coinsByCategory);
  },

  /**
   * GET /wallet/transactions
   */
  async getTransactions() {
    return mockResponse(transactions);
  },
};
