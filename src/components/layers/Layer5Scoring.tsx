import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { SButton } from "@/components/ui/SButton";
import { Gauge } from "@/components/ui/SGauge";
import { ProgressBar } from "@/components/ui/SProgressBar";
import { useStore } from "@/store/useStore";
import { computeIndicatorScores, totalScore, tierFor } from "@/lib/scoring";
import { Calculator, Info, Zap, Droplet, Recycle, Users, ScrollText } from "lucide-react";

const catIcon = { Energy: Zap, Water: Droplet, Waste: Recycle, Labor: Users, Governance: ScrollText };

export function Layer5Scoring() {
  const { records, indicators, currentSmeId, lang, bumpScore } = useStore();
  const [animKey, setAnimKey] = useState(0);
  const scores = useMemo(() => computeIndicatorScores(records, indicators, currentSmeId), [records, indicators, currentSmeId, animKey]);
  const score = totalScore(scores);
  const tier = tierFor(score);

  const recalc = () => {
    setAnimKey((k) => k + 1);
    setTimeout(() => bumpScore(currentSmeId, Math.floor(Math.random() * 5) - 2), 300);
  };

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>{lang === "en" ? "Weighted Indicator Breakdown" : "รายละเอียดตัวชี้วัดถ่วงน้ำหนัก"}</CardTitle>
          <SButton variant="primary" size="sm" onClick={recalc}>
            <Calculator className="h-3.5 w-3.5" /> {lang === "en" ? "Recalculate" : "คำนวณใหม่"}
          </SButton>
        </CardHeader>
        <CardBody>
          <div className="mb-4 rounded-lg border border-brand-border bg-brand-surface2 p-3 font-mono text-xs text-brand-text2">
            score = Σ (weight<sub>i</sub> × normalized<sub>i</sub>) for i in 12 indicators · normalized ∈ [0,1]
          </div>
          <div className="space-y-1.5">
            {scores.map(({ indicator, rawValue, normalized, contribution }) => {
              const Icon = catIcon[indicator.category];
              return (
                <div key={indicator.id} className="grid grid-cols-12 items-center gap-3 rounded-lg border border-brand-border bg-brand-surface2/50 px-3 py-2 text-sm">
                  <div className="col-span-4 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-brand-green" />
                    <div>
                      <div className="text-brand-text">{lang === "en" ? indicator.name : indicator.nameTh}</div>
                      <div className="text-[10px] uppercase tracking-wide text-brand-text3">{indicator.category}</div>
                    </div>
                  </div>
                  <div className="col-span-1 text-center font-mono text-xs text-brand-text2">{indicator.weight}%</div>
                  <div className="col-span-2 font-mono text-xs text-brand-text2">{rawValue} <span className="text-brand-text3">{indicator.unit}</span></div>
                  <div className="col-span-3"><ProgressBar value={normalized * 100} tone={normalized > 0.7 ? "green" : normalized > 0.4 ? "amber" : "red"} /></div>
                  <div className="col-span-2 text-right font-mono text-sm font-semibold text-brand-green">+{contribution}</div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardBody className="flex flex-col items-center">
            <Gauge key={animKey} value={score} label={lang === "en" ? "ESG Score" : "คะแนน ESG"} sublabel={lang === "en" ? "0–100" : "0–100"} />
            <Chip tone={score >= 80 ? "green" : score >= 55 ? "amber" : "red"} className="mt-3">{tier}</Chip>
            <p className="mt-3 text-center text-xs text-brand-text2">
              {lang === "en"
                ? `${score >= 70 ? "Eligible" : "Not yet eligible"} for Green Loan Track A · Bank of Thailand`
                : `${score >= 70 ? "มีสิทธิ์" : "ยังไม่มีสิทธิ์"}สินเชื่อสีเขียว Track A`}
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><CardTitle>{lang === "en" ? "Rule Provenance" : "ที่มาของกฎ"}</CardTitle></CardHeader>
          <CardBody className="space-y-2 text-xs text-brand-text2">
            <p><Info className="mr-1 inline h-3 w-3 text-brand-green" />TH-Tax Eco §17 (Energy intensity)</p>
            <p><Info className="mr-1 inline h-3 w-3 text-brand-green" />CN-GC Annex B (Water reuse rate)</p>
            <p><Info className="mr-1 inline h-3 w-3 text-brand-green" />ASEAN Taxonomy v3 (Hazardous chem)</p>
            <p><Info className="mr-1 inline h-3 w-3 text-brand-green" />ISO 14001:2015 (Governance)</p>
            <p><Info className="mr-1 inline h-3 w-3 text-brand-green" />BOT Green Loan Guideline 2024</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
