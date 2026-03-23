import type { TemplateDefinition } from "@/lib/types/template";

export const safariAdventureTemplate: TemplateDefinition = {
  id: "safari-adventure",
  name: "Safari Adventure",
  description: "Una aventura salvaje llena de animales y diversión",
  theme: "safari",
  category: "animals",

  hero: {
    headline: "La gran aventura de",
    subheadline: "¡Ven a celebrar con nosotros!",
    featuredIllustration: "/illustrations/safari-cubs.svg",
  },

  intro: {
    celebrantHeadline: "¡Celebremos juntos!",
    celebrantSubtitle: "Un día especial para {celebrantName}",
    celebrantTagline: "Te esperamos en esta aventura",
    hintHeadline: "Ven a vivir una experiencia única",
    buttonLabel: "Ver invitación",
    celebrateNameClass: "text-[#ff6b3d] drop-shadow-[0_6px_16px_rgba(255,107,61,0.25)]",
  },

  defaultMessages: {
    invitationMessage:
      "Prepárate para una tarde llena de risas, aventuras y sorpresas. Tu presencia hará este día inolvidable.",
    closingMessage: "¡Nos vemos pronto en esta gran aventura!",
  },
};
