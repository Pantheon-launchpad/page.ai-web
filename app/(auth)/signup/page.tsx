"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import { Icon } from "@/components/dashboard/icons";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (name.trim().length < 2) nextErrors.name = "Tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 700);
  }

  return (
    <AuthCard
      eyebrow="Get started"
      title="Create your account"
      description="Full lessons, a patient AI tutor, zero connection required."
      footer={
        <>
          Already learning with us?{" "}
          <Link href="/login" className="font-medium text-signal-deep hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput
          label="Full name"
          icon="profile"
          value={name}
          onChange={setName}
          placeholder="David Okafor"
          autoComplete="name"
          error={errors.name}
        />
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
          placeholder="At least 6 characters"
          autoComplete="new-password"
          error={errors.password}
        />

        <p className="text-xs text-ink-faint">
          By creating an account you agree to Page.AI&apos;s Terms and Privacy Policy.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-signal py-3 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep disabled:opacity-70"
        >
          {loading ? "Creating account..." : "Create account"}
          {!loading && <Icon name="arrowRight" className="h-4 w-4" />}
        </button>
      </form>
    </AuthCard>
  );
}
