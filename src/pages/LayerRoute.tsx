import { PortalLayout } from "@/components/layout/PortalLayout";
import { PipelinePage } from "@/pages/PipelinePage";

const LayerRoute = () => (
  <PortalLayout>
    <div className="mx-auto max-w-7xl">
      <PipelinePage />
    </div>
  </PortalLayout>
);

export default LayerRoute;
