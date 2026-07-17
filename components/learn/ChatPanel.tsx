"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "@/components/dashboard/icons";

export type ChatMessage = { id: string; role: "assistant" | "user"; text: string };
export type ChatChip = { label: string; icon: IconName };

let idCounter = 0;
const nextId = () => `m${++idCounter}`;

export default function ChatPanel({
  avatarIcon,
  avatarLabel,
  initialMessages,
  chips,
  cannedReplies,
  defaultReply,
  inputPlaceholder = "Ask anything...",
}: {
  avatarIcon: IconName;
  avatarLabel: string;
  initialMessages: ChatMessage[];
  chips: ChatChip[];
  cannedReplies: Record<string, string>;
  defaultReply: string;
  inputPlaceholder?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: trimmed }]);
    setInput("");
    setTyping(true);
    const reply = cannedReplies[trimmed.toLowerCase()] ?? defaultReply;
    const delay = 550 + Math.min(reply.length * 8, 900);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: nextId(), role: "assistant", text: reply }]);
    }, delay);
  }

  return (
    <div className="glass-card flex h-[min(72vh,720px)] flex-col rounded-3xl">
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
        {messages.map((m) => (
          <div key={m.id} className={`flex items-start gap-2.5 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            {m.role === "assistant" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-signal text-white">
                <Icon name={avatarIcon} className="h-4 w-4" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-tr-sm bg-signal text-white"
                  : "rounded-tl-sm border border-ink/10 bg-surface-1 text-ink"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-signal text-white">
              <Icon name={avatarIcon} className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-ink/10 bg-surface-1 px-4 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-faint" />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-ink/10 p-4">
        <div className="flex flex-wrap gap-1.5 pb-3">
          {chips.map((chip) => (
            <button
              key={chip.label}
              onClick={() => send(chip.label)}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface-1 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-signal/30 hover:bg-signal-soft hover:text-signal-deep"
            >
              <Icon name={chip.icon} className="h-3.5 w-3.5" />
              {chip.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputPlaceholder}
            aria-label={`Message ${avatarLabel}`}
            className="flex-1 rounded-full border border-ink/10 bg-surface-1 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-signal/40 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal text-white transition-transform hover:-translate-y-0.5 hover:bg-signal-deep disabled:opacity-40"
            disabled={!input.trim()}
          >
            <Icon name="send" className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
