"use client";

import { useId, useState } from "react";
import { Icon, type IconName } from "@/components/dashboard/icons";

export default function AuthInput({
  label,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  autoComplete,
  error,
}: {
  label: string;
  type?: "text" | "email" | "password";
  icon: IconName;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
}) {
  const id = useId();
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-ink-soft">
        {label}
      </label>
      <div className="relative">
        <Icon name={icon} className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          id={id}
          type={isPassword && reveal ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-xl border bg-surface-1 py-2.5 pl-10 text-sm text-ink placeholder:text-ink-faint focus:outline-none ${
            isPassword ? "pr-10" : "pr-4"
          } ${error ? "border-ember/50 focus:border-ember" : "border-ink/10 focus:border-signal/40"}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setReveal((v) => !v)}
            aria-label={reveal ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink-soft"
          >
            <Icon name={reveal ? "eyeOff" : "eye"} className="h-4 w-4" />
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-ember">{error}</p>}
    </div>
  );
}
