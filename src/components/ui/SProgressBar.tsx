import { cn } from "@/lib/utils";

export function ProgressBar({ value, tone = "green", className }: { value: number; tone?: "green" | "amber" | "red" | "blue"; className?: string }) {
  const colors = {
    green: "bg-brand-green",
    amber: "bg-brand-amber",
    red: "bg-brand-red",
    blue: "bg-brand-blue",
  };
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-brand-surface3", className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700", colors[tone])}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
