import type { Dimension } from "@/store/useMonet";
import { Zap, Droplets, FlaskConical, Users } from "lucide-react";

export interface AssessmentQuestion {
  id: string;
  dimension: Dimension;
  prompt: string;          // Thai
  helper: string;          // Thai — explains the taxonomy criterion
  source: { doc: string; section: string };
  options: { label: string; score: number }[]; // 0-3
  evidenceHint?: string;
}

export const dimensions: {
  key: Dimension;
  labelTh: string;
  labelEn: string;
  icon: any;
  colorClass: string;
  descTh: string;
}[] = [
  {
    key: "energy",
    labelTh: "พลังงาน",
    labelEn: "Energy",
    icon: Zap,
    colorClass: "text-amber-600",
    descTh: "การใช้พลังงานไฟฟ้า สัดส่วนพลังงานหมุนเวียน และความเข้มข้นพลังงานต่อหน่วยผลิต",
  },
  {
    key: "water",
    labelTh: "น้ำ",
    labelEn: "Water",
    icon: Droplets,
    colorClass: "text-sky-600",
    descTh: "ปริมาณการดึงน้ำเข้ากระบวนการ อัตราการนำกลับมาใช้ และการควบคุม pH น้ำทิ้ง",
  },
  {
    key: "waste",
    labelTh: "ของเสียและสารเคมี",
    labelEn: "Waste & Chemicals",
    icon: FlaskConical,
    colorClass: "text-emerald-700",
    descTh: "การจัดการเศษผ้า ทะเบียนสารเคมีอันตราย และการปฏิบัติตาม ZDHC MRSL",
  },
  {
    key: "labor",
    labelTh: "แรงงาน",
    labelEn: "Labor",
    icon: Users,
    colorClass: "text-rose-600",
    descTh: "ความปลอดภัยในที่ทำงาน เสรีภาพการรวมตัว และนโยบายการจ้างงานที่เป็นธรรม",
  },
];

