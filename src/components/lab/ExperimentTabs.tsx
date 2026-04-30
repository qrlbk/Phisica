"use client";

import { useState } from "react";
import { NewtonExperiment } from "./NewtonExperiment";
import { OhmExperiment } from "./OhmExperiment";

const tabs = [
  { id: "newton", label: "F = ma" },
  { id: "ohm", label: "Закон Ома" }
] as const;

export function ExperimentTabs() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("newton");

  return (
    <section>
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
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "newton" ? <NewtonExperiment /> : <OhmExperiment />}
    </section>
  );
}
