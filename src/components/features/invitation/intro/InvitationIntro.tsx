"use client";

import type { InvitationConfig, ThemeConfig } from "@/lib/types/invitation";

import { IntroView } from "./components/IntroView/IntroView";
import { useIntroContent } from "./hooks/useIntroContent";

type InvitationIntroProps = {
  invitation: InvitationConfig;
  theme: ThemeConfig;
  onRevealLanding: () => void;
  isTransitioning: boolean;
  isVisible: boolean;
};

export function InvitationIntro({
  invitation,
  theme,
  onRevealLanding,
  isTransitioning,
  isVisible,
}: InvitationIntroProps) {
  const content = useIntroContent(invitation, theme);

  return (
    <IntroView
      {...content}
      onRevealLanding={onRevealLanding}
      isTransitioning={isTransitioning}
      isVisible={isVisible}
    />
  );
}
