import type { TemplateDefinition } from "@/lib/types/template";

export const princessPartyTemplate: TemplateDefinition = {
  id: "princess-dreams",
  name: "Princess Party",
  description: "Un reino mágico lleno de encanto, coronas doradas y sueños de princesa",
  theme: "princesa",
  category: "fantasy",

  hero: {
    headline: "¡Un reino de ensueño!",
    subheadline: "Prepárate para una celebración digna de la realeza",
    featuredIllustration: "/illustrations/princess-castle.svg",
  },

  intro: {
    celebrantHeadline: "TE INVITO A MI FIESTA",
    celebrantSubtitle: "{celebrantName}",
    celebrantTagline: "¡Ven a celebrar en mi reino encantado!",
    hintHeadline: "El reino está en fiesta. ¡Vamos a celebrar!",
    buttonLabel: "Abrir invitación",
    celebrateNameClass: "font-[family-name:var(--font-script)] text-transparent bg-gradient-to-br from-[#FF1493] via-[#FF69B4] to-[#FFB6D9] bg-clip-text drop-shadow-[2px_2px_8px_rgba(255,20,147,0.3)] text-7xl md:text-8xl tracking-wide",
  },

  defaultMessages: {
    invitationMessage:
      "Prepárate para una fiesta mágica llena de princesas, coronas doradas y momentos encantadores. Tu presencia hará brillar aún más este día especial en nuestro reino.",
    closingMessage: "¡Confirma tu asistencia y únete a la celebración real!",
  },
};
