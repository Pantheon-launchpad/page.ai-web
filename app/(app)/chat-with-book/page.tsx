import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ChatWithBookClient from "@/components/learn/ChatWithBookClient";

export const metadata: Metadata = { title: "Chat with Book - Page.AI" };

export default function ChatWithBookPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Learn"
        icon="chat"
        title="Chat with Book"
        description="Not another chatbot - a conversation with the actual material, in whatever voice helps it click."
      />
      <ChatWithBookClient />
    </div>
  );
}
