import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="container max-w-6xl py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Leaf className="h-4 w-4" strokeWidth={2.25} />
              </div>
              <span className="font-bold">Monet ESG</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-ink-3 leading-relaxed">
              เครื่องมือประเมิน ESG ฟรีสำหรับ SME สิ่งทอไทย จัดทำขึ้นเป็นส่วนหนึ่งของพอร์ตงานวิจัยเพื่อสมัครเข้าศึกษาที่
              Fudan University FISF — Global Bachelor of Fintech
            </p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3">มาตรฐานอ้างอิง</div>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              <li>Thailand Taxonomy Phase 2</li>
              <li>China Green Bond Catalogue 2021</li>
              <li>ZDHC MRSL v3.1</li>
              <li>GRI 11 — Textile Sector</li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3">ความเป็นส่วนตัว</div>
            <p className="mt-3 text-sm text-ink-2 leading-relaxed">
              ข้อมูลของคุณประมวลผลในเครื่อง (Local LLM) เราไม่เก็บคำตอบหรือไฟล์หลักฐานบนเซิร์ฟเวอร์
            </p>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-ink-3 md:flex-row md:items-center">
          <span>© 2568 Monet ESG · Independent academic prototype.</span>
          <span className="font-latin">v0.1 — research preview</span>
        </div>
      </div>
    </footer>
  );
}
