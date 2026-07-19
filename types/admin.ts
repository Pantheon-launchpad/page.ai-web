import type { ID } from "./common";
import type { Role, User } from "./auth";

export interface AdminUser extends User {
  subjectsEnrolled: number;
  coinsBalance: number;
  streak: number;
}

export interface PlatformStat {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
}

export interface UsageDataPoint {
  label: string;
  value: number;
}

export type ReportStatus = "open" | "reviewing" | "resolved" | "dismissed";
export type ReportReason = "inappropriate_content" | "harassment" | "spam" | "cheating" | "bug" | "other";

export interface Report {
  id: ID;
  reason: ReportReason;
  status: ReportStatus;
  targetType: "user" | "resource" | "chat_message" | "flashcard" | "question";
  targetId: ID;
  reportedBy: string;
  createdAt: string;
  notes?: string;
}

export type ContentType = "subject" | "topic" | "question" | "resource" | "flashcard_deck";

export interface AdminContentItem {
  id: ID;
  type: ContentType;
  title: string;
  subject: string;
  status: "published" | "draft" | "flagged" | "archived";
  updatedAt: string;
  author: string;
}

export interface AuditLogEntry {
  id: ID;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
  ip?: string;
}

export interface FeatureFlag {
  id: ID;
  key: string;
  label: string;
  description: string;
  enabled: boolean;
  rolloutPercent: number;
}

export interface RolePermission {
  role: Role;
  permissions: string[];
}

export interface WithdrawalRequest {
  id: ID;
  userName: string;
  coins: number;
  method: "premium_credit" | "store_item";
  status: "pending" | "approved" | "rejected";
  requestedAt: string;
}

export interface SystemHealthMetric {
  label: string;
  status: "operational" | "degraded" | "down";
  latencyMs?: number;
  uptimePercent: number;
}
