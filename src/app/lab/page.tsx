import { AppShell } from "@/components/layout/AppShell";
import { ExperimentTabs } from "@/components/lab/ExperimentTabs";

export default function LabPage() {
  return (
    <AppShell
      title="Виртуальная лаборатория"
      description="Меняй параметры экспериментов и наблюдай результат в режиме реального времени."
    >
      <ExperimentTabs />
    </AppShell>
  );
}
