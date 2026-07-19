import { mockResponse, mockFailure } from "@/lib/api";
import {
  platformStats,
  growthTrend,
  aiUsageBySubject,
  systemHealth,
  adminUsers,
  reports,
  adminContent,
  auditLogs,
  featureFlags,
  rolePermissions,
  withdrawalRequests,
} from "@/lib/admin-data";
import type { AdminUser, Report, ReportStatus, AdminContentItem, FeatureFlag } from "@/types/admin";
import type { PaginationParams, Paginated } from "@/types/common";

function paginate<T>(items: T[], params?: PaginationParams): Paginated<T> {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 20;
  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);
  return { items: pageItems, page, pageSize, total: items.length, totalPages: Math.ceil(items.length / pageSize) };
}

export const AdminApi = {
  // --- Dashboard ---------------------------------------------------------
  /** GET /admin/dashboard */
  async getDashboard() {
    return mockResponse({ stats: platformStats, growthTrend, aiUsageBySubject, systemHealth });
  },

  // --- User management -----------------------------------------------------
  /** GET /admin/users?search=&page= */
  async getUsers(params?: PaginationParams): Promise<Paginated<AdminUser>> {
    const search = params?.search?.toLowerCase();
    const filtered = search
      ? adminUsers.filter((u) => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search))
      : adminUsers;
    return mockResponse(paginate(filtered, params));
  },

  /** GET /admin/users/:id */
  async getUser(id: string): Promise<AdminUser | null> {
    return mockResponse(adminUsers.find((u) => u.id === id) ?? null);
  },

  /** PATCH /admin/users/:id */
  async updateUser(_id: string, _patch: Partial<AdminUser>): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  /** POST /admin/users/:id/suspend */
  async suspendUser(_id: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  /** POST /admin/users/:id/ban */
  async banUser(_id: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  /** DELETE /admin/users/:id */
  async deleteUser(_id: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  // --- Content management --------------------------------------------------
  /** GET /admin/content?type=&status= */
  async getContent(): Promise<AdminContentItem[]> {
    return mockResponse(adminContent);
  },

  /** PATCH /admin/content/:id */
  async updateContentStatus(_id: string, _status: AdminContentItem["status"]): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  /** DELETE /admin/content/:id */
  async deleteContent(_id: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  // --- Moderation ------------------------------------------------------------
  /** GET /admin/reports?status= */
  async getReports(status?: ReportStatus): Promise<Report[]> {
    return mockResponse(status ? reports.filter((r) => r.status === status) : reports);
  },

  /** PATCH /admin/reports/:id */
  async updateReportStatus(_id: string, _status: ReportStatus): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  // --- Rewards / earn management ---------------------------------------------
  /** GET /admin/withdrawals */
  async getWithdrawalRequests() {
    return mockResponse(withdrawalRequests);
  },

  /** POST /admin/withdrawals/:id/approve */
  async approveWithdrawal(_id: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  /** POST /admin/withdrawals/:id/reject */
  async rejectWithdrawal(_id: string): Promise<{ success: true }> {
    return mockResponse({ success: true as const });
  },

  // --- Analytics ---------------------------------------------------------------
  /** GET /admin/analytics */
  async getAnalytics() {
    return mockResponse({ growthTrend, aiUsageBySubject, stats: platformStats });
  },

  // --- Platform management ------------------------------------------------------
  /** GET /admin/feature-flags */
  async getFeatureFlags(): Promise<FeatureFlag[]> {
    return mockResponse(featureFlags);
  },

  /** PATCH /admin/feature-flags/:id */
  async updateFeatureFlag(id: string, patch: Partial<FeatureFlag>): Promise<FeatureFlag> {
    const flag = featureFlags.find((f) => f.id === id);
    if (!flag) return mockFailure("Flag not found.", "NOT_FOUND");
    return mockResponse({ ...flag, ...patch });
  },

  /** GET /admin/roles */
  async getRolePermissions() {
    return mockResponse(rolePermissions);
  },

  /** GET /admin/audit-logs */
  async getAuditLogs() {
    return mockResponse(auditLogs);
  },

  /** GET /admin/system-health */
  async getSystemHealth() {
    return mockResponse(systemHealth);
  },
};
