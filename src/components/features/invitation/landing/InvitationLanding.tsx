"use client";

import type { InvitationRenderConfig, ThemeConfig } from "@/lib/types/invitation";

import { useLandingContent } from "./hooks/useLandingContent";
import { LandingView } from "./components/LandingView";

type InvitationLandingProps = {
  invitation: InvitationRenderConfig;
  theme: ThemeConfig;
  isActive?: boolean;
  isPreview?: boolean;
};

export function InvitationLanding({
  invitation,
  theme,
  isPreview = false
}: InvitationLandingProps) {
  const content = useLandingContent(invitation, theme);

  return (
    <LandingView
      {...content}
      invitationId={invitation.invitationId}
      isPreview={isPreview}
    />
  );
}
