"use client";

import { useState } from "react";
import GoogleIcon from "./GoogleIcon";
import { startOauth } from "@/services";

export default function GoogleButton({
  label = "Continue with Google",
}: {
  label?: string;
  onSuccess?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    startOauth("google");
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