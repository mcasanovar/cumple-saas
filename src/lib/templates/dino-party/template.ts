import type { TemplateDefinition } from "@/lib/types/template";

export const dinoPartyTemplate: TemplateDefinition = {
  id: "dino-party",
  name: "Dino Party",
  description: "Viaja al pasado con dinosaurios gigantes y aventuras prehistóricas",
  theme: "dinosaurios",
  category: "adventure",

  hero: {
    headline: "¡Rugido de cumpleaños!",
    subheadline: "Prepárate para una aventura prehistórica",
    featuredIllustration: "/illustrations/dino-trex.svg",
  },

  intro: {
    celebrantHeadline: "TE INVITO A MI FIESTA",
    celebrantSubtitle: "{celebrantName}",
    celebrantTagline: "¡Ven a rugir con nosotros!",
    hintHeadline: "Se escucha el rugido de una nueva aventura",
    buttonLabel: "Abrir invitación",
    celebrateNameClass: "text-transparent bg-gradient-to-br from-[#6B9B6E] via-[#5A8A5D] to-[#4A7350] bg-clip-text drop-shadow-[2px_2px_4px_rgba(0,0,0,0.15)]",
  },

  defaultMessages: {
    invitationMessage:
      "Prepárate para viajar millones de años atrás. Habrá dinosaurios, aventuras y mucha diversión prehistórica. ¡Tu presencia hará rugir este día!",
    closingMessage: "¡Confirma tu asistencia y únete a la manada!",
  },
};
