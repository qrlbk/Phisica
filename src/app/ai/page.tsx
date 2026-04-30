"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ChatWindow } from "@/components/ai/ChatWindow";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function AiPage() {
  const { t } = useI18n();

  return (
    <AppShell
      title={t("ai.title")}
      description={t("ai.description")}
    >
      <ChatWindow />
    </AppShell>
  );
}
