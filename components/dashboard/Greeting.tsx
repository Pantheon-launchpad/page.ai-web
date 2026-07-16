import { pickGreeting, student } from "@/lib/dashboard-data";

export default function Greeting() {
  const greeting = pickGreeting();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
        {greeting.text}, {student.name} 👋
      </h1>
      <p className="mt-1.5 text-sm text-ink-soft">
        Let&apos;s pick up right where you left off.
      </p>
    </div>
  );
}
