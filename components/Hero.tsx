import PhoneMockup from "./PhoneMockup";
import SignalMark from "./SignalMark";
import Appear from "./Appear";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative px-6 pb-20 pt-10 md:px-10 md:pb-28 md:pt-16"
    >
      {/* ambient drifting blobs - contained to this section only, never clip descendants */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-drift-1 absolute -left-24 top-10 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="animate-drift-2 absolute right-0 top-40 h-64 w-64 rounded-full bg-ember/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2 md:gap-10">
        <div>
          <Appear>
            <div className="glass-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              <SignalMark animated />
              Works 100% offline
            </div>
          </Appear>

          <Appear delay={80}>
            <h1 className="mt-6 text-balance font-display text-[clamp(2.25rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-ink">
              A friendly AI tutor <br className="hidden sm:block" />
              that never needs <span className="text-signal">a signal.</span>
            </h1>
          </Appear>

          <Appear delay={160}>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
              Full lessons, quizzes, and a patient AI tutor in one app. Works on
              the back of a bus, in a village with no towers, or at 30,000 feet
              with the WiFi off.
            </p>
          </Appear>

          <Appear delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="group relative overflow-hidden rounded-full bg-signal px-6 py-3.5 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
              >
                <span className="relative z-10">Download Free</span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                See how it works
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </Appear>

          <Appear delay={320}>
            <div className="mt-10 flex items-center gap-2 font-mono text-[13px] text-ink-soft">
              <span className="animate-pop-in text-ember">★★★★★</span>
              <span>4.9 rating, loved by 200k learners and their parents</span>
            </div>
          </Appear>
        </div>

        <Appear delay={200} className="w-full">
          <PhoneMockup />
        </Appear>
      </div>
    </section>
  );
}
