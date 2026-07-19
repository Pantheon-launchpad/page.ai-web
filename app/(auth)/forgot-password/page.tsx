"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import { Icon } from "@/components/dashboard/icons";
import { AuthApi } from "@/services/auth.api";
import { ApiError } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    try {
      await AuthApi.requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      eyebrow="Reset password"
      title="Forgot your password?"
      description="Enter the email on your account and we'll send you a reset link."
      footer={
        <Link href="/login" className="font-medium text-signal-deep hover:underline">
          Back to log in
        </Link>
      }
    >
      {sent ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-moss/25 bg-moss-soft px-5 py-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-moss text-white">
            <Icon name="check" className="h-5 w-5" />
          </div>
          <p className="text-sm text-moss">
            If an account exists for <span className="font-medium">{email}</span>, a reset link is on its way.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AuthInput
            label="Email"
            type="email"
            icon="mail"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            autoComplete="email"
            error={error}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-signal py-3 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep disabled:opacity-70"
          >
            {loading ? "Sending link..." : "Send reset link"}
            {!loading && <Icon name="arrowRight" className="h-4 w-4" />}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
