import type { Metadata } from "next";
import { StagePageShell } from "@/components/CORA/StagePageShell";
import { getStage } from "@/lib/cora";

export const metadata: Metadata = {
  title: "Bakım ve Destek",
  description: "Gerileme ve yenileme testleri ile sürekli operasyon.",
};

export default function BakimPage() {
  return (
    <main>
      <StagePageShell stage={getStage("bakim")} />
    </main>
  );
}
