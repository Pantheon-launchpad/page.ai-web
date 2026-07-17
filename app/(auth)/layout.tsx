import type { Metadata } from "next";
import Link from "next/link";
import SignalMark from "@/components/SignalMark";
import PageTransition from "@/components/dashboard/PageTransition";

export const metadata: Metadata = {
  title: "Page.AI",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="paper-grain relative min-h-screen bg-paper">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-drift-1 absolute -left-24 top-10 h-72 w-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="animate-drift-2 absolute right-0 top-40 h-64 w-64 rounded-full bg-ember/10 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <Link href="/" className="mb-8 flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
          <SignalMark animated />
          Page.AI
        </Link>
        <PageTransition>{children}</PageTransition>
      </div>
    </main>
  );
}
