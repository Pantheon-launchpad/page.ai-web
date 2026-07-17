"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/dashboard/icons";
import {
  referral,
  referralSteps,
  referralMilestones,
  recentReferrals,
} from "@/lib/rewards-data";

const shareChannels: { label: string; icon: IconName }[] = [
  { label: "WhatsApp", icon: "chat" },
  { label: "Telegram", icon: "send" },
  { label: "X", icon: "share" },
  { label: "LinkedIn", icon: "users" },
  { label: "Email", icon: "mail" },
];

export default function ReferralsTab() {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  function copy(value: string, which: "code" | "link") {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopied(which);
    setTimeout(() => setCopied(null), 1800);
  }

  const progressPercent = Math.min(
    100,
    Math.round((referral.monthlyProgress / referral.monthlyGoal) * 100),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card-deep flex flex-col gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold text-white">
            Invite Friends. Earn Together.
          </p>
          <p className="mt-1 text-sm text-white/60">
            Share your code - you both earn Page Coins once they start learning.
          </p>
        </div>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white/70">
          <Icon name="qrcode" className="h-8 w-8" />
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              Your referral code
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-xl border border-ink/10 bg-surface-1 px-3.5 py-2.5 font-mono text-sm text-ink">
                {referral.code}
              </div>
              <button
                onClick={() => copy(referral.code, "code")}
                className="rounded-xl border border-ink/10 bg-surface-1 px-3.5 py-2.5 text-xs font-medium text-ink hover:border-ink/20"
              >
                {copied === "code" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              Your referral link
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 truncate rounded-xl border border-ink/10 bg-surface-1 px-3.5 py-2.5 text-sm text-ink">
                {referral.link}
              </div>
              <button
                onClick={() => copy(referral.link, "link")}
                className="rounded-xl border border-ink/10 bg-surface-1 px-3.5 py-2.5 text-xs font-medium text-ink hover:border-ink/20"
              >
                {copied === "link" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {shareChannels.map((c) => (
            <button
              key={c.label}
              onClick={() => copy(referral.link, "link")}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-signal/30 hover:bg-signal-soft hover:text-signal-deep"
            >
              <Icon name={c.icon} className="h-3.5 w-3.5" />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-5">
        <Stat label="Total referrals" value={String(referral.totalReferrals)} />
        <Stat label="Active" value={String(referral.activeReferrals)} />
        <Stat
          label="Coins earned"
          value={referral.coinsEarned.toLocaleString()}
        />
        <Stat
          label="Successful invites"
          value={String(referral.successfulInvites)}
        />
        <Stat label="Next reward" value={`+${referral.nextRewardCoins}`} />
      </div>

      <div className="glass-card rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">
            Your progress
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
            {referral.monthlyProgress}/{referral.monthlyGoal} this month
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-signal transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-ink-soft">
          {referral.nextRewardAt - referral.monthlyProgress > 0
            ? `${referral.nextRewardAt - referral.monthlyProgress} more invites to your next reward.`
            : "You've hit your next reward tier!"}
        </p>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">
          How it works
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {referralSteps.map((s) => (
            <div
              key={s.step}
              className="rounded-2xl border border-ink/10 bg-surface-2 p-4"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-signal-soft font-mono text-xs font-semibold text-signal-deep">
                {s.step}
              </span>
              <p className="mt-2.5 text-sm font-medium text-ink">{s.title}</p>
              <p className="mt-1 text-xs text-ink-soft">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">
            Milestones
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {referralMilestones.map((m) => (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink/10 bg-surface-2 px-3.5 py-2.5"
              >
                <span className="text-sm text-ink-soft">{m.label}</span>
                <span className="flex shrink-0 items-center gap-1 font-mono text-xs text-ember">
                  <Icon name="coin" className="h-3 w-3" />+{m.coins}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">
            Recent referrals
          </h3>
          <ul className="mt-4 flex flex-col divide-y divide-ink/10">
            {recentReferrals.map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-signal-soft font-display text-xs font-semibold text-signal-deep">
                  {r.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">
                    {r.name}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {r.status} &middot; {r.joined}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-moss">
                  +{r.coins}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass-card rounded-2xl p-4 text-center">
      <div className="font-display text-lg font-semibold text-ink">{value}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
        {label}
      </div>
    </div>
  );
}
