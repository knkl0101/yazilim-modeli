import type { Metadata } from "next";
import { StagePageShell } from "@/components/CORA/StagePageShell";
import { getStage } from "@/lib/cora";

export const metadata: Metadata = {
  title: "Test",
  description: "Entegrasyon ve sistem testi merkezi.",
};

export default function TestPage() {
  return (
    <main>
      <StagePageShell stage={getStage("test")} />
    </main>
  );
}
