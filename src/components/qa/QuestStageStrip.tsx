"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";

type QuestStageStripProps = {
  currentIndex: number;
};

const STAGE_KEYS = ["qa.quest.stage1", "qa.quest.stage2", "qa.quest.stage3"] as const;

export function QuestStageStrip({ currentIndex }: QuestStageStripProps) {
  const { t } = useI18n();

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-cyan-400/25 bg-gradient-to-r from-cyan-500/10 via-white/5 to-violet-500/10 px-3 py-3">
      {STAGE_KEYS.map((key, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <div
            key={key}
            className={`flex min-w-[28%] flex-1 items-center gap-2 rounded-lg border px-2 py-2 text-xs md:text-sm ${
              active
                ? "border-cyan-300/70 bg-cyan-500/20 text-white"
                : done
                  ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100/90"
                  : "border-white/15 bg-white/5 text-white/55"
            }`}
          >
            <span className="font-mono text-[10px] text-white/50 md:text-xs">{i + 1}</span>
            <span className="font-medium">{t(key)}</span>
            {done ? <span aria-hidden>✓</span> : null}
          </div>
        );
      })}
    </div>
  );
}
