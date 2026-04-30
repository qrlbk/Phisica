"use client";

import { ModuleCard } from "@/components/hub/ModuleCard";
import { StarfieldBackground } from "@/components/effects/StarfieldBackground";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function HomePage() {
  const { t } = useI18n();
  const modules = [
    {
      title: t("home.module.space.title"),
      description: t("home.module.space.description"),
      href: "/space"
    },
    {
      title: t("home.module.lab.title"),
      description: t("home.module.lab.description"),
      href: "/lab"
    },
    {
      title: t("home.module.ai.title"),
      description: t("home.module.ai.description"),
      href: "/ai"
    },
    {
      title: t("home.module.qa.title"),
      description: t("home.module.qa.description"),
      href: "/qa"
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarfieldBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12 md:px-10">
        <header className="mb-10">
          <p className="mb-3 inline-block rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
            {t("home.badge")}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{t("home.title")}</h1>
          <p className="mt-4 max-w-3xl text-white/75">{t("home.description")}</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {modules.map((module, index) => (
            <ModuleCard key={module.title} {...module} delay={index * 0.08} />
          ))}
        </section>
      </div>
    </main>
  );
}
