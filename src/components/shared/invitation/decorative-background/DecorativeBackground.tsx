"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ThemeConfig } from "@/lib/types/invitation";

type DecorativeBackgroundProps = {
  theme: ThemeConfig;
  phase: "intro" | "transition" | "landing";
};

const oscillationVariants: Variants = {
  animate: (custom: { oscillation: number; prefersReducedMotion: boolean }) => ({
    y: custom.prefersReducedMotion ? 0 : [0, -12, 0, 10, 0],
    rotate: custom.prefersReducedMotion ? 0 : [0, 2, -1, 1, 0],
    transition: {
      duration: 6 + custom.oscillation / 10,
      repeat: Infinity,
      ease: [0.42, 0, 0.58, 1] as const,
    },
  }),
};

export function DecorativeBackground({
  theme,
  phase,
}: DecorativeBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const isAvengersTheme = theme.name === "Avengers Hero";

  if (isAvengersTheme && phase === "landing") {
    return null;
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: theme.backgroundPattern }}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{
          scale: phase === "landing" ? 1 : 1.03,
          opacity: phase === "intro" ? 0.85 : 1,
        }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="absolute inset-0">
        {theme.floatingDecorations.map((decoration) => (
          <motion.span
            key={decoration.id}
            className="absolute rounded-full"
            style={{
              background:
                decoration.type === "star"
                  ? "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 75%)"
                  : decoration.color,
              width: decoration.size,
              height: decoration.size,
              filter: decoration.blur ? "blur(18px)" : "none",
              top: decoration.position.top,
              left: decoration.position.left,
              opacity: decoration.blur ? 0.45 : 0.85,
              borderRadius:
                decoration.type === "shape"
                  ? "48% 52% 46% 54% / 58% 42% 58% 42%"
                  : decoration.type === "cloud"
                    ? "60%"
                    : "50%",
            }}
            variants={oscillationVariants}
            animate="animate"
            custom={{
              oscillation: decoration.oscillation,
              prefersReducedMotion,
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-x-0 top-[15%] flex justify-center"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 0.35, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="h-[420px] w-[420px] rounded-full bg-white/20 blur-3xl"
          style={{ boxShadow: "0 0 120px rgba(255,255,255,0.35)" }}
        />
      </motion.div>
    </div>
  );
}
