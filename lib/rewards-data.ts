export type Mission = {
  id: string;
  label: string;
  description: string;
  icon: "target" | "book" | "flame" | "chat" | "mistake" | "exam" | "flashcard" | "planner";
  reward: number;
  progress: number;
  goal: number;
  href: string;
};

export const dailyMissions: Mission[] = [
  { id: "m1", label: "Practice for 30 minutes", description: "Any subject, any mode.", icon: "target", reward: 40, progress: 18, goal: 30, href: "/practice" },
  { id: "m2", label: "Finish one topic", description: "Complete every question in a topic.", icon: "book", reward: 60, progress: 0, goal: 1, href: "/subjects" },
  { id: "m3", label: "Maintain today's streak", description: "Just show up and study.", icon: "flame", reward: 20, progress: 1, goal: 1, href: "/dashboard" },
  { id: "m4", label: "Chat with your book", description: "Ask your textbook one real question.", icon: "chat", reward: 25, progress: 0, goal: 1, href: "/chat-with-book" },
  { id: "m5", label: "Review 5 mistakes", description: "Revisit questions you got wrong.", icon: "mistake", reward: 30, progress: 2, goal: 5, href: "/mistakes" },
  { id: "m6", label: "Complete one CBT exam", description: "Full timed paper, any subject.", icon: "exam", reward: 80, progress: 0, goal: 1, href: "/cbt" },
];

export const wallet = {
  todayCoins: 65,
  lifetimeCoins: 12480,
  pendingSync: 45,
  storeCredit: 4280,
};

export const recentRewards = [
  { id: "r1", label: "Completed Physics practice", coins: 40, time: "2h ago", icon: "target" as const },
  { id: "r2", label: "Maintained 9-day streak", coins: 20, time: "Today", icon: "flame" as const },
  { id: "r3", label: "Chatted with Biology textbook", coins: 25, time: "Yesterday", icon: "chat" as const },
  { id: "r4", label: "Friend joined with your code", coins: 200, time: "2 days ago", icon: "share" as const },
  { id: "r5", label: "Completed WAEC Chemistry CBT", coins: 80, time: "3 days ago", icon: "exam" as const },
];

export type StoreItem = {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: "crown" | "sparkle" | "flashcard" | "gift" | "book";
  comingSoon?: boolean;
};

// Every redemption stays inside the product - no cash, airtime, or other
// real-world payout. Coins buy time and content, not money.
export const storeItems: StoreItem[] = [
  { id: "s1", title: "1 Week of Premium", description: "Unlimited AI Tutor & full offline subjects.", cost: 1800, icon: "crown" },
  { id: "s2", title: "Bonus Mock Exam Pack", description: "5 extra full-length WAEC/JAMB mocks.", cost: 900, icon: "sparkle" },
  { id: "s3", title: "AI Flashcard Generator Credits", description: "Auto-generate 3 decks from any topic.", cost: 500, icon: "flashcard" },
  { id: "s4", title: "Lumo Outfit - Scholar Robes", description: "A cosmetic look for your companion.", cost: 350, icon: "gift" },
  { id: "s5", title: "Offline Past-Questions Bundle", description: "10 years of WAEC & JAMB papers, one subject.", cost: 700, icon: "book" },
  { id: "s6", title: "1 Month of Premium", description: "The full Page.AI experience, unlocked.", cost: 6000, icon: "crown", comingSoon: true },
];

export const coinsByCategory = [
  { name: "Study rewards", color: "signal" as const, coins: 7800 },
  { name: "Streak bonuses", color: "ember" as const, coins: 2100 },
  { name: "Referral rewards", color: "moss" as const, coins: 2580 },
];

export const transactions = [
  { id: "t1", label: "Physics practice session", type: "earned" as const, coins: 40, date: "Today, 2:40 PM" },
  { id: "t2", label: "Streak day 9", type: "earned" as const, coins: 20, date: "Today, 8:15 AM" },
  { id: "t3", label: "Redeemed: AI Flashcard Credits", type: "spent" as const, coins: -500, date: "Yesterday" },
  { id: "t4", label: "Chidinma joined with your code", type: "earned" as const, coins: 200, date: "2 days ago" },
  { id: "t5", label: "WAEC Chemistry CBT completed", type: "earned" as const, coins: 80, date: "3 days ago" },
  { id: "t6", label: "Redeemed: Bonus Mock Exam Pack", type: "spent" as const, coins: -900, date: "5 days ago" },
];

// --- Referrals ------------------------------------------------------------

export const referral = {
  code: "DAVID-4F82",
  link: "https://page.ai/join?ref=DAVID-4F82",
  totalReferrals: 14,
  activeReferrals: 9,
  coinsEarned: 2580,
  successfulInvites: 11,
  monthlyGoal: 15,
  monthlyProgress: 9,
  nextRewardAt: 10,
  nextRewardCoins: 300,
};

export const referralSteps = [
  { step: 1, title: "Invite a friend", description: "Share your code or link however you like." },
  { step: 2, title: "They create an account", description: "Takes about two minutes, no card required." },
  { step: 3, title: "They begin learning", description: "One completed lesson is all it takes." },
  { step: 4, title: "You both earn Page Coins", description: "Credited straight to your wallets." },
];

export const referralMilestones = [
  { id: "rm1", label: "Friend joins Page.AI", coins: 50 },
  { id: "rm2", label: "Friend completes their first lesson", coins: 100 },
  { id: "rm3", label: "Friend reaches Level 5", coins: 150 },
  { id: "rm4", label: "Friend completes a CBT exam", coins: 100 },
  { id: "rm5", label: "Friend upgrades to Premium", coins: 300 },
];

export const recentReferrals = [
  { id: "f1", name: "Chidinma A.", status: "Active learner", coins: 250, joined: "3 days ago" },
  { id: "f2", name: "Tunde O.", status: "Completed CBT", coins: 200, joined: "1 week ago" },
  { id: "f3", name: "Amaka N.", status: "Level 5 reached", coins: 300, joined: "2 weeks ago" },
  { id: "f4", name: "Ibrahim S.", status: "Just joined", coins: 50, joined: "Today" },
];
