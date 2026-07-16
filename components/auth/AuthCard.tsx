export default function AuthCard({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="glass-card w-full max-w-[400px] rounded-3xl p-7 sm:p-8">
      <div className="font-mono text-[11px] uppercase tracking-wider text-signal">{eyebrow}</div>
      <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-1.5 text-sm text-ink-soft">{description}</p>

      <div className="mt-6">{children}</div>

      <p className="mt-6 text-center text-sm text-ink-soft">{footer}</p>
    </div>
  );
}
