import { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { useStore } from "@/store/useStore";
import { Search } from "lucide-react";

const tabs = ["Profile", "Evidence", "Extracted Fields"] as const;

export function Layer4StructuredData() {
  const { smes, currentSmeId, docs, fields, lang } = useStore();
  const sme = smes.find((s) => s.id === currentSmeId)!;
  const [tab, setTab] = useState<typeof tabs[number]>("Extracted Fields");
  const [filter, setFilter] = useState("");

  let rows: Record<string, string | number>[] = [];
  let cols: string[] = [];

  if (tab === "Profile") {
    cols = ["Field", "Value"];
    rows = [
      { Field: "Name (EN)", Value: sme.name },
      { Field: "Name (TH)", Value: sme.nameTh },
      { Field: "Sector", Value: sme.sector },
      { Field: "Province", Value: sme.province },
      { Field: "Employees", Value: sme.employees },
      { Field: "Revenue (M THB)", Value: sme.revenueMTHB },
      { Field: "Tier", Value: sme.tier },
      { Field: "Score", Value: sme.score },
    ];
  } else if (tab === "Evidence") {
    cols = ["Filename", "Type", "Source", "Confidence", "Status"];
    rows = docs
      .filter((d) => d.smeId === currentSmeId)
      .map((d) => ({ Filename: d.filename, Type: d.type, Source: d.source, Confidence: d.confidence + "%", Status: d.status }));
  } else {
    cols = ["Doc", "Field", "Value", "Unit", "Confidence"];
    rows = fields
      .filter((f) => f.smeId === currentSmeId)
      .map((f) => ({
        Doc: docs.find((d) => d.id === f.docId)?.filename ?? "—",
        Field: f.name,
        Value: f.value,
        Unit: f.unit,
        Confidence: f.confidence + "%",
      }));
  }

  const filtered = rows.filter((r) =>
    filter === "" || Object.values(r).some((v) => String(v).toLowerCase().includes(filter.toLowerCase()))
  );

  const colLetters = "ABCDEFGHIJKL".split("");

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-wrap items-center gap-4">
          <CardTitle>{lang === "en" ? "Structured Data — Google Sheets sync" : "ข้อมูลโครงสร้าง"}</CardTitle>
          <div className="flex gap-1 rounded-lg bg-brand-surface2 p-1">
            {tabs.map((tk) => (
              <button
                key={tk}
                onClick={() => setTab(tk)}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
                  tab === tk ? "bg-brand-surface3 text-brand-text shadow-sm" : "text-brand-text2 hover:text-brand-text"
                }`}
              >
                {tk}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Chip tone="green" dot>Synced to Google Sheets · 4s ago</Chip>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-brand-text3" />
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter…"
                className="h-8 w-44 rounded-md border border-brand-border bg-brand-surface pl-7 pr-2 text-xs"
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-brand-surface3 text-xs">
                <tr>
                  <th className="w-10 border-b border-r border-brand-border bg-brand-surface3 py-1.5 text-center font-mono text-brand-text3">#</th>
                  {cols.map((c, i) => (
                    <th key={c} className="border-b border-r border-brand-border px-3 py-1.5 text-left font-semibold text-brand-text">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-brand-text3">{colLetters[i]}</span>
                        {c}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono text-xs">
                {filtered.map((r, i) => (
                  <tr key={i} className={i % 2 ? "bg-brand-surface/40" : "bg-brand-surface2/30"}>
                    <td className="border-r border-brand-border py-1.5 text-center text-brand-text3">{i + 1}</td>
                    {cols.map((c) => (
                      <td key={c} className="border-r border-brand-border px-3 py-1.5 text-brand-text2">
                        {String(r[c])}
                      </td>
                    ))}
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={cols.length + 1} className="p-8 text-center text-brand-text3">No matching rows</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
