"use client";

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
  const { isDinoTheme, isPrincessTheme } = useThemeDetection(themeToken);
  const isMobile = useIsMobile();

  const subtitleParts = introCopy.celebrantSubtitle.split("{celebrantName}");
  const subtitlePrefix = subtitleParts[0] || "";
  const subtitleSuffix = subtitleParts[1] || "";

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.section
          key="invitation-intro"
          className={`relative flex h-screen max-h-screen flex-col items-center overflow-hidden px-4 sm:px-10 ${isPrincessTheme ? "justify-start pt-10" : "justify-center py-16"
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
            <IntroSceneBackground scene={scene} isTransitioning={isTransitioning} />
          )}

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
                      color: isPrincessTheme ? "#9278b9" : undefined,
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

            {!isDinoTheme && !isPrincessTheme && (
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
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
