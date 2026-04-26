import { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { SButton } from "@/components/ui/SButton";
import { useStore } from "@/store/useStore";
import { Image, FileText, MessageSquare, Play, Pause, RotateCcw, Download, Trophy } from "lucide-react";
import { toast } from "sonner";

const cues = [
  { t: 0, text: "Open with the problem: 99% of Thai textile SMEs can't access green finance." },
  { t: 45, text: "Demo Layer 1–3: capture, intake, AI extraction in 90 sec." },
  { t: 135, text: "Show Layer 5 scoring engine — recalculate live." },
  { t: 195, text: "Layer 7 dashboard — IoT live, taxonomy alignment, eligibility." },
  { t: 240, text: "Close with impact metric: 6 SMEs onboarded, 4 loan-ready in 3 mo." },
];

const qa = [
  { q: "How do you handle OCR errors on handwritten lab reports?", a: "Confidence threshold + Layer 8 human review queue with audit trail." },
  { q: "Is the scoring engine auditable by regulators?", a: "Yes — every indicator shows weight, raw value, source doc, and rule citation." },
  { q: "What's the cost per SME?", a: "≈฿1,200/mo on AWS + ฿800 in API calls. Subsidised by partner banks." },
  { q: "How does this differ from a normal ESG consultant?", a: "Continuous, cheaper by 40×, and audit-ready output for BOT/SET." },
  { q: "Privacy of SME financials?", a: "Per-tenant Sheets, RLS in DB, no cross-SME training." },
  { q: "Bilingual support?", a: "Full TH/EN toggle, OCR trained on Thai utility templates." },
  { q: "Integration with banks?", a: "Direct webhook to BOT Green Loan portal + SCB/KBank pilots." },
  { q: "Roadmap?", a: "v2 adds Scope 3 inventory + supplier cascade + EU CBAM module." },
];

export function Layer9Output() {
  const { lang } = useStore();
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      ref.current = window.setInterval(() => setT((x) => x + 1), 1000);
    } else if (ref.current) {
      clearInterval(ref.current);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [running]);

  const cue = [...cues].reverse().find((c) => t >= c.t);
  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex items-center gap-2">
          <Image className="h-4 w-4 text-brand-green" />
          <CardTitle>{lang === "en" ? "A0 Poster" : "โปสเตอร์ A0"}</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="aspect-[707/1000] overflow-hidden rounded-lg border border-brand-border bg-gradient-to-br from-brand-surface2 to-brand-bg p-4">
            <div className="border-b border-brand-green/30 pb-2">
              <div className="text-[10px] uppercase tracking-widest text-brand-green">KMUTNB Green Tech 2026</div>
              <div className="mt-1 text-base font-bold leading-tight text-brand-text">SERI — Smart ESG Readiness Infrastructure</div>
              <div className="text-[9px] text-brand-text3">Green-finance enablement for Thai textile SMEs</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1">
              {[1,2,3,4,5,6,7,8,9].map((n) => (
                <div key={n} className="rounded border border-brand-border bg-brand-surface2 p-1.5">
                  <div className="font-mono text-[8px] text-brand-green">L{n}</div>
                  <div className="mt-0.5 h-6 rounded bg-brand-surface3" />
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1 text-center">
              <div className="rounded bg-brand-green/10 p-2"><div className="text-base font-bold text-brand-green">6</div><div className="text-[8px] text-brand-text3">SMEs onboarded</div></div>
              <div className="rounded bg-brand-blue/10 p-2"><div className="text-base font-bold text-brand-blue">4</div><div className="text-[8px] text-brand-text3">Loan-ready</div></div>
              <div className="rounded bg-brand-amber/10 p-2"><div className="text-base font-bold text-brand-amber">฿78M</div><div className="text-[8px] text-brand-text3">Capital unlocked</div></div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-brand-green" />
          <CardTitle>{lang === "en" ? "5-min Demo Script" : "สคริปต์เดโม 5 นาที"}</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="rounded-lg border border-brand-border bg-brand-surface2 p-4 text-center">
            <div className="font-mono text-4xl font-bold tabular-nums text-brand-green">{mm}:{ss}</div>
            <div className="mt-3 flex justify-center gap-2">
              <SButton size="sm" variant="primary" onClick={() => setRunning((r) => !r)}>
                {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {running ? "Pause" : "Start"}
              </SButton>
              <SButton size="sm" variant="secondary" onClick={() => { setRunning(false); setT(0); }}>
                <RotateCcw className="h-3.5 w-3.5" />Reset
              </SButton>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-brand-green/30 bg-brand-green/5 p-3 text-sm text-brand-text">
            <div className="text-[10px] uppercase tracking-wider text-brand-green">Now Saying</div>
            <div className="mt-1">{cue?.text ?? "Stand by…"}</div>
          </div>
          <ul className="mt-3 space-y-1 text-xs text-brand-text3">
            {cues.map((c) => (
              <li key={c.t} className={`flex gap-2 ${t >= c.t ? "text-brand-text2" : ""}`}>
                <span className="font-mono">{String(Math.floor(c.t/60)).padStart(2,"0")}:{String(c.t%60).padStart(2,"0")}</span>
                <span className="flex-1">{c.text}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-brand-green" />
          <CardTitle>{lang === "en" ? "Q&A Pack" : "ชุดคำถาม-คำตอบ"}</CardTitle>
        </CardHeader>
        <CardBody className="max-h-[28rem] space-y-2 overflow-y-auto pr-1 scrollbar-thin">
          {qa.map((item, i) => (
            <details key={i} className="rounded-lg border border-brand-border bg-brand-surface2 px-3 py-2 text-xs">
              <summary className="cursor-pointer font-medium text-brand-text">{i + 1}. {item.q}</summary>
              <p className="mt-2 text-brand-text2">{item.a}</p>
            </details>
          ))}
        </CardBody>
      </Card>

      <Card className="lg:col-span-3">
        <CardBody className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-green text-brand-bg"><Trophy className="h-5 w-5" /></div>
            <div>
              <div className="font-semibold">{lang === "en" ? "Competition Kit ready" : "ชุดสำหรับการแข่งขันพร้อม"}</div>
              <div className="text-xs text-brand-text3">Poster · Script · Q&A · Live demo URL · Slide deck (PDF)</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Chip tone="green" dot>v1.0 · {new Date().toISOString().slice(0,10)}</Chip>
            <SButton variant="primary" onClick={() => toast.success("Competition kit exported as SERI-kit-v1.zip (mock)")}>
              <Download className="h-4 w-4" />{lang === "en" ? "Export Kit" : "ดาวน์โหลดชุด"}
            </SButton>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
