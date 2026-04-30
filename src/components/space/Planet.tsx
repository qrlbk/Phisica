"use client";

import { useRef } from "react";
import { Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PlanetInfo } from "@/data/planets";

type PlanetProps = {
  planet: PlanetInfo;
  onSelect: (planet: PlanetInfo) => void;
  timeScale: number;
  sunMassScale: number;
  distanceScale: number;
  velocityScale: number;
};

export function Planet({ planet, onSelect, timeScale, sunMassScale, distanceScale, velocityScale }: PlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || !groupRef.current) {
      return;
    }

    const effectiveRadius = planet.orbitRadius * distanceScale;
    const effectiveSpeed = planet.orbitSpeed * velocityScale * Math.sqrt(sunMassScale);
    const t = clock.getElapsedTime() * effectiveSpeed * 0.3 * timeScale;
    groupRef.current.position.x = Math.cos(t) * effectiveRadius;
    groupRef.current.position.z = Math.sin(t) * effectiveRadius;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} onClick={() => onSelect(planet)}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial color={planet.color} roughness={0.65} metalness={0.15} emissive={planet.color} emissiveIntensity={0.1} />
      </mesh>
      {planet.hasRings ? (
        <mesh rotation={[-Math.PI / 2.3, 0, 0]} onClick={() => onSelect(planet)}>
          <ringGeometry args={[planet.size * 1.35, planet.size * 2, 64]} />
          <meshStandardMaterial color="#dfc999" transparent opacity={0.72} roughness={0.9} metalness={0.05} side={2} />
        </mesh>
      ) : null}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[planet.size * 1.08, 24, 24]} />
        <meshBasicMaterial color={planet.color} transparent opacity={0.08} />
      </mesh>
      <Html position={[0, planet.size + 0.2, 0]} center zIndexRange={[0, 0]} style={{ pointerEvents: "none" }}>
        <span className="rounded bg-black/60 px-2 py-0.5 text-xs text-white/80">{planet.name}</span>
      </Html>
    </group>
  );
}
