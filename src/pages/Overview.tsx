import { useNavigate } from "react-router-dom";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { SButton } from "@/components/ui/SButton";
import { Gauge } from "@/components/ui/SGauge";
import { useStore, t } from "@/store/useStore";
import { runFullPipeline } from "@/lib/pipeline";
import { Play, ArrowRight, Building2, FileCheck2, Activity } from "lucide-react";

export function Overview() {
  const { smes, docs, reviews, currentSmeId, setCurrentSme, lang, pipelineRunning } = useStore();
  const sme = smes.find((s) => s.id === currentSmeId)!;
  const nav = useNavigate();

  const start = async () => {
    nav("/layer/1");
    await runFullPipeline((n) => nav(`/layer/${n}`));
    nav("/layer/7");
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardBody className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {lang === "en" ? "Smart ESG Readiness Infrastructure" : "โครงสร้างพื้นฐานความพร้อม ESG อัจฉริยะ"}
            </h1>
            <p className="mt-1 text-sm text-brand-text2">
              {lang === "en"
                ? "Demo control panel · Run the full 9-layer pipeline or jump to any layer."
                : "แผงควบคุมสาธิต · เริ่มไปป์ไลน์ 9 ชั้นหรือไปยังชั้นใดก็ได้"}
            </p>
          </div>
          <SButton variant="primary" size="lg" onClick={start} disabled={pipelineRunning}>
            <Play className="h-4 w-4" /> {t(lang, "ui.runPipeline")}
            <ArrowRight className="h-4 w-4" />
          </SButton>
        </CardBody>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card>
          <CardBody className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-brand-green" />
            <div>
              <div className="text-2xl font-bold">{smes.length}</div>
              <div className="text-xs text-brand-text3">{lang === "en" ? "SMEs onboarded" : "SME ที่ลงทะเบียน"}</div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center gap-3">
            <FileCheck2 className="h-8 w-8 text-brand-blue" />
            <div>
              <div className="text-2xl font-bold">{docs.length}</div>
              <div className="text-xs text-brand-text3">{lang === "en" ? "Evidence docs" : "เอกสารหลักฐาน"}</div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-brand-amber" />
            <div>
              <div className="text-2xl font-bold">{reviews.filter((r) => r.status === "pending").length}</div>
              <div className="text-xs text-brand-text3">{lang === "en" ? "Pending reviews" : "รอการตรวจ"}</div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="flex items-center justify-center">
            <Gauge value={sme.score} size={120} label={sme.tier} />
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>{lang === "en" ? "SME Portfolio" : "พอร์ตโฟลิโอ SME"}</CardTitle></CardHeader>
        <CardBody className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {smes.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentSme(s.id)}
              className={`rounded-lg border p-4 text-left transition-all ${
                s.id === currentSmeId
                  ? "border-brand-green bg-brand-green/5 shadow-glow"
                  : "border-brand-border bg-brand-surface2 hover:border-brand-border-strong"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-brand-text">{lang === "en" ? s.name : s.nameTh}</div>
                  <div className="text-xs text-brand-text3">{s.sector} · {s.province}</div>
                </div>
                <Chip tone={s.score >= 80 ? "green" : s.score >= 70 ? "blue" : s.score >= 55 ? "amber" : "red"}>{s.tier}</Chip>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-brand-green">{s.score}</span>
                <span className="text-xs text-brand-text3">/100</span>
              </div>
              <div className="mt-1 text-[10px] text-brand-text3">{s.employees} emp · ฿{s.revenueMTHB}M rev</div>
            </button>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
