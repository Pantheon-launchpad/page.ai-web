"use client";

import { useState } from "react";
import { Icon } from "@/components/dashboard/icons";
import ChatPanel, { type ChatChip } from "./ChatPanel";
import { ChatApi } from "@/services/chat.api";
import { bookPersonas, bookGameChips, type ChatSource } from "@/lib/learn-data";

export default function ChatWithBookClient({
  sources,
}: {
  sources: ChatSource[];
}) {
  const [source, setSource] = useState<ChatSource | null>(null);

  if (!source) {
    return (
      <div className="glass-card rounded-3xl p-6 sm:p-7">
        <h2 className="font-display text-lg font-semibold text-ink">
          Choose what to talk to
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Pick a textbook, chapter, or your own uploaded notes. The AI takes on
          that material&apos;s voice.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {sources.map((s) => (
            <button
              key={s.id}
              onClick={() => setSource(s)}
              className="group flex items-center gap-3.5 rounded-2xl border border-ink/10 bg-surface-1 p-4 text-left transition-colors hover:border-signal/30 hover:bg-signal-soft"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-signal-soft text-signal-deep transition-colors group-hover:bg-signal group-hover:text-white">
                <Icon name="layers" className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">
                  {s.title}
                </p>
                <p className="text-xs text-ink-soft">
                  {s.subject} &middot; {s.chapters}{" "}
                  {s.chapters === 1 ? "chapter" : "chapters"}
                </p>
              </div>
            </button>
          ))}

          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/20 bg-surface-2 p-4 text-center text-ink-faint transition-colors hover:border-signal/40 hover:text-signal-deep">
            <Icon name="pdf" className="h-6 w-6" />
            <span className="text-xs font-medium">
              Upload a PDF or textbook
            </span>
            <input type="file" accept="application/pdf" className="hidden" />
          </label>
        </div>
      </div>
    );
  }

  const chips: ChatChip[] = [...bookPersonas, ...bookGameChips];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal text-white">
            <Icon name="layers" className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink">{source.title}</p>
            <p className="text-xs text-ink-soft">{source.subject}</p>
          </div>
        </div>
        <button
          onClick={() => setSource(null)}
          className="rounded-full border border-ink/10 bg-surface-1 px-3.5 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-ink/20"
        >
          Switch book
        </button>
      </div>

      <ChatPanel
        avatarIcon="layers"
        avatarLabel={source.title}
        inputPlaceholder={`Ask ${source.title} anything...`}
        initialMessages={[
          {
            id: "welcome",
            role: "assistant",
            text: `I'm your ${source.title}. Ask me anything from inside these pages - or pick how you'd like me to explain it.`,
          },
        ]}
        chips={chips}
        onSend={(message) =>
          ChatApi.sendMessage(source.id, message).then((r) => r.reply)
        }
      />
    </div>
  );
}
