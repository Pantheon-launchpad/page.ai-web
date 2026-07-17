import SignalMark from "./SignalMark";
import TiltCard from "./TiltCard";

function RingProgress({ percent }: { percent: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0">
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="6"
      />
      <circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        stroke="#2E5FEA"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 32 32)"
      />
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontSize="15"
        fontFamily="var(--font-mono)"
        fill="white"
      >
        {percent}%
      </text>
    </svg>
  );
}

function SubjectIcon({ path }: { path: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

export default function PhoneMockup() {
  return (
    <div className="theme-fixed-dark relative mx-auto w-full max-w-[320px] select-none px-6 sm:px-10">
      {/* ambient glow behind the device */}
      <div className="absolute inset-x-10 top-16 -z-10 h-[420px] rounded-[3rem] bg-signal/20 blur-3xl" />

      <TiltCard
        intensity={7}
        scale={1.015}
        className="animate-float rounded-[2.75rem]"
      >
        <div className="relative rounded-[2.75rem] border-[6px] border-ink bg-ink p-2 shadow-lift">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />

          <div className="overflow-hidden rounded-[2.1rem] bg-white">
            {/* status bar */}
            <div className="flex items-center justify-between bg-ink px-5 pb-4 pt-4 text-white">
              <span className="font-mono text-[11px] tracking-wide">9:41</span>
              <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path
                    d="M2 8.82a15 15 0 0 1 20 0M5 12.86a10 10 0 0 1 14 0M8.5 16.9a5 5 0 0 1 7 0"
                    opacity="0.35"
                  />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
                Offline
                <span className="ml-0.5 h-2.5 w-4 rounded-[2px] border border-white/50" />
              </div>
            </div>

            {/* greeting + weekly goal */}
            <div className="space-y-4 bg-ink px-5 pb-6 pt-1 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[15px] font-medium text-white/90">
                    Good morning, Amara
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-white/50">
                    Weekly goal
                  </p>
                </div>
                <RingProgress percent={78} />
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-white/50">
                <span>3 of 4 lessons done</span>
                <span>12-day streak · 1,240 coins</span>
              </div>
            </div>

            {/* continue learning */}
            <div className="space-y-3 px-5 pt-5">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                Continue learning
              </p>
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-paper/70 p-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
                  <SubjectIcon path="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13Z" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium text-ink">
                    Fractions &amp; Decimals
                  </p>
                  <p className="font-mono text-[10px] text-ink-faint">
                    Maths · Lesson 4 of 6
                  </p>
                </div>
                <div className="h-6 w-6 shrink-0 rounded-full bg-signal text-center font-mono text-[10px] leading-6 text-white">
                  D
                </div>
              </div>

              <p className="pt-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                My subjects
              </p>
              <div className="grid grid-cols-2 gap-2.5 pb-6">
                <div className="rounded-2xl border border-line bg-paper/70 p-3">
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-moss-soft text-moss">
                    <SubjectIcon path="M9.5 3 4 6v13l5.5-3 5 3 5.5-3V3l-5.5 3-5-3Z" />
                  </div>
                  <p className="text-[12px] font-medium text-ink">Science</p>
                  <p className="font-mono text-[10px] text-ink-faint">
                    6 lessons offline
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-paper/70 p-3">
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg bg-ember-soft text-ember">
                    <SubjectIcon path="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5h13a2.5 2.5 0 0 1 2.5 2.5v12" />
                  </div>
                  <p className="text-[12px] font-medium text-ink">History</p>
                  <p className="font-mono text-[10px] text-ink-faint">
                    4 lessons offline
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* floating "no signal, still working" chip - the signature idea made literal.
          Positioned inside the padded wrapper so it never overflows the viewport. */}
      <div className="absolute right-1 top-24 sm:right-0">
        <div className="glass-card animate-float-sm flex items-center gap-2 rounded-2xl px-3.5 py-2.5">
          <SignalMark animated />
          <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
            Full lessons, 0 bars
          </span>
        </div>
      </div>
    </div>
  );
}
