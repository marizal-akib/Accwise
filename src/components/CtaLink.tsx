import { LiquidButtonLink } from "@/components/ui/liquid-glass-button";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  size?: "sm" | "default" | "lg";
  className?: string;
};

export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
}: CtaLinkProps) {
  return (
    <LiquidButtonLink
      className={className}
      href={href}
      showArrow
      size={size}
      variant={variant}
    >
      {children}
    </LiquidButtonLink>
  );
}
