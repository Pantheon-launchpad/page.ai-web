import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ResourceLibraryClient from "@/components/learn/ResourceLibraryClient";
import { ResourceApi } from "@/services/resource.api";

export const metadata: Metadata = { title: "Resource Library - Page.AI" };

export default async function ResourceLibraryPage() {
  const resources = await ResourceApi.getResources();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Learn"
        icon="library"
        title="Resource library"
        description="Curriculum notes, past questions, formula sheets and more - all saved to your device."
      />
      <ResourceLibraryClient initialResources={resources} />
    </div>
  );
}
