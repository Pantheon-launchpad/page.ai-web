export default function RingProgress({
  percent,
  size = 64,
  stroke = 6,
  label,
}: {
  percent: number;
  size?: number;
  stroke?: number;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, percent)) / 100) * c;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        className="transition-[stroke-dashoffset] duration-700 ease-out"
      />
      {label && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size * 0.24}
          fontFamily="var(--font-mono)"
          fill="var(--color-ink)"
          className="rotate-90"
          style={{ transformOrigin: "center" }}
        >
          {label}
        </text>
      )}
    </svg>
  );
}
