"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CORA_STAGES } from "@/lib/cora";

function stepClass(active: boolean) {
  const base =
    "relative flex min-w-[7.5rem] flex-1 flex-col items-center gap-1 rounded-xl border px-3 py-2.5 text-center transition-all duration-300 sm:min-w-0 sm:flex-row sm:justify-center sm:gap-2";
  if (active) {
    return `${base} border-white/20 bg-white/[0.06] shadow-[0_0_24px_rgba(var(--glow),0.35)]`;
  }
  return `${base} border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]`;
}

export function CoraStepNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/10 bg-[#070b12]/85 backdrop-blur-xl"
      aria-label="C.O.R.A süreç adımları"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Link
            href="/"
            className="font-semibold tracking-tight text-white transition hover:text-white/80"
          >
            C.O.R.A
          </Link>
          <p className="hidden text-xs text-white/45 sm:block">
            Sürekli test döngüsü — her aşamada doğrulama
          </p>
        </div>
        <ol className="flex flex-wrap items-stretch gap-2 sm:gap-1 md:flex-nowrap">
          <li className="flex-1 min-w-[5.5rem] sm:min-w-0">
            <Link
              href="/"
              className={stepClass(pathname === "/")}
              style={
                pathname === "/"
                  ? ({ ["--glow" as string]: "148, 163, 184" } as React.CSSProperties)
                  : undefined
              }
            >
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                0
              </span>
              <span className="text-xs font-medium text-white sm:text-sm">
                Ana akış
              </span>
            </Link>
          </li>
          {CORA_STAGES.map((stage, i) => {
            const active = pathname === stage.route;
            return (
              <li key={stage.id} className="flex-1 min-w-[6rem] sm:min-w-0">
                <Link
                  href={stage.route}
                  className={stepClass(active)}
                  style={
                    active
                      ? ({
                          ["--glow" as string]: stage.accentRgb,
                          boxShadow: `0 0 28px rgba(${stage.accentRgb},0.25)`,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  <span
                    className="text-[10px] font-bold tabular-nums"
                    style={{ color: stage.accent }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-xs font-medium text-white sm:text-sm"
                    style={
                      active ? { textShadow: `0 0 12px ${stage.accent}55` } : undefined
                    }
                  >
                    {stage.navLabel}
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
