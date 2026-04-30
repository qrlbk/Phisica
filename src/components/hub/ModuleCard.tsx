"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ModuleCardProps = {
  icon: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  delay: number;
};

export function ModuleCard({ icon, title, description, href, ctaLabel, delay }: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <Link
        href={href}
        className="block rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur transition hover:border-cyan-300/60 hover:bg-white/10"
      >
        <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/40 bg-cyan-500/15 text-lg text-cyan-100">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{description}</p>
        <span className="mt-4 inline-block rounded-lg border border-cyan-300/40 bg-cyan-500/15 px-3 py-1.5 text-xs font-medium text-cyan-100">
          {ctaLabel}
        </span>
      </Link>
    </motion.div>
  );
}
