import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import WithdrawalsList from "@/components/admin/WithdrawalsList";
import { AdminApi } from "@/services/admin.api";

export const metadata: Metadata = { title: "Rewards - Admin - Page.AI" };

export default async function AdminRewardsPage() {
  const requests = await AdminApi.getWithdrawalRequests();
  const pendingCoins = requests.filter((r) => r.status === "pending").reduce((sum, r) => sum + r.coins, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Admin"
        icon="coin"
        title="Rewards & wallet"
        description="Page Coins redemption requests - Premium credit and in-app store items only, no cash payouts."
      >
        <div className="glass-card rounded-2xl px-4 py-2.5 text-center">
          <div className="font-display text-lg font-semibold text-ink">{pendingCoins.toLocaleString()}</div>
          <div className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">Coins pending review</div>
        </div>
      </PageHeader>
      <WithdrawalsList initialRequests={requests} />
    </div>
  );
}
