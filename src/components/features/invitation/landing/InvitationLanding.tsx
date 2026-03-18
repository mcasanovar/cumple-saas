"use client";

import type { InvitationConfig, ThemeConfig } from "@/lib/types/invitation";

import { useLandingContent } from "./hooks/useLandingContent";
import { LandingView } from "./components/LandingView";

type InvitationLandingProps = {
  invitation: InvitationConfig;
  theme: ThemeConfig;
  isActive?: boolean;
};

export function InvitationLanding({ invitation, theme }: InvitationLandingProps) {
  const content = useLandingContent(invitation, theme);

  return <LandingView {...content} />;
}
