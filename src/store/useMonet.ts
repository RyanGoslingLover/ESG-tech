import { create } from "zustand";

export type Lang = "th" | "en";
export type Dimension = "energy" | "water" | "waste" | "labor";

export interface OnboardingData {
  companyName: string;
  subSector: "garment" | "weaving" | "dyeing" | "finishing" | "";
  employees: string;
  revenue: string;
  exportShare: string;
}

export interface AssessmentAnswer {
  questionId: string;
  optionIndex: number; // 0-3
  evidence?: string; // file name
}

interface MonetState {
  lang: Lang;
  toggleLang: () => void;
  setLang: (l: Lang) => void;

  onboarding: OnboardingData;
  setOnboarding: (patch: Partial<OnboardingData>) => void;

  answers: Record<string, AssessmentAnswer>;
  setAnswer: (a: AssessmentAnswer) => void;
  clearAnswers: () => void;
}

export const useMonet = create<MonetState>((set) => ({
  lang: "th",
  toggleLang: () => set((s) => ({ lang: s.lang === "th" ? "en" : "th" })),
  setLang: (lang) => set({ lang }),

  onboarding: {
    companyName: "",
    subSector: "",
    employees: "",
    revenue: "",
    exportShare: "",
  },
  setOnboarding: (patch) => set((s) => ({ onboarding: { ...s.onboarding, ...patch } })),

  answers: {},
  setAnswer: (a) => set((s) => ({ answers: { ...s.answers, [a.questionId]: a } })),
  clearAnswers: () => set({ answers: {} }),
}));

// Translation helper — only critical chrome strings are bilingual.
// Most page copy stays Thai per product spec.
const dict: Record<string, { th: string; en: string }> = {
  "nav.assess": { th: "เริ่มประเมิน", en: "Start assessment" },
  "nav.results": { th: "ผลการประเมิน", en: "Results" },
  "nav.monitor": { th: "ติดตาม IoT", en: "IoT Monitor" },
  "nav.ask": { th: "ถาม AI", en: "Ask AI" },
  "nav.about": { th: "เกี่ยวกับ", en: "About" },
  "cta.primary": { th: "เริ่มประเมินทันที", en: "Start free assessment" },
  "cta.next": { th: "ถัดไป", en: "Next" },
  "cta.back": { th: "ย้อนกลับ", en: "Back" },
  "cta.skip": { th: "ข้าม", en: "Skip" },
  "cta.submit": { th: "ส่งคำตอบ", en: "Submit" },
};

export function t(lang: Lang, key: string): string {
  return dict[key]?.[lang] ?? key;
}
