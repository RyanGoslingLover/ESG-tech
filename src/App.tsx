import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/monet/Landing";
import OnboardingStart from "@/pages/monet/OnboardingStart";
import Assessment from "@/pages/monet/Assessment";
import ComingSoon from "@/pages/monet/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/assessment" element={<Navigate to="/assessment/start" replace />} />
          <Route path="/assessment/start" element={<OnboardingStart />} />
          <Route path="/assessment/:dimension" element={<Assessment />} />
          <Route
            path="/results"
            element={<ComingSoon title="ผลการประเมิน" blurb="หน้านี้กำลังจะเปิดให้ใช้งานในรอบถัดไป — จะแสดงคะแนนรวม Radar Chart และตราอ้างอิง Taxonomy" />}
          />
          <Route
            path="/results/actions"
            element={<ComingSoon title="คำแนะนำเชิงปฏิบัติ" blurb="รายการ Action เรียงลำดับความสำคัญ พร้อมประมาณการ CO₂e และโปรแกรมสินเชื่อที่เข้าเกณฑ์" />}
          />
          <Route
            path="/monitor"
            element={<ComingSoon title="ติดตาม IoT" blurb="แดชบอร์ดเรียลไทม์จากเซ็นเซอร์ ESP32 — kWh, การใช้น้ำ และ pH น้ำทิ้ง" />}
          />
          <Route
            path="/ask"
            element={<ComingSoon title="ถาม AI" blurb="ถามเกี่ยวกับ Thailand Taxonomy หรือ China Catalogue ได้โดยตรง พร้อมการอ้างอิงแหล่งที่มา" />}
          />
          <Route
            path="/admin/cohort"
            element={<ComingSoon title="แดชบอร์ดวิจัย" blurb="ภาพรวมข้อมูลแบบ anonymized สำหรับการวิเคราะห์เชิงวิชาการ" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
