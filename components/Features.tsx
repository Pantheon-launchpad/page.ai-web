import Reveal from "./Reveal";
import SignalMark from "./SignalMark";
import TiltCard from "./TiltCard";

const features = [
  {
    icon: "M12 3v12m0 0-4-4m4 4 4-4M5 21h14",
    title: "Full lessons, fully offline",
    body: "Download entire subjects once and learn forever. Every lesson, video, and exercise lives on your device.",
  },
  {
    icon: "M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 1 1-4.05-7.5L21 3l-1 4.5A8.96 8.96 0 0 1 21 12Z",
    title: "A patient AI tutor",
    body: "Stuck on a problem? Ask the on-device tutor. It explains things step by step, and never runs out of patience.",
  },
  {
    icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
    title: "Quizzes that adapt",
    body: "Short quizzes after every lesson adjust to your level. Practice always feels just right.",
  },
  {
    icon: "M12 2c2 3 5 6 5 10a5 5 0 0 1-10 0c0-1.4.6-2.6 1.3-3.7C9 10 9.5 11 10.5 11c1 0 1-1.2.5-2.3C10.2 6.9 10 4.4 12 2Z",
    title: "Streaks & goals",
    body: "Daily streaks, XP, and weekly goals keep motivation high. Progress syncs next time you're online.",
  },
  {
    icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z",
    title: "A whole library of subjects",
    body: "Maths, Science, English, History and more, aligned to school curricula for ages 6 to 16.",
  },
  {
    icon: "M17 6H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2ZM21 10v4M10 10v4M13 10v4",
    title: "Light on battery & storage",
    body: "Optimised for budget phones. A full subject takes less space than a photo album, and sips battery.",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-xl text-center">
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-signal">
            <SignalMark color="signal" />
            Features
          </div>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Everything a curious mind needs
          </h2>
          <p className="mt-4 text-ink-soft">
            Built for learners everywhere. Every feature works with zero connection.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <TiltCard intensity={9} className="group h-full rounded-3xl">
                <div className="glass-card h-full rounded-3xl p-7 transition-shadow duration-300 group-hover:shadow-lift">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-signal-soft text-signal-deep transition-colors group-hover:bg-signal group-hover:text-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="mt-5 font-display text-[1.05rem] font-semibold text-ink">{f.title}</h3>
                  <p className="mt-2 text-[0.925rem] leading-relaxed text-ink-soft">{f.body}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
