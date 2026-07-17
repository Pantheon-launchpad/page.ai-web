type SignalMarkProps = {
  className?: string;
  animated?: boolean;
  color?: "signal" | "ink" | "paper";
};

const colorMap = {
  signal: "bg-signal",
  ink: "bg-ink",
  paper: "bg-paper",
};

/**
 * The four-bar signal glyph is Page.AI's recurring mark — it stands in for
 * numbering, section eyebrows, and the logo, always doing the same job:
 * showing strength that doesn't depend on a network.
 */
export default function SignalMark({
  className = "",
  animated = false,
  color = "signal",
}: SignalMarkProps) {
  const fill = colorMap[color];
  const heights = ["h-1.5", "h-2.5", "h-3.5", "h-[1.15rem]"];
  const anims = ["bar-anim-1", "bar-anim-2", "bar-anim-3", "bar-anim-4"];

  return (
    <span className={`inline-flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {heights.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-sm ${h} ${fill} ${animated ? anims[i] : ""}`}
        />
      ))}
    </span>
  );
}
