"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { ThemeToken } from "@/lib/types/invitation";
import { useThemeDetection } from "@/hooks/useThemeDetection";
import type { IntroContent } from "../../hooks/useIntroContent";
import { easeOutQuart } from "../../constants";
import { frameVariants, headingVariants } from "../../variants";
import { IntroCallToAction } from "../IntroCallToAction/IntroCallToAction";
import { IntroCelebrationBanner } from "../IntroCelebrationBanner/IntroCelebrationBanner";
import { IntroCautionStripes } from "../IntroCautionStripes/IntroCautionStripes";
import { IntroCrackedBackground } from "../IntroCrackedBackground/IntroCrackedBackground";
import { IntroDetailColumn } from "../IntroDetailColumn";
import { IntroPetalConfetti } from "../IntroPetalConfetti/IntroPetalConfetti";
import { IntroPrincessBackground } from "../IntroPrincessBackground";
import { IntroMonsterMascot } from "../IntroMonsterMascot/IntroMonsterMascot";
import { IntroSceneBackground } from "../IntroSceneBackground";
import { useIsMobile } from "@/hooks/useIsMobile";

export type IntroViewProps = IntroContent & {
  onRevealLanding: () => void;
  isTransitioning: boolean;
  isVisible: boolean;
  themeToken?: ThemeToken;
};

