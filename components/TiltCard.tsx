"use client";

import { useRef, type ReactNode } from "react";

export default function TiltCard({
  children,
  className = "",
  intensity = 10,
  glare = true,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || e.pointerType === "touch") return;
    const rect = node.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rotateY = (px - 0.5) * intensity;
      const rotateX = (0.5 - py) * intensity;
      node.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.5), transparent 55%)`;
      }
    });
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    // Clear the inline transform (rather than resetting to identity) so any
    // CSS animation on the same element — e.g. an idle float — can resume
    // driving `transform` once the pointer interaction ends.
    node.style.transform = "";
    if (glareRef.current) glareRef.current.style.background = "transparent";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 mix-blend-overlay motion-reduce:hidden"
        />
      )}
    </div>
  );
}
