type AnimatedWaveDividerProps = {
  className?: string;
  position?: "top" | "bottom";
  variant?: "navy" | "white";
};

const colorClasses: Record<NonNullable<AnimatedWaveDividerProps["variant"]>, string> = {
  navy: "text-accwise-navy",
  white: "text-white",
};

const positionClasses: Record<NonNullable<AnimatedWaveDividerProps["position"]>, string> = {
  bottom: "bottom-[-1px]",
  top: "top-0",
};

const svgPositionClasses: Record<NonNullable<AnimatedWaveDividerProps["position"]>, string> = {
  bottom: "bottom-0",
  top: "top-0",
};

const craftoWaveStill =
  "M0 58C180 34 360 34 560 52C820 76 1080 78 1440 66L1440 120L0 120Z";

export function AnimatedWaveDivider({
  className = "",
  position = "bottom",
  variant = "white",
}: AnimatedWaveDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`accwise-wave-divider pointer-events-none absolute ${positionClasses[position]} left-0 h-24 w-full overflow-hidden ${colorClasses[variant]} ${className}`}
    >
      <svg
        className={`absolute ${svgPositionClasses[position]} left-0 h-full w-full`}
        preserveAspectRatio="none"
        viewBox="0 0 1440 120"
      >
        <path
          className="accwise-wave-static"
          d={craftoWaveStill}
          fill="currentColor"
        />
        <path
          className="accwise-wave-motion"
          d={craftoWaveStill}
          fill="currentColor"
        >
          <animate
            attributeName="d"
            dur="3.2s"
            repeatCount="indefinite"
            values={`${craftoWaveStill};
              M0 76C180 48 360 50 560 66C820 92 1080 88 1440 78L1440 120L0 120Z;
              M0 48C180 82 360 78 560 56C820 28 1080 46 1440 42L1440 120L0 120Z;
              ${craftoWaveStill}`}
          />
        </path>
      </svg>
    </div>
  );
}
