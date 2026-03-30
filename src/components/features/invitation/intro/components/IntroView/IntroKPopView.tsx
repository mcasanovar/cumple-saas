"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { ThemeToken } from "@/lib/types/invitation";
import type { IntroContent } from "../../hooks/useIntroContent";
import { headingVariants, frameVariants } from "../../variants";
import { easeOutQuart } from "../../constants";
import { IntroCallToAction } from "../IntroCallToAction/IntroCallToAction";
import { IntroDetailColumn } from "../IntroDetailColumn";
import { IntroKPopBackground } from "../IntroKPopBackground/IntroKPopBackground";
import { IntroCelebrationBanner } from "../IntroCelebrationBanner/IntroCelebrationBanner";
import { useIsMobile } from "@/hooks/useIsMobile";

export type IntroKPopViewProps = IntroContent & {
  scene: any;
  onRevealLanding: () => void;
  isTransitioning: boolean;
  themeToken?: ThemeToken;
  isPreview?: boolean;
};

export function IntroKPopView({
  introCopy,
  celebrantName,
  scene,
  detailLeft,
  detailRight,
  typography,
  onRevealLanding,
  isTransitioning,
  themeToken,
  isPreview,
}: IntroKPopViewProps) {
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log({
    introCopy,
    detailLeft,
    detailRight,
  });

  const subtitleParts = introCopy.celebrantSubtitle.split("{celebrantName}");
  const subtitlePrefix = subtitleParts[0] || "";
  const subtitleSuffix = subtitleParts[1] || "";

  return (
    <motion.section
      key="invitation-intro-kpop"
      className="relative flex max-h-screen flex-col items-center overflow-hidden px-4 sm:px-10 justify-center pt-0 w-full"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <IntroKPopBackground />
      {/* K-pop confetti animation */}
      {isMounted && (
        <div className="pointer-events-none absolute inset-0 z-10">
          {Array.from({ length: 20 }).map((_, i) => {
            const positions = [
              15, 25, 35, 45, 55, 65, 75, 85, 95, 5, 20, 30, 40, 50, 60, 70, 80,
              90, 10, 95,
            ];
            const drifts = [
              120, -80, 150, -100, 60, -140, 90, -70, 110, -50, 80, -120, 40,
              -90, 130, -60, 100, -110, 70, -130,
            ];
            const rotations = [
              360, -360, 720, -720, 180, -180, 540, -540, 270, -270, 450, -450,
              630, -630, 810, -810, 90, -90, 360, -360,
            ];
            const durations = [
              3.2, 4.5, 3.8, 4.1, 3.5, 4.8, 3.3, 4.2, 3.9, 4.6, 3.1, 4.4, 3.7,
              4.3, 3.6, 4.7, 3.4, 4.0, 3.8, 4.5,
            ];
            const delays = [
              0.1, 0.8, 0.3, 1.2, 0.6, 1.5, 0.2, 0.9, 0.4, 1.1, 0.7, 1.3, 0.5,
              1.0, 0.8, 1.4, 0.3, 0.6, 0.9, 1.2,
            ];
            const repeatDelays = [
              5.2, 6.8, 5.5, 7.1, 6.2, 7.5, 5.8, 6.5, 6.0, 7.2, 5.3, 6.9, 5.7,
              6.3, 6.1, 7.0, 5.6, 6.4, 5.9, 6.7,
            ];

            return (
              <motion.div
                key={`k-pop-confetti-${i}`}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    i % 3 === 0
                      ? "#f363b4"
                      : i % 3 === 1
                        ? "#9333ea"
                        : "#ffd166",
                  left: `${positions[i]}%`,
                  top: "-20px",
                }}
                animate={{
                  y: [0, 800],
                  x: [0, drifts[i]],
                  rotate: [0, rotations[i]],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: durations[i],
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

      {/* Top section with text content */}
      <motion.div
        className="relative z-20 flex h-screen w-full max-w-[min(560px,92vw)] flex-col items-center justify-start mt-6 lg:mt-40 gap-8 lg:gap-12"
        variants={frameVariants}
      >
        <motion.div
          className="flex w-full items-center justify-center"
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutQuart, delay: 0.2 }}
        >
          <IntroCelebrationBanner colors={scene.bannerColors} />
        </motion.div>

        <motion.p
          className="text-xs lg:text-xl uppercase text-center tracking-[0.45em] text-[#f363b4]"
          style={{ fontFamily: typography.body }}
          custom={0}
          variants={headingVariants}
        >
          {introCopy.hintHeadline.toUpperCase()}
        </motion.p>

        <motion.h1
          className="text-center md:text-5xl font-black uppercase bg-[#b98ece] bg-clip-text drop-shadow-sm sm:text-3xl tracking-[0.2em] text-transparent"
          custom={1}
          variants={headingVariants}
        >
          {introCopy.celebrantHeadline.toUpperCase()}
        </motion.h1>

        <motion.h2
          className="text-center text-6xl font-black bg-[#f363b4] bg-clip-text uppercase tracking-tight sm:text-8xl -mt-4"
          custom={2}
          variants={headingVariants}
        >
          {subtitlePrefix}
          <span
            style={{ fontSize: isMobile ? "1.5em" : "1em" }}
            className="text-transparent bg-[#f363b4] bg-clip-text"
          >
            {celebrantName}
          </span>
          {subtitleSuffix}
        </motion.h2>

        <motion.p
          className="max-w-[85%] text-center md:text-xl text-base text-[#b98ece] font-bold -mt-4"
          style={{ fontFamily: typography.body }}
          custom={4}
          variants={headingVariants}
        >
          {introCopy.celebrantTagline}
        </motion.p>
      </motion.div>

      {/* Bottom section with details and button */}
      <motion.div
        className="relative z-20 flex w-full h-screen max-w-[min(560px,92vw)] flex-col items-center justify-between mb-10 lg:mb-[5vh] gap-10"
        variants={frameVariants}
      >
        {/* Date and Time section for K-pop theme */}
        <motion.div
          className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-5 px-2 -mt-6"
          custom={5}
          variants={headingVariants}
        >
          <IntroDetailColumn
            data={detailLeft}
            align="left"
            typography={typography}
            isPrincessTheme={false}
            isKPopTheme={true}
          />
          <motion.span
            aria-hidden
            className="block h-12 w-[2px] rounded-full"
            style={{
              background: "linear-gradient(180deg, #f15bb5 0%, #4361ee 100%)",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.75,
              ease: easeOutQuart,
            }}
          />
          <IntroDetailColumn
            data={detailRight}
            align="right"
            typography={typography}
            isPrincessTheme={false}
            isKPopTheme={true}
          />
        </motion.div>

        <IntroCallToAction
          label={introCopy.buttonLabel}
          onComplete={onRevealLanding}
          fontFamily={typography.body}
          isTransitioning={isTransitioning}
          themeToken={themeToken}
          isPreview={isPreview}
        />
      </motion.div>
    </motion.section>
  );
}
