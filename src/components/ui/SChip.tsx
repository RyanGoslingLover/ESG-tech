import { cn } from "@/lib/utils";

type Tone = "green" | "amber" | "red" | "blue" | "gray" | "outline";

const tones: Record<Tone, string> = {
  green: "bg-brand-green/15 text-brand-green border-brand-green/30",
  amber: "bg-brand-amber/15 text-brand-amber border-brand-amber/30",
  red: "bg-brand-red/15 text-brand-red border-brand-red/30",
  blue: "bg-brand-blue/15 text-brand-blue border-brand-blue/30",
  gray: "bg-brand-surface3 text-brand-text2 border-brand-border",
  outline: "bg-transparent text-brand-text2 border-brand-border",
};

export function Chip({
  tone = "gray",
  children,
  className,
  dot,
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", `bg-current`)} />}
      {children}
    </span>
  );
}
