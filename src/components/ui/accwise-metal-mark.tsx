"use client";

import { motion } from "framer-motion";

interface AccwiseMetalMarkProps {
  className?: string;
  isActive: boolean;
  reduceMotion: boolean;
}

const officialMarkSrc = "/assets/brand/accwise-logo-mark.png";

export function AccwiseMetalMark({
  className = "",
  isActive,
  reduceMotion,
}: AccwiseMetalMarkProps) {
  const shouldAnimateMetal = isActive && !reduceMotion;

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: "900px" }}
    >
      <motion.div
        animate={{
          rotateX: shouldAnimateMetal ? [0, 6, 0, -6, 0] : 0,
          rotateY: shouldAnimateMetal ? [0, -14, 0, 14, 0] : 0,
        }}
        className="accwise-metal-ring relative transform-gpu will-change-transform"
        style={{
          transformOrigin: "center",
          transformStyle: "preserve-3d",
        }}
        transition={{
          duration: 6.8,
          ease: "easeInOut",
          repeat: shouldAnimateMetal ? Infinity : 0,
        }}
      >
        <svg
          aria-label="ACCWISE Accountants logo mark"
          className="block h-auto w-full overflow-visible drop-shadow-[0_14px_28px_rgba(34,111,177,0.16)]"
          role="img"
          viewBox="0 0 120 120"
        >
          <g className="accwise-metal-aw">
            <image
              height="108"
              href={officialMarkSrc}
              preserveAspectRatio="xMidYMid meet"
              width="108"
              x="6"
              y="6"
            />
          </g>
        </svg>

        <div
          aria-hidden="true"
          className="accwise-metal-light-sweep pointer-events-none absolute inset-[5%] overflow-hidden"
          style={{
            WebkitMaskImage: `url(${officialMarkSrc})`,
            WebkitMaskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskImage: `url(${officialMarkSrc})`,
            maskPosition: "center",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            mixBlendMode: "screen",
          }}
        >
          <motion.div
            animate={{
              opacity: shouldAnimateMetal ? [0, 0.2, 0] : 0.06,
              x: shouldAnimateMetal ? ["-120%", "380%"] : "35%",
            }}
            className="absolute top-[-18%] h-[136%] w-[38%] rotate-[18deg] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.72)_43%,rgba(184,227,255,0.3)_58%,transparent_100%)]"
            initial={false}
            transition={{
              duration: 3.6,
              ease: "easeInOut",
              repeat: shouldAnimateMetal ? Infinity : 0,
              repeatDelay: 0.5,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
