export type Subject = {
  id: string;
  name: string;
  icon: "book" | "target" | "chat" | "flashcard" | "sparkle" | "library";
  color: "signal" | "ember" | "moss";
  progress: number;
  mastery: number;
  topics: number;
  topicsDone: number;
  hoursSpent: number;
};

export const subjects: Subject[] = [
  { id: "physics", name: "Physics", icon: "target", color: "signal", progress: 68, mastery: 74, topics: 22, topicsDone: 15, hoursSpent: 19.5 },
  { id: "chemistry", name: "Chemistry", icon: "sparkle", color: "ember", progress: 41, mastery: 52, topics: 20, topicsDone: 8, hoursSpent: 11 },
  { id: "biology", name: "Biology", icon: "book", color: "moss", progress: 77, mastery: 81, topics: 24, topicsDone: 18, hoursSpent: 24 },
  { id: "mathematics", name: "Mathematics", icon: "target", color: "signal", progress: 55, mastery: 60, topics: 30, topicsDone: 16, hoursSpent: 27.5 },
  { id: "english", name: "English Language", icon: "chat", color: "ember", progress: 63, mastery: 70, topics: 18, topicsDone: 11, hoursSpent: 14 },
  { id: "geography", name: "Geography", icon: "library", color: "moss", progress: 30, mastery: 38, topics: 16, topicsDone: 5, hoursSpent: 6.5 },
];

export type ResourceType = "notes" | "past-questions" | "formula" | "definitions" | "reference" | "pdf" | "cheat-sheet";

export const resourceTypeLabels: Record<ResourceType, string> = {
  notes: "Curriculum Notes",
  "past-questions": "Past Questions",
  formula: "Formula Sheets",
  definitions: "Definitions",
  reference: "Reference Material",
  pdf: "PDFs",
  "cheat-sheet": "Cheat Sheets",
};

export type Resource = {
  id: string;
  title: string;
  subject: string;
  type: ResourceType;
  size: string;
  bookmarked: boolean;
};

export const resources: Resource[] = [
  { id: "r1", title: "Waves & Optics — Full Notes", subject: "Physics", type: "notes", size: "2.1 MB", bookmarked: true },
  { id: "r2", title: "WAEC Physics 2019–2023", subject: "Physics", type: "past-questions", size: "4.6 MB", bookmarked: false },
  { id: "r3", title: "Organic Chemistry Formula Sheet", subject: "Chemistry", type: "formula", size: "540 KB", bookmarked: true },
  { id: "r4", title: "Periodic Table & Trends", subject: "Chemistry", type: "cheat-sheet", size: "310 KB", bookmarked: false },
  { id: "r5", title: "Cell Biology Definitions", subject: "Biology", type: "definitions", size: "180 KB", bookmarked: false },
  { id: "r6", title: "JAMB Biology Past Questions", subject: "Biology", type: "past-questions", size: "3.8 MB", bookmarked: true },
  { id: "r7", title: "Quadratic Equations Reference", subject: "Mathematics", type: "reference", size: "260 KB", bookmarked: false },
  { id: "r8", title: "Trigonometry Formula Sheet", subject: "Mathematics", type: "formula", size: "220 KB", bookmarked: false },
  { id: "r9", title: "Comprehension & Summary Guide", subject: "English", type: "notes", size: "1.4 MB", bookmarked: false },
  { id: "r10", title: "WAEC English 2020 Past Paper", subject: "English", type: "pdf", size: "1.9 MB", bookmarked: false },
  { id: "r11", title: "Map Reading Cheat Sheet", subject: "Geography", type: "cheat-sheet", size: "410 KB", bookmarked: false },
  { id: "r12", title: "Climate Zones — Full Notes", subject: "Geography", type: "notes", size: "2.3 MB", bookmarked: false },
];

// --- AI Tutor -------------------------------------------------------------

export const tutorCapabilities = [
  { label: "Explain a topic", icon: "tutor" as const, prompt: "Explain Waves to me" },
  { label: "Simplify a topic", icon: "sparkle" as const, prompt: "Simplify Newton's Laws for me" },
  { label: "Summarise my notes", icon: "book" as const, prompt: "Summarise my Chemistry notes on bonding" },
  { label: "Generate a quiz", icon: "exam" as const, prompt: "Quiz me on Cell Biology" },
  { label: "Generate mnemonics", icon: "star" as const, prompt: "Give me a mnemonic for the noble gases" },
  { label: "Exam tips", icon: "target" as const, prompt: "Give me exam tips for WAEC Physics" },
];

export const tutorExamplePrompts = [
  "Practice me",
  "Teach me",
  "Challenge me",
  "Explain like I'm 12",
  "Explain with Nigerian examples",
  "Explain visually",
];

