import { useParams, Navigate } from "react-router-dom";
import { Layer1Capture } from "@/components/layers/Layer1Capture";
import { Layer2Intake } from "@/components/layers/Layer2Intake";
import { Layer3Extraction } from "@/components/layers/Layer3Extraction";
import { Layer4StructuredData } from "@/components/layers/Layer4StructuredData";
import { Layer5Scoring } from "@/components/layers/Layer5Scoring";
import { Layer6Analysis } from "@/components/layers/Layer6Analysis";
import { Layer7Dashboard } from "@/components/layers/Layer7Dashboard";
import { Layer8Review } from "@/components/layers/Layer8Review";
import { Layer9Output } from "@/components/layers/Layer9Output";

const map: Record<string, () => JSX.Element> = {
  "1": Layer1Capture, "2": Layer2Intake, "3": Layer3Extraction,
  "4": Layer4StructuredData, "5": Layer5Scoring, "6": Layer6Analysis,
  "7": Layer7Dashboard, "8": Layer8Review, "9": Layer9Output,
};

export function PipelinePage() {
  const { n } = useParams();
  const Cmp = n && map[n];
  if (!Cmp) return <Navigate to="/" replace />;
  return <Cmp />;
}
