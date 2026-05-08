import type { CoraStage } from "@/lib/cora";

const trendSymbol = {
  up: "↑",
  down: "↓",
  flat: "→",
} as const;

export function CoraDashboardStrip({ stage }: { stage: CoraStage }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stage.dashboard.map((card) => (
        <article
          key={card.id}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-inner"
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
            {card.title}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
            {card.value}
          </p>
          <p
            className="mt-1 flex items-center gap-1 text-xs text-white/50"
            aria-label={`Trend: ${card.trend}`}
          >
            <span style={{ color: stage.accent }}>
              {trendSymbol[card.trend]}
            </span>
            {card.delta}
          </p>
        </article>
      ))}
    </div>
  );
}
