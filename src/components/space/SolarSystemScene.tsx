"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AdditiveBlending } from "three";
import { Planet } from "./Planet";
import { type PlanetInfo } from "@/data/planets";

type SolarSystemSceneProps = {
  planets: PlanetInfo[];
  onSelectPlanet: (planet: PlanetInfo) => void;
  timeScale: number;
  focusPlanetId: string | null;
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

export function SolarSystemScene({ planets, onSelectPlanet, timeScale, focusPlanetId }: SolarSystemSceneProps) {
  const focusPlanet = planets.find((planet) => planet.id === focusPlanetId) ?? null;
  const cameraPosition = focusPlanet ? [focusPlanet.orbitRadius + 2.5, 3.8, focusPlanet.orbitRadius + 2.5] : [0, 9, 16];

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#030712]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(168,85,247,0.18),transparent_35%)]" />
      <Canvas camera={{ position: cameraPosition as [number, number, number], fov: 55 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={120} color="#fbbf24" />
        <pointLight position={[0, 0, 0]} intensity={20} color="#fdba74" />
        <StarDots />

        <mesh>
          <sphereGeometry args={[0.9, 48, 48]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.6} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.14} blending={AdditiveBlending} />
        </mesh>

        {planets.map((planet) => (
          <group key={`orbit-${planet.id}`}>
            <OrbitRing radius={planet.orbitRadius} />
            <Planet planet={planet} onSelect={onSelectPlanet} timeScale={timeScale} />
          </group>
        ))}

        <OrbitControls enablePan={false} minDistance={6} maxDistance={26} />
      </Canvas>
    </div>
  );
}
