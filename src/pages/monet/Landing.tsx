import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, FileText, Globe2, Leaf, Lock, Sparkles } from "lucide-react";
import { MonetLayout } from "@/components/monet/layout/MonetLayout";
import { Button } from "@/components/ui/button";
import { CitationChip } from "@/components/monet/CitationChip";

const valueProps = [
  {
    icon: ShieldCheck,
    title: "ตามมาตรฐาน Thailand Taxonomy Phase 2",
    desc: "เทียบทุกคำถามกับเกณฑ์ Substantial Contribution และ DNSH ของอุตสาหกรรมสิ่งทอ",
  },
  {
    icon: Globe2,
    title: "เทียบ China Green Bond Catalogue 2021",
    desc: "เปิดทางสู่สินเชื่อเขียวจากธนาคารจีนและคู่ค้า FDI ในเขต GBA",
  },
  {
    icon: FileText,
    title: "รายงาน PDF พร้อมยื่นธนาคาร",
    desc: "ดาวน์โหลดเอกสารพร้อมยื่น SME Bank, EXIM, KBank Green Loan ภายใน 1 คลิก",
  },
];

const partners = [
  { name: "BOT", full: "Bank of Thailand" },
  { name: "SET", full: "ตลาดหลักทรัพย์ฯ" },
  { name: "SME Bank", full: "ธพว." },
  { name: "Fudan FISF", full: "复旦大学" },
];

export default function Landing() {
  return (
    <MonetLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-emerald-bg/60 to-transparent" />
        <div className="container max-w-6xl pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald-bg px-3 py-1 text-xs font-medium text-primary">
                <Leaf className="h-3 w-3" /> ฟรี · ภาษาไทย · ประมวลผลในเครื่อง
              </div>
              <h1 className="mt-5 text-[34px] font-bold leading-[1.15] text-ink md:text-[44px]">
                ประเมินความพร้อมธุรกิจสิ่งทอของคุณ
                <br />
                สู่ <span className="text-primary">Green Finance</span> ใน 15 นาที
              </h1>
              <p className="mt-5 max-w-xl text-base text-ink-2 leading-relaxed md:text-lg">
                สำหรับโรงงานทอผ้า ย้อม ตัดเย็บ และตกแต่งสำเร็จขนาด 10–200 คน
                ที่อยากเข้าถึงสินเชื่อเขียวจากธนาคารไทยและพันธมิตร FDI จากจีน
                — โดยไม่ต้องจ้างที่ปรึกษา ESG
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-12 rounded-xl bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90">
                  <Link to="/assessment/start">
                    เริ่มประเมินทันที <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 rounded-xl border-border px-5 text-base">
                  <Link to="/ask">ดูตัวอย่างคำถาม</Link>
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-ink-3">
                <Lock className="h-3.5 w-3.5" />
                ข้อมูลไม่ออกจากเครื่องของคุณ — ประมวลผลด้วย Local LLM
              </div>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-elevated">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-ink-3">ตัวอย่างผลประเมิน</div>
                  <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[11px] font-medium text-gold-deep">Transition</span>
                </div>
                <div className="mt-4 flex items-end gap-4">
                  <div className="relative h-32 w-32">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle cx="60" cy="60" r="52" stroke="hsl(var(--secondary))" strokeWidth="10" fill="none" />
                      <circle
                        cx="60" cy="60" r="52"
                        stroke="hsl(var(--primary))" strokeWidth="10" fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(62 / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-ink">62</span>
                      <span className="text-[10px] uppercase tracking-wider text-ink-3">/ 100</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      { label: "พลังงาน", v: 58 },
                      { label: "น้ำ", v: 71 },
                      { label: "ของเสีย", v: 49 },
                      { label: "แรงงาน", v: 70 },
                    ].map((d) => (
                      <div key={d.label}>
                        <div className="flex justify-between text-[11px] text-ink-2">
                          <span>{d.label}</span>
                          <span className="font-medium">{d.v}</span>
                        </div>
                        <div className="mt-0.5 h-1.5 rounded-full bg-secondary">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${d.v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
                  <CitationChip source="Thailand Taxonomy Phase 2" page="§4.2" />
                  <CitationChip source="China Catalogue 2021" page="2.3.1" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-card md:flex md:items-center md:gap-2">
                <Sparkles className="h-4 w-4 text-gold" />
                <span className="text-xs font-medium text-ink-2">วิเคราะห์ด้วย AI ในเครื่อง</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="border-y border-border bg-surface-2">
        <div className="container max-w-6xl py-8">
          <div className="grid gap-6 md:grid-cols-3">
            <Stat number="74%" label="ของ SME ไทยยังไม่รู้จักหลักการ ESG" source="ผลสำรวจ TDRI × ก.ล.ต. 2566" />
            <Stat number="฿1.6 ล้านล้าน" label="วงเงินสินเชื่อเขียวที่ธนาคารไทยตั้งเป้าปล่อยภายใน 2570" source="BOT Sustainable Finance Initiative" />
            <Stat number="6 เดือน" label="เวลาเฉลี่ยที่ SME สิ่งทอใช้เตรียมเอกสาร ESG ด้วยตนเอง" source="สัมภาษณ์ผู้ประกอบการ 12 ราย" />
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="container max-w-6xl py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink">ทำไมต้อง Monet ESG</h2>
          <p className="mt-3 text-ink-2">
            สร้างขึ้นจากเกณฑ์จริงที่ธนาคารและนักลงทุนใช้ ไม่ใช่แบบสอบถามทั่วไป
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {valueProps.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-bg text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-t border-border bg-surface-2">
        <div className="container max-w-6xl py-12">
          <div className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-3">
            อ้างอิงเกณฑ์และข้อมูลจาก
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {partners.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-4 py-5 text-center"
              >
                <span className="font-latin text-base font-bold text-ink">{p.name}</span>
                <span className="mt-1 text-xs text-ink-3">{p.full}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] text-ink-3">
            * โลโก้องค์กรเป็นเพียงตัวแทนเพื่อระบุแหล่งอ้างอิง ไม่ได้แสดงความร่วมมืออย่างเป็นทางการ
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container max-w-6xl py-20">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-emerald-bg via-card to-card p-10 text-center md:p-14">
          <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
            พร้อมแล้วใช่ไหม? เริ่มต้นใช้งานฟรี ไม่ต้องสมัครสมาชิก
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-2">
            ใช้เวลาเฉลี่ย 12–18 นาทีต่อการประเมินหนึ่งครั้ง สามารถบันทึกและกลับมาทำต่อได้
          </p>
          <Button asChild size="lg" className="mt-8 h-12 rounded-xl bg-primary px-7 text-base font-semibold text-primary-foreground hover:bg-primary/90">
            <Link to="/assessment/start">
              เริ่มประเมินทันที <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </MonetLayout>
  );
}

function Stat({ number, label, source }: { number: string; label: string; source: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-primary md:text-4xl">{number}</div>
      <div className="mt-2 text-sm text-ink-2">{label}</div>
      <div className="mt-1 text-[11px] text-ink-3">ที่มา: {source}</div>
    </div>
  );
}
