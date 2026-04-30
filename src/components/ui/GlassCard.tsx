import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <article
      className={`rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur ${className}`}
    >
      {children}
    </article>
  );
}
