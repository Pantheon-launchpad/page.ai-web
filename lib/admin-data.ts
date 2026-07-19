import type {
  AdminUser,
  PlatformStat,
  UsageDataPoint,
  Report,
  AdminContentItem,
  AuditLogEntry,
  FeatureFlag,
  RolePermission,
  WithdrawalRequest,
  SystemHealthMetric,
} from "@/types/admin";

export const platformStats: PlatformStat[] = [
  { label: "Total students", value: "48,210", delta: "+6.2% / 30d", trend: "up" },
  { label: "Active today", value: "9,842", delta: "+3.1% / 7d", trend: "up" },
  { label: "Premium subscribers", value: "3,105", delta: "+1.4% / 30d", trend: "up" },
  { label: "AI messages today", value: "212,880", delta: "+18% / 7d", trend: "up" },
  { label: "CBT exams completed", value: "61,004", delta: "+4.8% / 30d", trend: "up" },
  { label: "Avg. session length", value: "24m", delta: "-2.1% / 7d", trend: "down" },
];

export const growthTrend: UsageDataPoint[] = [
  { label: "W1", value: 32000 },
  { label: "W2", value: 34500 },
  { label: "W3", value: 36200 },
  { label: "W4", value: 39800 },
  { label: "W5", value: 42100 },
  { label: "W6", value: 44900 },
  { label: "W7", value: 46700 },
  { label: "W8", value: 48210 },
];

export const aiUsageBySubject: { name: string; color: "signal" | "ember" | "moss"; value: number }[] = [
  { name: "Physics", color: "signal", value: 38400 },
  { name: "Chemistry", color: "ember", value: 29200 },
  { name: "Biology", color: "moss", value: 33750 },
  { name: "Mathematics", color: "signal", value: 41200 },
  { name: "English", color: "ember", value: 22100 },
];

export const systemHealth: SystemHealthMetric[] = [
  { label: "API Gateway", status: "operational", latencyMs: 118, uptimePercent: 99.98 },
  { label: "Auth Service", status: "operational", latencyMs: 84, uptimePercent: 99.99 },
  { label: "AI Inference Proxy", status: "degraded", latencyMs: 640, uptimePercent: 99.2 },
  { label: "MongoDB Primary", status: "operational", latencyMs: 22, uptimePercent: 100 },
  { label: "File Storage (CDN)", status: "operational", latencyMs: 45, uptimePercent: 99.95 },
];

export const adminUsers: AdminUser[] = [
  {
    id: "u1", name: "Amaka Johnson", email: "amaka.j@example.com", role: "student", avatarInitial: "A",
    classLevel: "SS3", targetExams: ["WAEC", "JAMB"], focusSubjects: ["Physics", "Biology"],
    createdAt: "2026-02-01T10:00:00Z", lastActiveAt: "2026-07-17T08:30:00Z", status: "active",
    subjectsEnrolled: 5, coinsBalance: 4280, streak: 9,
  },
  {
    id: "u2", name: "Tunde Bakare", email: "tunde.b@example.com", role: "student", avatarInitial: "T",
    classLevel: "200 Level", targetExams: ["Post-UTME"], focusSubjects: ["Mathematics"],
    createdAt: "2026-01-22T10:00:00Z", lastActiveAt: "2026-07-16T19:00:00Z", status: "active",
    subjectsEnrolled: 3, coinsBalance: 1890, streak: 3,
  },
  {
    id: "u3", name: "Ngozi Eze", email: "ngozi.e@example.com", role: "student", avatarInitial: "N",
    classLevel: "SS2", targetExams: ["WAEC"], focusSubjects: ["Chemistry", "Biology"],
    createdAt: "2026-03-10T10:00:00Z", lastActiveAt: "2026-07-10T09:00:00Z", status: "suspended",
    subjectsEnrolled: 4, coinsBalance: 620, streak: 0,
  },
  {
    id: "u4", name: "Chinedu Okafor", email: "chinedu.o@example.com", role: "teacher", avatarInitial: "C",
    createdAt: "2025-11-05T10:00:00Z", lastActiveAt: "2026-07-17T07:00:00Z", status: "active",
    subjectsEnrolled: 0, coinsBalance: 0, streak: 0,
  },
  {
    id: "u5", name: "Fatima Yusuf", email: "fatima.y@example.com", role: "student", avatarInitial: "F",
    classLevel: "SS1", targetExams: ["NECO"], focusSubjects: ["English", "Mathematics"],
    createdAt: "2026-04-18T10:00:00Z", lastActiveAt: "2026-06-01T10:00:00Z", status: "banned",
    subjectsEnrolled: 2, coinsBalance: 90, streak: 0,
  },
  {
    id: "u6", name: "David (you)", email: "david@example.com", role: "super_admin", avatarInitial: "D",
    createdAt: "2026-01-14T09:00:00Z", lastActiveAt: new Date().toISOString(), status: "active",
    subjectsEnrolled: 5, coinsBalance: 4280, streak: 9,
  },
];

