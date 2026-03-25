"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

export function LandingKPopBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Pink gradient background matching the provided image */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #F8BBD9 0%, #F48FB1 30%, #E91E63 70%, #C2185B 100%)"
        }}
      />

      {/* Overlay para mejorar legibilidad del contenido */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(255, 228, 230, 0.3) 0%, rgba(255, 228, 230, 0.1) 40%, rgba(255, 228, 230, 0.05) 100%)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* Rumi K-Pop image at the top */}
      <motion.div
        className="absolute top-[10%] left-[20%] -translate-x-1/2 max-w-lg pointer-events-none"
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: 0.30 }}
      >
        <Image
          src="/rumi-kpop.png"
          alt="Rumi K-Pop"
          width={300}
          height={300}
          className="w-full h-auto"
          priority
        />
      </motion.div>

      {/* Zoey K-Pop image at the top */}
      <motion.div
        className="absolute -translate-x-1/2 max-w-lg pointer-events-none"
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: 0.4, top: isMobile ? "38%" : "45%", right: isMobile ? "-15%" : "10%" }}
      >
        <Image
          src="/zoey-kpop.png"
          alt="Zoey K-Pop"
          width={300}
          height={300}
          className="w-full h-auto"
          priority
        />
      </motion.div>

      {/* Mira K-Pop image at the top */}
      <motion.div
        className="absolute left-[20%] -translate-x-1/2 max-w-lg pointer-events-none"
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ opacity: 0.5, top: isMobile ? "45%" : "85%" }}
      >
        <Image
          src="/mira-kpop-2.png"
          alt="Mira K-Pop"
          width={300}
          height={300}
          className="w-full h-auto"
          priority
        />
      </motion.div>

      {/* K-pop confetti animation (from Intro) */}
      {isMounted && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {Array.from({ length: 30 }).map((_, i) => {
            const positions = [15, 25, 35, 45, 55, 65, 75, 85, 95, 5, 20, 30, 40, 50, 60, 70, 80, 90, 10, 95, 12, 28, 38, 48, 58, 68, 78, 88, 8, 92];
            const drifts = [120, -80, 150, -100, 60, -140, 90, -70, 110, -50, 80, -120, 40, -90, 130, -60, 100, -110, 70, -130, 115, -75, 145, -95, 65, -135, 85, -65, 105, -45];
            const rotations = [360, -360, 720, -720, 180, -180, 540, -540, 270, -270, 450, -450, 630, -630, 810, -810, 90, -90, 360, -360, 720, -720, 180, -180, 540, -540, 270, -270, 450, -450];
            const durations = [3.2, 4.5, 3.8, 4.1, 3.5, 4.8, 3.3, 4.2, 3.9, 4.6, 3.1, 4.4, 3.7, 4.3, 3.6, 4.7, 3.4, 4.0, 3.8, 4.5, 3.3, 4.6, 3.9, 4.2, 3.4, 4.9, 3.5, 4.1, 3.7, 4.4];
            const delays = [0.1, 0.8, 0.3, 1.2, 0.6, 1.5, 0.2, 0.9, 0.4, 1.1, 0.7, 1.3, 0.5, 1.0, 0.8, 1.4, 0.3, 0.6, 0.9, 1.2, 0.2, 0.7, 0.4, 1.3, 0.5, 1.6, 0.3, 0.8, 0.5, 1.0];
            const repeatDelays = [5.2, 6.8, 5.5, 7.1, 6.2, 7.5, 5.8, 6.5, 6.0, 7.2, 5.3, 6.9, 5.7, 6.3, 6.1, 7.0, 5.6, 6.4, 5.9, 6.7, 5.4, 6.6, 5.6, 7.3, 6.0, 7.4, 5.7, 6.3, 6.2, 7.1];

            return (
              <motion.div
                key={`k-pop-confetti-${i}`}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: i % 3 === 0 ? "#f363b4" : i % 3 === 1 ? "#9333ea" : "#ffd166",
                  left: `${positions[i]}%`,
                  top: "-20px",
                }}
                animate={{
                  y: [0, 2000],
                  x: [0, drifts[i]],
                  rotate: [0, rotations[i]],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: durations[i] * 1.5,
                  delay: delays[i],
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: repeatDelays[i],
                }}
              />
            );
          })}
        </div>
      )}

      {/* Additional Stars of various sizes */}
      <motion.div
        className="absolute top-[8%] left-[70%] h-6 w-6"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.5px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [1, 1.15, 1],
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
        className="absolute top-[85%] right-[75%] h-8 w-8"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.6px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.2, 1],
          rotate: [0, -120, -240],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />

      <motion.div
        className="absolute top-[45%] left-[85%] h-5 w-5"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.4px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [1, 1.3, 1],
          rotate: [0, 360, 720],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute top-[25%] left-[10%] h-7 w-7"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.5px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.25, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 5.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.8,
        }}
      />

      <motion.div
        className="absolute top-[65%] right-[15%] h-6 w-6"
        style={{
          background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)",
          filter: "blur(0.6px)",
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }}
        animate={{
          opacity: [0.5, 0.9, 0.5],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      {/* Large sparkles */}
      <motion.div
        className="absolute top-[15%] left-[8%] h-3 w-3"
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
        className="absolute top-[25%] right-[12%] h-2 w-2 rounded-full"
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
        className="absolute top-[40%] left-[15%] h-4 w-4"
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
        className="absolute top-[55%] right-[20%] h-1.5 w-1.5 rounded-full"
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
        className="absolute top-[70%] left-[25%] h-2.5 w-2.5"
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
        className="absolute top-[30%] left-[30%] h-1 w-1 rounded-full"
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
        className="absolute top-[45%] right-[35%] h-1 w-1 rounded-full"
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
        className="absolute top-[65%] left-[45%] h-1 w-1 rounded-full"
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
        className="absolute top-[20%] right-[25%] h-1 w-1 rounded-full"
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

      {/* Additional density sparkles */}
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
    </div>
  );
}
