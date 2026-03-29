"use client";

import type { InvitationRenderConfig, ThemeConfig } from "@/lib/types/invitation";

import { IntroView } from "./components/IntroView/IntroView";
import { useIntroContent } from "./hooks/useIntroContent";

type InvitationIntroProps = {
  invitation: InvitationRenderConfig;
  theme: ThemeConfig;
  onRevealLanding: () => void;
  isTransitioning: boolean;
  isVisible: boolean;
  isPreview?: boolean;
};

export function InvitationIntro({
  invitation,
  theme,
  onRevealLanding,
  isTransitioning,
  isVisible,
  isPreview,
}: InvitationIntroProps) {
  const content = useIntroContent(invitation, theme);

  return (
    <IntroView
      {...content}
      onRevealLanding={onRevealLanding}
      isTransitioning={isTransitioning}
      isVisible={isVisible}
      isPreview={isPreview}
      themeToken={invitation.theme}
    />
  );
}
