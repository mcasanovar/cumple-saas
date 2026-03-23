import { useMemo } from "react";

import type {
  IntroSceneConfig,
  InvitationConfig,
  InvitationIntroCopy,
  ThemeConfig,
} from "@/lib/types/invitation";

import { FALLBACK_INTRO_SCENE } from "../constants";

export type IntroDetail = {
  title: string;
  subtitle: string;
  helper?: string;
};

export type IntroContent = {
  introCopy: InvitationIntroCopy;
  celebrantName: string;
  scene: IntroSceneConfig;
  detailLeft: IntroDetail;
  detailRight: IntroDetail;
  typography: ThemeConfig["typography"];
};

export function useIntroContent(invitation: InvitationConfig, theme: ThemeConfig): IntroContent {
  return useMemo(() => {
    const rawIntroCopy: InvitationIntroCopy =
      invitation.intro ?? {
        celebrantHeadline: invitation.hero.headline,
        celebrantSubtitle: invitation.hero.subheadline,
        celebrateNameClass: "",
        celebrantTagline: invitation.event.invitationMessage,
        hintHeadline: "Tenemos una noticia...",
        buttonLabel: "presiona",
      };

    const introCopy: InvitationIntroCopy = {
      ...rawIntroCopy,
    };

    const scene = theme.introScene ?? FALLBACK_INTRO_SCENE;

    const detailLeft: IntroDetail =
      rawIntroCopy.detailLeft ?? {
        title: invitation.event.date.split(",")[0]?.toUpperCase() ?? "SÁBADO",
        subtitle:
          invitation.event.date.split(",")[1]?.trim().toUpperCase() ?? invitation.event.date.toUpperCase(),
        helper: "EVENTO ESPECIAL",
      };

    const detailRight: IntroDetail =
      rawIntroCopy.detailRight ?? {
        title: invitation.event.time.toUpperCase(),
        subtitle: invitation.event.venueName.toUpperCase(),
        helper: invitation.event.venueAddress?.toUpperCase(),
      };

    return {
      introCopy,
      celebrantName: invitation.event.celebrantName,
      scene,
      detailLeft,
      detailRight,
      typography: theme.typography,
    };
  }, [invitation, theme]);
}
