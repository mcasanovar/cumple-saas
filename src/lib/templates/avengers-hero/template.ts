import type { TemplateDefinition } from "@/lib/types/template";

export const avengersHeroTemplate: TemplateDefinition = {
  id: "avengers-hero",
  name: "Avengers Hero",
  description: "Una celebración épica digna de los héroes más poderosos del planeta",
  theme: "avengers",
  category: "adventure",

  hero: {
    headline: "¡ESTÁS INVITADO!",
    subheadline: "A LA FIESTA DE CUMPLEAÑOS MÁS ÉPICA",
    featuredIllustration: "/illustrations/avengers-logo.svg",
  },

  intro: {
    celebrantHeadline: "¡ESTÁS INVITADO!",
    celebrantSubtitle: "A LA FIESTA DE CUMPLEAÑOS MÁS ÉPICA",
    celebrantTagline: "CELEBRACIÓN HEROICA",
    hintHeadline: "AVENGERS",
    buttonLabel: "VER INVITACIÓN",
    celebrateNameClass: "text-[#fbc02d] drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)]",
  },

  defaultMessages: {
    invitationMessage:
      "¡Héroes unidos! Prepárate para una misión especial. Tu presencia es necesaria para salvar el día y celebrar en grande.",
    closingMessage: "¡Nos vemos pronto en la base secreta para la celebracion!",
  },
};
