import Link from "next/link";
import { aiRecommendation } from "@/lib/dashboard-data";
import { Icon } from "./icons";

export default function AIRecommendationCard() {
  return (
    <div className="glass-card-deep rounded-3xl p-6">
      <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/60">
        <Icon name="sparkle" className="h-3.5 w-3.5 text-signal" />
        Today&apos;s recommendation
      </div>
      <p className="mt-3 font-display text-lg font-medium leading-snug text-white sm:text-xl">
        &ldquo;{aiRecommendation.message}&rdquo;
      </p>
      <Link
        href={aiRecommendation.href}
        className="group mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
      >
        {aiRecommendation.actionLabel}
        <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
