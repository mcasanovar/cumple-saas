import type { CreationFormData } from "@/components/features/invitation/creation/types";
import type { InvitationRenderConfig, ThemeToken } from "@/lib/types/invitation";
import { themes } from "@/config/themes";
import { getTemplateById } from "./registry";

/**
 * Convierte los datos del formulario de creación (CreationFormData)
 * al formato que consumen los componentes de renderizado (InvitationRenderConfig).
 * 
 * Útil para la previsualización en tiempo real sin base de datos.
 */
export function mapFormDataToRenderConfig(
  formData: Partial<CreationFormData>
): InvitationRenderConfig {
  const templateId = (formData.templateId as any) || "safari-adventure";
  const template = getTemplateById(templateId);

  const gallery = (formData.celebrantImages || [null, null, null]).map((img, i) => {
    const imageUrl = (typeof img === "string" ? img : "/vercel.svg");

    return {
      id: `preview-img-${i}`,
      imageUrl,
      caption: `Imagen ${i + 1}`,
    };
  });

  return {
    invitationId: "preview-id",
    templateId: templateId,
    slug: "preview",
    theme: template.theme as ThemeToken,
    metaTitle: `Invitación de ${formData.celebrantName || "---"}`,
    metaDescription: `¡Te invito a mi fiesta de ${formData.age || "?"} años!`,

    hero: template.hero,

    event: {
      celebrantName: formData.celebrantName || "Nombre festejado/a",
      age: formData.age || 0,
      date: formData.eventDate || "1 de Enero, 2026",
      time: formData.eventTime || "16:00",
      venueName: formData.venueName || "Salón de eventos",
      venueAddress: formData.venueAddress || "Calle Falsa 123",
      googleMapsUrl: "#",
      coordinates: formData.coordinates || undefined,
      venueImageUrl: typeof formData.venueImage === "string" ? formData.venueImage : "/vercel.svg",
      celebrantDescription: formData.celebrantDescription || "Nuestra gran pequeña estrella",
      invitationMessage: template.defaultMessages.invitationMessage,
      closingMessage: template.defaultMessages.closingMessage,
    },

    gallery,

    countdown: {
      targetDateISO: formData.eventDate ? `${formData.eventDate}T${formData.eventTime || "00:00"}:00` : new Date().toISOString(),
    },

    intro: {
      celebrantHeadline: template.intro.celebrantHeadline,
      celebrantSubtitle: template.intro.celebrantSubtitle,
      celebrantTagline: template.intro.celebrantTagline,
      hintHeadline: formData.customTexts?.introHeadline || template.intro.hintHeadline,
      buttonLabel: formData.customTexts?.introButton || template.intro.buttonLabel,
      celebrateNameClass: template.intro.celebrateNameClass,
      detailLeft: formData.customTexts?.detailLeftTitle ? { title: formData.customTexts.detailLeftTitle, subtitle: formData.eventDate || "---" } : undefined,
      detailRight: formData.customTexts?.detailRightTitle ? { title: formData.customTexts.detailRightTitle, subtitle: formData.venueName || "---" } : undefined,
    },
  };
}
