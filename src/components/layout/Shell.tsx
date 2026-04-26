import { ReactNode } from "react";
import { PipelineRail } from "./PipelineRail";
import { TopBar } from "./TopBar";
import { StatusBar } from "./StatusBar";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-brand-bg text-brand-text">
      <div className="flex flex-1 overflow-hidden">
        <PipelineRail />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto scrollbar-thin">
            <div className="animate-fade-in">{children}</div>
          </main>
        </div>
      </div>
      <StatusBar />
    </div>
  );
}