export const reports: Report[] = [
  { id: "r1", reason: "cheating", status: "open", targetType: "chat_message", targetId: "msg_881", reportedBy: "System (pattern flag)", createdAt: "2026-07-17T06:00:00Z", notes: "Repeated identical answers submitted within seconds across 6 accounts." },
  { id: "r2", reason: "inappropriate_content", status: "reviewing", targetType: "resource", targetId: "res_204", reportedBy: "Ngozi Eze", createdAt: "2026-07-15T14:00:00Z" },
  { id: "r3", reason: "bug", status: "open", targetType: "question", targetId: "q_physics_18", reportedBy: "Tunde Bakare", createdAt: "2026-07-16T11:00:00Z", notes: "Marked answer appears incorrect for this question." },
  { id: "r4", reason: "spam", status: "resolved", targetType: "user", targetId: "u5", reportedBy: "System (rate limit)", createdAt: "2026-06-01T09:00:00Z" },
];

export const adminContent: AdminContentItem[] = [
  { id: "c1", type: "subject", title: "Physics", subject: "Physics", status: "published", updatedAt: "2026-07-10", author: "Content Team" },
  { id: "c2", type: "question", title: "Wave speed calculation (medium)", subject: "Physics", status: "published", updatedAt: "2026-07-12", author: "Content Team" },
  { id: "c3", type: "question", title: "Periodic table trends (easy)", subject: "Chemistry", status: "flagged", updatedAt: "2026-07-16", author: "Content Team" },
  { id: "c4", type: "resource", title: "WAEC English 2020 Past Paper", subject: "English", status: "published", updatedAt: "2026-05-20", author: "Partner: WAEC Archive" },
  { id: "c5", type: "flashcard_deck", title: "Chemical Bonding", subject: "Chemistry", status: "draft", updatedAt: "2026-07-14", author: "Content Team" },
  { id: "c6", type: "topic", title: "Genetics", subject: "Biology", status: "published", updatedAt: "2026-06-30", author: "Content Team" },
];

export const auditLogs: AuditLogEntry[] = [
  { id: "l1", actor: "david@example.com", action: "user.suspend", target: "u3 (Ngozi Eze)", createdAt: "2026-07-15T14:20:00Z", ip: "197.210.x.x" },
  { id: "l2", actor: "david@example.com", action: "content.flag.resolve", target: "c3 (Periodic table trends)", createdAt: "2026-07-16T09:10:00Z", ip: "197.210.x.x" },
  { id: "l3", actor: "system", action: "withdrawal.auto_review", target: "w2", createdAt: "2026-07-16T02:00:00Z" },
  { id: "l4", actor: "chinedu.o@example.com", action: "content.create", target: "c5 (Chemical Bonding deck)", createdAt: "2026-07-14T16:45:00Z", ip: "105.112.x.x" },
];

export const featureFlags: FeatureFlag[] = [
  { id: "f1", key: "chat_with_book_v2", label: "Chat with Book v2", description: "New persona-chip driven chat experience.", enabled: true, rolloutPercent: 100 },
  { id: "f2", key: "adaptive_difficulty", label: "Adaptive difficulty engine", description: "Adjusts practice difficulty from rolling accuracy.", enabled: true, rolloutPercent: 100 },
  { id: "f3", key: "voice_tutor", label: "Voice Tutor (beta)", description: "Speech-based AI tutor sessions.", enabled: false, rolloutPercent: 0 },
  { id: "f4", key: "lumo_customization", label: "Lumo customization", description: "Cosmetic companion customization store.", enabled: false, rolloutPercent: 10 },
];

export const rolePermissions: RolePermission[] = [
  { role: "student", permissions: ["self:read", "self:write"] },
  { role: "teacher", permissions: ["self:read", "self:write", "students:read", "reports:create"] },
  { role: "moderator", permissions: ["reports:read", "reports:write", "content:flag", "users:suspend"] },
  { role: "school_admin", permissions: ["school:users:read", "school:analytics:read"] },
  { role: "super_admin", permissions: ["*"] },
];

export const withdrawalRequests: WithdrawalRequest[] = [
  { id: "w1", userName: "Amaka Johnson", coins: 6000, method: "premium_credit", status: "pending", requestedAt: "2026-07-16T10:00:00Z" },
  { id: "w2", userName: "Tunde Bakare", coins: 900, method: "store_item", status: "approved", requestedAt: "2026-07-15T09:00:00Z" },
  { id: "w3", userName: "Fatima Yusuf", coins: 350, method: "store_item", status: "rejected", requestedAt: "2026-06-02T09:00:00Z" },
];
