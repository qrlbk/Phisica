import type { ReactNode } from "react";
import Link from "next/link";

type AppShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <main className="relative mx-auto min-h-screen w-full max-w-6xl px-6 py-10 md:px-10">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          Назад в Hub
        </Link>
      </div>
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-white/70">{description}</p>
      </header>
      {children}
    </main>
  );
}
