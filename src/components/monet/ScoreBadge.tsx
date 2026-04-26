import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  taxonomy: "TH" | "CN";
  level: "green" | "amber" | "red" | "aligned" | "not-aligned";
  label?: string;
}

const styles: Record<string, string> = {
  green: "bg-emerald/10 text-emerald-deep border-emerald/30",
  amber: "bg-gold-soft text-gold-deep border-gold/40",
  red: "bg-red-50 text-red-700 border-red-200",
  aligned: "bg-emerald/10 text-emerald-deep border-emerald/30",
  "not-aligned": "bg-red-50 text-red-700 border-red-200",
};

const taxonomyLabel: Record<"TH" | "CN", string> = {
  TH: "Thailand Taxonomy",
  CN: "China Green Catalogue",
};

const levelTh: Record<string, string> = {
  green: "Green",
  amber: "Amber",
  red: "Red",
  aligned: "Aligned",
  "not-aligned": "Not Aligned",
};

export function ScoreBadge({ taxonomy, level, label }: ScoreBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium", styles[level])}>
      <span className="font-semibold">{taxonomyLabel[taxonomy]}</span>
      <span className="opacity-50">·</span>
      <span>{label ?? levelTh[level]}</span>
    </div>
  );
}
