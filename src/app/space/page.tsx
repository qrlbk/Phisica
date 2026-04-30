"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SolarSystemScene } from "@/components/space/SolarSystemScene";
import { PlanetInfoModal } from "@/components/space/PlanetInfoModal";
import { PlanetComparePanel } from "@/components/space/PlanetComparePanel";
import { SpaceMissions } from "@/components/space/SpaceMissions";
import { PlanetInfo, getPlanets } from "@/data/planets";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function SpacePage() {
  const { t, locale } = useI18n();
  const planets = getPlanets(locale);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [timeScale, setTimeScale] = useState(1);
  const [sunMassScale, setSunMassScale] = useState(1);
  const [orbitRadiusScale, setOrbitRadiusScale] = useState(1);
  const [velocityScale, setVelocityScale] = useState(1);
  const [focusPlanetId, setFocusPlanetId] = useState<string | null>(null);
  const [leftPlanetId, setLeftPlanetId] = useState(planets[0].id);
  const [rightPlanetId, setRightPlanetId] = useState(planets[1].id);
  const [missionAnswers, setMissionAnswers] = useState<Record<string, string>>({});

  const handlePlanetSelect = (planet: PlanetInfo) => {
    setSelectedPlanetId(planet.id);
    setFocusPlanetId(planet.id);
  };
  const selectedPlanet = selectedPlanetId ? planets.find((planet) => planet.id === selectedPlanetId) ?? null : null;

  return (
    <AppShell
      title={t("space.title")}
      description={t("space.description")}
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-3">
        <label className="text-sm text-white/80">
          {t("space.timeScale")}: {timeScale.toFixed(1)}x
        </label>
        <input
          type="range"
          min={0.4}
          max={3}
          step={0.1}
          value={timeScale}
          onChange={(event) => setTimeScale(Number(event.target.value))}
          className="w-48"
        />
        <label className="text-sm text-white/80">
          {locale === "kk" ? "Күн массасы" : locale === "en" ? "Sun mass" : "Масса Солнца"}: {sunMassScale.toFixed(1)}x
        </label>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={sunMassScale}
          onChange={(event) => setSunMassScale(Number(event.target.value))}
          className="w-40"
        />
        <label className="text-sm text-white/80">
          {locale === "kk" ? "Орбита қашықтығы" : locale === "en" ? "Orbit distance" : "Расстояние орбиты"}: {orbitRadiusScale.toFixed(1)}x
        </label>
        <input
          type="range"
          min={0.7}
          max={1.6}
          step={0.1}
          value={orbitRadiusScale}
          onChange={(event) => setOrbitRadiusScale(Number(event.target.value))}
          className="w-40"
        />
        <label className="text-sm text-white/80">
          {locale === "kk" ? "Бастапқы жылдамдық" : locale === "en" ? "Base velocity" : "Начальная скорость"}: {velocityScale.toFixed(1)}x
        </label>
        <input
          type="range"
          min={0.6}
          max={1.8}
          step={0.1}
          value={velocityScale}
          onChange={(event) => setVelocityScale(Number(event.target.value))}
          className="w-40"
        />
        {focusPlanetId ? (
          <button
            type="button"
            onClick={() => setFocusPlanetId(null)}
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1 text-sm text-white/85"
          >
            {t("space.systemView")}
          </button>
        ) : null}
      </div>
      <div className="mb-4 rounded-xl border border-cyan-300/20 bg-cyan-500/5 p-3 text-sm text-cyan-100">
        {locale === "kk"
          ? "Неге? Күнге жақындаған сайын тартылыс күшейеді -> орбиталық жылдамдық өседі. Орбита үлкейсе, бір айналым уақыты ұзарады."
          : locale === "en"
            ? "Why: closer to the Sun means stronger gravity -> higher orbital speed. A larger orbit means a longer period."
            : "Почему: чем ближе к Солнцу, тем сильнее гравитация -> выше орбитальная скорость. Чем больше орбита, тем длиннее период."}
      </div>
      <SolarSystemScene
        planets={planets}
        onSelectPlanet={handlePlanetSelect}
        timeScale={timeScale}
        focusPlanetId={focusPlanetId}
        sunMassScale={sunMassScale}
        orbitRadiusScale={orbitRadiusScale}
        velocityScale={velocityScale}
      />
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <PlanetComparePanel
          leftPlanetId={leftPlanetId}
          rightPlanetId={rightPlanetId}
          onLeftChange={setLeftPlanetId}
          onRightChange={setRightPlanetId}
        />
        <SpaceMissions
          answers={missionAnswers}
          onAnswer={(missionId, planetId) =>
            setMissionAnswers((prev) => ({
              ...prev,
              [missionId]: planetId
            }))
          }
        />
      </div>
      <PlanetInfoModal planet={selectedPlanet} onClose={() => setSelectedPlanetId(null)} />
    </AppShell>
  );
}
