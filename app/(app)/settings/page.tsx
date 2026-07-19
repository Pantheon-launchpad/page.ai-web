"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/learn/PageHeader";
import SettingsSection from "@/components/settings/SettingsSection";
import SettingsRow from "@/components/settings/SettingsRow";
import Toggle from "@/components/ui/Toggle";
import { Icon } from "@/components/dashboard/icons";
import { SettingsApi, type AppSettings } from "@/services/settings.api";
import { UserApi } from "@/services/user.api";

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    SettingsApi.getSettings().then(setSettings);
  }, []);

  function update<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev));
    SettingsApi.updateSettings({ [key]: value }).catch(() => {});
  }

  async function handleDeleteAccount() {
    setConfirmDelete(false);
    await UserApi.deleteAccount();
    router.push("/");
  }

  if (!settings) return null;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader eyebrow="Settings" icon="settings" title="Settings" description="Tune how Page.AI works for you." />

      <SettingsSection title="Notifications">
        <SettingsRow
          label="Daily study reminder"
          description="A nudge at your usual study time."
          control={<Toggle checked={settings.dailyReminder} onChange={(v) => update("dailyReminder", v)} />}
        />
        <SettingsRow
          label="Streak alerts"
          description="Warn me before my streak is about to break."
          control={<Toggle checked={settings.streakAlerts} onChange={(v) => update("streakAlerts", v)} />}
        />
        <SettingsRow
          label="AI tips & recommendations"
          description="Occasional nudges from Lumo based on your progress."
          control={<Toggle checked={settings.aiTips} onChange={(v) => update("aiTips", v)} />}
        />
      </SettingsSection>

      <SettingsSection title="Study preferences">
        <SettingsRow
          label="Timed mode by default"
          description="Start Practice Mode sessions with a soft timer on."
          control={<Toggle checked={settings.timedByDefault} onChange={(v) => update("timedByDefault", v)} />}
        />
        <SettingsRow
          label="Download new content on Wi-Fi only"
          description="Avoid using mobile data for subjects and model updates."
          control={<Toggle checked={settings.downloadOnWifi} onChange={(v) => update("downloadOnWifi", v)} />}
        />
      </SettingsSection>

      <SettingsSection title="Appearance">
        <SettingsRow
          label="Theme"
          description="Dark mode is on the roadmap."
          control={
            <span className="rounded-full bg-ink/5 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
              Light · Soon
            </span>
          }
        />
      </SettingsSection>

      <SettingsSection title="Account">
        <SettingsRow
          label="Log out"
          description="You'll need to log in again to continue."
          control={
            <button
              onClick={() => router.push("/login")}
              className="rounded-full border border-ink/10 bg-surface-1 px-4 py-2 text-sm font-medium text-ink hover:border-ink/20"
            >
              Log out
            </button>
          }
        />
        <SettingsRow
          label="Delete account"
          description="Permanently remove your account and all downloaded data."
          control={
            <button
              onClick={() => setConfirmDelete(true)}
              className="rounded-full border border-ember/30 bg-ember-soft px-4 py-2 text-sm font-medium text-ember hover:border-ember/50"
            >
              Delete
            </button>
          }
        />
      </SettingsSection>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm">
          <div className="glass-card w-full max-w-sm rounded-3xl p-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-ember-soft text-ember">
              <Icon name="mistake" className="h-5 w-5" />
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">Delete your account?</h3>
            <p className="mt-2 text-sm text-ink-soft">
              This removes your progress, streaks, and downloaded content permanently. This can&apos;t be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 rounded-full border border-ink/10 bg-surface-1 py-2.5 text-sm font-medium text-ink"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 rounded-full bg-ember py-2.5 text-sm font-medium text-white"
              >
                Delete anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
