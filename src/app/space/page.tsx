"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SolarSystemScene } from "@/components/space/SolarSystemScene";
import { PlanetInfoModal } from "@/components/space/PlanetInfoModal";
import { PlanetInfo } from "@/data/planets";

export default function SpacePage() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo | null>(null);

  return (
    <AppShell
      title="Виртуальный космос"
      description="Наблюдай движение планет по орбитам и изучай простые физические факты о гравитации."
    >
      <SolarSystemScene onSelectPlanet={setSelectedPlanet} />
      <PlanetInfoModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
    </AppShell>
  );
}
