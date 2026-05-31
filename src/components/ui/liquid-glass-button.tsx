import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LiquidButtonVariant = "primary" | "secondary" | "light" | "white";
type LiquidButtonSize = "sm" | "default" | "lg";

const baseClasses =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-semibold outline-none transition-[background,border-color,color,box-shadow,filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-55";

const sizeClasses: Record<LiquidButtonSize, string> = {
  sm: "min-h-11 px-5 text-sm",
  default: "min-h-12 px-6 text-sm",
  lg: "min-h-[3.25rem] px-7 text-sm",
};

const variantClasses: Record<LiquidButtonVariant, string> = {
  primary:
    "border border-white/25 bg-[linear-gradient(135deg,rgba(33,75,112,0.96),rgba(47,111,53,0.88))] text-white shadow-[0_14px_34px_rgba(33,75,112,0.26)] hover:border-white/80 hover:text-accwise-navy hover:shadow-[0_24px_44px_rgba(255,255,255,0.18)] focus-visible:outline-accwise-green",
  secondary:
    "border border-accwise-blue/24 bg-white/58 text-accwise-navy shadow-[0_12px_28px_rgba(22,37,66,0.12)] backdrop-blur-xl hover:border-accwise-green/55 hover:bg-white/76 hover:text-accwise-navy focus-visible:outline-accwise-blue",
  light:
    "border border-white/38 bg-white/12 text-white shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-xl hover:border-white/80 hover:text-accwise-navy hover:shadow-[0_24px_44px_rgba(255,255,255,0.18)] focus-visible:outline-white",
  white:
    "border border-white/55 bg-white/82 text-accwise-navy shadow-[0_14px_34px_rgba(0,0,0,0.16)] backdrop-blur-xl hover:bg-white focus-visible:outline-white",
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function LiquidGlassChrome() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_6px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.1),inset_3px_3px_0.5px_-3px_rgba(255,255,255,0.82),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.55),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.55),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.35),inset_0_0_10px_5px_rgba(255,255,255,0.1)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-full bg-white/88 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 motion-reduce:transition-none"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.04)_42%,rgba(0,0,0,0.08))] opacity-90"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[-70%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition duration-700 group-hover:left-[120%] group-hover:opacity-100"
      />
    </>
  );
}

type LiquidButtonContentProps = {
  children: ReactNode;
  showArrow?: boolean;
};

function RollingLabel({ text }: { text: string }) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-block h-[1.1em] overflow-hidden align-[-0.1em] leading-none"
    >
      <span className="flex flex-col transition-transform duration-[820ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:-translate-y-1/2 motion-reduce:transform-none motion-reduce:transition-none">
        <span className="block h-[1.1em] whitespace-nowrap leading-[1.1]">
          {text}
        </span>
        <span className="block h-[1.1em] whitespace-nowrap leading-[1.1]">
          {text}
        </span>
      </span>
    </span>
  );
}

function LiquidButtonContent({
  children,
  showArrow = false,
}: LiquidButtonContentProps) {
  if (typeof children === "string") {
    const visibleLabel = showArrow ? `${children} ->` : children;

    return (
      <>
        <LiquidGlassChrome />
        <span className="sr-only">{visibleLabel}</span>
        <span
          aria-hidden="true"
          className="relative z-10 inline-flex items-center justify-center"
        >
          <RollingLabel text={visibleLabel} />
        </span>
      </>
    );
  }

  return (
    <>
      <LiquidGlassChrome />
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
        {showArrow ? (
          <span
            aria-hidden="true"
            className="translate-x-0 text-base leading-none transition group-hover:translate-x-0.5"
          >
            -&gt;
          </span>
        ) : null}
      </span>
    </>
  );
}

export type LiquidButtonLinkProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "className"
> & {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  size?: LiquidButtonSize;
  variant?: LiquidButtonVariant;
};

export function LiquidButtonLink({
  children,
  className,
  showArrow,
  size = "default",
  variant = "primary",
  ...props
}: LiquidButtonLinkProps) {
  return (
    <Link
      className={cx(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      <LiquidButtonContent showArrow={showArrow}>{children}</LiquidButtonContent>
    </Link>
  );
}

export type LiquidButtonProps =
  ComponentPropsWithoutRef<"button"> & {
    showArrow?: boolean;
    size?: LiquidButtonSize;
    variant?: LiquidButtonVariant;
  };

export function LiquidButton({
  children,
  className,
  showArrow,
  size = "default",
  type = "button",
  variant = "primary",
  ...props
}: LiquidButtonProps) {
  return (
    <button
      className={cx(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      type={type}
      {...props}
    >
      <LiquidButtonContent showArrow={showArrow}>{children}</LiquidButtonContent>
    </button>
  );
}
