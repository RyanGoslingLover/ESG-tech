// SERI seed data — 6 Thai textile SMEs, 12 indicators, docs, records.
export type Tier = "Tier 1" | "Tier 2" | "Tier 3" | "Pre-tier";

export interface SME {
  id: string;
  name: string;
  nameTh: string;
  sector: string;
  province: string;
  score: number;
  tier: Tier;
  employees: number;
  revenueMTHB: number;
}

export interface Indicator {
  id: string;
  name: string;
  nameTh: string;
  category: "Energy" | "Water" | "Waste" | "Labor" | "Governance";
  weight: number; // %
  unit: string;
  target: number;
  higherIsBetter: boolean;
}

export interface Doc {
  id: string;
  smeId: string;
  type: string;
  filename: string;
  uploadedAt: string;
  status: "pending" | "extracted" | "review" | "approved";
  confidence: number;
  source: "Drive" | "Forms" | "Mobile" | "Make.com";
}

export interface Field {
  id: string;
  docId: string;
  smeId: string;
  name: string;
  value: string | number;
  unit: string;
  confidence: number;
  flagged?: boolean;
  reason?: string;
}

export interface RecordRow {
  id: string;
  smeId: string;
  indicatorId: string;
  period: string;
  value: number;
  source: string;
}

export interface Assessment {
  id: string;
  smeId: string;
  date: string;
  score: number;
  tier: Tier;
}

export interface ReviewItem {
  id: string;
  fieldId: string;
  smeId: string;
  status: "pending" | "approved" | "edited" | "rejected";
  reviewer?: string;
  note?: string;
}

export const smes: SME[] = [
  { id: "sme-1", name: "Siam Sustainable Textiles", nameTh: "สยามซัสเทนเอเบิล เท็กซ์ไทล์", sector: "Garment & Dyeing", province: "Bangkok", score: 78, tier: "Tier 2", employees: 240, revenueMTHB: 320 },
  { id: "sme-2", name: "Northern Weave Industries", nameTh: "นอร์เทิร์น วีฟ", sector: "Weaving", province: "Chiang Mai", score: 62, tier: "Tier 3", employees: 95, revenueMTHB: 110 },
  { id: "sme-3", name: "Bangkok Apparel Group", nameTh: "บางกอก แอพพาเรล กรุ๊ป", sector: "Apparel Mfg", province: "Samut Prakan", score: 84, tier: "Tier 1", employees: 480, revenueMTHB: 720 },
  { id: "sme-4", name: "Royal Silk Workshop", nameTh: "รอยัลซิลค์ เวิร์คช็อป", sector: "Silk", province: "Surin", score: 51, tier: "Pre-tier", employees: 38, revenueMTHB: 42 },
  { id: "sme-5", name: "Eastern Dye House", nameTh: "อีสเทิร์น ได เฮาส์", sector: "Dyeing", province: "Chonburi", score: 69, tier: "Tier 3", employees: 160, revenueMTHB: 205 },
  { id: "sme-6", name: "Phuket Resort Linens", nameTh: "ภูเก็ต รีสอร์ท ลินเนน", sector: "Home Textiles", province: "Phuket", score: 58, tier: "Tier 3", employees: 72, revenueMTHB: 88 },
];

export const indicators: Indicator[] = [
  { id: "ind-1", name: "Grid Electricity", nameTh: "ไฟฟ้าจากกริด", category: "Energy", weight: 12, unit: "kWh/unit", target: 2.5, higherIsBetter: false },
  { id: "ind-2", name: "Renewable Share", nameTh: "สัดส่วนพลังงานหมุนเวียน", category: "Energy", weight: 10, unit: "%", target: 30, higherIsBetter: true },
  { id: "ind-3", name: "Energy Intensity", nameTh: "ความเข้มข้นพลังงาน", category: "Energy", weight: 8, unit: "MJ/kg", target: 18, higherIsBetter: false },
  { id: "ind-4", name: "Process Water Withdrawal", nameTh: "น้ำที่ใช้ในกระบวนการ", category: "Water", weight: 10, unit: "L/kg", target: 80, higherIsBetter: false },
  { id: "ind-5", name: "Water Reuse Rate", nameTh: "อัตราการนำน้ำกลับมาใช้", category: "Water", weight: 8, unit: "%", target: 40, higherIsBetter: true },
  { id: "ind-6", name: "pH Compliance", nameTh: "ค่า pH ตามกำหนด", category: "Water", weight: 9, unit: "%", target: 95, higherIsBetter: true },
  { id: "ind-7", name: "Textile Scrap Recycled", nameTh: "เศษผ้ารีไซเคิล", category: "Waste", weight: 7, unit: "%", target: 60, higherIsBetter: true },
  { id: "ind-8", name: "Hazardous Chemical Inventory", nameTh: "บัญชีสารเคมีอันตราย", category: "Waste", weight: 9, unit: "%", target: 100, higherIsBetter: true },
  { id: "ind-9", name: "Safety Incidents", nameTh: "อุบัติเหตุที่ทำงาน", category: "Labor", weight: 8, unit: "per 200k hr", target: 1, higherIsBetter: false },
  { id: "ind-10", name: "Training Hours", nameTh: "ชั่วโมงการอบรม", category: "Labor", weight: 5, unit: "hr/employee", target: 20, higherIsBetter: true },
  { id: "ind-11", name: "ESG Policy Documented", nameTh: "นโยบาย ESG เป็นเอกสาร", category: "Governance", weight: 6, unit: "yes/no", target: 1, higherIsBetter: true },
  { id: "ind-12", name: "Annual Sust. Report", nameTh: "รายงานความยั่งยืนประจำปี", category: "Governance", weight: 8, unit: "yes/no", target: 1, higherIsBetter: true },
];

