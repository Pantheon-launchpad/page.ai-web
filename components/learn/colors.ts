export type AccentColor = "signal" | "ember" | "moss";

export const accent: Record<AccentColor, { soft: string; text: string; bar: string; border: string }> = {
  signal: { soft: "bg-signal-soft", text: "text-signal-deep", bar: "bg-signal", border: "border-signal/25" },
  ember: { soft: "bg-ember-soft", text: "text-ember", bar: "bg-ember", border: "border-ember/25" },
  moss: { soft: "bg-moss-soft", text: "text-moss", bar: "bg-moss", border: "border-moss/25" },
};
