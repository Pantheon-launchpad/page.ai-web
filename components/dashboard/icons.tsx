export type IconName =
  | "home"
  | "book"
  | "library"
  | "tutor"
  | "chat"
  | "flashcard"
  | "planner"
  | "target"
  | "exam"
  | "mockExam"
  | "mistake"
  | "chart"
  | "weak"
  | "trophy"
  | "flame"
  | "history"
  | "lumo"
  | "wand"
  | "gift"
  | "users"
  | "leaderboard"
  | "classroom"
  | "profile"
  | "download"
  | "crown"
  | "settings"
  | "help"
  | "arrowRight"
  | "play"
  | "clock"
  | "bolt"
  | "sparkle"
  | "signal"
  | "mic"
  | "debate"
  | "search"
  | "filter"
  | "pdf"
  | "bookmark"
  | "send"
  | "check"
  | "calendar"
  | "star"
  | "mail"
  | "lock"
  | "eye"
  | "eyeOff"
  | "shuffle"
  | "refresh"
  | "layers"
  | "story"
  | "calculator"
  | "flag"
  | "grid"
  | "lightbulb"
  | "link"
  | "close"
  | "dice"
  | "sun"
  | "moon"
  | "coin"
  | "share"
  | "qrcode"
  | "wallet"
  | "cloud";

