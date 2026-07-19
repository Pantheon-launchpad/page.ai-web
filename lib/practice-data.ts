export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  id: string;
  subject: string;
  topic: string;
  difficulty: Difficulty;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  misconception: string;
  memoryHook: string;
  relatedConcepts: string[];
};

export const questionBank: Question[] = [
  {
    id: "q1",
    subject: "Physics",
    topic: "Waves",
    difficulty: "medium",
    prompt: "A wave has a frequency of 50 Hz and a wavelength of 4 m. What is its speed?",
    options: ["12.5 m/s", "54 m/s", "200 m/s", "0.08 m/s"],
    correctIndex: 2,
    explanation:
      "Wave speed = frequency × wavelength. Here that's 50 Hz × 4 m = 200 m/s. The units work out too: Hz (1/s) × m gives m/s, which confirms speed is the right kind of quantity.",
    misconception: "It's easy to divide instead of multiply, mixing up the wave equation with the period formula (T = 1/f).",
    memoryHook: "Think 'v = f λ' as 'very fast lightning' - speed equals frequency times wavelength.",
    relatedConcepts: ["Wave speed formula", "Period and frequency", "Transverse vs longitudinal waves"],
  },
  {
    id: "q2",
    subject: "Physics",
    topic: "Waves",
    difficulty: "easy",
    prompt: "Which type of wave requires a medium to travel through?",
    options: ["Light waves", "Radio waves", "Sound waves", "X-rays"],
    correctIndex: 2,
    explanation:
      "Sound is a mechanical wave - it travels by vibrating particles in a medium (air, water, solids), so it can't cross a vacuum. Light, radio waves and X-rays are all electromagnetic and travel fine through empty space.",
    misconception: "Students often assume all waves behave like light, since light is the most familiar example.",
    memoryHook: "No air, no sound - that's why explosions in space are silent in real physics (not in movies).",
    relatedConcepts: ["Mechanical vs electromagnetic waves", "Vacuum propagation", "Sound intensity"],
  },
  {
    id: "q3",
    subject: "Chemistry",
    topic: "Bonding",
    difficulty: "medium",
    prompt: "Which of these best describes a covalent bond?",
    options: [
      "Transfer of electrons between atoms",
      "Sharing of electron pairs between atoms",
      "Attraction between a metal and a non-metal ion",
      "A bond that only forms in metals",
    ],
    correctIndex: 1,
    explanation:
      "Covalent bonds form when two atoms - usually non-metals - share one or more pairs of electrons so both get a fuller outer shell. This is different from ionic bonding, which involves a full transfer of electrons.",
    misconception: "Mixing up 'sharing' (covalent) with 'transferring' (ionic) is the most common slip on this topic.",
    memoryHook: "Co-valent = 'co-operating' on electrons, like sharing a textbook between two students.",
    relatedConcepts: ["Ionic bonding", "Electronegativity", "Molecular shapes"],
  },
  {
    id: "q4",
    subject: "Chemistry",
    topic: "Periodic Table",
    difficulty: "easy",
    prompt: "As you move across Period 3 from left to right, atomic radius generally:",
    options: ["Increases", "Decreases", "Stays the same", "Increases then decreases sharply"],
    correctIndex: 1,
    explanation:
      "Across a period, protons increase but electrons are added to the same shell, so the nucleus pulls the electron cloud in tighter. That's why atomic radius shrinks left to right.",
    misconception: "Some students assume more electrons always means a bigger atom, ignoring the stronger nuclear pull.",
    memoryHook: "More protons = stronger pull = tighter hug on the same shell of electrons.",
    relatedConcepts: ["Nuclear charge", "Ionisation energy trend", "Electron shielding"],
  },
  {
    id: "q5",
    subject: "Biology",
    topic: "Cell Biology",
    difficulty: "easy",
    prompt: "Which organelle is primarily responsible for producing ATP in a cell?",
    options: ["Ribosome", "Golgi apparatus", "Mitochondrion", "Nucleus"],
    correctIndex: 2,
    explanation:
      "Mitochondria carry out aerobic respiration, converting glucose and oxygen into ATP - the cell's usable energy currency. That's why they're nicknamed the 'powerhouse of the cell'.",
    misconception: "Students sometimes confuse the nucleus (control centre) with the mitochondrion (energy centre).",
    memoryHook: "Mito = 'motor' - the organelle that powers everything else the cell does.",
    relatedConcepts: ["Aerobic respiration", "ATP", "Cell organelles"],
  },
  {
    id: "q6",
    subject: "Biology",
    topic: "Genetics",
    difficulty: "medium",
    prompt: "In a monohybrid cross Aa × Aa, what fraction of offspring is expected to be homozygous?",
    options: ["1/4", "1/2", "3/4", "0"],
    correctIndex: 1,
    explanation:
      "A Punnett square for Aa × Aa gives AA : Aa : Aa : aa. AA and aa are homozygous (2 out of 4), so that's 1/2 - even though only 1/4 are homozygous dominant and 1/4 homozygous recessive.",
    misconception: "It's common to only count AA (1/4) and forget aa is homozygous too, missing the full 1/2.",
    memoryHook: "Homozygous = 'same letters twice' - count both AA and aa, not just one.",
    relatedConcepts: ["Punnett squares", "Dominant vs recessive alleles", "Genotype vs phenotype"],
  },
  {
    id: "q7",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    difficulty: "medium",
    prompt: "What are the roots of x² − 5x + 6 = 0?",
    options: ["x = 1, 6", "x = 2, 3", "x = −2, −3", "x = 2, −3"],
    correctIndex: 1,
    explanation:
      "Factorise: x² − 5x + 6 = (x − 2)(x − 3), giving x = 2 or x = 3. Check: 2 × 3 = 6 (the constant) and 2 + 3 = 5 (matches the middle term's coefficient with a flipped sign).",
    misconception: "Sign errors are the usual trap - forgetting that the factors' sum should equal −(−5) = 5, not −5.",
    memoryHook: "Find two numbers that multiply to the last term and add to the middle term's opposite.",
    relatedConcepts: ["Factorisation", "The quadratic formula", "Sum and product of roots"],
  },
  {
    id: "q8",
    subject: "Mathematics",
    topic: "Trigonometry",
    difficulty: "hard",
    prompt: "If sin θ = 3/5 and θ is acute, what is cos θ?",
    options: ["3/5", "4/5", "5/4", "5/3"],
    correctIndex: 1,
    explanation:
      "Using a 3-4-5 right triangle: if the opposite side is 3 and the hypotenuse is 5, the adjacent side is √(5² − 3²) = 4, by Pythagoras. So cos θ = adjacent/hypotenuse = 4/5.",
    misconception: "Some students just swap the given fraction (5/3) instead of finding the missing side with Pythagoras.",
    memoryHook: "SOH-CAH-TOA - sin gave you opposite/hypotenuse, so build the triangle to get cos from adjacent/hypotenuse.",
    relatedConcepts: ["Pythagorean identity", "SOH-CAH-TOA", "Special triangles"],
  },
  {
    id: "q9",
    subject: "English",
    topic: "Comprehension",
    difficulty: "easy",
    prompt: "Which word is a synonym for 'meticulous'?",
    options: ["Careless", "Thorough", "Hurried", "Vague"],
    correctIndex: 1,
    explanation:
      "'Meticulous' describes someone who pays very close attention to detail - 'thorough' captures that same precision and care.",
    misconception: "It's sometimes confused with 'busy' or 'quick', which don't relate to precision at all.",
    memoryHook: "Meticulous sounds like 'metal-ticulous' - as precise and exact as a finely machined metal part.",
    relatedConcepts: ["Synonyms and antonyms", "Context clues", "Vocabulary in use"],
  },
  {
    id: "q10",
    subject: "English",
    topic: "Grammar",
    difficulty: "medium",
    prompt: "Choose the correctly punctuated sentence.",
    options: [
      "Its going to rain, bring an umbrella.",
      "It's going to rain; bring an umbrella.",
      "Its' going to rain bring an umbrella.",
      "It is going to rain, bring, an umbrella.",
    ],
    correctIndex: 1,
    explanation:
      "\"It's\" is the contraction of 'it is', and a semicolon correctly joins two related independent clauses without a conjunction.",
    misconception: "Mixing up 'its' (possessive) and 'it's' (it is) is one of the most common grammar slips in English.",
    memoryHook: "If you can replace it with 'it is' and the sentence still makes sense, use the apostrophe.",
    relatedConcepts: ["Apostrophes", "Semicolons vs commas", "Independent clauses"],
  },
];

