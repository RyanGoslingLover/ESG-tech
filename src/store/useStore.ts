import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  smes as seedSmes,
  indicators as seedIndicators,
  docs as seedDocs,
  fields as seedFields,
  records as seedRecords,
  assessments as seedAssessments,
  reviews as seedReviews,
  type SME,
  type Indicator,
  type Doc,
  type Field,
  type RecordRow,
  type Assessment,
  type ReviewItem,
} from "@/data/seed";

export type Lang = "en" | "th";
export type LayerStatus = "idle" | "running" | "done";

interface SeriState {
  smes: SME[];
  indicators: Indicator[];
  docs: Doc[];
  fields: Field[];
  records: RecordRow[];
  assessments: Assessment[];
  reviews: ReviewItem[];
  currentSmeId: string;
  lang: Lang;
  layerStatus: Record<number, LayerStatus>;
  pipelineRunning: boolean;

  setCurrentSme: (id: string) => void;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  setLayerStatus: (n: number, s: LayerStatus) => void;
  resetLayerStatuses: () => void;
  addDoc: (d: Doc) => void;
  updateField: (id: string, patch: Partial<Field>) => void;
  updateReview: (id: string, patch: Partial<ReviewItem>) => void;
  bumpScore: (smeId: string, delta: number) => void;
  reseed: () => void;
}

export const useStore = create<SeriState>()(
  persist(
    (set) => ({
      smes: seedSmes,
      indicators: seedIndicators,
      docs: seedDocs,
      fields: seedFields,
      records: seedRecords,
      assessments: seedAssessments,
      reviews: seedReviews,
      currentSmeId: seedSmes[0].id,
      lang: "en",
      layerStatus: {},
      pipelineRunning: false,

      setCurrentSme: (id) => set({ currentSmeId: id }),
      setLang: (lang) => set({ lang }),
      toggleLang: () => set((s) => ({ lang: s.lang === "en" ? "th" : "en" })),
      setLayerStatus: (n, st) =>
        set((s) => ({ layerStatus: { ...s.layerStatus, [n]: st } })),
      resetLayerStatuses: () => set({ layerStatus: {} }),
      addDoc: (d) => set((s) => ({ docs: [d, ...s.docs] })),
      updateField: (id, patch) =>
        set((s) => ({
          fields: s.fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
        })),
      updateReview: (id, patch) =>
        set((s) => ({
          reviews: s.reviews.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        })),
      bumpScore: (smeId, delta) =>
        set((s) => ({
          smes: s.smes.map((m) =>
            m.id === smeId ? { ...m, score: Math.max(0, Math.min(100, m.score + delta)) } : m
          ),
        })),
      reseed: () =>
        set({
          smes: seedSmes,
          indicators: seedIndicators,
          docs: seedDocs,
          fields: seedFields,
          records: seedRecords,
          assessments: seedAssessments,
          reviews: seedReviews,
          layerStatus: {},
        }),
    }),
    {
      name: "seri-store-v1",
    }
  )
);

// i18n helper
const dict = {
  layers: {
    1: { en: "Capture & Upload", th: "บันทึก & อัปโหลด" },
    2: { en: "Document Intake", th: "รับเอกสาร" },
    3: { en: "AI Extraction", th: "สกัดข้อมูล AI" },
    4: { en: "Structured Data", th: "ข้อมูลโครงสร้าง" },
    5: { en: "Rule-Based Scoring", th: "การให้คะแนนตามกฎ" },
    6: { en: "AI Analysis", th: "วิเคราะห์ AI" },
    7: { en: "Dashboard", th: "แดชบอร์ด" },
    8: { en: "Human Review", th: "การตรวจทานโดยมนุษย์" },
    9: { en: "Competition Output", th: "ผลงานสำหรับการแข่งขัน" },
  } as Record<number, { en: string; th: string }>,
  ui: {
    runPipeline: { en: "Run Full Pipeline", th: "เริ่มไปป์ไลน์ทั้งหมด" },
    recalc: { en: "Recalculate", th: "คำนวณใหม่" },
    approve: { en: "Approve", th: "อนุมัติ" },
    reject: { en: "Reject", th: "ปฏิเสธ" },
    edit: { en: "Edit", th: "แก้ไข" },
    overview: { en: "Overview", th: "ภาพรวม" },
    sme: { en: "SME", th: "ผู้ประกอบการ" },
    score: { en: "ESG Score", th: "คะแนน ESG" },
    tier: { en: "Tier", th: "ระดับ" },
    pending: { en: "Pending", th: "รอดำเนินการ" },
    done: { en: "Done", th: "เสร็จ" },
    running: { en: "Running…", th: "กำลังทำงาน…" },
  } as Record<string, { en: string; th: string }>,
};

export function t(lang: Lang, key: string): string {
  const [group, id] = key.split(".");
  // @ts-expect-error dynamic
  const entry = dict[group]?.[id];
  return entry ? entry[lang] : key;
}
