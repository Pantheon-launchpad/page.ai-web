export default function TopicPerformanceList({
  data,
}: {
  data: { topic: string; subject: string; mastery: number }[];
}) {
  const sorted = [...data].sort((a, b) => b.mastery - a.mastery);

  return (
    <div className="flex flex-col gap-3.5">
      {sorted.map((t) => (
        <div key={t.topic}>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="font-medium text-ink">{t.topic}</span>
            <span className="text-xs text-ink-faint">
              {t.subject} &middot; {t.mastery}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                t.mastery >= 70 ? "bg-moss" : t.mastery >= 50 ? "bg-signal" : "bg-ember"
              }`}
              style={{ width: `${t.mastery}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
