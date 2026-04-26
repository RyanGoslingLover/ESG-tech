import { useStore } from "@/store/useStore";

export async function runFullPipeline(onLayer?: (n: number) => void) {
  const { setLayerStatus, resetLayerStatuses } = useStore.getState();
  resetLayerStatuses();
  useStore.setState({ pipelineRunning: true });
  for (let n = 1; n <= 9; n++) {
    setLayerStatus(n, "running");
    onLayer?.(n);
    await new Promise((r) => setTimeout(r, 1400));
    setLayerStatus(n, "done");
  }
  useStore.setState({ pipelineRunning: false });
}
