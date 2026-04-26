import { Sparkles, Lock } from "lucide-react";

export function AIChatPanel() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-bg text-primary">
          <Sparkles className="h-3.5 w-3.5" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-ink">ผู้ช่วย AI</div>
          <div className="flex items-center gap-1 text-[10px] text-ink-3">
            <Lock className="h-2.5 w-2.5" /> Local LLM · ข้อมูลไม่ออกจากเครื่องของคุณ
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        <div className="rounded-xl bg-surface-2 p-3 text-xs text-ink-2">
          <div className="font-medium text-ink mb-1">คำแนะนำ</div>
          อ่านคำถามด้านซ้าย ถ้าไม่แน่ใจให้กดดู "เกณฑ์อ้างอิง" ใต้คำถาม — ผมจะช่วยตีความเกณฑ์ Thailand Taxonomy ให้
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-dashed border-border p-3 text-xs text-ink-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-gold" />
          กำลังโหลดโมเดล Local LLM (Llama-3.1 8B Q4_K_M)…
        </div>
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-3 py-2 text-xs text-ink-3">
          <input
            disabled
            placeholder="ถามเกี่ยวกับเกณฑ์นี้…"
            className="flex-1 bg-transparent placeholder:text-ink-mute focus:outline-none"
          />
          <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium">ปิดชั่วคราว</span>
        </div>
      </div>
    </div>
  );
}