export const questions: AssessmentQuestion[] = [
  // ENERGY
  {
    id: "e1",
    dimension: "energy",
    prompt: "ความเข้มข้นพลังงานของโรงงาน (kWh ต่อกิโลกรัมผลิตภัณฑ์) อยู่ในช่วงใด?",
    helper: "Thailand Taxonomy Phase 2 กำหนดให้สิ่งทอที่ 'Green' ต้องมีค่า ≤ 4.5 kWh/kg และ 'Amber' ต้องมีแผนลด 30% ภายใน 5 ปี",
    source: { doc: "Thailand Taxonomy Phase 2 (พ.ค. 2568)", section: "§4.2.1 — Textile manufacturing" },
    options: [
      { label: "ไม่เคยวัด", score: 0 },
      { label: "> 7 kWh/kg", score: 1 },
      { label: "4.5 – 7 kWh/kg (Amber path)", score: 2 },
      { label: "≤ 4.5 kWh/kg (Green)", score: 3 },
    ],
    evidenceHint: "บิลค่าไฟ PEA/MEA ย้อนหลัง 6 เดือน + ปริมาณผลิต",
  },
  {
    id: "e2",
    dimension: "energy",
    prompt: "สัดส่วนพลังงานหมุนเวียนในโรงงาน (โซลาร์รูฟท็อป / ไบโอแมส / RE100 PPA) คิดเป็นกี่ %",
    helper: "China Green Bond Catalogue 2021 หมวด 2.3.1 กำหนดเกณฑ์ Renewable share ≥ 30% สำหรับ light industry",
    source: { doc: "China Green Bond Catalogue 2021", section: "§2.3.1" },
    options: [
      { label: "0%", score: 0 },
      { label: "1 – 10%", score: 1 },
      { label: "10 – 30%", score: 2 },
      { label: "> 30%", score: 3 },
    ],
    evidenceHint: "ใบรับรอง I-REC หรือสัญญา PPA",
  },
  {
    id: "e3",
    dimension: "energy",
    prompt: "มีระบบ Energy Management System (ISO 50001 หรือเทียบเท่า) หรือไม่?",
    helper: "เป็นเกณฑ์ Substantial Contribution ภายใต้ Thailand Taxonomy เพื่อพิสูจน์ความต่อเนื่องของการลดพลังงาน",
    source: { doc: "Thailand Taxonomy Phase 2", section: "§4.2.3 — DNSH criteria" },
    options: [
      { label: "ยังไม่มี", score: 0 },
      { label: "อยู่ระหว่างศึกษา", score: 1 },
      { label: "มีระบบภายใน ยังไม่ได้รับรอง", score: 2 },
      { label: "ได้รับการรับรอง ISO 50001", score: 3 },
    ],
  },

  // WATER
  {
    id: "w1",
    dimension: "water",
    prompt: "อัตราการดึงน้ำดิบเข้ากระบวนการ (ลบ.ม. ต่อกิโลกรัมผลิตภัณฑ์) อยู่ในช่วงใด?",
    helper: "Thailand Taxonomy Phase 2 กำหนดเกณฑ์ Green ≤ 100 ลิตร/กก. สำหรับโรงย้อมและตกแต่งสำเร็จ",
    source: { doc: "Thailand Taxonomy Phase 2", section: "§4.2.2 — Water use intensity" },
    options: [
      { label: "ไม่เคยวัด", score: 0 },
      { label: "> 200 ลิตร/กก.", score: 1 },
      { label: "100 – 200 ลิตร/กก.", score: 2 },
      { label: "≤ 100 ลิตร/กก. (Green)", score: 3 },
    ],
    evidenceHint: "บิลค่าน้ำประปาหรือมิเตอร์น้ำบาดาล + ปริมาณผลิต",
  },
  {
    id: "w2",
    dimension: "water",
    prompt: "อัตราการนำน้ำกลับมาใช้ (Water reuse rate) ในโรงงานเป็นกี่ %",
    helper: "China Green Catalogue หมวด 2.3.2 ระบุ reuse rate ≥ 30% เป็นเกณฑ์ Aligned สำหรับอุตสาหกรรมย้อม",
    source: { doc: "China Green Bond Catalogue 2021", section: "§2.3.2" },
    options: [
      { label: "0%", score: 0 },
      { label: "1 – 15%", score: 1 },
      { label: "15 – 30%", score: 2 },
      { label: "> 30%", score: 3 },
    ],
  },
  {
    id: "w3",
    dimension: "water",
    prompt: "การควบคุม pH น้ำทิ้งก่อนปล่อยออกจากโรงงานเป็นไปตามมาตรฐาน 6.0–9.0 หรือไม่?",
    helper: "ประกาศกระทรวงอุตสาหกรรม (ฉบับที่ 2) พ.ศ. 2539 และเป็น DNSH criterion ใน Thailand Taxonomy",
    source: { doc: "Thailand Taxonomy Phase 2", section: "§4.2.4 — DNSH water" },
    options: [
      { label: "ไม่ได้ตรวจวัดสม่ำเสมอ", score: 0 },
      { label: "ตรวจวัดบ้าง เกินมาตรฐานบางครั้ง", score: 1 },
      { label: "ตรวจทุกเดือน อยู่ในเกณฑ์", score: 2 },
      { label: "มีระบบ online monitoring + รายงาน", score: 3 },
    ],
    evidenceHint: "ผลแล็บน้ำทิ้งย้อนหลัง 6 เดือน",
  },

  // WASTE & CHEMICALS
  {
    id: "c1",
    dimension: "waste",
    prompt: "โรงงานมีทะเบียนสารเคมี (Chemical inventory) ที่อัปเดตและสามารถสืบค้นได้หรือไม่?",
    helper: "ZDHC MRSL v3.1 และ Thailand Taxonomy DNSH กำหนดให้ต้องมีทะเบียนสารเคมีพร้อม SDS",
    source: { doc: "ZDHC MRSL v3.1 / Thailand Taxonomy Phase 2", section: "§4.2.5" },
    options: [
      { label: "ไม่มี", score: 0 },
      { label: "มีแบบกระดาษ ไม่อัปเดต", score: 1 },
      { label: "มีไฟล์ดิจิทัล อัปเดตทุกไตรมาส", score: 2 },
      { label: "ระบบดิจิทัล + match ZDHC MRSL", score: 3 },
    ],
    evidenceHint: "ไฟล์ทะเบียนสารเคมีล่าสุด",
  },
  {
    id: "c2",
    dimension: "waste",
    prompt: "อัตราการนำเศษผ้า (textile scrap) กลับมารีไซเคิลหรือใช้ใหม่เป็นกี่ %",
    helper: "EU Strategy for Sustainable Textiles 2030 และอ้างอิงใน Thailand Taxonomy ให้ ≥ 50% ถือเป็น Green",
    source: { doc: "Thailand Taxonomy Phase 2", section: "§4.2.6 — Circularity" },
    options: [
      { label: "ทิ้งทั้งหมด", score: 0 },
      { label: "1 – 25%", score: 1 },
      { label: "25 – 50%", score: 2 },
      { label: "> 50%", score: 3 },
    ],
  },
  {
    id: "c3",
    dimension: "waste",
    prompt: "ใช้สารเคมีที่อยู่ในรายการต้องห้าม (ZDHC MRSL Restricted) หรือไม่?",
    helper: "เป็น DNSH criterion สำคัญ — หากยังใช้สารต้องห้ามจะไม่ผ่านเกณฑ์ Green Finance ทุกหมวด",
    source: { doc: "ZDHC MRSL v3.1", section: "Restricted Substance List" },
    options: [
      { label: "ใช้อยู่ ไม่มีแผนเปลี่ยน", score: 0 },
      { label: "ใช้บางส่วน มีแผน 2 ปี", score: 1 },
      { label: "ใช้น้อยมาก กำลังเปลี่ยน", score: 2 },
      { label: "ไม่ใช้เลย — Substituted ครบ", score: 3 },
    ],
  },

  // LABOR
  {
    id: "l1",
    dimension: "labor",
    prompt: "อัตราการเกิดอุบัติเหตุที่ต้องหยุดงาน (LTIFR) ต่อล้านชั่วโมงทำงานในปีที่ผ่านมา",
    helper: "Social Safeguards ภายใต้ Thailand Taxonomy อ้างอิงเกณฑ์ ILO และ SET ESG Reporting",
    source: { doc: "Thailand Taxonomy Phase 2 — Social Safeguards", section: "§5.1" },
    options: [
      { label: "ไม่ได้บันทึก", score: 0 },
      { label: "> 5 ครั้ง", score: 1 },
      { label: "1 – 5 ครั้ง", score: 2 },
      { label: "0 ครั้ง — บันทึกครบ", score: 3 },
    ],
    evidenceHint: "บันทึกอุบัติเหตุ + ชั่วโมงทำงานรวม",
  },
  {
    id: "l2",
    dimension: "labor",
    prompt: "นโยบายเสรีภาพการรวมตัว (Freedom of Association) เป็นลายลักษณ์อักษรหรือไม่?",
    helper: "ILO Core Convention 87 & 98 — เป็น Minimum Social Safeguard ของ Thailand Taxonomy",
    source: { doc: "ILO C87 & C98 / Thailand Taxonomy", section: "§5.2 — Social safeguards" },
    options: [
      { label: "ไม่มี", score: 0 },
      { label: "อยู่ระหว่างร่าง", score: 1 },
      { label: "มี เผยแพร่ภายในเท่านั้น", score: 2 },
      { label: "มี เผยแพร่สาธารณะ + อบรมพนักงาน", score: 3 },
    ],
  },
  {
    id: "l3",
    dimension: "labor",
    prompt: "ชั่วโมงอบรมเฉลี่ยต่อพนักงานต่อปี (รวม OHS, ทักษะ, ESG)",
    helper: "SET ESG Reporting และ GRI 404-1 แนะนำ ≥ 16 ชม./คน/ปี เป็นเกณฑ์ดี",
    source: { doc: "GRI 404-1 / SET ESG Disclosure Guideline", section: "Training & Education" },
    options: [
      { label: "< 4 ชม.", score: 0 },
      { label: "4 – 8 ชม.", score: 1 },
      { label: "8 – 16 ชม.", score: 2 },
      { label: "> 16 ชม.", score: 3 },
    ],
  },
];

export function questionsByDimension(d: Dimension) {
  return questions.filter((q) => q.dimension === d);
}

// Mock pre-computed result for the demo scorecard / recommendations.
export const mockResult = {
  total: 62,
  byDimension: { energy: 58, water: 71, waste: 49, labor: 70 },
  thaiTaxonomy: { level: "amber" as const, percent: 62 },
  chinaCatalogue: { aligned: true, category: "2.3.1 — Energy-efficient textile" },
  tier: "Transition" as const,
};
