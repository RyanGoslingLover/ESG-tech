import { Link, NavLink } from "react-router-dom";
import { Leaf, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMonet, t } from "@/store/useMonet";
import { Button } from "@/components/ui/button";

const navItems: { to: string; key: string }[] = [
  { to: "/assessment/start", key: "nav.assess" },
  { to: "/results", key: "nav.results" },
  { to: "/monitor", key: "nav.monitor" },
  { to: "/ask", key: "nav.ask" },
];

export function TopNav() {
  const { lang, toggleLang } = useMonet();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 max-w-6xl items-center gap-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="h-4.5 w-4.5" strokeWidth={2.25} />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight">Monet ESG</div>
            <div className="text-[10px] uppercase tracking-[0.14em] text-ink-3">Thai Textile Edition</div>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-bg text-primary"
                    : "text-ink-2 hover:bg-secondary hover:text-ink"
                )
              }
            >
              {t(lang, item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-2.5 text-xs font-medium text-ink-2 transition-colors hover:text-ink"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5" />
            <span className="font-latin">{lang === "th" ? "ไทย" : "EN"}</span>
          </button>
          <Button asChild size="sm" className="hidden h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex">
            <Link to="/assessment/start">{t(lang, "cta.primary")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
