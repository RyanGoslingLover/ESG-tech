import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { SButton } from "@/components/ui/SButton";
import { Gauge } from "@/components/ui/SGauge";
import { ProgressBar } from "@/components/ui/SProgressBar";
import { useStore } from "@/store/useStore";
import { Share2, Printer, Activity, AlertCircle, CheckCircle2, Bell } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const taxonomies = [
  { code: "TH-Tax Eco", aligned: 8, total: 12 },
  { code: "CN-GC", aligned: 9, total: 14 },
  { code: "ASEAN Tax v3", aligned: 7, total: 10 },
  { code: "EU Taxonomy", aligned: 4, total: 12 },
];

const trend = [
  { m: "Apr", v: 64 }, { m: "May", v: 67 }, { m: "Jun", v: 70 },
  { m: "Jul", v: 71 }, { m: "Aug", v: 75 }, { m: "Sep", v: 78 },
];

const sensorMeta = [
  { id: "ELE-01", label: "Main Meter", unit: "kW", base: 142, swing: 18 },
  { id: "WTR-04", label: "Dye Line Flow", unit: "L/min", base: 38, swing: 6 },
  { id: "PH-02", label: "Effluent pH", unit: "pH", base: 7.4, swing: 0.4 },
  { id: "TMP-07", label: "Boiler Temp", unit: "°C", base: 168, swing: 9 },
];

