import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { SButton } from "@/components/ui/SButton";
import { useStore } from "@/store/useStore";
import { FileText, FolderOpen, Workflow, Webhook } from "lucide-react";

const sources = [
  { id: "forms", name: "Google Forms", desc: "Site supervisors submit weekly readings", icon: FileText, status: "connected" },
  { id: "drive", name: "Google Drive", desc: "Auto-watch /SERI-Inbox/ for new evidence", icon: FolderOpen, status: "connected" },
  { id: "make", name: "Make.com", desc: "Webhook → AI module → Sheets writer", icon: Workflow, status: "connected" },
];

export function Layer2Intake() {
  const lang = useStore((s) => s.lang);
  const [events, setEvents] = useState<{ ts: string; src: string; msg: string }[]>([
    { ts: "08:14:02", src: "Drive", msg: "PEA-2025-09.pdf detected → AI extract triggered" },
    { ts: "08:14:08", src: "Make", msg: "Type detector → 'utility-bill' (97%)" },
    { ts: "08:14:11", src: "Sheets", msg: "Wrote 12 fields to SST!Bills" },
    { ts: "08:14:11", src: "Notify", msg: "LINE alert → @site-manager-sst" },
  ]);

  useEffect(() => {
    const i = setInterval(() => {
      const now = new Date();
      const ts = now.toTimeString().slice(0, 8);
      setEvents((prev) => [
        { ts, src: "Drive", msg: `${["lab", "bill", "csv"][Math.floor(Math.random() * 3)]}-${Math.floor(Math.random() * 999)}.pdf detected` },
        ...prev.slice(0, 14),
      ]);
    }, 4500);
    return () => clearInterval(i);
  }, []);

  const replay = () => {
    const now = new Date().toTimeString().slice(0, 8);
    setEvents((prev) => [
      { ts: now, src: "Replay", msg: "Re-pushed batch: 3 events" },
      { ts: now, src: "Drive", msg: "PEA-2025-09.pdf (replay)" },
      { ts: now, src: "Drive", msg: "MWA-2025-09.pdf (replay)" },
      { ts: now, src: "Drive", msg: "Lab-SST-Q3.pdf (replay)" },
      ...prev,
    ]);
  };

  const stages = [
    { x: 60, label: "Drive trigger" },
    { x: 220, label: "Type detector" },
    { x: 380, label: "AI extract" },
    { x: 540, label: "Sheets write" },
    { x: 700, label: "Notify" },
  ];

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-3">
      {sources.map((s) => (
        <Card key={s.id}>
          <CardBody className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-surface3">
              <s.icon className="h-6 w-6 text-brand-green" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-brand-text">{s.name}</h4>
                <Chip tone="green" dot>connected</Chip>
              </div>
              <p className="mt-1 text-xs text-brand-text2">{s.desc}</p>
            </div>
          </CardBody>
        </Card>
      ))}

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>{lang === "en" ? "Make.com Workflow" : "ขั้นตอน Make.com"}</CardTitle></CardHeader>
        <CardBody>
          <svg viewBox="0 0 780 160" className="w-full">
            {stages.slice(0, -1).map((s, i) => (
              <line
                key={i}
                x1={s.x + 30} y1={80}
                x2={stages[i + 1].x - 30} y2={80}
                className="stroke-brand-green flow-dash"
                strokeWidth={2}
              />
            ))}
            {stages.map((s, i) => (
              <g key={i}>
                <circle cx={s.x} cy={80} r={26} className="fill-brand-surface2 stroke-brand-green" strokeWidth={2} />
                <text x={s.x} y={86} textAnchor="middle" className="fill-brand-green font-mono text-[14px] font-bold">{i + 1}</text>
                <text x={s.x} y={130} textAnchor="middle" className="fill-brand-text2 text-[11px]">{s.label}</text>
              </g>
            ))}
          </svg>
          <SButton variant="secondary" size="sm" className="mt-2" onClick={replay}>
            <Webhook className="h-3.5 w-3.5" /> {lang === "en" ? "Replay last batch" : "เล่นซ้ำชุดล่าสุด"}
          </SButton>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>{lang === "en" ? "Webhook Log" : "บันทึก Webhook"}</CardTitle></CardHeader>
        <CardBody className="max-h-80 overflow-y-auto p-0 scrollbar-thin">
          <div className="divide-y divide-brand-border">
            {events.map((e, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-2 text-xs">
                <span className="font-mono text-brand-text3">{e.ts}</span>
                <Chip tone={e.src === "Replay" ? "amber" : "blue"} className="shrink-0">{e.src}</Chip>
                <span className="text-brand-text2">{e.msg}</span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