export const docs: Doc[] = [
  { id: "doc-1", smeId: "sme-1", type: "PEA Electricity Bill", filename: "PEA-2025-09.pdf", uploadedAt: "2025-10-02T08:14:00Z", status: "extracted", confidence: 97, source: "Drive" },
  { id: "doc-2", smeId: "sme-1", type: "MWA Water Bill", filename: "MWA-2025-09.pdf", uploadedAt: "2025-10-02T08:16:00Z", status: "extracted", confidence: 94, source: "Drive" },
  { id: "doc-3", smeId: "sme-3", type: "PEA Electricity Bill", filename: "PEA-BKK-08.pdf", uploadedAt: "2025-09-29T11:02:00Z", status: "approved", confidence: 98, source: "Mobile" },
  { id: "doc-4", smeId: "sme-2", type: "PEA Electricity Bill", filename: "PEA-CM-09.pdf", uploadedAt: "2025-10-01T09:40:00Z", status: "extracted", confidence: 92, source: "Make.com" },
  { id: "doc-5", smeId: "sme-5", type: "Wastewater Lab Report", filename: "Lab-EDH-Q3.pdf", uploadedAt: "2025-09-28T14:10:00Z", status: "review", confidence: 76, source: "Drive" },
  { id: "doc-6", smeId: "sme-1", type: "Wastewater Lab Report", filename: "Lab-SST-Q3.pdf", uploadedAt: "2025-09-30T10:20:00Z", status: "review", confidence: 83, source: "Forms" },
  { id: "doc-7", smeId: "sme-3", type: "IoT Sensor CSV", filename: "sensors-2025-w39.csv", uploadedAt: "2025-09-30T23:59:00Z", status: "extracted", confidence: 99, source: "Make.com" },
  { id: "doc-8", smeId: "sme-4", type: "ESG Policy", filename: "policy-rsw-v2.docx", uploadedAt: "2025-10-03T07:00:00Z", status: "pending", confidence: 0, source: "Forms" },
];

export const fields: Field[] = [
  { id: "f-1", docId: "doc-1", smeId: "sme-1", name: "Billing Period", value: "2025-09", unit: "", confidence: 99 },
  { id: "f-2", docId: "doc-1", smeId: "sme-1", name: "Total kWh", value: 84210, unit: "kWh", confidence: 97 },
  { id: "f-3", docId: "doc-1", smeId: "sme-1", name: "Total Amount", value: 312840, unit: "THB", confidence: 96 },
  { id: "f-4", docId: "doc-1", smeId: "sme-1", name: "Tariff Class", value: "Industrial 2.2", unit: "", confidence: 88 },
  { id: "f-5", docId: "doc-1", smeId: "sme-1", name: "Power Factor", value: 0.91, unit: "", confidence: 72, flagged: true, reason: "OCR digit ambiguity" },
  { id: "f-6", docId: "doc-2", smeId: "sme-1", name: "Water Volume", value: 1820, unit: "m³", confidence: 94 },
  { id: "f-7", docId: "doc-5", smeId: "sme-5", name: "pH Value", value: 7.8, unit: "", confidence: 76, flagged: true, reason: "Below confidence threshold" },
  { id: "f-8", docId: "doc-5", smeId: "sme-5", name: "BOD", value: 22, unit: "mg/L", confidence: 68, flagged: true, reason: "Handwritten value" },
  { id: "f-9", docId: "doc-6", smeId: "sme-1", name: "COD", value: 145, unit: "mg/L", confidence: 81 },
  { id: "f-10", docId: "doc-4", smeId: "sme-2", name: "Total kWh", value: 31200, unit: "kWh", confidence: 92 },
];

const periods = ["2025-Q1", "2025-Q2", "2025-Q3"];
export const records: RecordRow[] = smes.flatMap((s, si) =>
  indicators.slice(0, 5).flatMap((ind, ii) =>
    periods.map((p, pi) => ({
      id: `r-${si}-${ii}-${pi}`,
      smeId: s.id,
      indicatorId: ind.id,
      period: p,
      value: Math.round((ind.target * (0.6 + Math.random() * 0.7)) * 100) / 100,
      source: ["PEA Bill", "Lab Report", "IoT Sensor", "Manual Entry"][Math.floor(Math.random() * 4)],
    }))
  )
);

export const assessments: Assessment[] = [
  { id: "a-1", smeId: "sme-1", date: "2025-Q1", score: 71, tier: "Tier 2" },
  { id: "a-2", smeId: "sme-1", date: "2025-Q2", score: 75, tier: "Tier 2" },
  { id: "a-3", smeId: "sme-1", date: "2025-Q3", score: 78, tier: "Tier 2" },
];

export const reviews: ReviewItem[] = [
  { id: "rv-1", fieldId: "f-5", smeId: "sme-1", status: "pending" },
  { id: "rv-2", fieldId: "f-7", smeId: "sme-5", status: "pending" },
  { id: "rv-3", fieldId: "f-8", smeId: "sme-5", status: "pending" },
];
