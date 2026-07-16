const intensity = ["bg-ink/5", "bg-signal/20", "bg-signal/45", "bg-signal/70", "bg-signal"];

export default function Heatmap({ data }: { data: number[][] }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-1">
        {data.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((level, di) => (
              <div
                key={di}
                title={`Level ${level}`}
                className={`h-3.5 w-3.5 rounded-[3px] ${intensity[level]}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-ink-faint">
        Less
        {intensity.map((c) => (
          <span key={c} className={`h-3 w-3 rounded-[3px] ${c}`} />
        ))}
        More
      </div>
    </div>
  );
}
