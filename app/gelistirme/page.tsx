import type { Metadata } from "next";
import { StagePageShell } from "@/components/CORA/StagePageShell";
import { getStage } from "@/lib/cora";

export const metadata: Metadata = {
  title: "Geliştirme",
  description: "Birim testleri ve statik analiz ile geliştirme kalitesi.",
};

export default function GelistirmePage() {
  return (
    <main>
      <StagePageShell stage={getStage("gelistirme")} />
    </main>
  );
}
