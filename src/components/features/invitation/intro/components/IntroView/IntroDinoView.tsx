"use client";

import { motion } from "framer-motion";
import type { ThemeToken } from "@/lib/types/invitation";
import type { IntroContent } from "../../hooks/useIntroContent";
import { headingVariants, frameVariants } from "../../variants";
import { IntroCallToAction } from "../IntroCallToAction/IntroCallToAction";
import { IntroDetailColumn } from "../IntroDetailColumn";
import { IntroCautionStripes } from "../IntroCautionStripes/IntroCautionStripes";
import { IntroCrackedBackground } from "../IntroCrackedBackground/IntroCrackedBackground";
import { IntroCelebrationBanner } from "../IntroCelebrationBanner/IntroCelebrationBanner";
import { easeOutQuart } from "../../constants";

import { useIsMobile } from "@/hooks/useIsMobile";

export type IntroDinoViewProps = IntroContent & {
  scene: any;
  onRevealLanding: () => void;
  isTransitioning: boolean;
  themeToken?: ThemeToken;
  isPreview?: boolean;
};

export function IntroDinoView({
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
}: IntroDinoViewProps) {
  const isMobile = useIsMobile();
  const subtitleParts = introCopy.celebrantSubtitle.split("{celebrantName}");
  const subtitlePrefix = subtitleParts[0] || "";
  const subtitleSuffix = subtitleParts[1] || "";

  return (
    <motion.section
      key="invitation-intro-dino"
      className="relative flex max-h-screen flex-col items-center overflow-hidden px-4 sm:px-10 justify-center pt-0 w-full"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <IntroCrackedBackground />
      <IntroCautionStripes />

      <motion.div
        className="relative z-20 flex h-screen w-full max-w-[min(560px,92vw)] flex-col items-center justify-start mt-40 gap-12"
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
              "linear-gradient(135deg, #6B9B6E 0%, #5A8A5D 50%, #4A7350 100%)",
            WebkitBackgroundClip: "text",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.15))",
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
            color: "#8B7355",
            textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
            WebkitTextStroke: "1px rgba(139, 115, 85, 0.3)",
          }}
          custom={2}
          variants={headingVariants}
        >
          {subtitlePrefix && <span>{subtitlePrefix.toUpperCase()} </span>}
          <span style={{ fontSize: isMobile ? "1.5em" : "1em" }}>
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
        className="relative z-20 flex w-full h-screen max-w-[min(560px,92vw)] flex-col items-center justify-end mb-40 lg:mb-[20vh] gap-10"
        variants={frameVariants}
      >
        <motion.div
          className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-5 px-2 -mt-6"
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
            transition={{ duration: 0.6, delay: 0.55, ease: easeOutQuart }}
          />
          <IntroDetailColumn
            data={detailRight}
            align="right"
            typography={typography}
            isPrincessTheme={false}
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
