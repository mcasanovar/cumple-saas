"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

const easeCurve = [0.16, 1, 0.3, 1] as const;

type IntroTransitionProps = {
  isActive: boolean;
  duration?: number;
  children?: ReactNode;
};

export function IntroTransition({ isActive, duration = 0.9, children }: IntroTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="intro-transition"
          className="pointer-events-none absolute inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration * 0.6, ease: easeCurve }}
        >
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: duration * 0.6,
              ease: easeCurve,
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white via-white to-transparent"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration, ease: easeCurve }}
          />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