const paths: Record<IconName, string> = {
  home: "M4 11.5 12 4l8 7.5M6 9.5V20h5v-5.5h2V20h5V9.5",
  book: "M5 4.5A1.5 1.5 0 0 1 6.5 3H19v16.5a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 19V4.5ZM8 3v17",
  library: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z",
  tutor: "M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 1 1-4.05-7.5L21 3l-1 4.5A8.96 8.96 0 0 1 21 12Z",
  chat: "M4 4h16v12H8l-4 4V4Z",
  flashcard: "M4 7a2 2 0 0 1 2-2h9l5 5v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7ZM15 5v5h5",
  planner: "M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.5ZM4 10h16M8 3v4M16 3v4",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  exam: "M9 12.75 11.25 15 15 9.75M5 4.5A1.5 1.5 0 0 1 6.5 3H19v16.5a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 19V4.5Z",
  mockExam: "M4 6.5A1.5 1.5 0 0 1 5.5 5H16l4 4v9a1 1 0 0 1-1 1H5.5A1.5 1.5 0 0 1 4 17.5V6.5ZM16 5v4h4M9 13h6M9 16h4",
  mistake: "M12 3 2 20h20L12 3ZM12 10v4M12 17h.01",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  weak: "M12 9v4M12 16.5h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.75 3h15.1a2 2 0 0 0 1.75-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
  trophy: "M8 4h8v4a4 4 0 0 1-8 0V4ZM8 5H5a3 3 0 0 0 3 5M16 5h3a3 3 0 0 1-3 5M10 15v2a2 2 0 0 1-2 2H7v2h10v-2h-1a2 2 0 0 1-2-2v-2",
  flame: "M12 2c2 3 5 6 5 10a5 5 0 0 1-10 0c0-1.4.6-2.6 1.3-3.7C9 10 9.5 11 10.5 11c1 0 1-1.2.5-2.3C10.2 6.9 10 4.4 12 2Z",
  history: "M4 12a8 8 0 1 0 2.5-5.8M4 4v5h5M12 8v4l3 2",
  lumo: "M12 3C8 3 5 6 5 9.8c0 2.4 1.3 4.3 3 5.6V18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.6c1.7-1.3 3-3.2 3-5.6C19 6 16 3 12 3ZM9.5 21h5",
  wand: "M4 20 15 9M17 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1ZM6 15l.7 1.3L8 17l-1.3.7L6 19l-.7-1.3L4 17l1.3-.7Z",
  gift: "M4 9h16v11H4V9ZM2 6h20v3H2V6ZM12 6v14M12 6C10.5 6 8 5.2 8 3.3 8 2 9 1.5 10 2c1.2.6 2 2.2 2 4ZM12 6c1.5 0 4-.8 4-2.7 0-1.3-1-1.8-2-1.3-1.2.6-2 2.2-2 4Z",
  users: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 21c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a3 3 0 1 0 0-6M15 21c0-2.6-.9-4.8-2.5-6.2M21 21c0-2.8-1.8-5.1-4-5.8",
  leaderboard: "M5 20V11M12 20V4M19 20v-7",
  classroom: "M3 5h18v11H3V5ZM8 21h8M12 16v5",
  profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c1.3-3.8 4.4-6 8-6s6.7 2.2 8 6",
  download: "M12 3v12m0 0-4-4m4 4 4-4M5 21h14",
  crown: "M4 9l3.5 3L12 6l4.5 6L20 9l-1.5 9h-13L4 9ZM6.5 21h11",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1Z",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 1.9-2.4 3.4M12 17h.01",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  play: "M7 5v14l12-7L7 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3.5 2",
  bolt: "M13 2 3 14h7l-1 8 10-12h-7l1-8Z",
  sparkle: "M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3ZM19 15l.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2Z",
  signal: "M4 20V14M10 20V9M16 20v-9M22 20V4",
  mic: "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3ZM6 11a6 6 0 0 0 12 0M12 19v3",
  debate: "M8 10h.01M12 10h.01M16 10h.01M4 4h11v9H8l-4 4V4ZM20 9v11l-4-4h-3V9h7Z",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  filter: "M4 5h16M7 12h10M10 19h4",
  pdf: "M6 3h9l5 5v13H6V3ZM15 3v5h5M9 13h1.5a1.5 1.5 0 0 1 0 3H9v3M13.5 13v6h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-1Z",
  bookmark: "M6 3.5h12V21l-6-4-6 4V3.5Z",
  send: "M4 20l16-8L4 4l2 8-2 8Zm2-8h9",
  check: "M20 6 9 17l-5-5",
  calendar: "M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6.5ZM4 10h16M8 3v4M16 3v4",
  star: "m12 3 2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8L12 3Z",
  mail: "M4 5.5h16v13H4v-13ZM4.3 6l7.7 6 7.7-6",
  lock: "M6 11V8a6 6 0 0 1 12 0v3M5 11h14v10H5V11ZM12 15v3",
  eye: "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  eyeOff: "M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M6.5 6.7C4 8.3 2.5 12 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.2-1M9.9 5.6c.7-.1 1.4-.1 2.1-.1 6 0 9.5 6.5 9.5 6.5S20.4 15 18 16.9",
  shuffle: "M4 6h3.5l9 12H20M4 18h3.5l2.5-3.3M16 6h4v4M20 6l-4.5 6M16 18h4v-4",
  refresh: "M4 12a8 8 0 0 1 13.7-5.7L20 8M20 4v4h-4M20 12a8 8 0 0 1-13.7 5.7L4 16M4 20v-4h4",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 12l9 5 9-5M3 16l9 5 9-5",
  story: "M5 4h11l3 3v13H5V4ZM8 9h8M8 13h8M8 17h5",
  calculator: "M6 3h12v18H6V3ZM8 6.5h8M8 10h1.5M11.75 10h1.5M15.5 10H17M8 13h1.5M11.75 13h1.5M15.5 13H17M8 16h1.5M11.75 16h1.5M15.5 16H17",
  flag: "M6 3v18M6 4h11l-2.5 4L17 12H6",
  grid: "M4 4h6v6H4V4ZM14 4h6v6h-6V4ZM4 14h6v6H4v-6ZM14 14h6v6h-6v-6Z",
  lightbulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9v.2h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z",
  link: "M9.5 14.5 14.5 9.5M8 17 5.5 19.5a3 3 0 0 1-4.2-4.2L4 12.8M16 7l2.5-2.5a3 3 0 0 1 4.2 4.2L20 11.2",
  close: "M6 6l12 12M18 6 6 18",
  dice: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM8 8h.01M16 8h.01M8 16h.01M16 16h.01M12 12h.01",
  sun: "M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4 4.2 19.8M19.8 4.2l-1.4 1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  moon: "M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z",
  coin: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v10M9.5 9.2c0-1.1 1-1.7 2.5-1.7s2.5.7 2.5 1.6c0 2.2-5 1-5 3.2 0 .9 1 1.7 2.5 1.7s2.5-.6 2.5-1.7",
  share: "M6 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.5 10.5l7-4.5M8.5 13.5l7 4.5",
  qrcode: "M4 4h6v6H4V4ZM14 4h6v6h-6V4ZM4 14h6v6H4v-6ZM15 15h2v2h-2zM19 15h1.5v1.5H19zM15 19h1.5v1.5H15zM17.5 17.5H19V19h-1.5z",
  wallet: "M4 7.5A2.5 2.5 0 0 1 6.5 5H18a1 1 0 0 1 1 1v1H6.5a1.5 1.5 0 0 0 0 3H19a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 1 4 16.5v-9ZM17 13.5h.01",
  cloud: "M7 18a4.5 4.5 0 0 1-.6-8.96A5.5 5.5 0 0 1 17.4 8.1 4 4 0 0 1 17 16H7Z",
};

export function Icon({
  name,
  className = "",
  strokeWidth = 1.7,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
