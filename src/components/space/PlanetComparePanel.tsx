import { planets } from "@/data/planets";

type PlanetComparePanelProps = {
  leftPlanetId: string;
  rightPlanetId: string;
  onLeftChange: (value: string) => void;
  onRightChange: (value: string) => void;
};

export function PlanetComparePanel({ leftPlanetId, rightPlanetId, onLeftChange, onRightChange }: PlanetComparePanelProps) {
  const left = planets.find((planet) => planet.id === leftPlanetId) ?? planets[0];
  const right = planets.find((planet) => planet.id === rightPlanetId) ?? planets[1];

  const isLeftBigger = left.size >= right.size;
  const isLeftFaster = left.orbitSpeed >= right.orbitSpeed;
  const isLeftFurther = left.orbitRadius >= right.orbitRadius;

  return (
    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <h3 className="text-lg font-semibold text-white">Сравнение планет</h3>
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
          Размер: <span className={isLeftBigger ? "text-cyan-200" : "text-white"}>{left.name}</span> {left.size.toFixed(2)} ·{" "}
          <span className={!isLeftBigger ? "text-cyan-200" : "text-white"}>{right.name}</span> {right.size.toFixed(2)}
        </p>
        <p>
          Скорость орбиты: <span className={isLeftFaster ? "text-cyan-200" : "text-white"}>{left.name}</span> {left.orbitSpeed.toFixed(2)} ·{" "}
          <span className={!isLeftFaster ? "text-cyan-200" : "text-white"}>{right.name}</span> {right.orbitSpeed.toFixed(2)}
        </p>
        <p>
          Дальность орбиты: <span className={isLeftFurther ? "text-cyan-200" : "text-white"}>{left.name}</span> {left.orbitRadius.toFixed(1)} ·{" "}
          <span className={!isLeftFurther ? "text-cyan-200" : "text-white"}>{right.name}</span> {right.orbitRadius.toFixed(1)}
        </p>
        <p>
          Период: {left.name} — {left.orbitPeriod}, {right.name} — {right.orbitPeriod}
        </p>
      </div>
    </section>
  );
}
