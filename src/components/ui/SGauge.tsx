import { cn } from "@/lib/utils";

interface Props {
  value: number; // 0-100
  size?: number;
  label?: string;
  sublabel?: string;
}

export function Gauge({ value, size = 180, label, sublabel }: Props) {
  const v = Math.max(0, Math.min(100, value));
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const offset = c - (v / 100) * c;
  const tone = v >= 80 ? "stroke-brand-green" : v >= 55 ? "stroke-brand-amber" : "stroke-brand-red";

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={12} className="stroke-brand-surface3" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={12}
          className={cn(tone, "transition-all duration-700")}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-brand-text">{Math.round(v)}</span>
        {label && <span className="mt-1 text-xs uppercase tracking-widest text-brand-text2">{label}</span>}
        {sublabel && <span className="text-xs text-brand-text3">{sublabel}</span>}
      </div>
    </div>
  );
}
