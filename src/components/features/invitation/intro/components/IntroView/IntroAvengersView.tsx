"use client";

import { motion } from "framer-motion";
import type { ThemeToken } from "@/lib/types/invitation";
import type { IntroContent } from "../../hooks/useIntroContent";
import { IntroCallToAction } from "../IntroCallToAction/IntroCallToAction";
import { IntroAvengersBackground } from "../IntroAvengersBackground";
import { IntroAvengersLogo } from "../IntroAvengersLogo";
import { IntroAvengersHeroText } from "../IntroAvengersHeroText";
import { IntroDetailColumn } from "../IntroDetailColumn";
import { useThemeDetection } from "@/hooks/useThemeDetection";

export type IntroAvengersViewProps = IntroContent & {
  onRevealLanding: () => void;
  isTransitioning: boolean;
  themeToken?: ThemeToken;
  isPreview?: boolean;
};

export function IntroAvengersView({
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
}: IntroAvengersViewProps) {
  const { isAvengersTheme } = useThemeDetection(themeToken);

  return (
    <motion.section
      key="invitation-intro-avengers"
      className="relative flex h-[100dvh] flex-col items-center overflow-hidden justify-between py-12 md:py-20 w-full bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Fondo cinemático */}
      <IntroAvengersBackground />

      {/* Contenido Superior: Logo */}
      <IntroAvengersLogo />

      {/* Contenido Central: Textos Heroicos */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 w-full gap-8">
        <IntroAvengersHeroText celebrantName={celebrantName} />

        <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 sm:gap-5 px-6 max-w-xl">
          <IntroDetailColumn
            data={detailLeft}
            align="left"
            typography={typography}
            isAvengersTheme={isAvengersTheme}
          />
          <motion.span
            aria-hidden
            className="block h-10 sm:h-12 w-[2px] rounded-full bg-[#fbc02d]/20 self-center"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.55,
            }}
          />
          <IntroDetailColumn
            data={detailRight}
            align="right"
            typography={typography}
            isAvengersTheme={isAvengersTheme}
          />
        </div>
      </div>

      {/* Contenido Inferior: Botón de Acción */}
      <div className="relative z-30 w-full flex flex-col items-center pb-8 md:pb-12">
        <IntroCallToAction
          label={introCopy.buttonLabel || "VER INVITACIÓN"}
          onComplete={onRevealLanding}
          fontFamily={typography.body}
          isTransitioning={isTransitioning}
          themeToken={themeToken}
          isPreview={isPreview}
        />
      </div>
    </motion.section>
  );
}
