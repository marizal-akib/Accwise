"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const supportBars = [
  {
    fill: "linear-gradient(90deg, #4C9DE1 0%, #3D8AEA 50%, rgba(76,157,225,0.3) 76%, rgba(76,157,225,0) 100%)",
    label: "CLARITY",
    targetWidth: "100%",
  },
  {
    fill: "linear-gradient(90deg, #64B73B 0%, #5CA535 50%, rgba(100,183,59,0.3) 76%, rgba(100,183,59,0) 100%)",
    label: "COMPLIANCE",
    targetWidth: "92%",
  },
];

export function AboutSupportBars() {
  const root = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(root, { amount: 0.35, once: true });
  const shouldReduceMotion = useReducedMotion();
  const isFilled = Boolean(shouldReduceMotion || isInView);

  return (
    <div
      className="mt-8 grid gap-4"
      data-testid="about-support-bars"
      ref={root}
    >
      {supportBars.map((bar, index) => (
        <div
          className="relative h-10 overflow-visible bg-transparent"
          key={bar.label}
        >
          <motion.div
            animate={{ width: isFilled ? bar.targetWidth : "0%" }}
            className="absolute inset-y-0 left-0 min-w-0 origin-left overflow-hidden rounded-l-full rounded-r-none"
            initial={shouldReduceMotion ? false : { width: "0%" }}
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, #000 0%, #000 72%, transparent 100%)",
              background: bar.fill,
              maskImage:
                "linear-gradient(90deg, #000 0%, #000 72%, transparent 100%)",
            }}
            transition={{
              delay: index * 0.18,
              duration: 1.05,
              ease: [0.5, 1, 0.5, 1],
            }}
          >
            <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.04em] text-white sm:left-6 sm:text-[0.82rem]">
              {bar.label}
            </span>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
