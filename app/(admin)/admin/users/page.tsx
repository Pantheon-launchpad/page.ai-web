import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import UsersTable from "@/components/admin/UsersTable";
import { AdminApi } from "@/services/admin.api";

export const metadata: Metadata = { title: "Users - Admin - Page.AI" };

export default async function AdminUsersPage() {
  const { items: users, total } = await AdminApi.getUsers({ page: 1, pageSize: 50 });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Admin"
        icon="users"
        title="Users"
        description={`${total} accounts across the platform. Search, review activity, and act on reports here.`}
      />
      <UsersTable initialUsers={users} />
    </div>
  );
}
