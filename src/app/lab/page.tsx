import { AppShell } from "@/components/layout/AppShell";
import { ExperimentTabs } from "@/components/lab/ExperimentTabs";

export default function LabPage() {
  return (
    <AppShell
      title="Виртуальная лаборатория"
      description="4 интерактивных эксперимента, формульные подсказки, сравнение сценариев и игровые миссии."
    >
      <ExperimentTabs />
    </AppShell>
  );
}
