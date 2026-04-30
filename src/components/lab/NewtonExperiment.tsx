"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ParameterSlider } from "./ParameterSlider";
import { LabLayout } from "./LabLayout";
import { FormulaInsightPanel } from "./FormulaInsightPanel";
import { ScenarioComparePanel } from "./ScenarioComparePanel";
import { useI18n } from "@/lib/i18n/I18nProvider";

type NewtonExperimentProps = {
  onMissionUpdate: (id: "accelOver6", done: boolean) => void;
};

export function NewtonExperiment({ onMissionUpdate }: NewtonExperimentProps) {
  const { locale } = useI18n();
  const tx = useCallback((kk: string, ru: string, en: string) => (locale === "kk" ? kk : locale === "en" ? en : ru), [locale]);
  const [force, setForce] = useState(20);
  const [mass, setMass] = useState(5);
  const [frictionCoef, setFrictionCoef] = useState(0.2);
  const [dragCoef, setDragCoef] = useState(0.15);
  const [trackLimit, setTrackLimit] = useState(100);
  const [velocity, setVelocity] = useState(0);
  const [position, setPosition] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");
  const [rewardFlash, setRewardFlash] = useState(false);
  const [baseline, setBaseline] = useState<{ force: number; mass: number; acceleration: number; velocity: number; position: number } | null>(null);
  const rewardSeenRef = useRef({ safe: false, optimal: false });

  const frictionForce = useMemo(() => Number((frictionCoef * mass * 9.8).toFixed(2)), [frictionCoef, mass]);
  const dragForce = useMemo(() => Number((dragCoef * velocity).toFixed(2)), [dragCoef, velocity]);
  const netForce = useMemo(() => Number(Math.max(force - frictionForce - dragForce, 0).toFixed(2)), [force, frictionForce, dragForce]);
  const acceleration = useMemo(() => Number((netForce / mass).toFixed(2)), [netForce, mass]);
  const deltaVPerSecond = acceleration;
  const distancePercent = useMemo(() => Number(Math.min((position / trackLimit) * 100, 100).toFixed(1)), [position, trackLimit]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const dt = 0.08;
    const timer = window.setInterval(() => {
      setVelocity((prevV) => {
        const nextV = Math.max(0, prevV + acceleration * dt);
        setPosition((prevX) => {
          const nextX = Math.min(trackLimit, prevX + nextV * dt * 3.8);
          if (nextX >= trackLimit) {
            setIsRunning(false);
          }
          return Number(nextX.toFixed(2));
        });
        return Number(nextV.toFixed(2));
      });
    }, 80);

    return () => window.clearInterval(timer);
  }, [acceleration, isRunning, trackLimit]);

  const playRewardSound = () => {
    try {
      const context = new window.AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.setValueAtTime(660, context.currentTime);
      oscillator.frequency.linearRampToValueAtTime(940, context.currentTime + 0.22);
      gain.gain.setValueAtTime(0.01, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.2, context.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.3);
    } catch {
      // Ignore sound issues silently on restricted environments.
    }
  };

  const triggerReward = useCallback((message: string) => {
    setRewardMessage(message);
    setRewardFlash(true);
    playRewardSound();
    window.setTimeout(() => setRewardFlash(false), 450);
  }, []);

  const resetRun = () => {
    setVelocity(0);
    setPosition(0);
    setIsRunning(false);
  };

  const safeSprintNow = position >= trackLimit * 0.65 && position <= trackLimit * 0.9 && velocity >= 6 && velocity <= 13;
  const optimalMassNow = mass >= 3 && mass <= 5 && acceleration >= 2.2 && acceleration <= 4.5 && frictionCoef <= 0.35;

  useEffect(() => {
    if (safeSprintNow && !rewardSeenRef.current.safe) {
      rewardSeenRef.current.safe = true;
      triggerReward(tx("✔ Керемет! Мақсат: шектен шықпай жылдамдаттың.", "✔ Отлично! Цель: разогнал, не выходя за пределы.", "✔ Great! Goal complete: accelerated without going out of bounds."));
    }

    if (optimalMassNow && !rewardSeenRef.current.optimal) {
      rewardSeenRef.current.optimal = true;
      triggerReward(tx("✔ Жақсы! Оптималды параметрлерді таптың.", "✔ Отлично! Найдена оптимальная масса и режим.", "✔ Nice! You found an optimal mass setup."));
    }
  }, [optimalMassNow, safeSprintNow, triggerReward, tx]);

  const safeSprintDone = safeSprintNow;
  const optimalMassDone = optimalMassNow;
  const missionDone = safeSprintDone && optimalMassDone;
  useEffect(() => {
    onMissionUpdate("accelOver6", missionDone);
  }, [missionDone, onMissionUpdate]);

  const arrowScale = (value: number, max: number) => Math.max(12, Math.round((Math.min(value, max) / max) * 100));

  return (
    <LabLayout
      title={tx("Тәжірибе: F = ma", "Эксперимент: F = ma", "Experiment: F = ma")}
      description={tx(
        "Күштерді басқарып, қозғалысты шектеумен бірге сезін: жылдамдықтың қалай өзгеретінін байқап, мақсаттарды орында.",
        "Управляй силами и ограничениями: наблюдай, как ускорение меняет скорость, и выполняй реальные сценарии.",
        "Control forces and limits: see how acceleration changes speed and complete practical scenarios."
      )}
      controls={
        <div className="space-y-4">
          <ParameterSlider label={tx("Күш", "Сила", "Force")} value={force} min={5} max={50} onChange={setForce} unit=" Н" />
          <ParameterSlider label={tx("Масса", "Масса", "Mass")} value={mass} min={1} max={10} onChange={setMass} unit={tx(" кг", " кг", " kg")} />
          <ParameterSlider
            label={tx("Үйкеліс коэффициенті", "Коэффициент трения", "Friction coefficient")}
            value={Number(frictionCoef.toFixed(2))}
            min={0.05}
            max={0.7}
            step={0.01}
            onChange={setFrictionCoef}
          />
          <ParameterSlider
            label={tx("Орта кедергісі", "Сопротивление среды", "Medium resistance")}
            value={Number(dragCoef.toFixed(2))}
            min={0.05}
            max={0.8}
            step={0.01}
            onChange={setDragCoef}
          />
          <ParameterSlider
            label={tx("Жол шегі", "Предел дорожки", "Track limit")}
            value={trackLimit}
            min={60}
            max={140}
            step={5}
            onChange={setTrackLimit}
            unit={tx(" м", " м", " m")}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsRunning(true)}
              className="rounded-lg bg-cyan-400 px-3 py-2 text-sm font-medium text-slate-900"
            >
              {tx("Старт", "Старт", "Start")}
            </button>
            <button
              type="button"
              onClick={resetRun}
              className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white/85"
            >
              {tx("Қалпына келтіру", "Сброс", "Reset")}
            </button>
          </div>
        </div>
      }
      visualization={
        <div className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <p className="text-xs text-white/60">{tx("Үдеу", "Ускорение", "Acceleration")}</p>
              <p className="text-base font-semibold text-cyan-200">{acceleration} м/с²</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
              <p className="text-xs text-white/60">{tx("Жылдамдық", "Скорость", "Speed")}</p>
              <p className="text-base font-semibold text-cyan-200">
                {velocity.toFixed(2)} {tx("м/с", "м/с", "m/s")}
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="mb-2 text-xs text-white/60">{tx("Күш стрелкалары", "Стрелки сил", "Force arrows")}</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-24 text-white/70">{tx("Итеру", "Тяга", "Push")}</span>
                <div className="h-2 rounded bg-cyan-300" style={{ width: `${arrowScale(force, 50)}%` }} />
                <span className="text-cyan-200">{force.toFixed(1)} Н</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-white/70">{tx("Үйкеліс", "Трение", "Friction")}</span>
                <div className="h-2 rounded bg-rose-300" style={{ width: `${arrowScale(frictionForce, 40)}%` }} />
                <span className="text-rose-200">{frictionForce.toFixed(1)} Н</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-white/70">{tx("Кедергі", "Сопротивление", "Drag")}</span>
                <div className="h-2 rounded bg-amber-300" style={{ width: `${arrowScale(dragForce, 20)}%` }} />
                <span className="text-amber-200">{dragForce.toFixed(1)} Н</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-24 text-white/70">{tx("Нәтиже", "Результат", "Net")}</span>
                <div className="h-2 rounded bg-emerald-300" style={{ width: `${arrowScale(netForce, 50)}%` }} />
                <span className="text-emerald-200">{netForce.toFixed(1)} Н</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/60">
            {tx(
              "Масса артса, осы күштерде үдеу азаяды. Үдеу жылдамдықты секунд сайын өзгертеді: Δv = a.",
              "Если масса растет, при тех же силах ускорение падает. Ускорение меняет скорость каждую секунду: Δv = a.",
              "If mass goes up, acceleration goes down for the same forces. Acceleration changes speed every second: Δv = a."
            )}
          </p>
          <div className="relative h-14 rounded-lg border border-white/10 bg-black/20">
            <div
              className="absolute top-4 h-6 w-6 rounded bg-cyan-300 transition-transform duration-500"
              style={{ transform: `translateX(${distancePercent}%)` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-white/50">
            <span>{tx("Бастапқы нүкте", "Старт", "Start")}</span>
            <span>
              {tx("Шек", "Предел", "Limit")}: {trackLimit} {tx("м", "м", "m")}
            </span>
          </div>
          {rewardFlash ? <div className="rounded-lg border border-emerald-300/40 bg-emerald-400/20 px-3 py-2 text-sm text-emerald-100">{rewardMessage}</div> : null}
          <div className="rounded-lg border border-white/10 bg-black/20 p-2 text-xs text-white/70">
            <p>{safeSprintDone ? "✅" : "⬜"} {tx("Сценарий 1: разгони объект, но не выйди за предел.", "Сценарий 1: разгони объект, но не выйди за предел.", "Scenario 1: accelerate but stay inside the limit.")}</p>
            <p>{optimalMassDone ? "✅" : "⬜"} {tx("Сценарий 2: оптималды массаны тап.", "Сценарий 2: найди оптимальную массу.", "Scenario 2: find an optimal mass setup.")}</p>
          </div>
        </div>
      }
      insights={
        <FormulaInsightPanel
          title={tx("Формула түсіндірмесі", "Инсайт по формуле", "Formula insight")}
          formula="Fnet = F - Ffriction - Fdrag,   a = Fnet / m,   Δv = a · Δt"
          substitution={`Fnet = ${force} - ${frictionForce} - ${dragForce} = ${netForce},   a = ${netForce} / ${mass}`}
          result={`a = ${acceleration} м/с²,   Δv(1s) = +${deltaVPerSecond.toFixed(2)} м/с`}
          note={tx(
            "m өссе a азаяды: дене баяу үдейді. Кедергі күштері артса да үдеу төмендейді.",
            "Когда m растет, a падает: объект разгоняется медленнее. Рост сил сопротивления тоже снижает ускорение.",
            "When m increases, a drops: the object accelerates more slowly. Stronger resistance forces also reduce acceleration."
          )}
        />
      }
      compare={
        <ScenarioComparePanel
          title={tx("Сценарийлерді салыстыру", "Сравнение сценариев", "Scenario comparison")}
          onSaveBaseline={() => setBaseline({ force, mass, acceleration, velocity, position })}
          hasBaseline={Boolean(baseline)}
          metrics={[
            { label: tx("Күш", "Сила", "Force"), current: `${force} Н`, baseline: `${baseline?.force ?? force} Н` },
            { label: tx("Масса", "Масса", "Mass"), current: `${mass} кг`, baseline: `${baseline?.mass ?? mass} кг` },
            { label: tx("Үдеу", "Ускорение", "Acceleration"), current: `${acceleration} м/с²`, baseline: `${baseline?.acceleration ?? acceleration} м/с²` },
            { label: tx("Жылдамдық", "Скорость", "Speed"), current: `${velocity.toFixed(2)} м/с`, baseline: `${baseline?.velocity?.toFixed(2) ?? velocity.toFixed(2)} м/с` },
            { label: tx("Орын", "Позиция", "Position"), current: `${position.toFixed(1)} м`, baseline: `${baseline?.position?.toFixed(1) ?? position.toFixed(1)} м` }
          ]}
        />
      }
    />
  );
}
