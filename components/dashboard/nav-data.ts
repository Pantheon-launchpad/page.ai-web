import type { IconName } from "./icons";

export type NavItem = {
  label: string;
  href: string;
  icon: IconName;
  soon?: boolean;
};

export type NavSection = {
  label: string;
  items: NavItem[];
  collapsible?: boolean;
};

export const navSections: NavSection[] = [
  {
    label: "Home",
    items: [{ label: "Dashboard", href: "/dashboard", icon: "home" }],
  },
  {
    label: "Learn",
    items: [
      { label: "Subjects", href: "/subjects", icon: "book" },
      { label: "Resource Library", href: "/resources", icon: "library" },
      { label: "AI Tutor", href: "/ai-tutor", icon: "tutor" },
      { label: "Chat with Book", href: "/chat-with-book", icon: "chat" },
      { label: "Flashcards", href: "/flashcards", icon: "flashcard" },
      { label: "Study Planner", href: "/planner", icon: "planner" },
    ],
  },
  {
    label: "Practice",
    items: [
      { label: "Practice Mode", href: "/practice", icon: "target" },
      { label: "CBT Exams", href: "/cbt", icon: "exam" },
      { label: "Mock Exams", href: "/mock-exams", icon: "mockExam" },
      { label: "Mistake Book", href: "/mistakes", icon: "mistake" },
    ],
  },
  {
    label: "Progress",
    items: [
      { label: "Analytics", href: "/analytics", icon: "chart" },
      { label: "Weak Areas", href: "/weak-areas", icon: "weak" },
      { label: "Achievements", href: "/achievements", icon: "trophy" },
      { label: "Streaks", href: "/streaks", icon: "flame" },
      { label: "Learning History", href: "/history", icon: "history" },
    ],
  },
  {
    label: "Lumo",
    collapsible: true,
    items: [
      { label: "Lumo Home", href: "/lumo", icon: "lumo" },
      { label: "Customize Lumo", href: "/lumo/customize", icon: "wand", soon: true },
      { label: "Lumo Collection", href: "/lumo/collection", icon: "gift", soon: true },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Study Groups", href: "/community/study-groups", icon: "users", soon: true },
      { label: "Leaderboards", href: "/community/leaderboards", icon: "leaderboard", soon: true },
      { label: "Classroom", href: "/community/classroom", icon: "classroom", soon: true },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Profile", href: "/profile", icon: "profile" },
      { label: "Downloads", href: "/downloads", icon: "download" },
      { label: "Premium", href: "/premium", icon: "crown" },
      { label: "Settings", href: "/settings", icon: "settings" },
      { label: "Help", href: "/help", icon: "help" },
    ],
  },
  {
    label: "Earn",
    items: [{ label: "Earn", href: "/earn", icon: "coin" }],
  },
];

export const builtRoutes = new Set([
  "/dashboard",
  "/earn",
  "/subjects",
  "/resources",
  "/ai-tutor",
  "/chat-with-book",
  "/flashcards",
  "/planner",
  "/practice",
  "/cbt",
  "/mock-exams",
  "/mistakes",
  "/analytics",
  "/weak-areas",
  "/achievements",
  "/streaks",
  "/history",
  "/profile",
  "/downloads",
  "/premium",
  "/settings",
  "/help",
]);
