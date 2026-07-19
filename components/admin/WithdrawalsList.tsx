"use client";

import { useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import { AdminApi } from "@/services/admin.api";
import type { WithdrawalRequest } from "@/types/admin";

const statusTone: Record<WithdrawalRequest["status"], string> = {
  pending: "bg-ember-soft text-ember",
  approved: "bg-moss-soft text-moss",
  rejected: "bg-ink/10 text-ink-faint",
};

const methodLabels: Record<WithdrawalRequest["method"], string> = {
  premium_credit: "Premium credit",
  store_item: "Store item",
};

export default function WithdrawalsList({ initialRequests }: { initialRequests: WithdrawalRequest[] }) {
  const [requests, setRequests] = useState(initialRequests);

  async function approve(id: string) {
    await AdminApi.approveWithdrawal(id);
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)));
  }
  async function reject(id: string) {
    await AdminApi.rejectWithdrawal(id);
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)));
  }

  return (
    <div className="flex flex-col gap-3">
      {requests.map((r) => (
        <div key={r.id} className="glass-card flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember-soft text-ember">
              <Icon name="coin" className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-ink">{r.userName}</p>
              <p className="text-xs text-ink-soft">
                {r.coins.toLocaleString()} coins &middot; {methodLabels[r.method]} &middot; {new Date(r.requestedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide ${statusTone[r.status]}`}>
              {r.status}
            </span>
            {r.status === "pending" && (
              <>
                <button
                  onClick={() => approve(r.id)}
                  className="rounded-full border border-moss/30 bg-moss-soft px-3 py-1.5 text-xs font-medium text-moss"
                >
                  Approve
                </button>
                <button
                  onClick={() => reject(r.id)}
                  className="rounded-full border border-ember/30 bg-ember-soft px-3 py-1.5 text-xs font-medium text-ember"
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
