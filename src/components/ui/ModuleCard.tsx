import { Link } from "react-router-dom";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  to: string;
  index: number;
  title: string;
  description: string;
  icon: LucideIcon;
  meta?: string;
  accent?: "green" | "blue" | "amber";
}

const accentMap = {
  green: "from-brand-green/20 to-transparent text-brand-green",
  blue: "from-brand-blue/20 to-transparent text-brand-blue",
  amber: "from-brand-amber/20 to-transparent text-brand-amber",
};

export function ModuleCard({ to, index, title, description, icon: Icon, meta, accent = "green" }: ModuleCardProps) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-brand-surface p-6 transition-all hover:-translate-y-0.5 hover:border-brand-borderStrong hover:shadow-glow"
    >
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b opacity-60", accentMap[accent])} />
      <div className="relative flex items-start justify-between">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl border border-brand-border bg-brand-surface2", accentMap[accent].split(" ").pop())}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-text3">
          Module {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3 className="relative mt-5 text-lg font-semibold tracking-tight text-brand-text">{title}</h3>
      <p className="relative mt-1.5 text-sm text-brand-text2 line-clamp-2">{description}</p>
      <div className="relative mt-5 flex items-center justify-between border-t border-brand-border pt-3">
        <span className="text-[11px] text-brand-text3">{meta}</span>
        <ArrowUpRight className="h-4 w-4 text-brand-text3 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-green" />
      </div>
    </Link>
  );
}
