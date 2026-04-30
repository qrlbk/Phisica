import { ModuleCard } from "@/components/hub/ModuleCard";
import { StarfieldBackground } from "@/components/effects/StarfieldBackground";

const modules = [
  {
    title: "Виртуальный космос",
    description: "Изучай гравитацию и движение тел на интерактивной модели системы.",
    href: "/space"
  },
  {
    title: "Виртуальная лаборатория",
    description: "Меняй параметры экспериментов и сразу наблюдай физические эффекты.",
    href: "/lab"
  },
  {
    title: "AI помощник",
    description: "Получай пошаговые объяснения по физике школьного уровня.",
    href: "/ai"
  },
  {
    title: "Q&A",
    description: "Быстрые ответы на популярные вопросы по разделам физики.",
    href: "/qa"
  }
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarfieldBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-12 md:px-10">
        <header className="mb-10">
          <p className="mb-3 inline-block rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
            Interactive Physics World
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Интерактивный мир физики
          </h1>
          <p className="mt-4 max-w-3xl text-white/75">
            Визуализируй, экспериментируй и задавай вопросы. Платформа помогает изучать физику через
            живые сцены и простые симуляции.
          </p>
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
