import type { Metadata } from "next";
import { StagePageShell } from "@/components/CORA/StagePageShell";
import { getStage } from "@/lib/cora";

export const metadata: Metadata = {
  title: "Planlama ve Analiz",
  description: "Gereksinim ve risk analizi test katmanı ile süreç çıktıları.",
};

export default function PlanlamaPage() {
  return (
    <main>
      <StagePageShell stage={getStage("planlama")} />
    </main>
  );
}
