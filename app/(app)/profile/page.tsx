"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/learn/PageHeader";
import SettingsSection from "@/components/settings/SettingsSection";
import { Icon } from "@/components/dashboard/icons";
import { student } from "@/lib/dashboard-data";
import ReferralsTab from "@/components/rewards/ReferralsTab";

type Tab = "details" | "referrals";

export default function ProfilePage() {
  return (
    <Suspense fallback={null}>
      <ProfileContent />
    </Suspense>
  );
}

function ProfileContent() {
  const searchParams = useSearchParams();
  const initialTab: Tab = searchParams.get("tab") === "referrals" ? "referrals" : "details";
  const [tab, setTab] = useState<Tab>(initialTab);

  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState("david@example.com");
  const [school, setSchool] = useState("Federal Government College");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Settings" icon="profile" title="Profile" description="How Page.AI and Lumo know you." />

      <div className="inline-flex w-fit items-center gap-1 rounded-full border border-ink/10 bg-surface-2 p-1">
        <TabButton active={tab === "details"} onClick={() => setTab("details")} icon="profile" label="Personal details" />
        <TabButton active={tab === "referrals"} onClick={() => setTab("referrals")} icon="share" label="Referrals" />
      </div>

      {tab === "details" ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="glass-card flex flex-col items-center gap-4 rounded-3xl p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cta font-display text-2xl font-semibold text-cta-text">
              {name.charAt(0).toUpperCase() || "D"}
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-ink">{name || "Your name"}</p>
              <p className="text-xs text-ink-soft">{email}</p>
            </div>

            <div className="grid w-full grid-cols-3 gap-2 border-t border-ink/10 pt-4">
              <MiniStat label="Level" value={String(student.level)} />
              <MiniStat label="Coins" value={student.coins.toLocaleString()} />
              <MiniStat label="Streak" value={`${student.streak}d`} />
            </div>
          </div>

          <SettingsSection title="Personal details">
            <form onSubmit={handleSave} className="flex flex-col gap-4 py-1">
              <Field label="Full name" value={name} onChange={setName} />
              <Field label="Email" type="email" value={email} onChange={setEmail} />
              <Field label="School" value={school} onChange={setSchool} />

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
                >
                  <Icon name="check" className="h-4 w-4" />
                  Save changes
                </button>
                {saved && <span className="text-xs font-medium text-moss">Saved.</span>}
              </div>
            </form>
          </SettingsSection>
        </div>
      ) : (
        <ReferralsTab />
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: Parameters<typeof Icon>[0]["name"];
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active ? "bg-signal text-white" : "text-ink-soft hover:bg-cta/5 hover:text-ink"
      }`}
    >
      <Icon name={icon} className="h-4 w-4" />
      {label}
    </button>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-2 px-2 py-2.5">
      <div className="font-display text-sm font-semibold text-ink">{value}</div>
      <div className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">{label}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/10 bg-surface-1 px-3.5 py-2.5 text-sm text-ink focus:border-signal/40 focus:outline-none"
      />
    </label>
  );
}
