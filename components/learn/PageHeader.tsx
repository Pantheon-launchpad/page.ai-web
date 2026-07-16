import { Icon, type IconName } from "@/components/dashboard/icons";

export default function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon: IconName;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
          <Icon name={icon} className="h-3.5 w-3.5" />
          {eyebrow}
        </div>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]">
          {title}
        </h1>
        {description && <p className="mt-1.5 max-w-xl text-sm text-ink-soft">{description}</p>}
      </div>
      {children}
    </div>
  );
}
