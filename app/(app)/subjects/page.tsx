import type { Metadata } from "next";
import PageHeader from "@/components/learn/PageHeader";
import SubjectCard from "@/components/learn/SubjectCard";
import { SubjectApi } from "@/services/subject.api";

export const metadata: Metadata = { title: "Subjects - Page.AI" };

export default async function SubjectsPage() {
  const subjects = await SubjectApi.getSubjects();
  const overallHours = subjects.reduce((sum, s) => sum + s.hoursSpent, 0);
  const overallMastery = Math.round(subjects.reduce((sum, s) => sum + s.mastery, 0) / subjects.length);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Learn"
        icon="book"
        title="Your subjects"
        description="Every subject aligned to your curriculum, downloaded once and available forever offline."
      >
        <div className="flex gap-2.5">
          <div className="glass-card rounded-2xl px-4 py-2.5 text-center">
            <div className="font-display text-lg font-semibold text-ink">{overallMastery}%</div>
            <div className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">Avg mastery</div>
          </div>
          <div className="glass-card rounded-2xl px-4 py-2.5 text-center">
            <div className="font-display text-lg font-semibold text-ink">{overallHours}h</div>
            <div className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">Time spent</div>
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} />
        ))}
      </div>
    </div>
  );
}
