"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Planet } from "./Planet";
import { SunBody } from "./SunBody";
import { type PlanetInfo } from "@/data/planets";

type SolarSystemSceneProps = {
  planets: PlanetInfo[];
  onSelectPlanet: (planet: PlanetInfo) => void;
  timeScale: number;
  focusPlanetId: string | null;
  sunMassScale: number;
  distanceScale: number;
  velocityScale: number;
};

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial color="#7dd3fc" transparent opacity={0.25} side={2} />
    </mesh>
  );
}

function StarDots() {
  const stars = useMemo(
    () =>
      Array.from({ length: 260 }, (_, index) => [
        ((index * 37) % 70) - 35,
        ((index * 23) % 40) - 20,
        ((index * 53) % 70) - 35
      ] as const),
    []
  );

  return (
    <>
      {stars.map((position, index) => (
        <mesh key={`star-${index}`} position={position}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color="#dbeafe" transparent opacity={0.75} />
        </mesh>
      ))}
    </>
  );
}

export function SolarSystemScene({
  planets,
  onSelectPlanet,
  timeScale,
  focusPlanetId,
  sunMassScale,
  distanceScale,
  velocityScale
}: SolarSystemSceneProps) {
  const focusPlanet = planets.find((planet) => planet.id === focusPlanetId) ?? null;
  const focusOrbitRadius = focusPlanet ? focusPlanet.orbitRadius * distanceScale : 0;
  const cameraPosition = focusPlanet ? [focusOrbitRadius + 2.5, 3.8, focusOrbitRadius + 2.5] : [0, 9, 16];

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#030712]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.18),transparent_35%)]" />
      <Canvas camera={{ position: cameraPosition as [number, number, number], fov: 55 }}>
        <ambientLight intensity={0.22} />
        <pointLight position={[0, 0, 0]} intensity={95} color="#fff1c8" distance={80} decay={1.5} />
        <pointLight position={[0, 0, 0]} intensity={28} color="#ffb454" distance={45} decay={2} />
        <StarDots />

        <SunBody />

        {planets.map((planet) => (
          <group key={`orbit-${planet.id}`}>
            <OrbitRing radius={planet.orbitRadius * distanceScale} />
            <Planet
              planet={planet}
              onSelect={onSelectPlanet}
              timeScale={timeScale}
              sunMassScale={sunMassScale}
              distanceScale={distanceScale}
              velocityScale={velocityScale}
            />
          </group>
        ))}

        <OrbitControls enablePan={false} minDistance={6} maxDistance={26} />
      </Canvas>
    </div>
  );
}
