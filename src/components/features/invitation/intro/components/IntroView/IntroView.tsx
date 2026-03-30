"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import type { ThemeToken } from "@/lib/types/invitation";
import { useThemeDetection } from "@/hooks/useThemeDetection";
import type { IntroContent } from "../../hooks/useIntroContent";
import { IntroPrincessView } from "./IntroPrincessView";
import { IntroDinoView } from "./IntroDinoView";
import { IntroKPopView } from "./IntroKPopView";
import { IntroSafariView } from "./IntroSafariView";

export type IntroViewProps = IntroContent & {
  onRevealLanding: () => void;
  isTransitioning: boolean;
  isVisible: boolean;
  themeToken?: ThemeToken;
  isPreview?: boolean;
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
  isPreview,
}: IntroViewProps) {
  const { isDinoTheme, isPrincessTheme, isKPopTheme, isSafariTheme } =
    useThemeDetection(themeToken);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isVisible) return null;

  if (isPrincessTheme) {
    return (
      <AnimatePresence mode="wait">
        <IntroPrincessView
          introCopy={introCopy}
          celebrantName={celebrantName}
          scene={scene}
          detailLeft={detailLeft}
          detailRight={detailRight}
          typography={typography}
          onRevealLanding={onRevealLanding}
          isTransitioning={isTransitioning}
          themeToken={themeToken}
          isPreview={isPreview}
        />
      </AnimatePresence>
    );
  }

  if (isDinoTheme) {
    return (
      <AnimatePresence mode="wait">
        <IntroDinoView
          introCopy={introCopy}
          celebrantName={celebrantName}
          scene={scene}
          detailLeft={detailLeft}
          detailRight={detailRight}
          typography={typography}
          onRevealLanding={onRevealLanding}
          isTransitioning={isTransitioning}
          themeToken={themeToken}
          isPreview={isPreview}
        />
      </AnimatePresence>
    );
  }

  if (isKPopTheme) {
    return (
      <AnimatePresence mode="wait">
        <IntroKPopView
          introCopy={introCopy}
          celebrantName={celebrantName}
          scene={scene}
          detailLeft={detailLeft}
          detailRight={detailRight}
          typography={typography}
          onRevealLanding={onRevealLanding}
          isTransitioning={isTransitioning}
          themeToken={themeToken}
          isPreview={isPreview}
        />
      </AnimatePresence>
    );
  }

  if (isSafariTheme) {
    return (
      <AnimatePresence mode="wait">
        <IntroSafariView
          introCopy={introCopy}
          celebrantName={celebrantName}
          scene={scene}
          detailLeft={detailLeft}
          detailRight={detailRight}
          typography={typography}
          onRevealLanding={onRevealLanding}
          isTransitioning={isTransitioning}
          themeToken={themeToken}
          isPreview={isPreview}
        />
      </AnimatePresence>
    );
  }

  return null;
}