export function Layer7Dashboard() {
  const { smes, currentSmeId, indicators, lang } = useStore();
  const sme = smes.find((s) => s.id === currentSmeId)!;
  const [mode, setMode] = useState<"live" | "static">("live");
  const [sensors, setSensors] = useState(sensorMeta.map((s) => ({ ...s, value: s.base })));
  const [alerts] = useState([
    { sev: "warn", msg: "pH trend approaching upper limit (8.0)", t: "12m" },
    { sev: "info", msg: "Solar inverter SR-02 firmware update available", t: "1h" },
    { sev: "ok", msg: "Q3 PEA bills fully reconciled", t: "3h" },
  ]);

  useEffect(() => {
    const i = setInterval(() => {
      setSensors((prev) => prev.map((s) => ({ ...s, value: +(s.base + (Math.random() - 0.5) * s.swing).toFixed(1) })));
    }, 1500);
    return () => clearInterval(i);
  }, []);

  const cats = ["Energy", "Water", "Waste", "Labor", "Governance"] as const;
  const catScores = cats.map((c) => {
    const inds = indicators.filter((i) => i.category === c);
    const total = inds.reduce((a, i) => a + i.weight, 0);
    return { name: c, value: Math.min(100, 40 + Math.random() * 55), weight: total };
  });

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{lang === "en" ? "Executive ESG View" : "ภาพรวมผู้บริหาร"}</CardTitle>
            <div className="flex gap-1 rounded-md bg-brand-surface2 p-0.5 text-[10px]">
              <button onClick={() => setMode("live")} className={`rounded px-2 py-0.5 ${mode === "live" ? "bg-brand-surface3 text-brand-green" : "text-brand-text3"}`}>Claude Live</button>
              <button onClick={() => setMode("static")} className={`rounded px-2 py-0.5 ${mode === "static" ? "bg-brand-surface3 text-brand-green" : "text-brand-text3"}`}>Static HTML</button>
            </div>
          </CardHeader>
          <CardBody className="flex flex-col items-center gap-4">
            <Gauge value={sme.score} label="ESG" sublabel={sme.tier} />
            <div className="flex w-full gap-2">
              <SButton variant="secondary" size="sm" className="flex-1"><Share2 className="h-3.5 w-3.5" />{lang === "en" ? "Share" : "แชร์"}</SButton>
              <SButton variant="secondary" size="sm" className="flex-1"><Printer className="h-3.5 w-3.5" />{lang === "en" ? "Print" : "พิมพ์"}</SButton>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="lg:col-span-7">
        <CardHeader><CardTitle>{lang === "en" ? "Score Trend (6 mo)" : "แนวโน้มคะแนน (6 เดือน)"}</CardTitle></CardHeader>
        <CardBody className="h-52 pr-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <XAxis dataKey="m" stroke="hsl(var(--brand-text3))" fontSize={11} />
              <YAxis stroke="hsl(var(--brand-text3))" fontSize={11} domain={[50, 100]} />
              <Tooltip contentStyle={{ background: "hsl(var(--brand-surface3))", border: "1px solid hsl(var(--brand-border))", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="v" stroke="hsl(var(--brand-green))" strokeWidth={2.5} dot={{ fill: "hsl(var(--brand-green))" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card className="lg:col-span-7">
        <CardHeader><CardTitle>{lang === "en" ? "Category Breakdown" : "รายหมวด"}</CardTitle></CardHeader>
        <CardBody className="space-y-3">
          {catScores.map((c) => (
            <div key={c.name} className="grid grid-cols-12 items-center gap-3 text-xs">
              <span className="col-span-2 text-brand-text2">{c.name}</span>
              <div className="col-span-8"><ProgressBar value={c.value} tone={c.value >= 70 ? "green" : c.value >= 50 ? "amber" : "red"} /></div>
              <span className="col-span-2 text-right font-mono text-brand-text">{Math.round(c.value)}/100</span>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="lg:col-span-5">
        <CardHeader><CardTitle>{lang === "en" ? "Taxonomy Alignment" : "การจัดประเภท"}</CardTitle></CardHeader>
        <CardBody className="grid grid-cols-2 gap-3">
          {taxonomies.map((tax) => (
            <div key={tax.code} className="rounded-lg border border-brand-border bg-brand-surface2 p-3">
              <div className="text-xs text-brand-text3">{tax.code}</div>
              <div className="mt-1 flex items-baseline gap-1"><span className="text-xl font-bold text-brand-green">{tax.aligned}</span><span className="text-xs text-brand-text3">/{tax.total}</span></div>
              <ProgressBar value={(tax.aligned / tax.total) * 100} className="mt-2" />
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="lg:col-span-7">
        <CardHeader className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-brand-green pulse-dot" />
          <CardTitle>{lang === "en" ? "Live IoT Sensors" : "เซนเซอร์ IoT สด"}</CardTitle>
          <Chip tone="green" className="ml-auto" dot>streaming</Chip>
        </CardHeader>
        <CardBody className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {sensors.map((s) => (
            <div key={s.id} className="rounded-lg border border-brand-border bg-brand-surface2 p-3">
              <div className="font-mono text-[10px] text-brand-text3">{s.id}</div>
              <div className="text-xs text-brand-text2">{s.label}</div>
              <div className="mt-2 font-mono text-2xl font-bold text-brand-green tabular-nums">{s.value}<span className="ml-1 text-xs text-brand-text3">{s.unit}</span></div>
            </div>
          ))}
        </CardBody>
      </Card>

      <Card className="lg:col-span-5">
        <CardHeader><CardTitle>{lang === "en" ? "Green Loan Eligibility" : "สิทธิ์สินเชื่อสีเขียว"}</CardTitle></CardHeader>
        <CardBody>
          <div className={`rounded-lg border p-4 ${sme.score >= 70 ? "border-brand-green/40 bg-brand-green/10" : "border-brand-amber/40 bg-brand-amber/10"}`}>
            <div className="flex items-center gap-2">
              {sme.score >= 70 ? <CheckCircle2 className="h-5 w-5 text-brand-green" /> : <AlertCircle className="h-5 w-5 text-brand-amber" />}
              <span className="font-semibold">{sme.score >= 70 ? "Eligible — Track A" : "Pre-qualified — Track B"}</span>
            </div>
            <p className="mt-2 text-xs text-brand-text2">BOT Green Loan · up to ฿15M @ MLR-1.5% · 7 yr</p>
            <SButton variant="primary" size="sm" className="mt-3">{lang === "en" ? "Generate application" : "สร้างใบสมัคร"}</SButton>
          </div>
        </CardBody>
      </Card>

      <Card className="lg:col-span-12">
        <CardHeader className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-brand-amber" />
          <CardTitle>{lang === "en" ? "Alerts" : "การแจ้งเตือน"}</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2">
          {alerts.map((a, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <Chip tone={a.sev === "warn" ? "amber" : a.sev === "ok" ? "green" : "blue"}>{a.sev}</Chip>
              <span className="text-brand-text2">{a.msg}</span>
              <span className="ml-auto text-xs text-brand-text3">{a.t} ago</span>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
