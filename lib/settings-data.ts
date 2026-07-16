export const downloadedItems = [
  { id: "d1", name: "Physics — Full Subject", size: 340, type: "Subject" },
  { id: "d2", name: "Chemistry — Full Subject", size: 295, type: "Subject" },
  { id: "d3", name: "Biology — Full Subject", size: 410, type: "Subject" },
  { id: "d4", name: "WAEC Physics Past Questions 2019–2023", size: 62, type: "Resource" },
  { id: "d5", name: "AI Tutor Model", size: 890, type: "Model" },
];

export const storageTotalMB = 4096;

export const premiumFeatures = {
  free: ["3 subjects downloaded at once", "50 AI Tutor questions / day", "Basic analytics", "Community support"],
  premium: [
    "Unlimited subjects, fully offline",
    "Unlimited AI Tutor & Chat with Book",
    "Full analytics + weak-area detection",
    "Unlimited CBT & mock exams",
    "Priority support",
  ],
};

export const helpFaqs = [
  {
    q: "Does the AI tutor really work with no internet?",
    a: "Yes — once a subject and the AI model are downloaded, everything runs on your device. Tutoring, quizzes, and Chat with Book all work with zero connection.",
  },
  {
    q: "How do I free up storage?",
    a: "Go to Downloads and remove any subject or resource you're not actively using. You can always redownload it later without losing your progress or mastery.",
  },
  {
    q: "Why did my streak reset?",
    a: "Streaks count consecutive days with at least one completed practice session or lesson. Missing a full day resets the streak — Premium plans include one streak freeze per month.",
  },
  {
    q: "How does the AI decide what to recommend?",
    a: "It looks at your recent accuracy, topics you've flagged as difficult, and how close you are to mastering something — then prioritises whichever will move the needle fastest.",
  },
  {
    q: "Can I use Page.AI on more than one device?",
    a: "Yes, your account and progress sync whenever you're online. Downloaded content itself needs to be downloaded separately on each device to work offline.",
  },
];
