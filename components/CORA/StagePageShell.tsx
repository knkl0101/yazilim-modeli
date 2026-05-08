import type { CoraStage } from "@/lib/cora";
import { CoraDashboardStrip } from "./CoraDashboardStrip";
import { CoraTestLayer } from "./CoraTestLayer";

export function StagePageShell({ stage }: { stage: CoraStage }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
          C.O.R.A · Süreç görünümü
        </p>
        <h1
          className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          style={{ textShadow: `0 0 40px ${stage.accent}33` }}
        >
          {stage.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/60">
          {stage.description}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-start">
        <div className="flex flex-col gap-8">
          {stage.deepDive ? (
            <section
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 sm:p-8"
              aria-labelledby="deep-dive-heading"
            >
              <h2
                id="deep-dive-heading"
                className="text-lg font-semibold tracking-tight text-white sm:text-xl"
                style={{ color: stage.accent }}
              >
                {stage.deepDive.overviewTitle}
              </h2>
              {stage.deepDive.overviewParagraphs.map((p, i) => (
                <p key={`ov-${i}`} className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                  {p}
                </p>
              ))}
              <div
                className="my-8 h-px w-full"
                style={{
                  backgroundImage: `linear-gradient(90deg, transparent, ${stage.accent}55, transparent)`,
                }}
              />
              {stage.deepDive.sections.map((sec) => (
                <div key={sec.heading} className="mb-8 last:mb-0">
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {sec.heading}
                  </h3>
                  {sec.paragraphs.map((para, j) => (
                    <p
                      key={`${sec.heading}-${j}`}
                      className="mt-3 text-sm leading-7 text-white/65 sm:text-base"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </section>
          ) : null}

          <section
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 sm:p-8"
            aria-labelledby="analysis-heading"
          >
            <h2
              id="analysis-heading"
              className="text-sm font-semibold uppercase tracking-wider text-white/50"
            >
              Derinlemesine analiz
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
              {stage.narrative}
            </p>
            <div
              className="mt-6 h-px w-full bg-gradient-to-r from-transparent to-transparent opacity-80"
              style={{
                backgroundImage: `linear-gradient(90deg, transparent, ${stage.accent}66, transparent)`,
              }}
            />
            <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-white/45">
              Simüle operasyon panosu
            </h3>
            <div className="mt-4">
              <CoraDashboardStrip stage={stage} />
            </div>
          </section>

          <section
            className="rounded-2xl border border-white/10 bg-black/25 p-6 sm:p-8"
            aria-labelledby="docs-heading"
          >
            <h2
              id="docs-heading"
              className="text-sm font-semibold uppercase tracking-wider text-white/50"
            >
              Dokümantasyon ve test sonuçları
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex justify-between gap-4 rounded-lg bg-white/[0.04] px-4 py-3">
                <span>Son pipeline koşusu</span>
                <span className="font-mono text-emerald-400/90">Başarılı</span>
              </li>
              <li className="flex justify-between gap-4 rounded-lg bg-white/[0.04] px-4 py-3">
                <span>Kalite kapısı</span>
                <span className="font-mono text-white/70">Onaylı · v2.6</span>
              </li>
              <li className="flex justify-between gap-4 rounded-lg bg-white/[0.04] px-4 py-3">
                <span>İzlenebilirlik</span>
                <span className="font-mono" style={{ color: stage.accent }}>
                  Tam iz
                </span>
              </li>
            </ul>
          </section>
        </div>

        <div className="lg:sticky lg:top-28">
          <CoraTestLayer stage={stage} />
        </div>
      </div>
    </div>
  );
}
