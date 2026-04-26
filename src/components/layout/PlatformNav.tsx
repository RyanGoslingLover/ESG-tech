import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useStore, t } from "@/store/useStore";
import { ChevronDown, LayoutGrid } from "lucide-react";

const modules = [
  { n: 1, group: "Data" },
  { n: 2, group: "Data" },
  { n: 3, group: "AI" },
  { n: 4, group: "Data" },
  { n: 5, group: "Insights" },
  { n: 6, group: "AI" },
  { n: 7, group: "Insights" },
  { n: 8, group: "Operations" },
  { n: 9, group: "Operations" },
];

const groupOrder = ["Data", "AI", "Insights", "Operations"];

export function PlatformNav() {
  const lang = useStore((s) => s.lang);
  const loc = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenGroup(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => setOpenGroup(null), [loc.pathname]);

  const currentN = loc.pathname.match(/^\/layer\/(\d+)/)?.[1];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-border bg-brand-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-green text-brand-bg font-bold shadow-glow">
            S
          </div>
          <div className="leading-tight">
            <div className="font-bold tracking-tight">SERI</div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-brand-text3">
              ESG Platform
            </div>
          </div>
        </NavLink>

        <nav ref={ref} className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-surface2 text-brand-text"
                  : "text-brand-text2 hover:bg-brand-surface/60 hover:text-brand-text"
              )
            }
          >
            <LayoutGrid className="h-4 w-4" />
            {lang === "en" ? "Home" : "หน้าหลัก"}
          </NavLink>

          {groupOrder.map((g) => {
            const items = modules.filter((m) => m.group === g);
            const isOpen = openGroup === g;
            const hasActive = items.some((m) => String(m.n) === currentN);
            return (
              <div key={g} className="relative">
                <button
                  onClick={() => setOpenGroup(isOpen ? null : g)}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    hasActive || isOpen
                      ? "bg-brand-surface2 text-brand-text"
                      : "text-brand-text2 hover:bg-brand-surface/60 hover:text-brand-text"
                  )}
                >
                  {g}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <div className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-brand-border bg-brand-surface p-2 shadow-2xl">
                    {items.map((m) => (
                      <NavLink
                        key={m.n}
                        to={`/layer/${m.n}`}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-brand-surface3 text-brand-text"
                              : "text-brand-text2 hover:bg-brand-surface2 hover:text-brand-text"
                          )
                        }
                      >
                        <span className="font-mono text-[10px] text-brand-text3">M{m.n}</span>
                        <span>{t(lang, `layers.${m.n}`)}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
