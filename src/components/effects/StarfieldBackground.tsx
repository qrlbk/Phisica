"use client";

import { motion } from "framer-motion";

const stars = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  top: (index * 19) % 100,
  left: (index * 31) % 100,
  size: (index % 3) + 1,
  duration: 2 + (index % 4) * 0.7
}));

export function StarfieldBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-cyan-200/70"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`
          }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: star.duration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
