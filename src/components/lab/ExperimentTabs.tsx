"use client";

import { useCallback, useState } from "react";
import { NewtonExperiment } from "./NewtonExperiment";
import { OhmExperiment } from "./OhmExperiment";
import { EnergyExperiment } from "./EnergyExperiment";
import { FrictionExperiment } from "./FrictionExperiment";
import { LabMissions } from "./LabMissions";
import { LabMissionId } from "@/data/labMissions";
import { useI18n } from "@/lib/i18n/I18nProvider";

const tabs = [
  { id: "newton", label: "F = ma" },
  { id: "ohm", label: "Закон Ома" },
  { id: "energy", label: "Энергия" },
  { id: "friction", label: "Трение" }
] as const;

export function ExperimentTabs() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("newton");
  const [missions, setMissions] = useState<Record<LabMissionId, boolean>>({
    accelOver6: false,
    currentNear2: false,
    energyBalance: false,
    overcomeFriction: false
  });

  const updateMission = useCallback((id: LabMissionId, done: boolean) => {
    setMissions((prev) => {
      if (prev[id] === done) {
        return prev;
      }
      return {
        ...prev,
        [id]: done
      };
    });
  }, []);

  return (
    <section className="space-y-4">
      <LabMissions completed={missions} />
      <div className="mb-4 flex gap-2">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              activeTab === tab.id ? "bg-cyan-400 text-slate-900" : "bg-white/10 text-white/75 hover:bg-white/20"
            }`}
          >
            {tab.id === "newton"
              ? t("lab.tabs.newton")
              : tab.id === "ohm"
                ? t("lab.tabs.ohm")
                : tab.id === "energy"
                  ? t("lab.tabs.energy")
                  : t("lab.tabs.friction")}
          </button>
        ))}
      </div>
      {activeTab === "newton" ? <NewtonExperiment onMissionUpdate={updateMission} /> : null}
      {activeTab === "ohm" ? <OhmExperiment onMissionUpdate={updateMission} /> : null}
      {activeTab === "energy" ? <EnergyExperiment onMissionUpdate={updateMission} /> : null}
      {activeTab === "friction" ? <FrictionExperiment onMissionUpdate={updateMission} /> : null}
    </section>
  );
}
