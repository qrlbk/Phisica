"use client";

import { useCallback, useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SolarSystemScene } from "@/components/space/SolarSystemScene";
import { PlanetInfoModal } from "@/components/space/PlanetInfoModal";
import { PlanetComparePanel } from "@/components/space/PlanetComparePanel";
import { SpaceMissions } from "@/components/space/SpaceMissions";
import { PlanetInfo, getPlanets } from "@/data/planets";
import { getSpaceMissions } from "@/data/spaceMissions";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function SpacePage() {
  const { t, locale } = useI18n();
  const planets = useMemo(() => getPlanets(locale), [locale]);
  const missions = useMemo(() => getSpaceMissions(locale), [locale]);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null);
  const [timeScale, setTimeScale] = useState(1);
  const [sunMassScale, setSunMassScale] = useState(1);
  const [distanceScale, setDistanceScale] = useState(1);
  const [velocityScale, setVelocityScale] = useState(1);
  const [focusPlanetId, setFocusPlanetId] = useState<string | null>(null);
  const [leftPlanetId, setLeftPlanetId] = useState(planets[0].id);
  const [rightPlanetId, setRightPlanetId] = useState(planets[1].id);
  const [activeMissionIndex, setActiveMissionIndex] = useState(0);
  const [solvedMissionIds, setSolvedMissionIds] = useState<string[]>([]);
  const [spaceScore, setSpaceScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });

  const playRewardSound = useCallback(() => {
    try {
      const context = new window.AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(650, context.currentTime);
      oscillator.frequency.linearRampToValueAtTime(980, context.currentTime + 0.2);
      gain.gain.setValueAtTime(0.01, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.22, context.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.25);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.25);
    } catch {
      // ignore audio limitations
    }
  }, []);

  const handlePlanetSelect = (planet: PlanetInfo) => {
    setSelectedPlanetId(planet.id);
    setFocusPlanetId(planet.id);

    const currentMission = missions[activeMissionIndex];
    if (!currentMission || solvedMissionIds.includes(currentMission.id)) {
      return;
    }

    if (planet.id === currentMission.answerPlanetId) {
      setSolvedMissionIds((prev) => [...prev, currentMission.id]);
      setStreak((prev) => {
        setSpaceScore((scorePrev) => scorePrev + 10 + prev * 2);
        return prev + 1;
      });
      setFeedback({
        type: "success",
        message: `${t("space.missions.correct")} ${currentMission.explanation}`
      });
      playRewardSound();
      setActiveMissionIndex((prev) => Math.min(prev + 1, missions.length - 1));
    } else {
      setStreak(0);
      setSpaceScore((prev) => Math.max(0, prev - 2));
      setFeedback({
        type: "error",
        message: `${t("space.missions.wrongPrefix")} ${currentMission.hint} ${currentMission.explanation}`
      });
    }
  };

  const selectedPlanet = selectedPlanetId ? planets.find((planet) => planet.id === selectedPlanetId) ?? null : null;
  const currentMission = missions[activeMissionIndex] ?? null;
  const allMissionsDone = useMemo(() => solvedMissionIds.length === missions.length && missions.length > 0, [missions.length, solvedMissionIds.length]);

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
          {t("space.controls.sunMass")}: {sunMassScale.toFixed(2)}x
        </label>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.05}
          value={sunMassScale}
          onChange={(event) => setSunMassScale(Number(event.target.value))}
          className="w-48"
        />
        <label className="text-sm text-white/80">
          {t("space.controls.distance")}: {distanceScale.toFixed(2)}x
        </label>
        <input
          type="range"
          min={0.7}
          max={1.8}
          step={0.05}
          value={distanceScale}
          onChange={(event) => setDistanceScale(Number(event.target.value))}
          className="w-48"
        />
        <label className="text-sm text-white/80">
          {t("space.controls.velocity")}: {velocityScale.toFixed(2)}x
        </label>
        <input
          type="range"
          min={0.6}
          max={1.8}
          step={0.05}
          value={velocityScale}
          onChange={(event) => setVelocityScale(Number(event.target.value))}
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
      <SolarSystemScene
        planets={planets}
        onSelectPlanet={handlePlanetSelect}
        timeScale={timeScale}
        focusPlanetId={focusPlanetId}
        sunMassScale={sunMassScale}
        distanceScale={distanceScale}
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
          missions={missions}
          activeMissionIndex={activeMissionIndex}
          solvedMissionIds={solvedMissionIds}
          score={spaceScore}
          streak={streak}
          feedback={feedback}
        />
      </div>
      {allMissionsDone ? (
        <div className="mt-4 rounded-xl border border-emerald-300/40 bg-emerald-500/10 p-3 text-sm text-emerald-100">
          {t("space.missions.allDone")} {spaceScore}
        </div>
      ) : null}
      {currentMission ? (
        <div className="mt-3 rounded-xl border border-white/15 bg-white/5 p-3 text-xs text-white/70">
          {t("space.learning.currentMissionRule")}: {currentMission.explanation}
        </div>
      ) : null}
      <PlanetInfoModal planet={selectedPlanet} onClose={() => setSelectedPlanetId(null)} />
    </AppShell>
  );
}
