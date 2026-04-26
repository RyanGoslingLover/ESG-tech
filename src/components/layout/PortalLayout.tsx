import { ReactNode } from "react";
import { PlatformNav } from "./PlatformNav";
import { SmeContextBar } from "./SmeContextBar";
import { StatusBar } from "./StatusBar";

export function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg text-brand-text">
      <PlatformNav />
      <SmeContextBar />
      <main className="flex-1">
        <div className="animate-fade-in">{children}</div>
      </main>
      <footer className="border-t border-brand-border bg-brand-surface/40 px-6 py-4 text-[11px] text-brand-text3">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span>© 2026 SERI · Smart ESG Readiness Infrastructure</span>
          <span>KMUTNB Green Tech Competition · Prototype v1.0</span>
        </div>
      </footer>
      <StatusBar />
    </div>
  );
}
