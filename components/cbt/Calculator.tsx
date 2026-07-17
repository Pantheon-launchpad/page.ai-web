"use client";

import { useState } from "react";
import { Icon } from "@/components/dashboard/icons";

type Op = "+" | "−" | "×" | "÷" | null;

function applyOp(a: number, b: number, op: Op): number {
  switch (op) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

export default function Calculator({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [pendingOp, setPendingOp] = useState<Op>(null);
  const [freshEntry, setFreshEntry] = useState(true);

  function inputDigit(d: string) {
    if (freshEntry || display === "0") {
      setDisplay(d === "." ? "0." : d);
      setFreshEntry(false);
    } else if (d === "." && display.includes(".")) {
      return;
    } else {
      setDisplay(display + d);
    }
  }

  function inputOp(op: Exclude<Op, null>) {
    const value = parseFloat(display);
    if (stored !== null && pendingOp && !freshEntry) {
      const result = applyOp(stored, value, pendingOp);
      setStored(result);
      setDisplay(String(result));
    } else {
      setStored(value);
    }
    setPendingOp(op);
    setFreshEntry(true);
  }

  function equals() {
    if (stored === null || !pendingOp) return;
    const value = parseFloat(display);
    const result = applyOp(stored, value, pendingOp);
    setDisplay(Number.isNaN(result) ? "Error" : String(result));
    setStored(null);
    setPendingOp(null);
    setFreshEntry(true);
  }

  function clear() {
    setDisplay("0");
    setStored(null);
    setPendingOp(null);
    setFreshEntry(true);
  }

  return (
    <div className="glass-card w-64 rounded-3xl p-4 shadow-lift">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">Calculator</span>
        <button onClick={onClose} aria-label="Close calculator" className="text-ink-faint hover:text-ink">
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>
      <div className="mb-3 truncate rounded-xl border border-ink/10 bg-surface-1 px-3 py-3 text-right font-mono text-lg text-ink">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <button onClick={clear} className="col-span-4 rounded-lg bg-ember-soft py-2 text-sm font-medium text-ember hover:opacity-90">
          Clear
        </button>
        {["7", "8", "9", "÷"].map((b) => (
          <CalcButton key={b} label={b} onPress={() => (b === "÷" ? inputOp("÷") : inputDigit(b))} />
        ))}
        {["4", "5", "6", "×"].map((b) => (
          <CalcButton key={b} label={b} onPress={() => (b === "×" ? inputOp("×") : inputDigit(b))} />
        ))}
        {["1", "2", "3", "−"].map((b) => (
          <CalcButton key={b} label={b} onPress={() => (b === "−" ? inputOp("−") : inputDigit(b))} />
        ))}
        {["0", ".", "=", "+"].map((b) => (
          <CalcButton
            key={b}
            label={b}
            onPress={() => (b === "+" ? inputOp("+") : b === "=" ? equals() : inputDigit(b))}
          />
        ))}
      </div>
    </div>
  );
}

function CalcButton({ label, onPress }: { label: string; onPress: () => void }) {
  const isOperator = ["÷", "×", "−", "+", "="].includes(label);
  return (
    <button
      onClick={onPress}
      className={`rounded-lg py-2.5 text-sm font-medium transition-colors ${
        isOperator ? "bg-signal-soft text-signal-deep hover:bg-signal hover:text-white" : "bg-surface-1 text-ink hover:bg-surface-hover"
      }`}
    >
      {label}
    </button>
  );
}
