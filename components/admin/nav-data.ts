import type { IconName } from "@/components/dashboard/icons";

export const adminNavItems: { label: string; href: string; icon: IconName }[] = [
  { label: "Dashboard", href: "/admin", icon: "home" },
  { label: "Users", href: "/admin/users", icon: "users" },
  { label: "Content", href: "/admin/content", icon: "book" },
  { label: "Moderation", href: "/admin/moderation", icon: "weak" },
  { label: "Rewards", href: "/admin/rewards", icon: "coin" },
  { label: "Analytics", href: "/admin/analytics", icon: "chart" },
  { label: "Platform", href: "/admin/platform", icon: "settings" },
];
