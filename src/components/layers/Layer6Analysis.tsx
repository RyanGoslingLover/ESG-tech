import { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { SButton } from "@/components/ui/SButton";
import { useStore } from "@/store/useStore";
import { TrendingUp, AlertTriangle, Target, ShieldAlert, Send, Sparkles } from "lucide-react";

const swot = {
  Strengths: { icon: TrendingUp, tone: "green" as const, items: ["Solid governance baseline (ESG policy v2)", "Above-target water reuse (43% vs 40%)", "Stable energy supply contracts"] },
  Weaknesses: { icon: AlertTriangle, tone: "amber" as const, items: ["Renewable share at 18% (target 30%)", "Training hours below sector median", "Inconsistent monthly bill submission"] },
  Gaps: { icon: Target, tone: "blue" as const, items: ["No Scope 3 inventory", "Missing chemical SDS for 2 dyes", "Annual sust. report not yet drafted"] },
  Risks: { icon: ShieldAlert, tone: "red" as const, items: ["EU CBAM exposure on dyed exports", "Drought risk Q2 (Chao Phraya basin)", "Wastewater pH compliance trend ↓"] },
};

const actions = [
  { name: "Install 200 kWp rooftop solar", impact: "+6 ESG · ฿180K/yr", effort: "M", timeline: "6 mo" },
  { name: "Deploy water reuse loop in dyeing", impact: "+4 ESG · ฿95K/yr", effort: "L", timeline: "9 mo" },
  { name: "Adopt ZDHC chemical inventory", impact: "+3 ESG · compliance", effort: "S", timeline: "2 mo" },
  { name: "Quarterly safety drills + log", impact: "+2 ESG · −40% LTI", effort: "S", timeline: "1 mo" },
  { name: "Publish first sust. report (GRI)", impact: "+5 ESG · investor", effort: "M", timeline: "4 mo" },
];

const heat = [
  { x: 1, y: 3, label: "CBAM" },
  { x: 2, y: 3, label: "Drought" },
  { x: 3, y: 2, label: "pH non-comp" },
  { x: 2, y: 2, label: "Talent" },
  { x: 1, y: 1, label: "FX" },
];

export function Layer6Analysis() {
  const lang = useStore((s) => s.lang);
  const [q, setQ] = useState("");
  const [resp, setResp] = useState("");
  const [streaming, setStreaming] = useState(false);

  const ask = () => {
    if (!q.trim()) return;
    setStreaming(true);
    setResp("");
    const full =
      "Based on Q3 evidence, your fastest path to Tier 2 is: (1) commission rooftop solar to lift Renewable Share above 25% — that alone adds ~6 points; (2) document the dyeing reuse loop you already operate informally — adds 4 points and unlocks BOT Green Loan eligibility for retrofits. Estimated ROI window: 14 months. I can draft the BOT application in your name.";
    let i = 0;
    const id = setInterval(() => {
      i += 4;
      setResp(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setStreaming(false);
      }
    }, 25);
  };

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-3">
      <div className="grid gap-6 lg:col-span-2 lg:grid-cols-2">
        {Object.entries(swot).map(([k, v]) => (
          <Card key={k}>
            <CardHeader className="flex items-center gap-2">
              <v.icon className={`h-4 w-4 text-brand-${v.tone === "green" ? "green" : v.tone === "amber" ? "amber" : v.tone === "blue" ? "blue" : "red"}`} />
              <CardTitle>{k}</CardTitle>
              <Chip tone={v.tone} className="ml-auto">{v.items.length}</Chip>
            </CardHeader>
            <CardBody>
              <ul className="space-y-2 text-sm text-brand-text2">
                {v.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-text3" />
                    {it}
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        ))}

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>{lang === "en" ? "Next Actions (ranked by impact / effort)" : "ขั้นตอนถัดไป"}</CardTitle></CardHeader>
          <CardBody className="space-y-2">
            {actions.map((a, i) => (
              <div key={a.name} className="flex items-center gap-3 rounded-lg border border-brand-border bg-brand-surface2/50 px-3 py-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-surface3 font-mono text-xs text-brand-green">{i + 1}</span>
                <div className="flex-1">
                  <div className="text-sm text-brand-text">{a.name}</div>
                  <div className="text-xs text-brand-text3">effort {a.effort} · {a.timeline}</div>
                </div>
                <Chip tone="green">{a.impact}</Chip>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>{lang === "en" ? "Risk Heatmap" : "แผนผังความเสี่ยง"}</CardTitle></CardHeader>
          <CardBody>
            <div className="flex">
              <div className="mr-2 flex flex-col-reverse justify-between py-1 text-[10px] text-brand-text3">
                <span>Low</span><span>Med</span><span>High</span>
              </div>
              <div className="grid flex-1 grid-cols-3 grid-rows-3 gap-1">
                {Array.from({ length: 9 }).map((_, i) => {
                  const x = (i % 3) + 1;
                  const y = 3 - Math.floor(i / 3);
                  const dots = heat.filter((h) => h.x === x && h.y === y);
                  const intensity = x * y;
                  return (
                    <div key={i} className={`relative aspect-square rounded ${
                      intensity >= 6 ? "bg-brand-red/15" : intensity >= 3 ? "bg-brand-amber/15" : "bg-brand-green/10"
                    }`}>
                      {dots.map((d, j) => (
                        <span key={j} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-text px-1.5 py-0.5 text-[9px] font-medium text-brand-bg shadow-glow"
                          style={{ marginLeft: j * 14 }}>
                          {d.label}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-2 text-center text-[10px] text-brand-text3">Likelihood →</div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-green" />
            <CardTitle>{lang === "en" ? "Ask the AI" : "ถาม AI"}</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex gap-2">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={lang === "en" ? "e.g. fastest path to Tier 2?" : "เช่น เส้นทางที่เร็วที่สุดสู่ Tier 2"}
                className="h-9 flex-1 rounded-lg border border-brand-border bg-brand-surface px-3 text-xs"
                onKeyDown={(e) => e.key === "Enter" && ask()}
              />
              <SButton variant="primary" size="sm" onClick={ask}><Send className="h-3.5 w-3.5" /></SButton>
            </div>
            {(resp || streaming) && (
              <div className="mt-3 rounded-lg border border-brand-border bg-brand-surface2 p-3 text-xs text-brand-text2">
                {resp}{streaming && <span className="ml-1 inline-block h-3 w-1 animate-pulse bg-brand-green align-middle" />}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
