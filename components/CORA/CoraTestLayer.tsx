"use client";

import type { CoraStage, TestProtocol } from "@/lib/cora";

const statusStyles: Record<TestProtocol["status"], string> = {
  Geçti: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  Uyarı: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  Çalışıyor: "bg-sky-500/15 text-sky-300 ring-sky-500/40 animate-pulse",
  Beklemede: "bg-white/10 text-white/55 ring-white/15",
};

export function CoraTestLayer({ stage }: { stage: CoraStage }) {
  return (
    <aside
      className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-5 shadow-[0_0_40px_rgba(0,0,0,0.35)]"
      aria-labelledby="test-layer-heading"
    >
      <div>
        <p
          id="test-layer-heading"
          className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45"
        >
          Test katmanı
        </p>
        <h2 className="mt-1 text-lg font-semibold text-white">
          {stage.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          Bu aşamaya özgü doğrulama protokolleri ve canlı simüle metrikler.
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {stage.testProtocols.map((p) => (
          <li
            key={p.id}
            className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-sm font-medium leading-snug text-white/90">
                {p.name}
              </p>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ${statusStyles[p.status]}`}
              >
                {p.status}
              </span>
            </div>
            <p
              className="mt-2 text-xs font-mono text-white/70"
              style={{ color: `${stage.accent}cc` }}
            >
              {p.metric}
            </p>
            {p.detail ? (
              <p className="mt-1 text-xs text-white/45">{p.detail}</p>
            ) : null}
            <div
              className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10"
              aria-hidden
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width:
                    p.status === "Geçti"
                      ? "92%"
                      : p.status === "Uyarı"
                        ? "72%"
                        : p.status === "Çalışıyor"
                          ? "67%"
                          : "28%",
                  background: `linear-gradient(90deg, ${stage.accent}88, ${stage.accent})`,
                  boxShadow: `0 0 12px ${stage.accent}66`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Çıktılar
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-white/60">
          {stage.outputs.map((o) => (
            <li key={o} className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: stage.accent }}
              />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
