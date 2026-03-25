import type { TemplateDefinition } from "@/lib/types/template";

export const kPopTemplate: TemplateDefinition = {
  id: "k-pop",
  name: "K-Pop Stars",
  description: "Una celebración llena de música, brillo y estrellas al estilo K-pop",
  theme: "k-pop",
  category: "music",

  hero: {
    headline: "¡Brilla como una estrella!",
    subheadline: "Prepárate para una fiesta llena de música y diversión",
    featuredIllustration: "/illustrations/k-pop-stars.svg",
  },

  intro: {
    celebrantHeadline: "TE INVITO A MI FIESTA",
    celebrantSubtitle: "{celebrantName}",
    celebrantTagline: "¡Ven a brillar conmigo!",
    hintHeadline: "La música está sonando. ¡Es hora de celebrar!",
    buttonLabel: "Abrir invitación",
    celebrateNameClass: "font-[family-name:var(--font-script)] text-transparent bg-gradient-to-br from-[#FF1493] via-[#DA70D6] to-[#9370DB] bg-clip-text drop-shadow-[2px_2px_8px_rgba(255,20,147,0.4)] text-7xl md:text-8xl tracking-wide",
  },

  defaultMessages: {
    invitationMessage:
      "Prepárate para una fiesta llena de música, baile y momentos brillantes. Vamos a celebrar como verdaderas estrellas K-pop con mucha diversión y alegría.",
    closingMessage: "¡Confirma tu asistencia y únete a la celebración estelar!",
  },
};
