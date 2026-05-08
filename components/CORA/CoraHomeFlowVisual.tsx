"use client";

import { useCallback, useState } from "react";
import { CORA_HOME_FLOW_IMAGE } from "@/lib/cora";

/**
 * Ana akış görseli: `public/` altındaki dosya (`CORA_HOME_FLOW_IMAGE`).
 * Standart <img>: dosya yoksa onError ile açıklama gösterilir (Next Image optimizer’a takılmadan).
 */
export function CoraHomeFlowVisual() {
  const [loadError, setLoadError] = useState(false);

  const onError = useCallback(() => {
    setLoadError(true);
  }, []);

  const fileInPublic = CORA_HOME_FLOW_IMAGE.replace(/^\//, "");

  if (loadError) {
    return (
      <div className="flex min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/10 px-6 py-12 text-center sm:min-h-[360px]">
        <p className="max-w-lg text-sm font-medium text-amber-100/90 sm:text-base">
          Görsel henüz yüklenemedi. Dosyayı şu klasöre kopyalayın (sohbet ile gönderilen
          dosya projeye otomatik eklenmez):
        </p>
        <code className="rounded-lg bg-black/40 px-4 py-2 text-xs text-white/90 sm:text-sm">
          {`public/${fileInPublic}`}
        </code>
        <p className="max-w-md text-xs text-white/50">
          JPG kullanıyorsanız örneğin <span className="font-mono text-white/70">public/infografik.jpg</span>{" "}
          kaydedin ve <span className="font-mono text-white/70">lib/cora.ts</span> içinde{" "}
          <span className="font-mono text-white/70">CORA_HOME_FLOW_IMAGE</span> değerini{" "}
          <span className="font-mono text-white/70">/infografik.jpg</span> yapın.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div
        className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#0c1018] shadow-[0_0_60px_rgba(0,0,0,0.45)] sm:min-h-[300px] md:min-h-[min(68vh,560px)]"
        role="img"
        aria-label="C.O.R.A Modeli: Sürekli Test Döngüsü — ana akış görseli"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CORA_HOME_FLOW_IMAGE}
          alt="C.O.R.A MODELİ: SÜREKLİ TEST DÖNGÜSÜ — beş aşamalı süreç diyagramı"
          className="max-h-[min(68vh,560px)] w-full object-contain object-center"
          onError={onError}
        />
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06]" />
      </div>
      <p className="mt-3 text-center text-[11px] text-white/40">
        Görsel dosyası: <span className="font-mono">{CORA_HOME_FLOW_IMAGE}</span>
      </p>
    </div>
  );
}
