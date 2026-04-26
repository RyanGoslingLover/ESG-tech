import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-gradient-green text-brand-bg hover:brightness-110 shadow-glow font-semibold",
  secondary: "bg-brand-surface3 text-brand-text hover:bg-brand-border-strong border border-brand-border",
  ghost: "text-brand-text2 hover:text-brand-text hover:bg-brand-surface2",
  outline: "border border-brand-border-strong text-brand-text hover:bg-brand-surface2",
  danger: "bg-brand-red/20 text-brand-red border border-brand-red/40 hover:bg-brand-red/30",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const SButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "secondary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-brand-green/40 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
SButton.displayName = "SButton";
