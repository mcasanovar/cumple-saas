"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import type { InvitationRenderConfig } from "@/lib/types/invitation";
import { themes } from "@/config/themes";
import { DecorativeBackground } from "@/components/shared/invitation/decorative-background";
import { InvitationIntro } from "./InvitationIntro";

type IntroPageProps = {
  invitation: InvitationRenderConfig;
  invitationId: string;
};

export function IntroPage({ invitation, invitationId }: IntroPageProps) {
  const router = useRouter();
  const theme = themes[invitation.theme];

  const handleRevealLanding = useCallback(() => {
    router.push(`/invitacion/${invitationId}?from=intro`);
  }, [invitationId, router]);

  return (
    <div className="relative h-screen overflow-hidden">
      <DecorativeBackground theme={theme} phase="intro" />

      <InvitationIntro
        invitation={invitation}
        theme={theme}
        onRevealLanding={handleRevealLanding}
        isTransitioning={false}
        isVisible={true}
      />
    </div>
  );
}
