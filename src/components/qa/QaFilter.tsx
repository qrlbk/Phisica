"use client";

import { QaCategory } from "@/data/qa";

const categories: Array<QaCategory | "Все"> = ["Все", "Механика", "Электричество", "Космос"];

type QaFilterProps = {
  activeCategory: QaCategory | "Все";
  onChange: (category: QaCategory | "Все") => void;
};

export function QaFilter({ activeCategory, onChange }: QaFilterProps) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          className={`rounded-lg px-3 py-1.5 text-sm ${
            activeCategory === category ? "bg-cyan-400 text-slate-900" : "bg-white/10 text-white/75 hover:bg-white/20"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
