"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ModuleCardProps = {
  title: string;
  description: string;
  href: string;
  delay: number;
};

export function ModuleCard({ title, description, href, delay }: ModuleCardProps) {
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
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{description}</p>
      </Link>
    </motion.div>
  );
}
