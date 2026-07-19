import Link from "next/link";
import { Icon, type IconName } from "@/components/dashboard/icons";

const roadmap = [
  "AI-personalised content, tuned to your syllabus",
  "Fully usable offline, like the rest of Page.AI",
  "Woven into your Page Coins, streaks and Lumo progress",
];

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; icon?: string; soon?: string }>;
}) {
  const params = await searchParams;
  const title = params.title || "This feature";
  const icon = (params.icon as IconName) || "sparkle";

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center py-10 text-center sm:py-16">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-signal-soft text-signal-deep">
        <div className="animate-pop-in">
          <Icon name={icon} className="h-9 w-9" />
        </div>
        <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ember text-white">
          <Icon name="clock" className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      </div>

      <div className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
        <Icon name="signal" className="h-3.5 w-3.5" />
        On the roadmap
      </div>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title} is on its way
      </h1>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
        We&apos;re still building this part of Page.AI so it meets the same bar as the rest of the
        app - patient, personal, and built for zero connection. Here&apos;s what to expect.
      </p>

      <div className="glass-card mt-8 w-full rounded-3xl p-6 text-left">
        <ul className="flex flex-col gap-3.5">
          {roadmap.map((line) => (
            <li key={line} className="flex items-start gap-3 text-sm text-ink-soft">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-moss-soft text-moss">
                <Icon name="target" className="h-3 w-3" strokeWidth={2} />
              </span>
              {line}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/dashboard"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-cta px-5 py-3 text-sm font-medium text-cta-text transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
      >
        Back to dashboard
        <Icon name="arrowRight" className="h-4 w-4" />
      </Link>
    </div>
  );
}
