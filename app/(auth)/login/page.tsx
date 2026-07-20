"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import GoogleButton from "@/components/auth/GoogleButton";
import AuthDivider from "@/components/auth/AuthDivider";
import { Icon } from "@/components/dashboard/icons";
import { AuthApi } from "@/services/auth.api";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    try {
      const respone = await AuthApi.login({ email, password });
      console.log(respone.user , respone.tokens)
      router.replace("/dashboard");
    } catch (err) {
      setLoading(false);
      const message = err instanceof ApiError ? err.message : "Something went wrong. Try again.";
      setErrors({ password: message });
    }
  }

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Log in to Page.AI"
      description="Pick up your streak right where you left off."
      footer={
        <>
          New here?{" "}
          <Link href="/signup" className="font-medium text-signal-deep hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <GoogleButton label="Log in with Google" />
        <AuthDivider label="or log in with email" />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        <AuthInput
          label="Email"
          type="email"
          icon="mail"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email}
        />
        <AuthInput
          label="Password"
          type="password"
          icon="lock"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password}
        />

        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-xs font-medium text-ink-soft hover:text-signal-deep">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          onSubmit={handleSubmit}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-signal py-3 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Log in"}
          {!loading && <Icon name="arrowRight" className="h-4 w-4" />}
        </button>
      </form>
    </AuthCard>
  );
}
