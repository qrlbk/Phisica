"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ModuleCard } from "@/components/hub/ModuleCard";
import { StarfieldBackground } from "@/components/effects/StarfieldBackground";
import { useI18n } from "@/lib/i18n/I18nProvider";

export default function HomePage() {
  const { t } = useI18n();
  const modules = [
    {
      icon: "🪐",
      title: t("home.module.space.title"),
      description: t("home.module.space.description"),
      href: "/space",
      ctaLabel: t("home.card.open")
    },
    {
      icon: "🧪",
      title: t("home.module.lab.title"),
      description: t("home.module.lab.description"),
      href: "/lab",
      ctaLabel: t("home.card.open")
    },
    {
      icon: "🤖",
      title: t("home.module.ai.title"),
      description: t("home.module.ai.description"),
      href: "/ai",
      ctaLabel: t("home.card.open")
    },
    {
      icon: "🎯",
      title: t("home.module.qa.title"),
      description: t("home.module.qa.description"),
      href: "/qa",
      ctaLabel: t("home.card.open")
    }
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarfieldBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12 md:px-10">
        <header className="mb-10 rounded-3xl border border-white/15 bg-gradient-to-r from-cyan-500/10 via-slate-900/40 to-violet-500/10 p-6 md:p-8">
          <p className="mb-3 inline-block rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
            {t("home.badge")}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">{t("home.hero.title")}</h1>
          <p className="mt-4 max-w-3xl text-white/75">{t("home.hero.subtitle")}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/70">
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">{t("home.hero.audience")}</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">{t("home.hero.exam")}</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1">{t("home.hero.method")}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/space"
              className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300"
            >
              {t("home.hero.primaryCta")}
            </Link>
            <Link
              href="/lab"
              className="rounded-xl border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t("home.hero.secondaryCta")}
            </Link>
          </div>
        </header>

        <section className="mb-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">{t("home.demo.spaceTitle")}</h2>
            <p className="mt-1 text-sm text-white/70">{t("home.demo.spaceDesc")}</p>
            <div className="relative mt-4 h-28 rounded-xl border border-white/10 bg-slate-950/70">
              <div className="absolute left-12 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full border border-cyan-300/30">
                <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_20px_rgba(253,224,71,0.8)]" />
              </div>
              <motion.div
                className="absolute left-[44px] top-[38px] h-4 w-4 rounded-full bg-cyan-300"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 6 }}
                style={{ transformOrigin: "40px 18px" }}
              />
            </div>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">{t("home.demo.labTitle")}</h2>
            <p className="mt-1 text-sm text-white/70">{t("home.demo.labDesc")}</p>
            <div className="mt-4 space-y-2 rounded-xl border border-white/10 bg-slate-950/70 p-3">
              <div className="h-2 rounded bg-cyan-900/40">
                <motion.div className="h-2 rounded bg-cyan-300" animate={{ width: ["25%", "70%", "40%"] }} transition={{ repeat: Infinity, duration: 3 }} />
              </div>
              <div className="h-2 rounded bg-emerald-900/40">
                <motion.div className="h-2 rounded bg-emerald-300" animate={{ width: ["65%", "35%", "80%"] }} transition={{ repeat: Infinity, duration: 3 }} />
              </div>
              <p className="pt-1 text-xs text-white/60">{t("home.demo.labHint")}</p>
            </div>
          </article>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {modules.map((module, index) => (
            <ModuleCard key={module.title} {...module} delay={index * 0.08} />
          ))}
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">{t("home.value.title")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-white/75">
              <li>• {t("home.value.item1")}</li>
              <li>• {t("home.value.item2")}</li>
              <li>• {t("home.value.item3")}</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-white/15 bg-white/5 p-5">
            <h2 className="text-lg font-semibold text-white">{t("home.aiSample.title")}</h2>
            <p className="mt-2 text-xs text-white/60">{t("home.aiSample.questionLabel")}</p>
            <p className="mt-1 rounded-lg border border-white/10 bg-slate-950/70 p-2 text-sm text-cyan-100">{t("home.aiSample.question")}</p>
            <p className="mt-3 text-xs text-white/60">{t("home.aiSample.answerLabel")}</p>
            <p className="mt-1 rounded-lg border border-white/10 bg-slate-950/70 p-2 text-sm text-white/85">{t("home.aiSample.answer")}</p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-5 text-center">
          <h2 className="text-xl font-semibold text-white">{t("home.finalCta.title")}</h2>
          <p className="mt-2 text-sm text-white/75">{t("home.finalCta.subtitle")}</p>
          <div className="mt-4 flex justify-center gap-3">
            <Link href="/space" className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-cyan-300">
              {t("home.finalCta.primary")}
            </Link>
            <Link href="/qa" className="rounded-xl border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              {t("home.finalCta.secondary")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
