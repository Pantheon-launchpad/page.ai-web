export default function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="font-display text-[1.05rem] font-semibold text-ink">{title}</h3>
      {description && <p className="mt-1 text-xs text-ink-soft">{description}</p>}
      <div className="mt-4 flex flex-col divide-y divide-ink/10">{children}</div>
    </div>
  );
}
