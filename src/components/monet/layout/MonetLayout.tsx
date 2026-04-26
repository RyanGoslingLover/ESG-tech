import { ReactNode } from "react";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";

export function MonetLayout({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-ink">
      {!hideNav && <TopNav />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
