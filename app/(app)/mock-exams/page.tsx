import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ExamPicker from "@/components/cbt/ExamPicker";
import { mockExams } from "@/lib/practice-data";

export const metadata: Metadata = { title: "Mock Exams - Page.AI" };

export default function MockExamsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Practice"
        icon="mockExam"
        title="Mock exams"
        description="Longer, full-length simulations - the same engine as CBT Exams, scaled up to exam-day length."
      />
      <ExamPicker exams={mockExams} />
    </div>
  );
}
