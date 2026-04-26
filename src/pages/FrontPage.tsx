import { useNavigate } from "react-router-dom";
import { ModuleCard } from "@/components/ui/ModuleCard";
import { SButton } from "@/components/ui/SButton";
import { Chip } from "@/components/ui/SChip";
import { Gauge } from "@/components/ui/SGauge";
import { useStore, t } from "@/store/useStore";
import { runFullPipeline } from "@/lib/pipeline";
import {
  Camera, Inbox, Sparkles, Database, Calculator, Brain, LayoutDashboard,
  UserCheck, Trophy, Play, ArrowRight, Building2, FileCheck2, Activity, Leaf,
} from "lucide-react";

const moduleMeta = [
  { n: 1, icon: Camera, accent: "green" as const },
  { n: 2, icon: Inbox, accent: "blue" as const },
  { n: 3, icon: Sparkles, accent: "green" as const },
  { n: 4, icon: Database, accent: "blue" as const },
  { n: 5, icon: Calculator, accent: "green" as const },
  { n: 6, icon: Brain, accent: "amber" as const },
  { n: 7, icon: LayoutDashboard, accent: "green" as const },
  { n: 8, icon: UserCheck, accent: "amber" as const },
  { n: 9, icon: Trophy, accent: "green" as const },
];

const descEN: Record<number, string> = {
  1: "Capture utility bills, lab reports, and field evidence from mobile or desktop.",
  2: "Connect Google Forms, Drive, and Make.com to ingest documents automatically.",
  3: "AI-powered field extraction with bounding boxes and confidence scoring.",
  4: "Spreadsheet-style structured data, synced live to Google Sheets.",
  5: "Transparent rule-based scoring across 12 weighted ESG indicators.",
  6: "SWOT analysis, risk heatmap, and ranked AI recommendations.",
  7: "Live executive dashboard with IoT streams and taxonomy alignment.",
  8: "Human-in-the-loop review queue for low-confidence AI extractions.",
  9: "Generate competition deliverables: poster, demo script, and Q&A pack.",
};
const descTH: Record<number, string> = {
  1: "บันทึกบิลค่าสาธารณูปโภคและเอกสารจากมือถือหรือเดสก์ท็อป",
  2: "เชื่อมต่อ Google Forms, Drive และ Make.com เพื่อรับเอกสารอัตโนมัติ",
  3: "สกัดข้อมูลด้วย AI พร้อมกรอบและค่าความมั่นใจ",
  4: "ข้อมูลโครงสร้างแบบสเปรดชีต ซิงค์กับ Google Sheets",
  5: "การให้คะแนนตามกฎโปร่งใส 12 ตัวชี้วัด ESG",
  6: "วิเคราะห์ SWOT แผนที่ความเสี่ยง และคำแนะนำจาก AI",
  7: "แดชบอร์ดผู้บริหารสด พร้อม IoT และการจัดแนว taxonomy",
  8: "คิวตรวจทานโดยมนุษย์สำหรับการสกัดที่ความมั่นใจต่ำ",
  9: "สร้างผลงานการแข่งขัน: โปสเตอร์ สคริปต์ และชุดคำถาม",
};

