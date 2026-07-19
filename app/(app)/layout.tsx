import AppShellClient from "@/components/dashboard/AppShellClient";
import { DashboardApi } from "@/services/dashboard.api";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { student } = await DashboardApi.getDashboard();

  return <AppShellClient student={student}>{children}</AppShellClient>;
}
