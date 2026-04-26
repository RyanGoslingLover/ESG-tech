import { useState } from "react";
import { Upload, FileCheck2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface EvidenceUploaderProps {
  hint?: string;
  onChange?: (fileName: string | null) => void;
}

export function EvidenceUploader({ hint, onChange }: EvidenceUploaderProps) {
  const [file, setFile] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);

  const handle = (name: string) => {
    setFile(name);
    onChange?.(name);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) handle(f.name);
      }}
      className={cn(
        "rounded-xl border border-dashed p-4 text-sm transition-colors",
        drag ? "border-primary bg-emerald-bg" : "border-border bg-surface-2"
      )}
    >
      {file ? (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-ink-2">
            <FileCheck2 className="h-4 w-4 text-success" />
            <span className="truncate">{file}</span>
          </div>
          <button
            onClick={() => { setFile(null); onChange?.(null); }}
            className="rounded-md p-1 text-ink-3 hover:bg-secondary hover:text-ink"
            aria-label="ลบไฟล์"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary">
            <Upload className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-ink-2">แนบหลักฐาน (ลากไฟล์มาวาง หรือคลิกเลือก)</div>
            {hint && <div className="text-xs text-ink-3 mt-0.5">{hint}</div>}
          </div>
          <input
            type="file"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handle(f.name);
            }}
          />
        </label>
      )}
    </div>
  );
}
