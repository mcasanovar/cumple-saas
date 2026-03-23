import type { UserInvitationData } from "@/lib/types/template";
import type { InvitationRenderConfig } from "@/lib/types/invitation";

import { getTemplateById } from "./registry";

export function mergeTemplateWithUserData(
  userData: UserInvitationData
): InvitationRenderConfig {
  const template = getTemplateById(userData.templateId);

  return {
    invitationId: userData.id,
    templateId: userData.templateId,
    slug: userData.slug,
    theme: template.theme,
    metaTitle: userData.metaTitle,
    metaDescription: userData.metaDescription,

    hero: template.hero,

    event: {
      celebrantName: userData.celebrantName,
      age: userData.age,
      date: userData.date,
      time: userData.time,
      venueName: userData.venueName,
      venueAddress: userData.venueAddress,
      googleMapsUrl: userData.googleMapsUrl,
      coordinates: userData.coordinates,
      venueImageUrl: undefined,
      celebrantDescription: userData.celebrantDescription,
      invitationMessage: template.defaultMessages.invitationMessage,
      closingMessage: template.defaultMessages.closingMessage,
    },

    gallery: userData.gallery,

    countdown: {
      targetDateISO: userData.targetDateISO,
    },

    intro: {
      celebrantHeadline: template.intro.celebrantHeadline,
      celebrantSubtitle: template.intro.celebrantSubtitle,
      celebrantTagline: template.intro.celebrantTagline,
      hintHeadline: template.intro.hintHeadline,
      buttonLabel: template.intro.buttonLabel,
      detailLeft: userData.introOverrides?.detailLeft,
      detailRight: userData.introOverrides?.detailRight,
    },
  };
}
