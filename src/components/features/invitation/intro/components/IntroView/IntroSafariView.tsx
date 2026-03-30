"use client";

import { motion } from "framer-motion";
import type { ThemeToken } from "@/lib/types/invitation";
import type { IntroContent } from "../../hooks/useIntroContent";
import { easeOutQuart } from "../../constants";
import { frameVariants, headingVariants } from "../../variants";
import { IntroCallToAction } from "../IntroCallToAction/IntroCallToAction";
import { IntroCelebrationBanner } from "../IntroCelebrationBanner/IntroCelebrationBanner";
import { IntroDetailColumn } from "../IntroDetailColumn";
import { IntroMonsterMascot } from "../IntroMonsterMascot/IntroMonsterMascot";
import { IntroSceneBackground } from "../IntroSceneBackground";
import { useIsMobile } from "@/hooks/useIsMobile";

export type IntroSafariViewProps = IntroContent & {
  onRevealLanding: () => void;
  isTransitioning: boolean;
  themeToken?: ThemeToken;
  isPreview?: boolean;
};

export function IntroSafariView({
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
}: IntroSafariViewProps) {
  const isMobileResult = useIsMobile();
  const isMobile = isMobileResult || isPreview;

  const subtitleParts = introCopy.celebrantSubtitle.split("{celebrantName}");
  const subtitlePrefix = subtitleParts[0] || "";
  const subtitleSuffix = subtitleParts[1] || "";

  return (
    <motion.section
      key="invitation-intro-safari"
      className="relative flex max-h-screen flex-col items-center overflow-hidden px-4 sm:px-10 justify-center pt-0 w-full"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <IntroSceneBackground
        scene={scene}
        isTransitioning={isTransitioning}
        themeToken={themeToken}
      />

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
          className="text-xs lg:text-xl text-center uppercase tracking-[0.45em] text-amber-900/80"
          style={{ fontFamily: typography.body }}
          custom={0}
          variants={headingVariants}
        >
          {introCopy.hintHeadline.toUpperCase()}
        </motion.p>

        <motion.h1
          className="text-center md:text-5xl font-black uppercase drop-shadow-sm sm:text-3xl tracking-[0.2em] text-transparent"
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

        <motion.h2
          className="text-center text-4xl font-black uppercase tracking-tight sm:text-7xl -mt-4"
          style={{
            fontFamily: typography.heading,
            color: "#2D3D2D",
          }}
          custom={2}
          variants={headingVariants}
        >
          {subtitlePrefix && <span>{subtitlePrefix.toUpperCase()} </span>}
          <span
            className={introCopy.celebrateNameClass || "text-transparent"}
            style={{
              fontSize: isMobile ? "1.5em" : "1em",
              ...(!introCopy.celebrateNameClass
                ? {
                  backgroundImage:
                    "linear-gradient(90deg, #ffd166 0%, #ff9f1c 30%, #f15bb5 60%, #4361ee 100%)",
                  WebkitBackgroundClip: "text",
                }
                : {})
            }}
          >
            {celebrantName.toUpperCase()}
          </span>
          {subtitleSuffix && <span> {subtitleSuffix.toUpperCase()}</span>}
        </motion.h2>

        <motion.p
          className="max-w-[85%] text-center md:text-xl text-base text-slate-600 -mt-4"
          style={{ fontFamily: typography.body }}
          custom={4}
          variants={headingVariants}
        >
          {introCopy.celebrantTagline}
        </motion.p>
      </motion.div>

      <motion.div
        className="relative z-20 flex w-full h-screen max-w-[min(560px,92vw)] flex-col items-center justify-between mb-10 lg:mb-[5vh] gap-10"
        variants={frameVariants}
      >
        <motion.div
          className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-5 px-2 mt-4"
          custom={3}
          variants={headingVariants}
        >
          <IntroDetailColumn
            data={detailLeft}
            align="left"
            typography={typography}
            isPrincessTheme={false}
          />
          <motion.span
            aria-hidden
            className="block h-12 w-[2px] rounded-full bg-amber-700/20"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.55,
              ease: easeOutQuart,
            }}
          />
          <IntroDetailColumn
            data={detailRight}
            align="right"
            typography={typography}
            isPrincessTheme={false}
          />
        </motion.div>

        <motion.div
          className="mt-1 flex w-full items-center justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.65,
            ease: easeOutQuart,
          }}
        >
          <IntroMonsterMascot />
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
