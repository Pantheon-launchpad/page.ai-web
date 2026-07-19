import { subjects } from "./learn-data";

// --- Analytics --------------------------------------------------------------

// 12 weeks x 7 days of study intensity, 0-4
export const heatmap: number[][] = Array.from({ length: 12 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const seed = (w * 7 + d * 13) % 9;
    if (seed < 2) return 0;
    if (seed < 4) return 1;
    if (seed < 6) return 2;
    if (seed < 8) return 3;
    return 4;
  })
);

export const analyticsSummary = {
  timeStudiedHours: 102.5,
  accuracy: 74,
  consistency: 82,
  avgMastery: 65,
};

// last 8 weeks accuracy trend
export const learningTrend = [58, 61, 60, 65, 68, 70, 72, 74];

export const topicPerformance = [
  { topic: "Waves", subject: "Physics", mastery: 74 },
  { topic: "Chemical Bonding", subject: "Chemistry", mastery: 52 },
  { topic: "Cell Biology", subject: "Biology", mastery: 81 },
  { topic: "Quadratic Equations", subject: "Mathematics", mastery: 60 },
  { topic: "Comprehension", subject: "English", mastery: 70 },
  { topic: "Genetics", subject: "Biology", mastery: 47 },
];

export const subjectDistribution = subjects.map((s) => ({
  name: s.name,
  color: s.color,
  hours: s.hoursSpent,
}));

// --- Weak areas --------------------------------------------------------------

export const weakAreas = [
  {
    subject: "Chemistry",
    topic: "Chemical Bonding",
    mastery: 52,
    note: "You've missed 3 of the last 5 questions on covalent vs ionic bonding.",
  },
  {
    subject: "Biology",
    topic: "Genetics",
    mastery: 47,
    note: "Punnett square ratios are the recurring miss - especially homozygous counts.",
  },
  {
    subject: "Geography",
    topic: "Climate Zones",
    mastery: 38,
    note: "Barely started - this topic is dragging your Geography average down.",
  },
  {
    subject: "Mathematics",
    topic: "Trigonometry",
    mastery: 55,
    note: "Right-triangle identities need another pass before your next mock.",
  },
];

// --- Achievements -------------------------------------------------------------

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: "flame" | "trophy" | "star" | "target" | "book" | "bolt" | "sparkle" | "crown";
  earned: boolean;
  progress?: number;
};

export const achievements: Achievement[] = [
  { id: "a1", title: "First Steps", description: "Complete your first practice session", icon: "target", earned: true },
  { id: "a2", title: "Week One", description: "Maintain a 7-day streak", icon: "flame", earned: true },
  { id: "a3", title: "Bookworm", description: "Read 10 resources from the library", icon: "book", earned: true },
  { id: "a4", title: "Sharp Shooter", description: "Score 100% on a practice session", icon: "star", earned: true },
  { id: "a5", title: "Night Owl", description: "Study after 10pm five times", icon: "sparkle", earned: false, progress: 60 },
  { id: "a6", title: "Marathoner", description: "Maintain a 30-day streak", icon: "flame", earned: false, progress: 30 },
  { id: "a7", title: "CBT Champion", description: "Score 90%+ on a full mock exam", icon: "trophy", earned: false, progress: 45 },
  { id: "a8", title: "Levelled Up", description: "Reach Level 20", icon: "crown", earned: false, progress: 60 },
  { id: "a9", title: "Lightning Fast", description: "Answer 20 questions in under 5 minutes", icon: "bolt", earned: false, progress: 80 },
];

// --- Streaks --------------------------------------------------------------

export const streakDays = ["S", "M", "T", "W", "T", "F", "S"];
// 4 weeks x 7 days, true = studied
export const streakHistory: boolean[][] = [
  [true, true, true, true, true, false, true],
  [true, true, false, true, true, true, true],
  [false, true, true, true, true, true, true],
  [true, true, true, true, true, true, true],
];

export const streakStats = {
  current: 9,
  longest: 21,
  totalActiveDays: 96,
};

// --- Learning history -----------------------------------------------------

export const learningHistory = [
  { id: "h1", group: "Today", label: "Completed Physics practice - 5 questions", meta: "80% accuracy", icon: "target" as const, time: "2:40 PM" },
  { id: "h2", group: "Today", label: "Reviewed Waves & Optics flashcards", meta: "12 cards", icon: "flashcard" as const, time: "11:15 AM" },
  { id: "h3", group: "Yesterday", label: "Completed WAEC Chemistry CBT mock", icon: "exam" as const, meta: "68% score", time: "6:05 PM" },
  { id: "h4", group: "Yesterday", label: "Chatted with Physics textbook about Waves", icon: "chat" as const, meta: "18 messages", time: "4:30 PM" },
  { id: "h5", group: "This week", label: "Completed Biology practice - 8 questions", icon: "target" as const, meta: "88% accuracy", time: "Mon" },
  { id: "h6", group: "This week", label: "Unlocked achievement: Sharp Shooter", icon: "star" as const, meta: "100% score", time: "Mon" },
  { id: "h7", group: "Earlier", label: "Started Geography - Climate Zones", icon: "book" as const, meta: "New topic", time: "3 Jul" },
];
