import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-semibold transition duration-300 ease-out hover:scale-[1.025] active:translate-y-px active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-white/25 bg-[linear-gradient(135deg,rgba(76,157,225,0.96),rgba(100,183,59,0.88))] text-white shadow-[0_14px_34px_rgba(76,157,225,0.26)] hover:brightness-110 focus-visible:outline-accwise-green",
        destructive:
          "border border-red-200 bg-red-600 text-white shadow-[0_14px_34px_rgba(185,28,28,0.22)] hover:brightness-110 focus-visible:outline-red-500",
        outline:
          "border border-accwise-blue/24 bg-white/58 text-accwise-navy shadow-[0_12px_28px_rgba(22,37,66,0.12)] backdrop-blur-xl hover:border-accwise-green/55 hover:bg-white/76 focus-visible:outline-accwise-blue",
        secondary:
          "border border-accwise-blue/24 bg-white/58 text-accwise-navy shadow-[0_12px_28px_rgba(22,37,66,0.12)] backdrop-blur-xl hover:border-accwise-green/55 hover:bg-white/76 focus-visible:outline-accwise-blue",
        ghost:
          "border border-transparent bg-white/10 text-accwise-navy hover:bg-white/30 focus-visible:outline-accwise-blue",
        link: "rounded-none text-accwise-green underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
