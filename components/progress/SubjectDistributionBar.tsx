import { accent, type AccentColor } from "@/components/learn/colors";

export default function SubjectDistributionBar({
  data,
}: {
  data: { name: string; color: AccentColor; hours: number }[];
}) {
  const total = data.reduce((sum, d) => sum + d.hours, 0) || 1;

  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-ink/5">
        {data.map((d) => (
          <div
            key={d.name}
            className={accent[d.color].bar}
            style={{ width: `${(d.hours / total) * 100}%` }}
            title={`${d.name}: ${d.hours}h`}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-xs text-ink-soft">
            <span className={`h-2.5 w-2.5 rounded-full ${accent[d.color].bar}`} />
            <span className="truncate">{d.name}</span>
            <span className="ml-auto font-mono text-ink-faint">{Math.round((d.hours / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
