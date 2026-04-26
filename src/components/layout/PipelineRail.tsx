import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useStore, t } from "@/store/useStore";
import {
  Camera, Inbox, Sparkles, Database, Calculator, Brain, LayoutDashboard, UserCheck, Trophy,
  Check, Loader2,
} from "lucide-react";

const layers = [
  { n: 1, key: "1", icon: Camera },
  { n: 2, key: "2", icon: Inbox },
  { n: 3, key: "3", icon: Sparkles },
  { n: 4, key: "4", icon: Database },
  { n: 5, key: "5", icon: Calculator },
  { n: 6, key: "6", icon: Brain },
  { n: 7, key: "7", icon: LayoutDashboard },
  { n: 8, key: "8", icon: UserCheck },
  { n: 9, key: "9", icon: Trophy },
];

export function PipelineRail() {
  const lang = useStore((s) => s.lang);
  const layerStatus = useStore((s) => s.layerStatus);
  const loc = useLocation();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-brand-border bg-brand-surface/60 backdrop-blur">
      <NavLink
        to="/"
        className={cn(
          "flex items-center gap-3 border-b border-brand-border px-5 py-4",
          loc.pathname === "/" && "bg-brand-surface2"
        )}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-green text-brand-bg font-bold">S</div>
        <div>
          <div className="font-bold tracking-tight text-brand-text">SERI</div>
          <div className="text-[10px] uppercase tracking-widest text-brand-text3">ESG Readiness</div>
        </div>
      </NavLink>

      <div className="px-4 pt-4 pb-2 text-[10px] uppercase tracking-widest text-brand-text3">
        {lang === "en" ? "9-Layer Pipeline" : "ไปป์ไลน์ 9 ชั้น"}
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 pb-4 scrollbar-thin">
        {layers.map(({ n, key, icon: Icon }) => {
          const status = layerStatus[n];
          return (
            <NavLink
              key={n}
              to={`/layer/${n}`}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                  isActive
                    ? "bg-brand-surface3 text-brand-text shadow-glow"
                    : "text-brand-text2 hover:bg-brand-surface2 hover:text-brand-text"
                )
              }
            >
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md border text-[11px] font-mono font-semibold",
                  status === "done"
                    ? "border-brand-green/50 bg-brand-green/10 text-brand-green"
                    : status === "running"
                    ? "border-brand-amber/50 bg-brand-amber/10 text-brand-amber"
                    : "border-brand-border bg-brand-surface text-brand-text3 group-hover:text-brand-text2"
                )}
              >
                {status === "running" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : status === "done" ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  n
                )}
              </div>
              <Icon className="h-4 w-4 shrink-0 opacity-70" />
              <span className="truncate">{t(lang, `layers.${key}`)}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-brand-border p-4 text-[11px] text-brand-text3">
        <div>KMUTNB Green Tech 2026</div>
        <div className="text-brand-text2">Prototype v1.0</div>
      </div>
    </aside>
  );
}
