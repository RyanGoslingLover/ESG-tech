import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Building2, Factory, Users, Coins, Globe } from "lucide-react";
import { MonetLayout } from "@/components/monet/layout/MonetLayout";
import { Button } from "@/components/ui/button";
import { useMonet } from "@/store/useMonet";
import { cn } from "@/lib/utils";

const subSectors = [
  { value: "garment", label: "ตัดเย็บเสื้อผ้า (Garment)", icon: Factory },
  { value: "weaving", label: "ทอผ้า (Weaving)", icon: Factory },
  { value: "dyeing", label: "ย้อม (Dyeing)", icon: Factory },
  { value: "finishing", label: "ตกแต่งสำเร็จ (Finishing)", icon: Factory },
] as const;

const employeeBuckets = ["10–30 คน", "31–50 คน", "51–100 คน", "101–200 คน"];
const revenueBuckets = ["< 30 ล้าน", "30 – 100 ล้าน", "100 – 300 ล้าน", "> 300 ล้าน"];
const exportBuckets = ["0% (ในประเทศ)", "1 – 30%", "30 – 60%", "> 60%"];

export default function OnboardingStart() {
  const nav = useNavigate();
  const { onboarding, setOnboarding } = useMonet();

  const canSubmit = onboarding.companyName.trim().length > 1 && onboarding.subSector;

  return (
    <MonetLayout>
      <div className="container max-w-3xl py-12 md:py-16">
        {/* Step indicator */}
        <div className="mb-10 flex items-center gap-2">
          <Step n={1} active label="ข้อมูลกิจการ" />
          <Connector />
          <Step n={2} label="ขอบเขตการประเมิน" />
          <Connector />
          <Step n={3} label="ตอบคำถาม" />
          <Connector />
          <Step n={4} label="รับผลและรายงาน" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
          ก่อนเริ่ม ขอข้อมูลพื้นฐานสักนิด
        </h1>
        <p className="mt-3 text-ink-2">
          ใช้เพื่อปรับเกณฑ์การประเมินให้ตรงกับขนาดและประเภทอุตสาหกรรมของคุณ — ข้อมูลนี้ไม่ออกจากเครื่อง
        </p>

        <div className="mt-10 space-y-8 rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
          {/* Company name */}
          <div>
            <Label icon={Building2}>ชื่อกิจการ / โรงงาน</Label>
            <input
              value={onboarding.companyName}
              onChange={(e) => setOnboarding({ companyName: e.target.value })}
              placeholder="เช่น บริษัท สยามทอผ้า จำกัด"
              className="mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-[15px] text-ink placeholder:text-ink-mute ring-focus"
            />
          </div>

          {/* Sub-sector */}
          <div>
            <Label icon={Factory}>ประเภทอุตสาหกรรมย่อย</Label>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {subSectors.map((s) => {
                const active = onboarding.subSector === s.value;
                return (
                  <button
                    key={s.value}
                    onClick={() => setOnboarding({ subSector: s.value })}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ring-focus",
                      active
                        ? "border-primary bg-emerald-bg text-primary"
                        : "border-border bg-background text-ink-2 hover:border-ink-mute"
                    )}
                  >
                    <s.icon className="h-4 w-4 shrink-0" />
                    <span className="font-medium">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Employees */}
          <div>
            <Label icon={Users}>จำนวนพนักงาน</Label>
            <BucketGroup
              options={employeeBuckets}
              value={onboarding.employees}
              onChange={(v) => setOnboarding({ employees: v })}
            />
          </div>

          {/* Revenue */}
          <div>
            <Label icon={Coins}>รายได้ต่อปี (บาท)</Label>
            <BucketGroup
              options={revenueBuckets}
              value={onboarding.revenue}
              onChange={(v) => setOnboarding({ revenue: v })}
            />
          </div>

          {/* Export share */}
          <div>
            <Label icon={Globe}>สัดส่วนการส่งออก</Label>
            <BucketGroup
              options={exportBuckets}
              value={onboarding.exportShare}
              onChange={(v) => setOnboarding({ exportShare: v })}
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => nav("/")} className="h-11 rounded-xl text-ink-2">
            <ArrowLeft className="mr-1 h-4 w-4" /> ย้อนกลับ
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => nav("/assessment/energy")}
              className="h-11 rounded-xl border-border text-ink-2"
            >
              ข้ามขั้นตอนนี้
            </Button>
            <Button
              onClick={() => nav("/assessment/energy")}
              disabled={!canSubmit}
              className="h-11 rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90"
            >
              ถัดไป <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </MonetLayout>
  );
}

function Label({ children, icon: Icon }: { children: React.ReactNode; icon: any }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
      <Icon className="h-4 w-4 text-primary" />
      {children}
    </div>
  );
}

function BucketGroup({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-sm transition-colors ring-focus",
              active
                ? "border-primary bg-emerald-bg text-primary font-medium"
                : "border-border bg-background text-ink-2 hover:border-ink-mute"
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function Step({ n, label, active }: { n: number; label: string; active?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
          active ? "bg-primary text-primary-foreground" : "bg-secondary text-ink-3"
        )}
      >
        {n}
      </div>
      <span className={cn("hidden text-xs font-medium md:inline", active ? "text-ink" : "text-ink-3")}>
        {label}
      </span>
    </div>
  );
}

function Connector() {
  return <div className="h-px flex-1 bg-border" />;
}
