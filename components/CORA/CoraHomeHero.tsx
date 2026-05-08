"use client";

import Link from "next/link";
import { CORA_STAGES } from "@/lib/cora";
import { CoraHomeFlowVisual } from "./CoraHomeFlowVisual";

export function CoraHomeHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #AF52DE33, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full opacity-35 blur-3xl"
        style={{ background: "radial-gradient(circle, #007AFF33, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
          C.O.R.A MODELİ
        </p>
        <h1 className="mt-4 text-center text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
          Sürekli test döngüsü
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-center text-base text-white/55 sm:text-lg">
          Ana akışta paylaştığınız C.O.R.A infografiğini kullanıyoruz. Aşamalara
          geçmek için alttaki kısayolları veya üst menüyü kullanın.
        </p>

        <div className="mt-10">
          <CoraHomeFlowVisual />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {CORA_STAGES.map((s) => (
            <Link
              key={s.id}
              href={s.route}
              className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/85 transition hover:border-white/30 hover:bg-white/[0.09] sm:text-sm"
              style={{
                boxShadow: `0 0 20px rgba(${s.accentRgb},0.12)`,
              }}
            >
              <span style={{ color: s.accent }} className="font-semibold">
                ●
              </span>{" "}
              {s.navLabel}
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-[11px] text-white/35">
          Planlama ve Analiz · Geliştirme · Test · Uygulama · Bakım ve Destek — görseldeki
          sırayla bağlı süreç akışı
        </p>
      </div>
    </section>
  );
}
