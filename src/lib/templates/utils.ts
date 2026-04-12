import type { UserInvitationData } from "@/lib/types/template";
import type { InvitationRenderConfig, EventFeature } from "@/lib/types/invitation";

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
      showMap: userData.showMap,
      googleMapsUrl: userData.googleMapsUrl,
      coordinates: userData.coordinates,
      venueImageUrl: userData.venueImage,
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
      celebrateNameClass: template.intro.celebrateNameClass,
      detailLeft: userData.introOverrides?.detailLeft,
      detailRight: userData.introOverrides?.detailRight,
    },

    features: (userData.eventIncludes || []).map((item, index): EventFeature => ({
      title: item.description,
      description: item.description,
      icon: item.icon,
      color: index % 2 === 0 ? "#ff6b3d" : "#2f6bff",
    })),
  };
}
