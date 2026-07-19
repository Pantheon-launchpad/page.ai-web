"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleIcon from "./GoogleIcon";
import { AuthApi } from "@/services/auth.api";

export default function GoogleButton({
  label = "Continue with Google",
  onSuccess,
}: {
  label?: string;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    // Frontend-only mock - no real Google Identity Services SDK wired up yet,
    // so there's no real idToken. AuthApi.loginWithGoogle is the real
    // integration point; swap this for the SDK's credential response once
    // Google Sign-In is actually configured.
    await AuthApi.loginWithGoogle({ idToken: "mock-id-token" });
    setLoading(false);
    if (onSuccess) onSuccess();
    else router.push("/dashboard");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-[#dadce0] bg-white py-3 text-sm font-medium text-[#3c4043] transition-transform hover:-translate-y-0.5 hover:shadow-md disabled:opacity-70"
    >
      {loading ? (
        <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-[#dadce0] border-t-[#4285F4]" />
      ) : (
        <GoogleIcon />
      )}
      {loading ? "Connecting…" : label}
    </button>
  );
}
