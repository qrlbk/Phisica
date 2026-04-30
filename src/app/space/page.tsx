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
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo | null>(null);
  const [timeScale, setTimeScale] = useState(1);
  const [focusPlanetId, setFocusPlanetId] = useState<string | null>(null);
  const [leftPlanetId, setLeftPlanetId] = useState(planets[0].id);
  const [rightPlanetId, setRightPlanetId] = useState(planets[1].id);
  const [missionAnswers, setMissionAnswers] = useState<Record<string, string>>({});

  const handlePlanetSelect = (planet: PlanetInfo) => {
    setSelectedPlanet(planet);
    setFocusPlanetId(planet.id);
  };

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
      <SolarSystemScene onSelectPlanet={handlePlanetSelect} timeScale={timeScale} focusPlanetId={focusPlanetId} />
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
      <PlanetInfoModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
    </AppShell>
  );
}
