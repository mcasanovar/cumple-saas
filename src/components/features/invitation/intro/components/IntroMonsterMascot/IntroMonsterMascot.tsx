"use client";

import { motion } from "framer-motion";

import { buildEyePaths } from "../../utils/eyePaths";

export function IntroMonsterMascot() {
  const eyePaths = buildEyePaths();

  return (
    <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-[46%_54%_50%_50%/60%_55%_45%_40%] bg-gradient-to-b from-amber-300 via-amber-200 to-amber-100 text-orange-700 shadow-[0_20px_45px_rgba(249,115,22,0.25)] sm:h-36 sm:w-36">
      <div className="absolute -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-sky-400 to-indigo-500 text-white shadow-md">
        <span className="text-xl font-bold">★</span>
      </div>
      <div className="flex items-center gap-3">
        {eyePaths.map((path, index) => (
          <div
            key={`eye-${index}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-inner"
          >
            <motion.div
              className="relative flex h-5 w-5 items-center justify-center rounded-full bg-slate-900"
              animate={{
                x: path.x,
                y: path.y,
              }}
              transition={{
                duration: path.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="h-2 w-2 rounded-full bg-white/80"
                animate={{
                  x: path.x.map((value: number) => value * 0.35),
                  y: path.y.map((value: number) => value * 0.35),
                }}
                transition={{
                  duration: path.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-orange-400" />
        <span className="h-2 w-2 rounded-full bg-orange-400" />
        <span className="h-2 w-2 rounded-full bg-orange-400" />
      </div>
      <div className="mt-1 flex h-6 w-14 items-end justify-center rounded-b-full bg-rose-500">
        <span className="mb-1 h-2 w-4 rounded-full bg-white" />
      </div>
    </div>
  );
}
