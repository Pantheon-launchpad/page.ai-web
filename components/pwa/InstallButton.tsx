"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/dashboard/icons";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosTip, setShowIosTip] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInstalled(standalone);

    const ua = window.navigator.userAgent;
    setIsIos(/iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua));

    function onBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }
    function onInstalled() {
      setInstalled(true);
      setDeferredPrompt(null);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;
  if (!deferredPrompt && !isIos) return null;

  async function handleClick() {
    if (isIos && !deferredPrompt) {
      setShowIosTip((v) => !v);
      return;
    }
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-white/10"
      >
        <Icon name="download" className="h-4 w-4" />
        Install the app
      </button>

      {showIosTip && (
        <div className="absolute bottom-full left-1/2 z-40 mb-3 w-64 -translate-x-1/2 rounded-2xl border border-ink/10 bg-paper p-4 text-left text-xs leading-relaxed text-ink shadow-lift">
          Tap the Share icon in Safari, then <span className="font-medium">&quot;Add to Home Screen&quot;</span> - Page.AI will open full-screen from your home screen from then on.
          <button
            onClick={() => setShowIosTip(false)}
            className="mt-2.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint hover:text-ink"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
