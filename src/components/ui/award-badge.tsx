"use client";

import type { MouseEvent } from "react";

type AwardBadgeTone = "approach" | "trust" | "support";

interface AwardBadgeProps {
  label?: string;
  tone?: AwardBadgeTone;
}

const toneClasses: Record<AwardBadgeTone, string> = {
  approach:
    "from-accwise-blue/12 via-white to-accwise-green/12 text-accwise-blue ring-accwise-blue/12",
  trust:
    "from-accwise-green/12 via-white to-accwise-blue/12 text-accwise-green ring-accwise-green/12",
  support:
    "from-accwise-offwhite/60 via-white to-accwise-blue/10 text-accwise-navy ring-accwise-blue/10",
};

export function AwardBadge({
  label = "Practical approach",
  tone = "approach",
}: AwardBadgeProps) {
  function updateGlow(event: MouseEvent<HTMLSpanElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--badge-x",
      `${event.clientX - bounds.left}px`,
    );
    event.currentTarget.style.setProperty(
      "--badge-y",
      `${event.clientY - bounds.top}px`,
    );
  }

  return (
    <span
      className={`group relative inline-flex overflow-hidden rounded-full bg-gradient-to-r px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] shadow-[0_14px_34px_rgba(33,75,112,0.12)] ring-1 transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(33,75,112,0.18)] motion-reduce:transition-none ${toneClasses[tone]}`}
      onMouseMove={updateGlow}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
        style={{
          background:
            "radial-gradient(circle at var(--badge-x, 50%) var(--badge-y, 50%), rgba(255,255,255,0.95), transparent 34%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[-35%] w-1/3 -skew-x-12 bg-white/60 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100 motion-reduce:hidden"
      />
      <span className="relative z-10">{label}</span>
    </span>
  );
}
