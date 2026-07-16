import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ResourceLibraryClient from "@/components/learn/ResourceLibraryClient";

export const metadata: Metadata = { title: "Resource Library - Page.AI" };

export default function ResourceLibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Learn"
        icon="library"
        title="Resource library"
        description="Curriculum notes, past questions, formula sheets and more - all saved to your device."
      />
      <ResourceLibraryClient />
    </div>
  );
}
