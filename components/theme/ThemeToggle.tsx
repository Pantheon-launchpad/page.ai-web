"use client";

import { Icon, type IconName } from "@/components/dashboard/icons";
import { useTheme, type Theme } from "./ThemeProvider";

const options: { value: Theme; icon: IconName; label: string }[] = [
  { value: "light", icon: "sun", label: "Light" },
  { value: "soft", icon: "cloud", label: "Soft - low glare" },
  { value: "dark", icon: "moon", label: "Dark" },
];

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={`inline-flex items-center gap-0.5 rounded-full border border-ink/10 bg-surface-1 p-1 ${className}`}
    >
      {options.map((opt) => {
        const active = theme === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => setTheme(opt.value)}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              active
                ? "bg-signal text-white"
                : "text-ink-faint hover:bg-ink/5 hover:text-ink-soft"
            }`}
          >
            <Icon name={opt.icon} className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
