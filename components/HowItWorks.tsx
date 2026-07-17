import Reveal from "./Reveal";
import SignalMark from "./SignalMark";

const steps = [
  {
    n: "01",
    title: "Download once",
    body: "Grab the app and pick your subjects whenever you're connected. A school, a café, a friend's hotspot.",
  },
  {
    n: "02",
    title: "Learn anywhere",
    body: "Lessons, quizzes, and your AI tutor all run on the device. Airplane mode is no problem at all.",
  },
  {
    n: "03",
    title: "Sync when you can",
    body: "Next time you're online, progress backs up automatically and new lessons download in the background.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-line bg-paper-deep/60 px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
            <SignalMark color="signal" />
            How it works
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Learning in three easy steps
          </h2>
          <p className="mt-4 text-ink-soft">
            Set up once with WiFi. Then learn anywhere, forever.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-5 md:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-[38px] hidden h-px bg-line md:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90} direction={i === 0 ? "left" : i === 2 ? "right" : "up"}>
              <div className="glass-card relative h-full rounded-3xl p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cta font-mono text-[12px] text-cta-text">
                  {s.n}
                </span>
                <h3 className="mt-5 font-display text-[1.1rem] font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
