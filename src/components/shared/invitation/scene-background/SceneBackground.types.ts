import type { IntroSceneConfig } from "@/lib/types/invitation";

export type SceneBackgroundProps = {
  scene: IntroSceneConfig;
  confettiPalette?: readonly string[];
  textureUrl?: string;
  showConfettiDots?: boolean;
  showBaseBackground?: boolean;
  showOverlay?: boolean;
  showTexture?: boolean;
  showDecorations?: boolean;
  showBalloonClusters?: boolean;
  showAmbientBalloons?: boolean;
};
