"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { IntroContent } from "../../hooks/useIntroContent";
import { easeOutQuart } from "../../constants";
import { frameVariants, headingVariants } from "../../variants";
import { IntroCallToAction } from "../IntroCallToAction/IntroCallToAction";
import { IntroCelebrationBanner } from "../IntroCelebrationBanner/IntroCelebrationBanner";
import { IntroDetailColumn } from "../IntroDetailColumn";
import { IntroMonsterMascot } from "../IntroMonsterMascot/IntroMonsterMascot";
import { IntroSceneBackground } from "../IntroSceneBackground";

export type IntroViewProps = IntroContent & {
  onRevealLanding: () => void;
  isTransitioning: boolean;
  isVisible: boolean;
};

export function IntroView({
  introCopy,
  scene,
  detailLeft,
  detailRight,
  typography,
  onRevealLanding,
  isTransitioning,
  isVisible,
}: IntroViewProps) {
  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.section
          key="invitation-intro"
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-10"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <IntroSceneBackground scene={scene} isTransitioning={isTransitioning} />

          <motion.div
            className="relative z-10 flex w-full max-w-[min(560px,92vw)] flex-col items-center gap-6"
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
              className="text-xs uppercase tracking-[0.45em] text-amber-900/80"
              style={{ fontFamily: typography.body }}
              custom={0}
              variants={headingVariants}
            >
              {introCopy.hintHeadline.toUpperCase()}
            </motion.p>

            <motion.h1
              className="text-center text-5xl font-black uppercase tracking-[0.2em] text-transparent drop-shadow-sm sm:text-6xl"
              style={{
                fontFamily: typography.heading,
                backgroundImage:
                  "linear-gradient(90deg, #ffd166 0%, #ff9f1c 30%, #f15bb5 60%, #4361ee 100%)",
                WebkitBackgroundClip: "text",
              }}
              custom={1}
              variants={headingVariants}
            >
              {introCopy.celebrantHeadline.toUpperCase()}
            </motion.h1>

            <motion.div
              className="relative inline-flex items-center justify-center px-12 py-3"
              custom={2}
              variants={headingVariants}
              style={{
                background: "linear-gradient(180deg, #ff616f 0%, #f94144 100%)",
                clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)",
                boxShadow: "0 16px 30px rgba(249, 65, 68, 0.25)",
              }}
            >
              <span
                className="text-lg font-semibold uppercase tracking-[0.32em] text-[#fff8f0]"
                style={{ fontFamily: typography.body }}
              >
                {introCopy.celebrantSubtitle.toUpperCase()}
              </span>
            </motion.div>

            <motion.div
              className="mt-4 grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-5 px-2"
              custom={3}
              variants={headingVariants}
            >
              <IntroDetailColumn data={detailLeft} align="left" />
              <motion.span
                aria-hidden
                className="block h-12 w-[2px] rounded-full bg-amber-700/20"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.55, ease: easeOutQuart }}
              />
              <IntroDetailColumn data={detailRight} align="right" />
            </motion.div>

            <motion.p
              className="mt-2 max-w-[85%] text-center text-base text-slate-600"
              style={{ fontFamily: typography.body }}
              custom={4}
              variants={headingVariants}
            >
              {introCopy.celebrantTagline}
            </motion.p>

            <motion.div
              className="mt-1 flex w-full items-center justify-center"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: easeOutQuart }}
            >
              <IntroMonsterMascot />
            </motion.div>

            <IntroCallToAction
              label={introCopy.buttonLabel}
              onComplete={onRevealLanding}
              fontFamily={typography.body}
              isTransitioning={isTransitioning}
            />
          </motion.div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
