"use client";

import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export function IntroKPopBackground() {
  const isMobile = useIsMobile();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* K-pop character image */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex items-end justify-center z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="relative">
          <img
            src="/k-pop.png"
            alt="K-pop character"
            className="h-[32vh] md:h-[600px] w-auto object-contain opacity-80 md:opacity-90"
          />
        </div>
      </motion.div>

      {/* Circular light halos */}
      <motion.div
        className="absolute top-[20%] left-[15%] h-32 w-32 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 30%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(8px)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[60%] right-[20%] h-24 w-24 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.15) 40%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(6px)",
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-[35%] right-[10%] h-20 w-20 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.18) 35%, rgba(255, 255, 255, 0) 65%)",
          filter: "blur(5px)",
        }}
        animate={{
          opacity: [0.25, 0.55, 0.25],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-[75%] left-[25%] h-28 w-28 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.12) 45%, rgba(255, 255, 255, 0) 75%)",
          filter: "blur(7px)",
        }}
        animate={{
          opacity: [0.2, 0.45, 0.2],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Overlay for content readability */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 228, 230, 0.3) 0%, rgba(255, 228, 230, 0.1) 40%, rgba(255, 228, 230, 0.05) 100%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Sparkles and stars matching the image background */}
      {/* Large sparkles */}
      <motion.div
        className="absolute top-[15%] left-[8%] h-8 w-8"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.5px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-[25%] right-[12%] h-3 w-3 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.3px)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute top-[40%] left-[15%] h-6 w-6"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.8px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.3, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute top-[55%] right-[20%] h-2.5 w-2.5 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.2px)",
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute top-[70%] left-[25%] h-4 w-4"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.4px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.2, 1],
          rotate: [0, 360, 720],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Small sparkles scattered throughout */}
      <motion.div
        className="absolute top-[30%] left-[30%] h-2 w-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          filter: "blur(0.1px)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />

      <motion.div
        className="absolute top-[45%] right-[35%] h-2 w-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          filter: "blur(0.1px)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.8,
        }}
      />

      <motion.div
        className="absolute top-[65%] left-[45%] h-2 w-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          filter: "blur(0.1px)",
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
      />

      <motion.div
        className="absolute top-[20%] right-[25%] h-2 w-2 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.6)",
          filter: "blur(0.1px)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.3,
        }}
      />

      {/* Additional sparkles and stars for more density */}
      <motion.div
        className="absolute top-[10%] left-[35%] h-2 w-2"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.3px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.1, 1],
          rotate: [0, 120, 240],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />

      <motion.div
        className="absolute top-[35%] left-[5%] h-1.5 w-1.5 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.2px)",
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.1,
        }}
      />

      <motion.div
        className="absolute top-[50%] right-[8%] h-3.5 w-3.5"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.6px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.2, 1],
          rotate: [0, -90, -180],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.7,
        }}
      />

      <motion.div
        className="absolute top-[75%] right-[30%] h-1 w-1 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          filter: "blur(0.1px)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.7,
        }}
      />

      <motion.div
        className="absolute top-[85%] left-[40%] h-2.5 w-2.5 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.4px)",
        }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.8,
        }}
      />

      <motion.div
        className="absolute top-[12%] right-[40%] h-1.5 w-1.5"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.25px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.15, 1],
          rotate: [0, 270, 540],
        }}
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.4,
        }}
      />

      <motion.div
        className="absolute top-[28%] left-[60%] h-0.5 w-0.5 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          filter: "blur(0.05px)",
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      />

      <motion.div
        className="absolute top-[42%] right-[50%] h-0.5 w-0.5 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.7)",
          filter: "blur(0.05px)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 2.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3.1,
        }}
      />

      <motion.div
        className="absolute top-[58%] left-[8%] h-0.5 w-0.5 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          filter: "blur(0.05px)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
      />

      <motion.div
        className="absolute top-[78%] left-[65%] h-1 w-1 rounded-full"
        style={{
          background: "rgba(255, 255, 255, 0.75)",
          filter: "blur(0.1px)",
        }}
        animate={{
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.1,
        }}
      />

      <motion.div
        className="absolute top-[90%] right-[15%] h-2 w-2"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.35px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.4, 0.75, 0.4],
          scale: [1, 1.25, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 7.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.9,
        }}
      />

      {/* New Additional Sparkles for more density */}
      <motion.div
        className="absolute top-[5%] right-[25%] h-5 w-5"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.4px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      <motion.div
        className="absolute top-[48%] left-[22%] h-1.5 w-1.5 rounded-full bg-white"
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          delay: 1.2,
        }}
      />

      <motion.div
        className="absolute bottom-[35%] right-[5%] h-4 w-4"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.3px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.3, 1],
          rotate: [0, -45, -90],
        }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      <motion.div
        className="absolute top-[65%] left-[12%] h-2 w-2 rounded-full bg-white/80"
        animate={{
          opacity: [0.3, 0.9, 0.3],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute top-[22%] left-[45%] h-3 w-3"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.2px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.7, 1.1, 0.7],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3.2,
        }}
      />

      <motion.div
        className="absolute bottom-[15%] left-[35%] h-1 w-1 rounded-full bg-white"
        animate={{
          opacity: [0.2, 0.8, 0.2],
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute top-[82%] right-[42%] h-2.5 w-2.5 rounded-full bg-white/60"
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: 0.2,
        }}
      />

      {/* Even more sparkles for maximum shine */}
      <motion.div
        className="absolute top-[18%] left-[75%] h-4 w-4"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.2px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scale: [0.6, 1, 0.6],
          rotate: [0, 45, 90],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.7,
        }}
      />

      <motion.div
        className="absolute top-[55%] left-[85%] h-2 w-2 rounded-full bg-white/70"
        animate={{
          opacity: [0.2, 0.7, 0.2],
          scale: [1, 1.8, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2.1,
        }}
      />

      <motion.div
        className="absolute bottom-[20%] left-[10%] h-3 w-3"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.3px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />

      <motion.div
        className="absolute top-[38%] left-[70%] h-1.5 w-1.5 rounded-full bg-white/90"
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 3.1,
        }}
      />

      <motion.div
        className="absolute top-[72%] right-[18%] h-2 w-2"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.25px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.2, 1],
          rotate: [0, 360, 720],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.1,
        }}
      />

      <motion.div
        className="absolute top-[10%] left-[50%] h-1 w-1 rounded-full bg-white"
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [1, 2.5, 1],
        }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          delay: 2.8,
        }}
      />

      {/* Final touch of sparkles for maximum density */}
      <motion.div
        className="absolute top-[45%] left-[92%] h-2.5 w-2.5"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.2px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.5, 1, 0.5],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.9,
        }}
      />

      <motion.div
        className="absolute top-[68%] left-[55%] h-1.5 w-1.5 rounded-full bg-white/80"
        animate={{
          opacity: [0.4, 0.9, 0.4],
          scale: [1, 1.6, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 1.4,
        }}
      />

      <motion.div
        className="absolute bottom-[28%] left-[80%] h-3 w-3"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.3px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
          scale: [0.8, 1.1, 0.8],
          rotate: [0, -120, -240],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.2,
        }}
      />

      <motion.div
        className="absolute top-[32%] left-[18%] h-1 w-1 rounded-full bg-white"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute top-[85%] left-[15%] h-2 w-2"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.1px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.7, 1.2, 0.7],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3.5,
        }}
      />

      {/* Extreme Density Layer - Ultra Sparkles */}
      <motion.div
        className="absolute top-[12%] left-[22%] h-1 w-1 rounded-full bg-white"
        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 2, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.1 }}
      />
      <motion.div
        className="absolute top-[28%] right-[32%] h-1.5 w-1.5 rounded-full bg-white/80"
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.5, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, delay: 0.4 }}
      />
      <motion.div
        className="absolute top-[42%] left-[38%] h-1 w-1 rounded-full bg-white"
        animate={{ opacity: [0.1, 0.8, 0.1], scale: [1, 2.5, 1] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.7 }}
      />
      <motion.div
        className="absolute bottom-[45%] right-[45%] h-2 w-2"
        style={{
          background: "radial-gradient(circle, white 0%, transparent 70%)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{ opacity: [0.4, 1, 0.4], rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[58%] right-[12%] h-1.5 w-1.5 rounded-full bg-white/90"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.8, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1.1 }}
      />
      <motion.div
        className="absolute top-[75%] left-[5%] h-1 w-1 rounded-full bg-white"
        animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 2.2, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-[12%] right-[25%] h-1.5 w-1.5 rounded-full bg-white/70"
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 1.6, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.9 }}
      />
      <motion.div
        className="absolute top-[15%] right-[5%] h-1 w-1 rounded-full bg-white"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 2, 1] }}
        transition={{ duration: 2.7, repeat: Infinity, delay: 2.2 }}
      />
      <motion.div
        className="absolute bottom-[32%] left-[42%] h-1 w-1 rounded-full bg-white/80"
        animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.9, 1] }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 2.6 }}
      />
      <motion.div
        className="absolute top-[65%] right-[38%] h-1.5 w-1.5 rounded-full bg-white"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.7, 1] }}
        transition={{ duration: 3.1, repeat: Infinity, delay: 3 }}
      />
      <motion.div
        className="absolute top-[5%] left-[65%] h-1 w-1 rounded-full bg-white/60"
        animate={{ opacity: [0.3, 0.9, 0.3], scale: [1, 2.1, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 3.4 }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[50%] h-1.5 w-1.5 rounded-full bg-white"
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
        transition={{ duration: 2.9, repeat: Infinity, delay: 3.8 }}
      />

      {/* Twinkling Stardust Layer */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`stardust-${i}`}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
