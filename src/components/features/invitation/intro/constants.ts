import type { IntroSceneConfig } from "@/lib/types/invitation";

export const easeOutQuart = [0.16, 1, 0.3, 1] as const;

export const eyeSeeds = [341, 911] as const;

export const FALLBACK_INTRO_SCENE: IntroSceneConfig = {
  backgroundGradient:
    "radial-gradient(circle at 15% 20%, rgba(255, 230, 244, 0.95) 0%, rgba(255, 240, 250, 0.25) 45%), radial-gradient(circle at 85% 10%, rgba(255, 252, 213, 0.8) 0%, rgba(255, 240, 230, 0.2) 55%), linear-gradient(180deg, #ffe9f6 0%, #fff8fc 100%)",
  overlayGradient:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 35%, rgba(255, 255, 255, 0.35) 100%)",
  textureOpacity: 0.45,
  frame: {
    borderGradient: "linear-gradient(135deg, #fde68a 0%, #f97316 100%)",
    fill: "rgba(255, 248, 235, 0.85)",
    highlight: "rgba(255, 255, 255, 0.65)",
    shadow: "rgba(253, 186, 116, 0.45)",
  },
  decorations: [],
  monogram: {
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 235, 213, 0.85) 100%)",
    textColor: "#f97316",
    shadow: "0 18px 60px rgba(249, 115, 22, 0.22)",
  },
  hint: {
    headlineColor: "rgba(30, 41, 59, 0.8)",
    secondaryColor: "rgba(30, 41, 59, 0.6)",
    button: {
      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
      textColor: "#fff",
      shadow: "0 20px 45px rgba(124, 58, 237, 0.35)",
      border: "1px solid rgba(255, 255, 255, 0.45)",
    },
  },
  ambientBalloons: [],
  balloonClusters: [],
};
