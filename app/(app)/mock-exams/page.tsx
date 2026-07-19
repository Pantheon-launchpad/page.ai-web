import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import ExamPicker from "@/components/cbt/ExamPicker";
import { CbtApi } from "@/services/cbt.api";

export const metadata: Metadata = { title: "Mock Exams - Page.AI" };

export default async function MockExamsPage() {
  const mockExams = await CbtApi.getMockExams();

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
