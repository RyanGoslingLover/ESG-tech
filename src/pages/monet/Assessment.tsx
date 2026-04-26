import { useState, useMemo } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Info, Check } from "lucide-react";
import { MonetLayout } from "@/components/monet/layout/MonetLayout";
import { Button } from "@/components/ui/button";
import { CitationChip } from "@/components/monet/CitationChip";
import { EvidenceUploader } from "@/components/monet/EvidenceUploader";
import { AIChatPanel } from "@/components/monet/AIChatPanel";
import { dimensions, questionsByDimension } from "@/lib/mock-data";
import { useMonet, type Dimension } from "@/store/useMonet";
import { cn } from "@/lib/utils";

const dimOrder: Dimension[] = ["energy", "water", "waste", "labor"];

export default function Assessment() {
  const { dimension } = useParams<{ dimension: Dimension }>();
  const nav = useNavigate();
  const { answers, setAnswer } = useMonet();
  const [qIdx, setQIdx] = useState(0);
  const [showHelper, setShowHelper] = useState(false);

  if (!dimension || !dimOrder.includes(dimension)) return <Navigate to="/assessment/start" replace />;

  const dim = dimensions.find((d) => d.key === dimension)!;
  const questions = useMemo(() => questionsByDimension(dimension), [dimension]);
  const q = questions[qIdx];
  const dimIdx = dimOrder.indexOf(dimension);
  const overallProgress = ((dimIdx + (qIdx + 1) / questions.length) / dimOrder.length) * 100;
  const currentAnswer = answers[q.id];

  const goNext = () => {
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setShowHelper(false);
    } else if (dimIdx < dimOrder.length - 1) {
      nav(`/assessment/${dimOrder[dimIdx + 1]}`);
    } else {
      nav("/results");
    }
  };

  const goBack = () => {
    if (qIdx > 0) setQIdx(qIdx - 1);
    else if (dimIdx > 0) nav(`/assessment/${dimOrder[dimIdx - 1]}`);
    else nav("/assessment/start");
  };

  return (
    <MonetLayout>
      <div className="border-b border-border bg-surface-2">
        <div className="container max-w-6xl py-3">
          <div className="flex items-center justify-between text-xs text-ink-3">
            <span>มิติที่ {dimIdx + 1}/4 · คำถาม {qIdx + 1}/{questions.length}</span>
            <span className="font-medium text-ink-2">ความคืบหน้า {Math.round(overallProgress)}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="container max-w-6xl py-8">
        <div className="grid gap-8 lg:grid-cols-[200px_1fr_300px]">
          {/* LEFT RAIL — dimensions */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="text-xs font-semibold uppercase tracking-wider text-ink-3">มิติการประเมิน</div>
            <ol className="mt-4 space-y-3">
              {dimensions.map((d, i) => {
                const done = i < dimIdx;
                const active = d.key === dimension;
                return (
                  <li
                    key={d.key}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors",
                      active && "border-primary bg-emerald-bg",
                      done && !active && "border-border bg-card",
                      !active && !done && "border-border bg-card opacity-60"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        done ? "bg-primary text-primary-foreground" : active ? "bg-primary text-primary-foreground" : "bg-secondary text-ink-3"
                      )}
                    >
                      {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className={cn("text-sm font-medium", active ? "text-primary" : "text-ink")}>{d.labelTh}</div>
                      <div className="text-[10px] text-ink-3 truncate">{d.labelEn}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </aside>

          {/* CENTER — question */}
          <div>
            <div className="flex items-center gap-2">
              <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-bg", dim.colorClass)}>
                <dim.icon className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">{dim.labelTh}</div>
                <div className="text-[11px] text-ink-3">{dim.descTh}</div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
              <h2 className="text-xl font-semibold leading-snug text-ink md:text-2xl">{q.prompt}</h2>

              <button
                onClick={() => setShowHelper((v) => !v)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <Info className="h-3.5 w-3.5" /> {showHelper ? "ซ่อน" : "ดู"}เกณฑ์อ้างอิง
              </button>

              {showHelper && (
                <div className="mt-3 rounded-xl border border-emerald/20 bg-emerald-bg/50 p-4 text-sm leading-relaxed text-ink-2">
                  {q.helper}
                  <div className="mt-3">
                    <CitationChip source={q.source.doc} page={q.source.section} />
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-2.5">
                {q.options.map((opt, i) => {
                  const selected = currentAnswer?.optionIndex === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setAnswer({ questionId: q.id, optionIndex: i, evidence: currentAnswer?.evidence })}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all ring-focus",
                        selected
                          ? "border-primary bg-emerald-bg shadow-soft"
                          : "border-border bg-background hover:border-ink-mute"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          selected ? "border-primary bg-primary text-primary-foreground" : "border-ink-mute"
                        )}
                      >
                        {selected && <Check className="h-3.5 w-3.5" />}
                      </div>
                      <span className={cn("flex-1", selected ? "font-medium text-ink" : "text-ink-2")}>{opt.label}</span>
                      <span className="text-[10px] font-mono text-ink-3">+{opt.score}</span>
                    </button>
                  );
                })}
              </div>

              {q.evidenceHint && (
                <div className="mt-6 border-t border-border pt-5">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-3">หลักฐานประกอบ (ไม่บังคับ)</div>
                  <EvidenceUploader
                    hint={q.evidenceHint}
                    onChange={(name) =>
                      setAnswer({
                        questionId: q.id,
                        optionIndex: currentAnswer?.optionIndex ?? -1,
                        evidence: name ?? undefined,
                      })
                    }
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="ghost" onClick={goBack} className="h-11 rounded-xl text-ink-2">
                <ArrowLeft className="mr-1 h-4 w-4" /> ย้อนกลับ
              </Button>
              <Button
                onClick={goNext}
                disabled={!currentAnswer || currentAnswer.optionIndex < 0}
                className="h-11 rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90"
              >
                {qIdx === questions.length - 1 && dimIdx === dimOrder.length - 1 ? "ดูผลประเมิน" : "ถัดไป"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* RIGHT RAIL — AI Assistant */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 h-[520px]">
              <AIChatPanel />
            </div>
          </aside>
        </div>
      </div>
    </MonetLayout>
  );
}
