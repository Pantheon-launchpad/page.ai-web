"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    // Registered after load so it never competes with the initial page for
    // bandwidth/CPU on a slow connection - exactly the kind of connection
    // this app is built for.
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Non-fatal - the app works fine without offline caching, it just
        // won't have it. Don't surface this to the user.
      });
    };
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
