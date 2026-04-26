import { useStore, t } from "@/store/useStore";
import { useLocation, Link } from "react-router-dom";
import { Search, Languages, ChevronRight } from "lucide-react";

export function SmeContextBar() {
  const { smes, currentSmeId, setCurrentSme, lang, toggleLang } = useStore();
  const sme = smes.find((s) => s.id === currentSmeId)!;
  const loc = useLocation();
  const layerN = loc.pathname.match(/^\/layer\/(\d+)/)?.[1];

  return (
    <div className="border-b border-brand-border bg-brand-surface/30">
      <div className="mx-auto flex h-12 max-w-7xl items-center gap-3 px-6">
        <nav className="flex items-center gap-2 text-xs">
          <Link to="/" className="text-brand-text3 hover:text-brand-text2">
            SERI
          </Link>
          <ChevronRight className="h-3 w-3 text-brand-text3" />
          <span className="text-brand-text2">
            {layerN
              ? `${lang === "en" ? "Module" : "โมดูล"} ${layerN} · ${t(lang, `layers.${layerN}`)}`
              : (lang === "en" ? "Portal Home" : "หน้าหลัก")}
          </span>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-brand-text3" />
            <input
              placeholder={lang === "en" ? "Search…" : "ค้นหา…"}
              className="h-8 w-56 rounded-md border border-brand-border bg-brand-surface pl-7 pr-3 text-xs text-brand-text placeholder:text-brand-text3 focus:border-brand-green/50 focus:outline-none"
            />
          </div>

          <select
            value={currentSmeId}
            onChange={(e) => setCurrentSme(e.target.value)}
            className="h-8 rounded-md border border-brand-border bg-brand-surface px-2 text-xs text-brand-text focus:border-brand-green/50 focus:outline-none"
          >
            {smes.map((s) => (
              <option key={s.id} value={s.id}>
                {lang === "en" ? s.name : s.nameTh}
              </option>
            ))}
          </select>

          <div className="hidden items-center gap-1.5 rounded-md border border-brand-border bg-brand-surface px-2.5 py-1 text-[11px] lg:flex">
            <span className="text-brand-text3">{t(lang, "ui.score")}</span>
            <span className="font-bold text-brand-green">{sme.score}</span>
            <span className="text-brand-text3">·</span>
            <span className="text-brand-text2">{sme.tier}</span>
          </div>

          <button
            onClick={toggleLang}
            className="flex h-8 items-center gap-1 rounded-md border border-brand-border bg-brand-surface px-2 text-xs text-brand-text2 hover:text-brand-text"
          >
            <Languages className="h-3.5 w-3.5" />
            <span className="font-mono">{lang === "en" ? "EN" : "ไทย"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
