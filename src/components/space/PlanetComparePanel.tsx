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
  const maxSize = Math.max(left.size, right.size, 0.1);
  const maxSpeed = Math.max(left.orbitSpeed, right.orbitSpeed, 0.1);
  const maxRadius = Math.max(left.orbitRadius, right.orbitRadius, 0.1);

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
      <div className="mt-3 grid gap-2 text-sm text-white/80">
        <p>
          {t("space.compare.size")}: <span className={isLeftBigger ? "text-cyan-200" : "text-white"}>{left.name}</span> {left.size.toFixed(2)} ·{" "}
          <span className={!isLeftBigger ? "text-cyan-200" : "text-white"}>{right.name}</span> {right.size.toFixed(2)}
        </p>
        <p>
          {t("space.compare.speed")}: <span className={isLeftFaster ? "text-cyan-200" : "text-white"}>{left.name}</span> {left.orbitSpeed.toFixed(2)} ·{" "}
          <span className={!isLeftFaster ? "text-cyan-200" : "text-white"}>{right.name}</span> {right.orbitSpeed.toFixed(2)}
        </p>
        <p>
          {t("space.compare.radius")}: <span className={isLeftFurther ? "text-cyan-200" : "text-white"}>{left.name}</span> {left.orbitRadius.toFixed(1)} ·{" "}
          <span className={!isLeftFurther ? "text-cyan-200" : "text-white"}>{right.name}</span> {right.orbitRadius.toFixed(1)}
        </p>
        <p>
          {t("space.compare.period")}: {left.name} — {left.orbitPeriod}, {right.name} — {right.orbitPeriod}
        </p>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <p className="mb-1 text-xs text-white/60">{t("space.compare.size")}</p>
          <div className="h-2 rounded bg-white/10">
            <div className="h-2 rounded bg-cyan-300" style={{ width: `${(left.size / maxSize) * 100}%` }} />
          </div>
          <div className="mt-1 h-2 rounded bg-white/10">
            <div className="h-2 rounded bg-violet-300" style={{ width: `${(right.size / maxSize) * 100}%` }} />
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-white/60">{t("space.compare.speed")}</p>
          <div className="h-2 rounded bg-white/10">
            <div className="h-2 rounded bg-cyan-300" style={{ width: `${(left.orbitSpeed / maxSpeed) * 100}%` }} />
          </div>
          <div className="mt-1 h-2 rounded bg-white/10">
            <div className="h-2 rounded bg-violet-300" style={{ width: `${(right.orbitSpeed / maxSpeed) * 100}%` }} />
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs text-white/60">{t("space.compare.radius")}</p>
          <div className="h-2 rounded bg-white/10">
            <div className="h-2 rounded bg-cyan-300" style={{ width: `${(left.orbitRadius / maxRadius) * 100}%` }} />
          </div>
          <div className="mt-1 h-2 rounded bg-white/10">
            <div className="h-2 rounded bg-violet-300" style={{ width: `${(right.orbitRadius / maxRadius) * 100}%` }} />
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-cyan-100/90">
        {locale === "kk"
          ? "Қорытынды: Күнге жақын планета әдетте жылдамырақ қозғалады; орбита үлкейген сайын период ұзарады."
          : locale === "en"
            ? "Takeaway: planets closer to the Sun usually move faster; larger orbits lead to longer periods."
            : "Вывод: чем ближе планета к Солнцу, тем обычно выше скорость; чем больше орбита, тем длиннее период."}
      </p>
    </section>
  );
}