export function FrontPage() {
  const { smes, docs, reviews, currentSmeId, setCurrentSme, lang, pipelineRunning } = useStore();
  const sme = smes.find((s) => s.id === currentSmeId)!;
  const nav = useNavigate();

  const start = async () => {
    nav("/layer/1");
    await runFullPipeline((n) => nav(`/layer/${n}`));
    nav("/layer/7");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-brand-border bg-gradient-to-br from-brand-surface via-brand-surface2 to-brand-surface p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-10 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-brand-green">
              <Leaf className="h-3 w-3" /> KMUTNB Green Tech 2026
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-brand-text md:text-5xl">
              {lang === "en" ? (
                <>Smart ESG Readiness <span className="bg-gradient-green bg-clip-text text-transparent">Infrastructure</span></>
              ) : (
                <>โครงสร้างพื้นฐาน <span className="bg-gradient-green bg-clip-text text-transparent">ความพร้อม ESG</span></>
              )}
            </h1>
            <p className="mt-4 max-w-xl text-base text-brand-text2">
              {lang === "en"
                ? "An end-to-end portal helping Thai textile SMEs evidence their sustainability and unlock green-finance eligibility."
                : "พอร์ทัลครบวงจรช่วย SME สิ่งทอไทยพิสูจน์ความยั่งยืนและเข้าถึงการเงินสีเขียว"}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <SButton variant="primary" size="lg" onClick={start} disabled={pipelineRunning}>
                <Play className="h-4 w-4" /> {t(lang, "ui.runPipeline")}
                <ArrowRight className="h-4 w-4" />
              </SButton>
              <SButton variant="ghost" size="lg" onClick={() => nav("/layer/7")}>
                {lang === "en" ? "View Executive Summary" : "ดูสรุปผู้บริหาร"}
              </SButton>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-border bg-brand-bg/40 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-brand-text3">
                  {lang === "en" ? "Active SME" : "SME ปัจจุบัน"}
                </div>
                <div className="mt-1 text-lg font-semibold">{lang === "en" ? sme.name : sme.nameTh}</div>
                <div className="text-xs text-brand-text3">{sme.sector} · {sme.province}</div>
              </div>
              <Gauge value={sme.score} size={110} label={sme.tier} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-brand-border pt-5 text-center">
              <Stat icon={Building2} value={smes.length} label={lang === "en" ? "SMEs" : "SME"} />
              <Stat icon={FileCheck2} value={docs.length} label={lang === "en" ? "Docs" : "เอกสาร"} />
              <Stat icon={Activity} value={reviews.filter((r) => r.status === "pending").length} label={lang === "en" ? "Reviews" : "ตรวจ"} />
            </div>
          </div>
        </div>
      </section>

      {/* MODULES GRID */}
      <section className="mt-12">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {lang === "en" ? "Platform Modules" : "โมดูลแพลตฟอร์ม"}
            </h2>
            <p className="mt-1 text-sm text-brand-text2">
              {lang === "en" ? "Nine connected modules powering the SERI workflow." : "เก้าโมดูลที่เชื่อมต่อกันขับเคลื่อนเวิร์กโฟลว์ SERI"}
            </p>
          </div>
          <div className="hidden text-xs text-brand-text3 md:block">
            {lang === "en" ? "Click any card to enter the module." : "คลิกการ์ดเพื่อเข้าโมดูล"}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {moduleMeta.map((m) => (
            <ModuleCard
              key={m.n}
              to={`/layer/${m.n}`}
              index={m.n}
              icon={m.icon}
              accent={m.accent}
              title={t(lang, `layers.${m.n}`)}
              description={lang === "en" ? descEN[m.n] : descTH[m.n]}
              meta={lang === "en" ? "Open module →" : "เปิดโมดูล →"}
            />
          ))}
        </div>
      </section>

      {/* SME PORTFOLIO */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">
          {lang === "en" ? "SME Portfolio" : "พอร์ตโฟลิโอ SME"}
        </h2>
        <p className="mt-1 text-sm text-brand-text2">
          {lang === "en" ? "Switch context across registered SMEs." : "สลับบริบทระหว่าง SME ที่ลงทะเบียน"}
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {smes.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentSme(s.id)}
              className={`rounded-2xl border p-5 text-left transition-all ${
                s.id === currentSmeId
                  ? "border-brand-green bg-brand-green/5 shadow-glow"
                  : "border-brand-border bg-brand-surface hover:border-brand-borderStrong"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-brand-text">{lang === "en" ? s.name : s.nameTh}</div>
                  <div className="mt-0.5 text-xs text-brand-text3">{s.sector} · {s.province}</div>
                </div>
                <Chip tone={s.score >= 80 ? "green" : s.score >= 70 ? "blue" : s.score >= 55 ? "amber" : "red"}>
                  {s.tier}
                </Chip>
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-brand-green">{s.score}</span>
                <span className="text-xs text-brand-text3">/100</span>
              </div>
              <div className="mt-1 text-[10px] text-brand-text3">
                {s.employees} emp · ฿{s.revenueMTHB}M rev
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: any; value: number; label: string }) {
  return (
    <div>
      <Icon className="mx-auto h-4 w-4 text-brand-text3" />
      <div className="mt-1 text-lg font-bold text-brand-text">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-brand-text3">{label}</div>
    </div>
  );
}
