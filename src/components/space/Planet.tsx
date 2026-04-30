"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PlanetInfo } from "@/data/planets";

type PlanetProps = {
  planet: PlanetInfo;
  onSelect: (planet: PlanetInfo) => void;
};

export function Planet({ planet, onSelect }: PlanetProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    const t = clock.getElapsedTime() * planet.orbitSpeed * 0.3;
    meshRef.current.position.x = Math.cos(t) * planet.orbitRadius;
    meshRef.current.position.z = Math.sin(t) * planet.orbitRadius;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group>
      <mesh ref={meshRef} onClick={() => onSelect(planet)}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial color={planet.color} />
        <Html position={[0, planet.size + 0.2, 0]} center>
          <span className="rounded bg-black/60 px-2 py-0.5 text-xs text-white/80">{planet.name}</span>
        </Html>
      </mesh>
    </group>
  );
}
