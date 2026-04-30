"use client";

import { getPlanets } from "@/data/planets";
import { useI18n } from "@/lib/i18n/I18nProvider";

type PlanetComparePanelProps = {
  leftPlanetId: string;
  rightPlanetId: string;
  onLeftChange: (value: string) => void;
  onRightChange: (value: string) => void;
};

export function PlanetComparePanel({ leftPlanetId, rightPlanetId, onLeftChange, onRightChange }: PlanetComparePanelProps) {
  const { t, locale } = useI18n();
  const planets = getPlanets(locale);
  const left = planets.find((planet) => planet.id === leftPlanetId) ?? planets[0];
  const right = planets.find((planet) => planet.id === rightPlanetId) ?? planets[1];

  const isLeftBigger = left.size >= right.size;
  const isLeftFaster = left.orbitSpeed >= right.orbitSpeed;
  const isLeftFurther = left.orbitRadius >= right.orbitRadius;
  const maxSize = Math.max(left.size, right.size, 0.01);
  const maxSpeed = Math.max(left.orbitSpeed, right.orbitSpeed, 0.01);
  const maxRadius = Math.max(left.orbitRadius, right.orbitRadius, 0.01);
  const maxPeriod = Math.max(left.periodDays, right.periodDays, 1);

  const winnerName = (leftWins: boolean) => (leftWins ? left.name : right.name);
  const barWidth = (value: number, max: number) => `${Math.max(10, (value / max) * 100)}%`;

  const metrics = [
    {
      key: "size",
      label: t("space.compare.size"),
      leftValue: left.size,
      rightValue: right.size,
      leftDisplay: left.size.toFixed(2),
      rightDisplay: right.size.toFixed(2),
      max: maxSize,
      winner: winnerName(isLeftBigger),
      reason: t("space.compare.bigger")
    },
    {
      key: "speed",
      label: t("space.compare.speed"),
      leftValue: left.orbitSpeed,
      rightValue: right.orbitSpeed,
      leftDisplay: left.orbitSpeed.toFixed(2),
      rightDisplay: right.orbitSpeed.toFixed(2),
      max: maxSpeed,
      winner: winnerName(isLeftFaster),
      reason: t("space.compare.faster")
    },
    {
      key: "radius",
      label: t("space.compare.radius"),
      leftValue: left.orbitRadius,
      rightValue: right.orbitRadius,
      leftDisplay: left.orbitRadius.toFixed(1),
      rightDisplay: right.orbitRadius.toFixed(1),
      max: maxRadius,
      winner: winnerName(isLeftFurther),
      reason: t("space.compare.further")
    },
    {
      key: "period",
      label: t("space.compare.period"),
      leftValue: left.periodDays,
      rightValue: right.periodDays,
      leftDisplay: left.orbitPeriod,
      rightDisplay: right.orbitPeriod,
      max: maxPeriod,
      winner: winnerName(left.periodDays >= right.periodDays),
      reason: t("space.compare.longerPeriod")
    }
  ];

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <h3 className="text-lg font-semibold text-white">{t("space.compare.title")}</h3>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        <select
          value={leftPlanetId}
          onChange={(event) => onLeftChange(event.target.value)}
          className="rounded-lg border border-white/20 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          {planets.map((planet) => (
            <option key={`left-${planet.id}`} value={planet.id}>
              {planet.name}
            </option>
          ))}
        </select>
        <select
          value={rightPlanetId}
          onChange={(event) => onRightChange(event.target.value)}
          className="rounded-lg border border-white/20 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          {planets.map((planet) => (
            <option key={`right-${planet.id}`} value={planet.id}>
              {planet.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3 space-y-3">
        {metrics.map((metric) => (
          <div key={metric.key} className="rounded-lg border border-white/15 bg-black/20 p-3">
            <p className="text-sm font-medium text-white">{metric.label}</p>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              <div>
                <p className="text-xs text-cyan-200">{left.name}</p>
                <div className="mt-1 h-2 rounded bg-cyan-900/40">
                  <div className="h-2 rounded bg-cyan-300" style={{ width: barWidth(metric.leftValue, metric.max) }} />
                </div>
                <p className="mt-1 text-xs text-white/70">{metric.leftDisplay}</p>
              </div>
              <div>
                <p className="text-xs text-violet-200">{right.name}</p>
                <div className="mt-1 h-2 rounded bg-violet-900/40">
                  <div className="h-2 rounded bg-violet-300" style={{ width: barWidth(metric.rightValue, metric.max) }} />
                </div>
                <p className="mt-1 text-xs text-white/70">{metric.rightDisplay}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-emerald-200">
              {t("space.compare.winnerPrefix")} <span className="font-semibold">{metric.winner}</span> — {metric.reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