export function IntroView({
  introCopy,
  celebrantName,
  scene,
  detailLeft,
  detailRight,
  typography,
  onRevealLanding,
  isTransitioning,
  isVisible,
  themeToken,
}: IntroViewProps) {
  const { isDinoTheme, isPrincessTheme, isKPopTheme } = useThemeDetection(themeToken);
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtitleParts = introCopy.celebrantSubtitle.split("{celebrantName}");
  const subtitlePrefix = subtitleParts[0] || "";
  const subtitleSuffix = subtitleParts[1] || "";

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.section
          key="invitation-intro"
          className={`relative flex h-screen max-h-screen flex-col items-center overflow-hidden px-4 sm:px-10 ${isPrincessTheme ? "justify-start pt-10" : isKPopTheme ? "justify-center pt-16" : "justify-center py-16"
            }`}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {isDinoTheme ? (
            <>
              <IntroCrackedBackground />
              <IntroCautionStripes />
            </>
          ) : isPrincessTheme ? (
            <>
              <IntroPrincessBackground />
              <IntroPetalConfetti />
            </>
          ) : (
            <IntroSceneBackground scene={scene} isTransitioning={isTransitioning} themeToken={themeToken} />
          )}

          {isKPopTheme ? (
            <>
              {/* K-pop confetti animation */}
              {isMounted && (
                <div className="pointer-events-none absolute inset-0 z-10">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const positions = [15, 25, 35, 45, 55, 65, 75, 85, 95, 5, 20, 30, 40, 50, 60, 70, 80, 90, 10, 95];
                    const drifts = [120, -80, 150, -100, 60, -140, 90, -70, 110, -50, 80, -120, 40, -90, 130, -60, 100, -110, 70, -130];
                    const rotations = [360, -360, 720, -720, 180, -180, 540, -540, 270, -270, 450, -450, 630, -630, 810, -810, 90, -90, 360, -360];
                    const durations = [3.2, 4.5, 3.8, 4.1, 3.5, 4.8, 3.3, 4.2, 3.9, 4.6, 3.1, 4.4, 3.7, 4.3, 3.6, 4.7, 3.4, 4.0, 3.8, 4.5];
                    const delays = [0.1, 0.8, 0.3, 1.2, 0.6, 1.5, 0.2, 0.9, 0.4, 1.1, 0.7, 1.3, 0.5, 1.0, 0.8, 1.4, 0.3, 0.6, 0.9, 1.2];
                    const repeatDelays = [5.2, 6.8, 5.5, 7.1, 6.2, 7.5, 5.8, 6.5, 6.0, 7.2, 5.3, 6.9, 5.7, 6.3, 6.1, 7.0, 5.6, 6.4, 5.9, 6.7];

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
                className="relative z-20 flex w-full max-w-[min(560px,92vw)] flex-col justify-center items-center gap-4"
                variants={frameVariants}
              >
                <motion.p
                  className="text-xs uppercase text-center tracking-[0.45em] text-[#f363b4]"
                  style={{ fontFamily: typography.body }}
                  custom={0}
                  variants={headingVariants}
                >
                  {introCopy.hintHeadline.toUpperCase()}
                </motion.p>

                <motion.h1
                  className="text-center text-4xl font-black uppercase bg-[#b98ece] bg-clip-text drop-shadow-sm sm:text-4xl tracking-[0.2em] text-transparent"

                  custom={1}
                  variants={headingVariants}
                >
                  {introCopy.celebrantHeadline.toUpperCase()}
                </motion.h1>

                <motion.h2
                  className="text-center text-6xl font-black bg-[#f363b4] bg-clip-text uppercase tracking-tight sm:text-8xl"

                  custom={2}
                  variants={headingVariants}
                >
                  {subtitlePrefix}
                  <span className="text-transparent bg-[#f363b4] bg-clip-text">
                    {celebrantName}
                  </span>
                  {subtitleSuffix}
                </motion.h2>

                <motion.p
                  className="max-w-[85%] text-center text-base text-[#b98ece] mt-2 font-bold"
                  style={{ fontFamily: typography.body }}
                  custom={4}
                  variants={headingVariants}
                >
                  {introCopy.celebrantTagline}
                </motion.p>

                {/* Date and Time section for K-pop theme */}
                <motion.div
                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-5 px-2 mt-6"
                  custom={5}
                  variants={headingVariants}
                >
                  <IntroDetailColumn data={detailLeft} align="left" typography={typography} isPrincessTheme={false} isKPopTheme={true} />
                  <motion.span
                    aria-hidden
                    className="block h-12 w-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(180deg, #f15bb5 0%, #4361ee 100%)"
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 0.75, ease: easeOutQuart }}
                  />
                  <IntroDetailColumn data={detailRight} align="right" typography={typography} isPrincessTheme={false} isKPopTheme={true} />
                </motion.div>
              </motion.div>

              {/* Bottom section with mascot and button */}
              <motion.div
                className="relative z-20 flex w-full max-w-[min(560px,92vw)] flex-col items-center gap-6 mt-auto mb-8"
                variants={frameVariants}
              >
                <IntroCallToAction
                  label={introCopy.buttonLabel}
                  onComplete={onRevealLanding}
                  fontFamily={typography.body}
                  isTransitioning={isTransitioning}
                  themeToken={themeToken}
                />
              </motion.div>
            </>
          ) : (
            <motion.div
              className="relative z-20 flex w-full max-w-[min(560px,92vw)] flex-col items-center gap-6"
              variants={frameVariants}
            >
              {!isPrincessTheme && (
                <motion.div
                  className="flex w-full items-center justify-center"
                  initial={{ opacity: 0, y: -24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: easeOutQuart, delay: 0.2 }}
                >
                  <IntroCelebrationBanner colors={scene.bannerColors} />
                </motion.div>
              )}

              {!isPrincessTheme && (
                <motion.p
                  className="text-xs uppercase tracking-[0.45em] text-amber-900/80"
                  style={{ fontFamily: typography.body }}
                  custom={0}
                  variants={headingVariants}
                >
                  {introCopy.hintHeadline.toUpperCase()}
                </motion.p>
              )}

              <motion.h1
                className={`text-center text-3xl font-black uppercase drop-shadow-sm sm:text-3xl ${isPrincessTheme ? "mt-[400px] sm:mt-[450px] tracking-normal" : "tracking-[0.2em]"} ${isPrincessTheme ? "" : "text-transparent"}`}
                style={{
                  fontFamily: typography.heading,
                  backgroundImage: isPrincessTheme
                    ? "none"
                    : isDinoTheme
                      ? "linear-gradient(135deg, #6B9B6E 0%, #5A8A5D 50%, #4A7350 100%)"
                      : "linear-gradient(90deg, #ffd166 0%, #ff9f1c 30%, #f15bb5 60%, #4361ee 100%)",
                  WebkitBackgroundClip: isPrincessTheme ? "unset" : "text",
                  color: isPrincessTheme ? "#9278b9" : undefined,
                  filter: isDinoTheme ? "drop-shadow(2px 2px 4px rgba(0,0,0,0.15))" : "none",
                }}
                custom={1}
                variants={headingVariants}
              >
                {introCopy.celebrantHeadline.toUpperCase()}
              </motion.h1>

              <motion.h2
                className={`text-center text-4xl font-black uppercase tracking-tight sm:text-7xl ${isPrincessTheme ? "-mt-4" : ""}`}
                style={{
                  fontFamily: typography.heading,
                  color: isDinoTheme ? "#8B7355" : "#2D3D2D",
                  textShadow: isDinoTheme ? "3px 3px 6px rgba(0,0,0,0.2)" : "none",
                  WebkitTextStroke: isDinoTheme ? "1px rgba(139, 115, 85, 0.3)" : "none",
                }}
                custom={2}
                variants={headingVariants}
              >
                {subtitlePrefix && <span>{subtitlePrefix.toUpperCase()} </span>}
                <span
                  className={
                    introCopy.celebrateNameClass ||
                    "text-transparent"
                  }
                  style={
                    !introCopy.celebrateNameClass
                      ? {
                        backgroundImage: isPrincessTheme
                          ? "none"
                          : isDinoTheme
                            ? "linear-gradient(135deg, #6B9B6E 0%, #5A8A5D 50%, #4A7350 100%)"
                            : "linear-gradient(90deg, #ffd166 0%, #ff9f1c 30%, #f15bb5 60%, #4361ee 100%)",
                        WebkitBackgroundClip: isPrincessTheme ? "unset" : "text",
                        color: isPrincessTheme ? "#6c5491" : undefined,
                        filter: isDinoTheme ? "drop-shadow(2px 2px 4px rgba(0,0,0,0.15))" : "none",
                      }
                      : undefined
                  }
                >
                  {celebrantName.toUpperCase()}
                </span>
                {subtitleSuffix && <span> {subtitleSuffix.toUpperCase()}</span>}
              </motion.h2>

              <motion.div
                className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-5 px-2 ${isPrincessTheme ? "-mt-6" : "mt-4"}`}
                custom={3}
                variants={headingVariants}
              >
                <IntroDetailColumn data={detailLeft} align="left" typography={typography} isPrincessTheme={isPrincessTheme} />
                <motion.span
                  aria-hidden
                  className="block h-12 w-[2px] rounded-full bg-amber-700/20"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: easeOutQuart }}
                />
                <IntroDetailColumn data={detailRight} align="right" typography={typography} isPrincessTheme={isPrincessTheme} />
              </motion.div>

              <motion.p
                className={`max-w-[85%] text-center text-base text-slate-600 ${isPrincessTheme ? "-mt-4" : "mt-2"}`}
                style={{ fontFamily: typography.body }}
                custom={4}
                variants={headingVariants}
              >
                {introCopy.celebrantTagline}
              </motion.p>

              {!isDinoTheme && !isPrincessTheme && !isKPopTheme && (
                <motion.div
                  className="mt-1 flex w-full items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.65, ease: easeOutQuart }}
                >
                  <IntroMonsterMascot />
                </motion.div>
              )}

              <IntroCallToAction
                className={isPrincessTheme && isMobile ? "-mt-5" : ""}
                label={introCopy.buttonLabel}
                onComplete={onRevealLanding}
                fontFamily={typography.body}
                isTransitioning={isTransitioning}
                themeToken={themeToken}
              />
            </motion.div>
          )}
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
