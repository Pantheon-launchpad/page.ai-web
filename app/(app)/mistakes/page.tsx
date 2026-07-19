import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import MistakeBookClient from "@/components/practice/MistakeBookClient";
import { MistakeApi } from "@/services/mistake.api";

export const metadata: Metadata = { title: "Mistake Book - Page.AI" };

export default async function MistakeBookPage() {
  const mistakes = await MistakeApi.getMistakes();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Practice"
        icon="mistake"
        title="Mistake book"
        description="Every mistake you've made, kept close until it isn't a mistake anymore."
      />
      <MistakeBookClient mistakes={mistakes} />
    </div>
  );
}
