import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { Cloud, CheckCircle2, Wifi } from "lucide-react";

export function StatusBar() {
  const { pipelineRunning, layerStatus, lang } = useStore();
  const done = Object.values(layerStatus).filter((s) => s === "done").length;
  const [savedAt, setSavedAt] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setSavedAt(Date.now()), 5000);
    return () => clearInterval(i);
  }, []);
  const secs = Math.floor((Date.now() - savedAt) / 1000);

  return (
    <div className="flex h-7 items-center justify-between border-t border-brand-border bg-brand-surface/60 px-4 text-[11px] text-brand-text3">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-green" />
          {pipelineRunning
            ? lang === "en" ? "Pipeline running…" : "ไปป์ไลน์กำลังทำงาน…"
            : lang === "en" ? "Idle" : "พร้อมใช้งาน"}
        </span>
        <span>·</span>
        <span>{done}/9 {lang === "en" ? "layers complete" : "ชั้นเสร็จสิ้น"}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5"><Wifi className="h-3 w-3" /> Drive · Make · Sheets</span>
        <span className="flex items-center gap-1.5"><Cloud className="h-3 w-3" /> {lang === "en" ? "Synced" : "ซิงค์แล้ว"} {secs}s</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3 text-brand-green" /> auto-save</span>
      </div>
    </div>
  );
}
