"use client";

import { motion } from "framer-motion";
import type { ThemeToken } from "@/lib/types/invitation";
import type { IntroContent } from "../../hooks/useIntroContent";
import { headingVariants, frameVariants } from "../../variants";
import { easeOutQuart } from "../../constants";
import { IntroCallToAction } from "../IntroCallToAction/IntroCallToAction";
import { IntroDetailColumn } from "../IntroDetailColumn";
import { IntroPetalConfetti } from "../IntroPetalConfetti/IntroPetalConfetti";
import { IntroPrincessBackground } from "../IntroPrincessBackground";
import { useIsMobile } from "@/hooks/useIsMobile";

export type IntroPrincessViewProps = IntroContent & {
  scene: any;
  onRevealLanding: () => void;
  isTransitioning: boolean;
  themeToken?: ThemeToken;
  isPreview?: boolean;
};

export function IntroPrincessView({
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
}: IntroPrincessViewProps) {
  const isMobileResult = useIsMobile();
  const isMobile = isMobileResult || isPreview;

  const subtitleParts = introCopy.celebrantSubtitle.split("{celebrantName}");
  const subtitlePrefix = subtitleParts[0] || "";
  const subtitleSuffix = subtitleParts[1] || "";

  return (
    <motion.section
      className="relative flex h-[100dvh] flex-col items-center overflow-hidden px-4 sm:px-10 justify-between py-16 sm:py-20 w-full"
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <IntroPrincessBackground />
      <IntroPetalConfetti />

      <motion.div
        className="relative z-20 flex w-full max-w-[min(560px,92vw)] flex-col items-center justify-start gap-4 sm:gap-8 mt-4 sm:mt-8"
        variants={frameVariants}
      >
        <motion.h1
          className="text-center text-xl sm:text-3xl font-black uppercase drop-shadow-sm tracking-normal"
          style={{
            fontFamily: typography.heading,
            color: "#9278b9",
          }}
          custom={1}
          variants={headingVariants}
        >
          {introCopy.celebrantHeadline.toUpperCase()}
        </motion.h1>

        <motion.h2
          className="text-center text-3xl sm:text-7xl font-black uppercase tracking-tight -mt-1 sm:-mt-4"
          style={{
            fontFamily: typography.heading,
            color: "#6c5491",
          }}
          custom={2}
          variants={headingVariants}
        >
          {subtitlePrefix && <span>{subtitlePrefix.toUpperCase()} </span>}
          <span className="text-3xl sm:text-7xl">{celebrantName.toUpperCase()}</span>
          {subtitleSuffix && <span> {subtitleSuffix.toUpperCase()}</span>}
        </motion.h2>
        <motion.p
          className="max-w-[85%] text-center text-xs sm:text-xl text-slate-600 -mt-1 sm:-mt-4 leading-relaxed"
          style={{ fontFamily: typography.body }}
          custom={4}
          variants={headingVariants}
        >
          {introCopy.celebrantTagline}
        </motion.p>
      </motion.div>
      <motion.div
        className="relative z-20 flex w-full max-w-[min(560px,92vw)] flex-col items-center justify-end gap-6 sm:gap-10 mb-4 sm:mb-8"
        variants={frameVariants}
      >
        <motion.div
          className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 sm:gap-5 px-2"
          custom={3}
          variants={headingVariants}
        >
          <IntroDetailColumn
            data={detailLeft}
            align="left"
            typography={typography}
            isPrincessTheme={true}
          />
          <motion.span
            aria-hidden
            className="block h-10 sm:h-12 w-[2px] rounded-full bg-amber-700/20 self-center"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: easeOutQuart }}
          />
          <IntroDetailColumn
            data={detailRight}
            align="right"
            typography={typography}
            isPrincessTheme={true}
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