export const subjectList = ["Physics", "Chemistry", "Biology", "Mathematics", "English"];

export function questionsFor({
  subject,
  topic,
  difficulty,
}: {
  subject?: string;
  topic?: string;
  difficulty?: Difficulty | "adaptive";
}) {
  return questionBank.filter((q) => {
    if (subject && subject !== "All subjects" && q.subject !== subject) return false;
    if (topic && topic !== "All topics" && q.topic !== topic) return false;
    if (difficulty && difficulty !== "adaptive" && q.difficulty !== difficulty) return false;
    return true;
  });
}

export function topicsFor(subject: string) {
  return Array.from(new Set(questionBank.filter((q) => q.subject === subject).map((q) => q.topic)));
}

// --- CBT / Mock exam configs -------------------------------------------

export type ExamConfig = {
  id: string;
  title: string;
  subject: string;
  board: "WAEC" | "JAMB" | "Mock";
  durationMinutes: number;
  questionCount: number;
  hasCalculator: boolean;
};

export const cbtPapers: ExamConfig[] = [
  { id: "waec-physics", title: "WAEC Physics", subject: "Physics", board: "WAEC", durationMinutes: 40, questionCount: 2, hasCalculator: true },
  { id: "waec-chemistry", title: "WAEC Chemistry", subject: "Chemistry", board: "WAEC", durationMinutes: 40, questionCount: 2, hasCalculator: true },
  { id: "jamb-biology", title: "JAMB Biology", subject: "Biology", board: "JAMB", durationMinutes: 35, questionCount: 2, hasCalculator: false },
  { id: "jamb-mathematics", title: "JAMB Mathematics", subject: "Mathematics", board: "JAMB", durationMinutes: 45, questionCount: 2, hasCalculator: true },
  { id: "waec-english", title: "WAEC English Language", subject: "English", board: "WAEC", durationMinutes: 30, questionCount: 2, hasCalculator: false },
];

export const mockExams: ExamConfig[] = [
  { id: "jamb-full-mock", title: "JAMB Full Mock - 4 Subjects", subject: "All subjects", board: "Mock", durationMinutes: 60, questionCount: 8, hasCalculator: true },
  { id: "waec-trial-sciences", title: "WAEC Trial - Sciences", subject: "Physics", board: "Mock", durationMinutes: 50, questionCount: 6, hasCalculator: true },
  { id: "waec-trial-arts", title: "WAEC Trial - English & Comprehension", subject: "English", board: "Mock", durationMinutes: 40, questionCount: 4, hasCalculator: false },
];
