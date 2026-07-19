import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import PracticeFlowClient from "@/components/practice/PracticeFlowClient";
import { PracticeApi } from "@/services/practice.api";

export const metadata: Metadata = { title: "Practice Mode - Page.AI" };

export default async function PracticePage() {
  const subjectList = await PracticeApi.getSubjectList();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Practice"
        icon="target"
        title="Practice mode"
        description="Adjustable, adaptive practice with an AI explanation the moment something goes wrong."
      />
      <PracticeFlowClient subjectList={subjectList} />
    </div>
  );
}
