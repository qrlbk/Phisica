"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Planet } from "./Planet";
import { planets, type PlanetInfo } from "@/data/planets";

type SolarSystemSceneProps = {
  onSelectPlanet: (planet: PlanetInfo) => void;
};

function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
      <meshBasicMaterial color="#7dd3fc" transparent opacity={0.25} side={2} />
    </mesh>
  );
}

export function SolarSystemScene({ onSelectPlanet }: SolarSystemSceneProps) {
  return (
    <div className="h-[520px] w-full overflow-hidden rounded-2xl border border-white/15 bg-[#030712]">
      <Canvas camera={{ position: [0, 8, 12], fov: 55 }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[0, 0, 0]} intensity={120} color="#fbbf24" />

        <mesh>
          <sphereGeometry args={[0.9, 48, 48]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.2} />
        </mesh>

        {planets.map((planet) => (
          <group key={`orbit-${planet.id}`}>
            <OrbitRing radius={planet.orbitRadius} />
            <Planet planet={planet} onSelect={onSelectPlanet} />
          </group>
        ))}

        <OrbitControls enablePan={false} minDistance={7} maxDistance={18} />
      </Canvas>
    </div>
  );
}
