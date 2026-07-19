import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ReportsList from "@/components/admin/ReportsList";
import { AdminApi } from "@/services/admin.api";

export const metadata: Metadata = { title: "Moderation - Admin - Page.AI" };

export default async function AdminModerationPage() {
  const reports = await AdminApi.getReports();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Admin"
        icon="weak"
        title="Moderation"
        description="Reported content, flagged accounts, and abuse patterns caught by automated checks."
      />
      <ReportsList initialReports={reports} />
    </div>
  );
}
