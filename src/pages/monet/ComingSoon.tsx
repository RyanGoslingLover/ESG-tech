import { MonetLayout } from "@/components/monet/layout/MonetLayout";
import { Construction } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ComingSoon({ title, blurb }: { title: string; blurb: string }) {
  return (
    <MonetLayout>
      <div className="container max-w-2xl py-24 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-bg text-primary">
          <Construction className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-3 text-ink-2">{blurb}</p>
        <Button asChild className="mt-8 h-11 rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90">
          <Link to="/">กลับหน้าแรก</Link>
        </Button>
      </div>
    </MonetLayout>
  );
}
