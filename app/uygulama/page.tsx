import type { Metadata } from "next";
import { StagePageShell } from "@/components/CORA/StagePageShell";
import { getStage } from "@/lib/cora";

export const metadata: Metadata = {
  title: "Uygulama",
  description: "Kabul ve performans testleri ile canlıya geçiş.",
};

export default function UygulamaPage() {
  return (
    <main>
      <StagePageShell stage={getStage("uygulama")} />
    </main>
  );
}
