"use client";

import { motion } from "framer-motion";
import { IconRenderer } from "@/components/shared/icon-renderer/IconRenderer";
import { normalizeAvengersText } from "@/lib/utils/normalizeText";
import type { LandingAvengersFeatureListProps } from "./LandingAvengersFeatureList.types";

const easeOutQuint = [0.16, 1, 0.3, 1] as const;

export function LandingAvengersFeatureList({
  featureList,
  typography,
}: LandingAvengersFeatureListProps) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {featureList.map((feature, index) => (
        <motion.div
          key={feature.title}
          className="flex flex-col items-center gap-4 rounded-2xl bg-transparent p-4 text-center"
          whileHover={{ y: -6 }}
          transition={{ duration: 0.35, ease: easeOutQuint }}
        >
          <div
            className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 sm:h-28 sm:w-28"
            style={{
              borderColor: feature.color || "#ffd54f",
              boxShadow: `0 0 12px ${feature.color || "#ffd54f"}`,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className="absolute inset-0 rounded-full blur-md"
              style={{
                backgroundColor: feature.color || "#ffd54f",
              }}
            />
            <IconRenderer
              icon={feature.icon}
              className="relative z-10 text-4xl sm:text-5xl"
              style={{ color: feature.color || "#ffd54f" }}
            />
          </div>
          <h3
            className="text-base font-bold uppercase tracking-widest sm:text-lg"
            style={{ fontFamily: typography.heading, color: "#ffffff" }}
          >
            {normalizeAvengersText(feature.title, true)}
          </h3>
        </motion.div>
      ))}
    </div>
  );
}
