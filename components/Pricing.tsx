import Reveal from "./Reveal";
import SignalMark from "./SignalMark";
import TiltCard from "./TiltCard";

const plans = [
  {
    name: "Explorer",
    price: "₦0",
    period: "forever",
    features: ["2 subjects offline", "AI tutor, 20 questions a day", "Quizzes, streaks & goals"],
    cta: "Download Free",
    featured: false,
  },
  {
    name: "Family",
    price: "₦2,500",
    period: "/month",
    tag: "Most popular",
    features: [
      "All subjects, unlimited downloads",
      "Unlimited AI tutor questions",
      "Up to 4 learner profiles",
      "Parent progress reports",
    ],
    cta: "Start 14-day free trial",
    featured: true,
  },
  {
    name: "School",
    price: "Custom",
    period: "",
    features: [
      "Whole-classroom licences",
      "Teacher dashboard & assignments",
      "Offline device-to-device sharing",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
            <SignalMark color="signal" />
            Pricing
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Simple plans for every learner
          </h2>
          <p className="mt-4 text-ink-soft">
            Start free, forever. Upgrade when you want more subjects and family profiles.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <TiltCard intensity={p.featured ? 6 : 9} className="h-full rounded-3xl">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 ${
                  p.featured
                    ? "glass-card-deep text-paper shadow-lift"
                    : "glass-card text-ink"
                }`}
              >
                {p.tag && (
                  <span className="absolute -top-3 right-8 rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                    {p.tag}
                  </span>
                )}
                <p className={`font-mono text-[11px] uppercase tracking-wider ${p.featured ? "text-white/60" : "text-ink-faint"}`}>
                  {p.name}
                </p>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-semibold">{p.price}</span>
                  {p.period && (
                    <span className={`font-mono text-sm ${p.featured ? "text-white/50" : "text-ink-faint"}`}>
                      {p.period}
                    </span>
                  )}
                </div>

                <ul className="mt-7 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.9rem] leading-snug">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`mt-0.5 shrink-0 ${p.featured ? "text-signal" : "text-moss"}`}
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className={p.featured ? "text-white/85" : "text-ink-soft"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                    p.featured
                      ? "bg-signal text-white hover:bg-signal-deep"
                      : "border border-ink/15 text-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  {p.cta}
                </a>
              </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
