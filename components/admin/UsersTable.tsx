"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import { AdminApi } from "@/services/admin.api";
import type { AdminUser } from "@/types/admin";

const statusTone: Record<AdminUser["status"], string> = {
  active: "bg-moss-soft text-moss",
  suspended: "bg-ember-soft text-ember",
  banned: "bg-ink/10 text-ink-faint",
};

export default function UsersTable({
  initialUsers,
}: {
  initialUsers: AdminUser[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
    );
  }, [users, query]);

  async function updateStatus(id: string, status: AdminUser["status"]) {
    setPendingId(id);
    if (status === "suspended") await AdminApi.suspendUser(id);
    else if (status === "banned") await AdminApi.banUser(id);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));
    setPendingId(null);
  }

  async function remove(id: string) {
    setPendingId(id);
    await AdminApi.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setPendingId(null);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-sm">
        <Icon
          name="search"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-full border border-ink/10 bg-surface-1 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-signal/40 focus:outline-none"
        />
      </div>

      <div className="glass-card overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-ink-faint">
                <th className="px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-wide">
                  Student
                </th>
                <th className="px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-wide">
                  Role
                </th>
                <th className="px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-wide">
                  Coins
                </th>
                <th className="px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-wide">
                  Last active
                </th>
                <th className="px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-wide">
                  Status
                </th>
                <th className="px-5 py-3 font-mono text-[10.5px] font-medium uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-soft font-display text-xs font-semibold text-signal-deep">
                        {u.avatarInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">
                          {u.name}
                        </p>
                        <p className="truncate text-xs text-ink-soft">
                          {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft capitalize">
                    {u.role.replace("_", " ")}
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">
                    {u.coinsBalance.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-ink-soft">
                    {u.lastActiveAt
                      ? new Date(u.lastActiveAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide ${statusTone[u.status]}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateStatus(u.id, "suspended")}
                        disabled={pendingId === u.id || u.status !== "active"}
                        className="rounded-full border border-ink/10 bg-surface-1 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-ink/20 disabled:opacity-40"
                      >
                        Suspend
                      </button>
                      <button
                        onClick={() => updateStatus(u.id, "banned")}
                        disabled={pendingId === u.id || u.status === "banned"}
                        className="rounded-full border border-ember/30 bg-ember-soft px-3 py-1.5 text-xs font-medium text-ember disabled:opacity-40"
                      >
                        Ban
                      </button>
                      <button
                        onClick={() => remove(u.id)}
                        disabled={pendingId === u.id}
                        aria-label={`Delete ${u.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-ember-soft hover:text-ember disabled:opacity-40"
                      >
                        <Icon name="close" className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
