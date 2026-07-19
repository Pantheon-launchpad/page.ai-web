import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ContentTable from "@/components/admin/ContentTable";
import { AdminApi } from "@/services/admin.api";

export const metadata: Metadata = { title: "Content - Admin - Page.AI" };

export default async function AdminContentPage() {
  const content = await AdminApi.getContent();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Admin"
        icon="book"
        title="Content management"
        description="Subjects, topics, questions, resources, and flashcard decks - everything students see."
      />
      <ContentTable initialContent={content} />
    </div>
  );
}
