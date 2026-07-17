"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthInput from "@/components/auth/AuthInput";
import { Icon } from "@/components/dashboard/icons";
import { subjectList } from "@/lib/practice-data";

const classLevels = ["SS1", "SS2", "SS3", "100 Level", "200 Level"];
const targetExams = ["WAEC", "JAMB", "NECO", "Post-UTME"];
const WELCOME_BONUS = 500;

const steps = ["Account", "Academic profile", "Learning goals", "Referral"];

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const [classLevel, setClassLevel] = useState<string | null>(null);
  const [exams, setExams] = useState<string[]>([]);

  const [subjects, setSubjects] = useState<string[]>([]);
  const [referralCode, setReferralCode] = useState("");

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function validateAccount() {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function next() {
    if (step === 0 && !validateAccount()) return;
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  if (done) {
    return (
      <div className="glass-card w-full max-w-[420px] rounded-3xl p-8 text-center">
        <div className="animate-pop-in mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-ember-soft text-ember">
          <Icon name="coin" className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-display text-2xl font-semibold text-ink">Welcome, {name.split(" ")[0] || "there"}!</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Your account is ready. Here&apos;s a welcome bonus to get your wallet started.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-ember-soft px-5 py-2.5 font-display text-lg font-semibold text-ember">
          <Icon name="coin" className="h-5 w-5" />+{WELCOME_BONUS} Page Coins
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal py-3 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
        >
          Start learning
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card w-full max-w-lg rounded-3xl p-7 sm:p-8">
      <div className="font-mono text-[11px] uppercase tracking-wider text-signal">Get started</div>
      <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{steps[step]}</h1>

      <div className="mt-4 flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-signal" : "bg-ink/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
        Step {step + 1} of {steps.length}
      </p>

      <div key={step} className="animate-pop-in mt-6">
        {step === 0 && (
          <div className="flex flex-col gap-4">
            <AuthInput label="Full name" icon="profile" value={name} onChange={setName} placeholder="David Okafor" error={errors.name} />
            <AuthInput label="Email" type="email" icon="mail" value={email} onChange={setEmail} placeholder="you@example.com" error={errors.email} />
            <AuthInput
              label="Password"
              type="password"
              icon="lock"
              value={password}
              onChange={setPassword}
              placeholder="At least 6 characters"
              error={errors.password}
            />
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="mb-2 block text-xs font-medium text-ink-soft">Current class / level</label>
              <div className="flex flex-wrap gap-2">
                {classLevels.map((c) => (
                  <button
                    key={c}
                    onClick={() => setClassLevel(c)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      classLevel === c ? "border-signal bg-signal text-white" : "border-ink/10 bg-surface-2 text-ink-soft hover:border-ink/20"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-medium text-ink-soft">Target exams</label>
              <div className="flex flex-wrap gap-2">
                {targetExams.map((e) => (
                  <button
                    key={e}
                    onClick={() => toggle(exams, setExams, e)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      exams.includes(e) ? "border-signal bg-signal text-white" : "border-ink/10 bg-surface-2 text-ink-soft hover:border-ink/20"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="mb-2 block text-xs font-medium text-ink-soft">Which subjects do you want to focus on?</label>
            <div className="flex flex-wrap gap-2">
              {subjectList.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(subjects, setSubjects, s)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    subjects.includes(s) ? "border-signal bg-signal text-white" : "border-ink/10 bg-surface-2 text-ink-soft hover:border-ink/20"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <AuthInput
              label="Referral code (optional)"
              icon="share"
              value={referralCode}
              onChange={(v) => setReferralCode(v.toUpperCase())}
              placeholder="Did a friend invite you?"
            />
            <p className="mt-2 text-xs text-ink-faint">You&apos;ll both earn Page Coins once you complete your first lesson.</p>
          </div>
        )}
      </div>

      <div className="mt-7 flex items-center gap-3">
        {step > 0 && (
          <button
            onClick={back}
            className="rounded-full border border-ink/10 bg-surface-2 px-5 py-2.5 text-sm font-medium text-ink hover:border-ink/20"
          >
            Back
          </button>
        )}
        <button
          onClick={next}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-white shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-signal-deep"
        >
          {step === steps.length - 1 ? "Finish" : "Continue"}
          <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      {step === 0 && (
        <p className="mt-6 text-center text-sm text-ink-soft">
          Already learning with us?{" "}
          <Link href="/login" className="font-medium text-signal-deep hover:underline">
            Log in
          </Link>
        </p>
      )}
    </div>
  );
}
