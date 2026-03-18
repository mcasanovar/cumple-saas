"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { themes } from "@/config/themes";
import type { InvitationConfig } from "@/lib/types/invitation";
import { DecorativeBackground } from "@/components/shared/invitation/decorative-background";
import { InvitationLanding } from "./landing/InvitationLanding";
import { InvitationIntro } from "./intro/InvitationIntro";
import { IntroTransition } from "./intro/components/IntroTransition";

interface InvitationExperienceProps {
  invitation: InvitationConfig;
}

type ExperiencePhase = "intro" | "transition" | "landing";

export function InvitationExperience({
  invitation,
}: InvitationExperienceProps) {
  const theme = themes[invitation.theme];
  const [phase, setPhase] = useState<ExperiencePhase>("intro");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (phase === "transition") {
      const timeout = setTimeout(() => {
        setPhase("landing");
        setIsTransitioning(false);
      }, 900);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [phase]);

  const handleRevealLanding = useCallback(() => {
    if (phase !== "intro") return;
    setHasInteracted(true);
    setIsTransitioning(true);
    setPhase("transition");
  }, [phase]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <DecorativeBackground theme={theme} phase={phase} />

      <InvitationIntro
        invitation={invitation}
        theme={theme}
        onRevealLanding={handleRevealLanding}
        isTransitioning={isTransitioning}
        isVisible={phase !== "landing"}
      />

      <IntroTransition isActive={isTransitioning} />

      <motion.main
        key="landing"
        className="relative z-10"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{
          opacity: phase === "landing" ? 1 : 0,
          y: phase === "landing" ? 0 : 40,
          scale: phase === "landing" ? 1 : 0.95,
          filter:
            phase === "landing" || hasInteracted ? "blur(0px)" : "blur(4px)",
        }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
          delay: phase === "landing" ? 0.05 : 0,
        }}
        style={{ pointerEvents: phase === "landing" ? "auto" : "none" }}
      >
        <InvitationLanding
          invitation={invitation}
          theme={theme}
          isActive={phase === "landing"}
        />
      </motion.main>
    </div>
  );
}
