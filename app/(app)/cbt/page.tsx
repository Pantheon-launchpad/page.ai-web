import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ExamPicker from "@/components/cbt/ExamPicker";
import { cbtPapers } from "@/lib/practice-data";

export const metadata: Metadata = { title: "CBT Exams — Page.AI" };

export default function CBTPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Practice"
        icon="exam"
        title="CBT exams"
        description="Timed, single-subject papers that closely mirror the real WAEC and JAMB computer-based test."
      />
      <ExamPicker exams={cbtPapers} />
    </div>
  );
}
