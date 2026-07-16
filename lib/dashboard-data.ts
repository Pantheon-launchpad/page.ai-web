export const student = {
  name: "David",
  initials: "D",
  xp: 4280,
  level: 12,
  xpIntoLevel: 640,
  xpForNextLevel: 1000,
  streak: 9,
  studyMinutesToday: 42,
  studyGoalMinutes: 60,
};

const greetings = [
  { text: "Bonjour", lang: "French" },
  { text: "Hola", lang: "Spanish" },
  { text: "Hello", lang: "English" },
  { text: "Ciao", lang: "Italian" },
  { text: "Habari", lang: "Swahili" },
  { text: "Konnichiwa", lang: "Japanese" },
  { text: "Namaste", lang: "Hindi" },
  { text: "Sannu", lang: "Hausa" },
  { text: "Ndewo", lang: "Igbo" },
  { text: "Bawo", lang: "Yoruba" },
];

// Deterministic "random" pick keyed to the day, so greeting stays put on
// re-renders but still rotates day to day.
export function pickGreeting(seed: number = new Date().getDate()) {
  return greetings[seed % greetings.length];
}

export const continueLearning = {
  subject: "Physics",
  topic: "Waves",
  progressPercent: 82,
  estimatedMinutesLeft: 14,
};

export const aiRecommendation = {
  message: "You've almost mastered Waves. Let's finish it today.",
  actionLabel: "Resume Waves",
  href: "/subjects",
};

export const recentActivity = [
  { id: 1, label: "Completed a Chemistry quiz", meta: "18/20 · Bonding", time: "2h ago", icon: "exam" as const },
  { id: 2, label: "Practised 12 Physics questions", meta: "Waves · Adaptive", time: "Yesterday", icon: "target" as const },
  { id: 3, label: "Chatted with Biology textbook", meta: "Photosynthesis", time: "Yesterday", icon: "chat" as const },
  { id: 4, label: "Reviewed 8 flashcards", meta: "English Grammar", time: "2 days ago", icon: "flashcard" as const },
];

export const upcomingRevision = [
  { id: 1, subject: "Mathematics", topic: "Quadratic Equations", due: "Due tomorrow" },
  { id: 2, subject: "Chemistry", topic: "Periodic Table", due: "Due in 3 days" },
  { id: 3, subject: "English", topic: "Comprehension", due: "Due in 5 days" },
];

export const quickActions = [
  { label: "Continue Learning", icon: "play" as const, href: "/dashboard" },
  { label: "Start Practice", icon: "target" as const, href: "/practice" },
  { label: "Take CBT", icon: "exam" as const, href: "/cbt" },
  { label: "Chat with Book", icon: "chat" as const, href: "/chat-with-book" },
  { label: "Ask AI", icon: "tutor" as const, href: "/ai-tutor" },
  { label: "Mistake Book", icon: "mistake" as const, href: "/mistakes" },
  { label: "Resource Library", icon: "library" as const, href: "/resources" },
];
