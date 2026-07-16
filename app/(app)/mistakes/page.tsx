import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import MistakeBookClient from "@/components/practice/MistakeBookClient";

export const metadata: Metadata = { title: "Mistake Book - Page.AI" };

export default function MistakeBookPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Practice"
        icon="mistake"
        title="Mistake book"
        description="Every mistake you've made, kept close until it isn't a mistake anymore."
      />
      <MistakeBookClient />
    </div>
  );
}
