import { BookText } from "lucide-react";

interface CitationChipProps {
  source: string;
  page?: string;
}

export function CitationChip({ source, page }: CitationChipProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[11px] text-ink-2">
      <BookText className="h-3 w-3 text-primary" />
      <span className="font-medium">{source}</span>
      {page && <span className="text-ink-3">· {page}</span>}
    </span>
  );
}
