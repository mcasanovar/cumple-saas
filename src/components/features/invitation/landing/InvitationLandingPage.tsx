"use client";

import type { InvitationRenderConfig } from "@/lib/types/invitation";
import { themes } from "@/config/themes";
import { DecorativeBackground } from "@/components/shared/invitation/decorative-background";
import { InvitationLanding } from "./InvitationLanding";

type InvitationLandingPageProps = {
  invitation: InvitationRenderConfig;
};

export function InvitationLandingPage({ invitation }: InvitationLandingPageProps) {
  const theme = themes[invitation.theme];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <DecorativeBackground theme={theme} phase="landing" />

      <InvitationLanding invitation={invitation} theme={theme} />
    </div>
  );
}
