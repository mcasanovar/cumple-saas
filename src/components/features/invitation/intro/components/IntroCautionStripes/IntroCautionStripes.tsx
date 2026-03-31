"use client";

import { motion } from "framer-motion";

export function IntroCautionStripes() {
  return (
    <>
      <motion.div
        className="absolute left-0 top-[2%] sm:top-[3%] z-[5] h-8 sm:h-16 w-full bg-[#FFD700] shadow-lg"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="flex h-full items-center justify-start overflow-hidden">
          <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="px-4 sm:px-8 text-[10px] sm:text-lg font-black uppercase tracking-widest text-black"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                CAUTION
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-[2%] sm:bottom-[3%] left-0 z-[5] h-8 sm:h-16 w-full bg-[#FFD700] shadow-lg"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="flex h-full items-center justify-start overflow-hidden">
          <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="px-4 sm:px-8 text-[10px] sm:text-lg font-black uppercase tracking-widest text-black"
                style={{ fontFamily: "Arial, sans-serif" }}
              >
                CAUTION
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
