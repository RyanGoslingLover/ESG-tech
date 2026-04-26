import type { Indicator, RecordRow } from "@/data/seed";

export interface IndicatorScore {
  indicator: Indicator;
  rawValue: number;
  normalized: number; // 0-1
  contribution: number; // weight * normalized
}

export function computeIndicatorScores(
  records: RecordRow[],
  indicators: Indicator[],
  smeId: string
): IndicatorScore[] {
  return indicators.map((ind) => {
    const rs = records.filter((r) => r.smeId === smeId && r.indicatorId === ind.id);
    const raw = rs.length ? rs.reduce((a, r) => a + r.value, 0) / rs.length : ind.target * 0.7;
    let norm: number;
    if (ind.higherIsBetter) {
      norm = Math.max(0, Math.min(1, raw / ind.target));
    } else {
      norm = Math.max(0, Math.min(1, ind.target / Math.max(raw, 0.01)));
    }
    return {
      indicator: ind,
      rawValue: Math.round(raw * 100) / 100,
      normalized: Math.round(norm * 100) / 100,
      contribution: Math.round(ind.weight * norm * 10) / 10,
    };
  });
}

export function totalScore(scores: IndicatorScore[]): number {
  return Math.round(scores.reduce((a, s) => a + s.contribution, 0));
}

export function tierFor(score: number) {
  if (score >= 80) return "Tier 1";
  if (score >= 70) return "Tier 2";
  if (score >= 55) return "Tier 3";
  return "Pre-tier";
}
