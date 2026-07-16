import SignalMark from "./SignalMark";

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-16 text-paper md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 font-display text-lg font-semibold">
              <SignalMark color="paper" />
              Page.AI
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              Learning that works everywhere — even with no signal. Page.AI
              brings an AI tutor and full lessons offline.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">Product</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><a href="#features" className="hover:text-signal">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-signal">How it works</a></li>
              <li><a href="#pricing" className="hover:text-signal">Pricing</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">Support</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li><a href="#faq" className="hover:text-signal">FAQ</a></li>
              <li><a href="mailto:hello@page.ai" className="hover:text-signal">Contact us</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Page.AI. Made for curious minds everywhere.</span>
          <span>Works offline, always.</span>
        </div>
      </div>
    </footer>
  );
}
