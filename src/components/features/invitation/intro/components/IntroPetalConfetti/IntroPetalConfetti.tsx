"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type Petal = {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  swayAmount: number;
  color: string;
};

export function IntroPetalConfetti() {
  const petals = useMemo<Petal[]>(() => {
    const colors = ["#f8a6ba", "#c8a2c8", "#9278b9", "#ffb6c1", "#dda0dd"];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      rotation: Math.random() * 360,
      swayAmount: 20 + Math.random() * 40,
      color: colors[i % colors.length],
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: -30,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.swayAmount, -petal.swayAmount, petal.swayAmount / 2, 0],
            rotate: [petal.rotation, petal.rotation + 360],
          }}
          transition={{
            y: {
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            },
            x: {
              duration: petal.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: petal.delay,
            },
            rotate: {
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            },
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
          >
            <ellipse
              cx="10"
              cy="13"
              rx="8"
              ry="12"
              fill={petal.color}
              opacity="0.7"
            />
            <ellipse
              cx="10"
              cy="13"
              rx="4"
              ry="8"
              fill={petal.color}
              opacity="0.9"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
