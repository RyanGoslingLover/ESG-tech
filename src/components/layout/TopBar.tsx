import { useStore, t } from "@/store/useStore";
import { useLocation, Link } from "react-router-dom";
import { Search, Languages, ChevronRight } from "lucide-react";

export function TopBar() {
  const { smes, currentSmeId, setCurrentSme, lang, toggleLang } = useStore();
  const sme = smes.find((s) => s.id === currentSmeId)!;
  const loc = useLocation();
  const layerMatch = loc.pathname.match(/^\/layer\/(\d+)/);
  const layerN = layerMatch ? Number(layerMatch[1]) : null;

  return (
    <header className="flex h-14 items-center gap-4 border-b border-brand-border bg-brand-surface/40 px-6 backdrop-blur">
      <nav className="flex items-center gap-2 text-sm">
        <Link to="/" className="text-brand-text2 hover:text-brand-text">
          {t(lang, "ui.overview")}
        </Link>
        {layerN && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-brand-text3" />
            <span className="text-brand-text">
              {lang === "en" ? `Layer ${layerN}` : `ชั้นที่ ${layerN}`} · {t(lang, `layers.${layerN}`)}
            </span>
          </>
        )}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-text3" />
          <input
            placeholder={lang === "en" ? "Search docs, fields, SMEs…" : "ค้นหา…"}
            className="h-9 w-64 rounded-lg border border-brand-border bg-brand-surface pl-8 pr-3 text-sm text-brand-text placeholder:text-brand-text3 focus:border-brand-green/50 focus:outline-none"
          />
        </div>

        <select
          value={currentSmeId}
          onChange={(e) => setCurrentSme(e.target.value)}
          className="h-9 rounded-lg border border-brand-border bg-brand-surface px-3 text-sm text-brand-text focus:border-brand-green/50 focus:outline-none"
        >
          {smes.map((s) => (
            <option key={s.id} value={s.id}>
              {lang === "en" ? s.name : s.nameTh}
            </option>
          ))}
        </select>

        <div className="hidden items-center gap-2 rounded-lg border border-brand-border bg-brand-surface px-3 py-1.5 text-xs lg:flex">
          <span className="text-brand-text3">{t(lang, "ui.score")}</span>
          <span className="font-bold text-brand-green">{sme.score}</span>
          <span className="text-brand-text3">·</span>
          <span className="text-brand-text2">{sme.tier}</span>
        </div>

        <button
          onClick={toggleLang}
          className="flex h-9 items-center gap-1.5 rounded-lg border border-brand-border bg-brand-surface px-3 text-sm text-brand-text2 hover:text-brand-text"
        >
          <Languages className="h-4 w-4" />
          <span className="font-mono text-xs">{lang === "en" ? "EN" : "ไทย"}</span>
        </button>
      </div>
    </header>
  );
}
