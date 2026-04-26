import { LucideIcon, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DimensionCardProps {
  icon: LucideIcon;
  title: string;
  score: number; // 0-100
  trend?: "up" | "down" | "flat";
  description?: string;
  iconColorClass?: string;
}

export function DimensionCard({ icon: Icon, title, score, trend = "flat", description, iconColorClass }: DimensionCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const tone = score >= 75 ? "text-emerald-deep" : score >= 50 ? "text-gold-deep" : "text-danger";
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-secondary", iconColorClass)}>
          <Icon className="h-5 w-5" />
        </div>
        <TrendIcon className={cn("h-4 w-4", trend === "up" ? "text-success" : trend === "down" ? "text-danger" : "text-ink-mute")} />
      </div>
      <h3 className="mt-4 text-sm font-medium text-ink-2">{title}</h3>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={cn("text-3xl font-bold", tone)}>{score}</span>
        <span className="text-xs text-ink-3">/ 100</span>
      </div>
      {description && <p className="mt-2 text-xs text-ink-3 leading-relaxed">{description}</p>}
    </div>
  );
}
