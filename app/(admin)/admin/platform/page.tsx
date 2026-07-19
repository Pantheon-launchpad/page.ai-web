import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import FeatureFlagsList from "@/components/admin/FeatureFlagsList";
import { Icon } from "@/components/dashboard/icons";
import { AdminApi } from "@/services/admin.api";

export const metadata: Metadata = { title: "Platform - Admin - Page.AI" };

export default async function AdminPlatformPage() {
  const [flags, roles, logs, health] = await Promise.all([
    AdminApi.getFeatureFlags(),
    AdminApi.getRolePermissions(),
    AdminApi.getAuditLogs(),
    AdminApi.getSystemHealth(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Admin"
        icon="settings"
        title="Platform management"
        description="Feature flags, roles, audit trail, and system status."
      />

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">Feature flags</h3>
        <div className="mt-4">
          <FeatureFlagsList initialFlags={flags} />
        </div>
      </div>

      <div className="glass-card rounded-3xl p-6">
        <h3 className="font-display text-[1.05rem] font-semibold text-ink">Roles & permissions</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-ink-faint">
                <th className="py-2.5 pr-4 font-mono text-[10.5px] font-medium uppercase tracking-wide">Role</th>
                <th className="py-2.5 font-mono text-[10.5px] font-medium uppercase tracking-wide">Permissions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {roles.map((r) => (
                <tr key={r.role}>
                  <td className="py-2.5 pr-4 font-medium capitalize text-ink">{r.role.replace("_", " ")}</td>
                  <td className="py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {r.permissions.map((p) => (
                        <span key={p} className="rounded-full bg-signal-soft px-2.5 py-1 font-mono text-[10.5px] text-signal-deep">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">Audit log</h3>
          <ul className="mt-4 flex flex-col divide-y divide-ink/10">
            {logs.map((l) => (
              <li key={l.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                  <Icon name="history" className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm text-ink">
                    <span className="font-medium">{l.actor}</span> &middot; {l.action}
                  </p>
                  <p className="text-xs text-ink-soft">
                    {l.target} &middot; {new Date(l.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-ink">System status</h3>
          <p className="mt-1 text-xs text-ink-soft">API uptime, latency, and storage/CDN health</p>
          <ul className="mt-4 flex flex-col gap-3">
            {health.map((m) => (
              <li key={m.label} className="flex items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2.5">
                  <span className={`h-2 w-2 shrink-0 rounded-full ${m.status === "operational" ? "bg-moss" : "bg-ember"}`} />
                  <span className="text-ink-soft">{m.label}</span>
                </div>
                <span className="font-mono text-xs text-ink-faint">
                  {m.latencyMs ? `${m.latencyMs}ms · ` : ""}
                  {m.uptimePercent}% uptime
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
