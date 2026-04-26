import { useState, useRef, DragEvent } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { SButton } from "@/components/ui/SButton";
import { useStore } from "@/store/useStore";
import { Upload, Smartphone, FileText, Camera, CheckCircle2, Loader2 } from "lucide-react";

interface Item { name: string; size: string; status: "uploading" | "done" | "extracting"; }

export function Layer1Capture() {
  const { addDoc, currentSmeId, lang } = useStore();
  const [items, setItems] = useState<Item[]>([
    { name: "PEA-bill-2025-09.pdf", size: "1.2 MB", status: "done" },
    { name: "lab-report-Q3.pdf", size: "640 KB", status: "done" },
  ]);
  const [drag, setDrag] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const ingest = (names: string[]) => {
    names.forEach((name, i) => {
      const item: Item = { name, size: `${(Math.random() * 2 + 0.3).toFixed(1)} MB`, status: "uploading" };
      setItems((prev) => [item, ...prev]);
      setTimeout(() => {
        setItems((prev) => prev.map((p) => (p.name === name ? { ...p, status: "extracting" } : p)));
      }, 800 + i * 300);
      setTimeout(() => {
        setItems((prev) => prev.map((p) => (p.name === name ? { ...p, status: "done" } : p)));
        addDoc({
          id: `doc-${Date.now()}-${i}`,
          smeId: currentSmeId,
          type: "Auto-detected",
          filename: name,
          uploadedAt: new Date().toISOString(),
          status: "extracted",
          confidence: 80 + Math.floor(Math.random() * 18),
          source: "Mobile",
        });
      }, 2000 + i * 300);
    });
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const files = Array.from(e.dataTransfer.files);
    ingest(files.length ? files.map((f) => f.name) : ["dropped-evidence.pdf"]);
  };

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{lang === "en" ? "Drag & drop evidence files" : "ลากและวางเอกสาร"}</CardTitle>
        </CardHeader>
        <CardBody>
          <div
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            className={`flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
              drag ? "border-brand-green bg-brand-green/5" : "border-brand-border bg-brand-surface2/50 hover:border-brand-border-strong"
            }`}
          >
            <Upload className="h-10 w-10 text-brand-text3" />
            <p className="mt-3 text-sm text-brand-text">
              {lang === "en" ? "Drop bills, lab reports, sensor CSVs here" : "วางบิล รายงานแลป CSV ที่นี่"}
            </p>
            <p className="mt-1 text-xs text-brand-text3">PDF · JPG · CSV · XLSX · DOCX</p>
            <input
              ref={fileRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => ingest(Array.from(e.target.files ?? []).map((f) => f.name))}
            />
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-brand-text3">
              <span>{lang === "en" ? "Upload Queue" : "คิวอัปโหลด"}</span>
              <span>{items.length} files</span>
            </div>
            <div className="space-y-1.5">
              {items.map((it, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-brand-border bg-brand-surface2 px-3 py-2">
                  <FileText className="h-4 w-4 text-brand-text3" />
                  <div className="flex-1 truncate text-sm">{it.name}</div>
                  <span className="text-xs text-brand-text3">{it.size}</span>
                  {it.status === "uploading" && <Chip tone="blue"><Loader2 className="h-3 w-3 animate-spin" />Upload</Chip>}
                  {it.status === "extracting" && <Chip tone="amber"><Loader2 className="h-3 w-3 animate-spin" />Extract</Chip>}
                  {it.status === "done" && <Chip tone="green"><CheckCircle2 className="h-3 w-3" />Done</Chip>}
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>{lang === "en" ? "Mobile Capture" : "ถ่ายภาพมือถือ"}</CardTitle></CardHeader>
        <CardBody>
          <div className="mx-auto w-48 rounded-[2rem] border-4 border-brand-border-strong bg-brand-bg p-2 shadow-glow">
            <div className="rounded-[1.5rem] bg-gradient-to-b from-brand-surface2 to-brand-bg p-4">
              <div className="mb-2 flex items-center justify-between text-[10px] text-brand-text3">
                <span>9:41</span><span>SERI Mobile</span>
              </div>
              <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-brand-border bg-brand-bg">
                <Smartphone className="h-8 w-8 text-brand-text3" />
                <p className="mt-2 text-[10px] text-brand-text3">Live preview</p>
              </div>
              <SButton
                variant="primary"
                size="sm"
                className="mt-3 w-full"
                onClick={() => ingest([`mobile-scan-${Date.now()}.jpg`])}
              >
                <Camera className="h-3.5 w-3.5" />
                {lang === "en" ? "Scan Bill" : "สแกนบิล"}
              </SButton>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-brand-text3">
            {lang === "en" ? "On-site capture for bills & meter readings" : "ถ่ายภาพหน้างานสำหรับบิลและมิเตอร์"}
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
