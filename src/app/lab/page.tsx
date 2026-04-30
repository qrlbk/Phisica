"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ExperimentTabs } from "@/components/lab/ExperimentTabs";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function LabPage() {
  const { t } = useI18n();

  return (
    <AppShell
      title={t("lab.title")}
      description={t("lab.description")}
    >
      <ExperimentTabs />
    </AppShell>
  );
}
