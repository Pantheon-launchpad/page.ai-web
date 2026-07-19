import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ChatPanel, { type ChatChip } from "@/components/learn/ChatPanel";
import { Icon } from "@/components/dashboard/icons";
import { TutorApi } from "@/services/tutor.api";

export const metadata: Metadata = { title: "AI Tutor - Page.AI" };

export default async function AiTutorPage() {
  const {
    capabilities: tutorCapabilities,
    examplePrompts: tutorExamplePrompts,
  } = await TutorApi.getCapabilities();
  const chips: ChatChip[] = tutorExamplePrompts.map((label) => ({
    label,
    icon: "sparkle",
  }));

  async function sendToTutor(message: string) {
    "use server";
    const { reply } = await TutorApi.sendMessage(message);
    return reply;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Learn"
        icon="tutor"
        title="AI Tutor"
        description="A patient teacher that never runs out of time. Ask a question or pick a way to learn."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tutorCapabilities.map((cap) => (
          <div
            key={cap.label}
            className="glass-card flex flex-col items-start gap-2 rounded-2xl p-4 text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal-soft text-signal-deep">
              <Icon name={cap.icon} className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium leading-tight text-ink">
              {cap.label}
            </span>
          </div>
        ))}
      </div>

      <ChatPanel
        avatarIcon="tutor"
        avatarLabel="AI Tutor"
        inputPlaceholder="Ask your tutor anything..."
        initialMessages={[
          {
            id: "welcome",
            role: "assistant",
            text: "Hi David - I'm your AI Tutor. Ask me to explain something, quiz you, or just tell me what you're stuck on.",
          },
        ]}
        chips={chips}
        onSend={sendToTutor}
      />
    </div>
  );
}