export const tutorCannedReplies: Record<string, string> = {
  default:
    "Good question. Let's slow down and take it one piece at a time — tell me what part is tripping you up and we'll rebuild it from there.",
  "explain waves to me":
    "Think of a wave as energy travelling through a medium without moving the medium itself — like a Mexican wave in a stadium. The seats (particles) stay put, but the wave races around. In Physics we care about two shapes: transverse (particles move perpendicular to travel, like light) and longitudinal (particles move along the direction of travel, like sound). Want me to break down amplitude, wavelength and frequency next?",
  "simplify newton's laws for me":
    "Three ideas, three sentences. First: things keep doing what they're doing unless something pushes them. Second: the harder you push something, the faster it speeds up — and heavier things need a harder push. Third: whenever you push something, it pushes back on you just as hard. Want an everyday example for each?",
  "quiz me on cell biology":
    "Let's go. Question 1 of 5: What organelle is known as the 'powerhouse of the cell', and why does that description actually undersell what it does?",
};

// --- Chat with Book --------------------------------------------------------

export type ChatSource = {
  id: string;
  title: string;
  subject: string;
  chapters: number;
};

export const chatSources: ChatSource[] = [
  { id: "physics-textbook", title: "New School Physics", subject: "Physics", chapters: 18 },
  { id: "chem-textbook", title: "Comprehensive Chemistry", subject: "Chemistry", chapters: 22 },
  { id: "bio-textbook", title: "Modern Biology", subject: "Biology", chapters: 26 },
  { id: "my-notes", title: "My Uploaded Notes — Waves.pdf", subject: "Physics", chapters: 1 },
];

export const bookPersonas = [
  { label: "Explain with football", icon: "target" as const },
  { label: "Explain with Nigerian examples", icon: "sparkle" as const },
  { label: "Become Einstein", icon: "profile" as const },
  { label: "Become my WAEC examiner", icon: "exam" as const },
  { label: "Tell me a story", icon: "story" as const },
  { label: "Only give hints", icon: "star" as const },
];

export const bookGameChips = [
  { label: "Teach Me Back", icon: "tutor" as const },
  { label: "Flash Quiz", icon: "bolt" as const },
  { label: "Lightning Round", icon: "flame" as const },
  { label: "Guess the Answer", icon: "target" as const },
  { label: "Turn this into a game", icon: "sparkle" as const },
];

// --- Flashcards -------------------------------------------------------------

export type Flashcard = { id: string; front: string; back: string };

export type FlashcardDeck = {
  id: string;
  title: string;
  subject: string;
  color: "signal" | "ember" | "moss";
  dueToday: number;
  total: number;
  cards: Flashcard[];
};

export const flashcardDecks: FlashcardDeck[] = [
  {
    id: "waves",
    title: "Waves & Optics",
    subject: "Physics",
    color: "signal",
    dueToday: 6,
    total: 24,
    cards: [
      { id: "c1", front: "What is the SI unit of frequency?", back: "Hertz (Hz) — one cycle per second." },
      { id: "c2", front: "Define wavelength.", back: "The distance between two consecutive identical points on a wave, e.g. crest to crest." },
      { id: "c3", front: "Speed of sound in air (approx.)", back: "About 343 m/s at room temperature." },
      { id: "c4", front: "What type of wave is light?", back: "A transverse electromagnetic wave — it doesn't need a medium to travel." },
    ],
  },
  {
    id: "bonding",
    title: "Chemical Bonding",
    subject: "Chemistry",
    color: "ember",
    dueToday: 4,
    total: 18,
    cards: [
      { id: "c1", front: "What is an ionic bond?", back: "An electrostatic attraction between oppositely charged ions, formed by electron transfer." },
      { id: "c2", front: "What is a covalent bond?", back: "A bond formed by two atoms sharing one or more pairs of electrons." },
      { id: "c3", front: "Give an example of a giant covalent structure.", back: "Diamond or graphite — both are forms of carbon." },
    ],
  },
  {
    id: "grammar",
    title: "English Grammar",
    subject: "English",
    color: "moss",
    dueToday: 0,
    total: 30,
    cards: [
      { id: "c1", front: "What is a transitive verb?", back: "A verb that takes a direct object, e.g. 'She read the book.'" },
      { id: "c2", front: "Name the 3 degrees of comparison.", back: "Positive, comparative, superlative — e.g. good, better, best." },
    ],
  },
];

// --- Study Planner -----------------------------------------------------------

export const weeklyPlan = [
  { day: "Mon", subject: "Physics", topic: "Waves", done: true },
  { day: "Tue", subject: "Chemistry", topic: "Bonding", done: true },
  { day: "Wed", subject: "Mathematics", topic: "Quadratics", done: false, today: true },
  { day: "Thu", subject: "Biology", topic: "Genetics", done: false },
  { day: "Fri", subject: "English", topic: "Comprehension", done: false },
  { day: "Sat", subject: "Geography", topic: "Climate", done: false },
  { day: "Sun", subject: "Rest day", topic: "Light review", done: false },
];

export const upcomingExams = [
  { id: "e1", name: "WAEC Mock — Physics", date: "3 Aug 2026", daysLeft: 18 },
  { id: "e2", name: "JAMB CBT — Full Mock", date: "22 Aug 2026", daysLeft: 37 },
  { id: "e3", name: "School Exam — Chemistry", date: "29 Jul 2026", daysLeft: 13 },
];

export const plannerRecommendations = [
  "You're behind on Geography — add one 20-minute session this week.",
  "Chemistry mastery jumped 8% this week. A short review would lock it in.",
  "Your best focus hours are 4–6pm. Planner shifted tomorrow's session there.",
];
