"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { QaFilter } from "@/components/qa/QaFilter";
import { QaList } from "@/components/qa/QaList";
import { qaItems, type QaCategory } from "@/data/qa";

export default function QaPage() {
  const [category, setCategory] = useState<QaCategory | "Все">("Все");

  const filteredItems = useMemo(() => {
    if (category === "Все") {
      return qaItems;
    }
    return qaItems.filter((item) => item.category === category);
  }, [category]);

  return (
    <AppShell
      title="Q&A по физике"
      description="Популярные вопросы по механике, электричеству и космосу с короткими объяснениями."
    >
      <QaFilter activeCategory={category} onChange={setCategory} />
      <QaList items={filteredItems} />
    </AppShell>
  );
}
