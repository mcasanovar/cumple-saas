"use client";

import { motion } from "framer-motion";

export const IntroAvengersLogo = () => {
  return (
    <div className="relative z-10 flex flex-col items-center pt-8 md:pt-12">
      {/* Glow circular pulsante */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full blur-[35px]"
        style={{
          background: "radial-gradient(circle, #fbb021 0%, #ffdf8b 100%)",
        }}
      />

      {/* Logo de Avengers */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-24 md:w-32"
      >
        <img
          src="/illustrations/avengers-logo.png"
          alt="Avengers Logo"
          className="w-full h-auto drop-shadow-[0_0_15px_rgba(251,176,33,0.5)]"
        />
      </motion.div>
    </div>
  );
};
