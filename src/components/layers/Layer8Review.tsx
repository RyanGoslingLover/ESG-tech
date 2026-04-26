import { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/SCard";
import { Chip } from "@/components/ui/SChip";
import { SButton } from "@/components/ui/SButton";
import { useStore } from "@/store/useStore";
import { Check, X, Edit3, History } from "lucide-react";

export function Layer8Review() {
  const { fields, docs, smes, currentSmeId, updateField, lang } = useStore();
  const [threshold, setThreshold] = useState(80);
  const [smeFilter, setSmeFilter] = useState<string>("all");
  const [log, setLog] = useState<string[]>([
    "10:42 — N. Suwan approved 'Total kWh' on PEA-BKK-08",
    "10:38 — A. Chen edited 'pH Value' 7.6 → 7.8 on Lab-EDH-Q3",
    "10:21 — System routed 3 fields below 80% to queue",
  ]);

  const queue = fields.filter((f) =>
    (f.confidence < threshold || f.flagged) &&
    (smeFilter === "all" || f.smeId === smeFilter)
  );

  const act = (id: string, action: "approve" | "edit" | "reject") => {
    const f = fields.find((x) => x.id === id);
    if (!f) return;
    const newConf = action === "reject" ? 30 : 95;
    updateField(id, { confidence: newConf, flagged: action === "reject" });
    setLog((l) => [
      `${new Date().toTimeString().slice(0, 5)} — Reviewer ${action === "approve" ? "approved" : action === "edit" ? "edited" : "rejected"} '${f.name}'`,
      ...l,
    ]);
  };

  const bulkApprove = () => {
    queue.forEach((f) => updateField(f.id, { confidence: 95, flagged: false }));
    setLog((l) => [`${new Date().toTimeString().slice(0, 5)} — Bulk approved ${queue.length} fields`, ...l]);
  };

  return (
    <div className="grid gap-6 p-6 lg:grid-cols-4">
      <Card className="lg:col-span-3">
        <CardHeader className="flex flex-wrap items-center gap-3">
          <CardTitle>{lang === "en" ? "Review Queue" : "คิวรอตรวจ"}</CardTitle>
          <Chip tone="amber">{queue.length} pending</Chip>
          <div className="ml-auto flex items-center gap-3 text-xs">
            <select value={smeFilter} onChange={(e) => setSmeFilter(e.target.value)} className="h-8 rounded-md border border-brand-border bg-brand-surface px-2">
              <option value="all">{lang === "en" ? "All SMEs" : "ทั้งหมด"}</option>
              {smes.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <label className="flex items-center gap-2 text-brand-text3">
              <span>conf &lt; {threshold}%</span>
              <input type="range" min={50} max={95} value={threshold} onChange={(e) => setThreshold(+e.target.value)} className="accent-brand-green" />
            </label>
            <SButton size="sm" variant="primary" onClick={bulkApprove} disabled={!queue.length}>
              <Check className="h-3.5 w-3.5" />{lang === "en" ? "Bulk approve" : "อนุมัติทั้งหมด"}
            </SButton>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-brand-surface2 text-xs uppercase tracking-wider text-brand-text3">
              <tr>
                <th className="px-4 py-2 text-left">Document</th>
                <th className="px-4 py-2 text-left">Field</th>
                <th className="px-4 py-2 text-left">AI Value</th>
                <th className="px-4 py-2 text-left">Conf</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {queue.map((f) => {
                const doc = docs.find((d) => d.id === f.docId);
                return (
                  <tr key={f.id} className="hover:bg-brand-surface2/30">
                    <td className="px-4 py-2 text-xs text-brand-text2">{doc?.filename ?? "—"}</td>
                    <td className="px-4 py-2 font-medium">{f.name}</td>
                    <td className="px-4 py-2 font-mono text-brand-text2">{f.value} {f.unit}</td>
                    <td className="px-4 py-2"><Chip tone={f.confidence >= 80 ? "green" : f.confidence >= 60 ? "amber" : "red"}>{f.confidence}%</Chip></td>
                    <td className="px-4 py-2 text-xs text-brand-text3">{f.reason ?? "low conf"}</td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-1">
                        <button title="approve" onClick={() => act(f.id, "approve")} className="rounded-md border border-brand-green/40 p-1.5 text-brand-green hover:bg-brand-green/10"><Check className="h-3.5 w-3.5" /></button>
                        <button title="edit" onClick={() => act(f.id, "edit")} className="rounded-md border border-brand-border p-1.5 text-brand-text2 hover:bg-brand-surface2"><Edit3 className="h-3.5 w-3.5" /></button>
                        <button title="reject" onClick={() => act(f.id, "reject")} className="rounded-md border border-brand-red/40 p-1.5 text-brand-red hover:bg-brand-red/10"><X className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {queue.length === 0 && (
                <tr><td colSpan={6} className="p-10 text-center text-brand-text3">
                  <Check className="mx-auto mb-2 h-6 w-6 text-brand-green" />
                  {lang === "en" ? "Queue is clear — nothing needs review." : "คิวว่าง — ไม่มีรายการที่ต้องตรวจ"}
                </td></tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex items-center gap-2">
          <History className="h-4 w-4 text-brand-text2" />
          <CardTitle>{lang === "en" ? "Audit Log" : "บันทึกการตรวจ"}</CardTitle>
        </CardHeader>
        <CardBody className="space-y-1.5 text-xs text-brand-text2">
          {log.map((l, i) => <div key={i} className="border-l-2 border-brand-border pl-2">{l}</div>)}
        </CardBody>
      </Card>
    </div>
  );
}
