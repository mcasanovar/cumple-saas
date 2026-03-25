import { ThemeConfig, ThemeToken } from "@/lib/types/invitation";

const kidsFont = '"Baloo 2", "Fredoka", "Comic Neue", sans-serif';
const princessFont = '"Waltograph", cursive';
const kpopFont = 'var(--font-kpop), "Kalam", cursive';

export const themes: Record<ThemeToken, ThemeConfig> = {
  safari: {
    name: "Safari Dreams",
    primaryGradient:
      "linear-gradient(135deg, #ffcb65 0%, #ff9a76 45%, #f56565 100%)",
    accentGradient: "linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)",
    accentColor: "#f97316",
    backgroundPattern:
      "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 35%), linear-gradient(180deg, #fff7e6 0%, #ffe0bf 100%)",
    floatingDecorations: [
      {
        id: "balloon-1",
        type: "balloon",
        color: "#fde68a",
        size: 140,
        oscillation: 18,
        position: { top: "18%", left: "12%" },
      },
      {
        id: "star-1",
        type: "star",
        color: "#facc15",
        size: 90,
        oscillation: 12,
        position: { top: "28%", left: "70%" },
      },
      {
        id: "cloud-1",
        type: "cloud",
        color: "rgba(255,255,255,0.85)",
        size: 220,
        oscillation: 22,
        blur: true,
        position: { top: "55%", left: "60%" },
      },
    ],
    typography: {
      heading: kidsFont,
      body: kidsFont,
    },
    introScene: {
      backgroundGradient:
        "radial-gradient(circle at 12% 18%, rgba(255, 241, 214, 0.95) 0%, rgba(255, 234, 210, 0.35) 45%), radial-gradient(circle at 88% 22%, rgba(255, 220, 234, 0.9) 0%, rgba(255, 220, 234, 0.25) 50%), linear-gradient(180deg, #fff4dd 0%, #ffe9ef 100%)",
      overlayGradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.55) 45%, rgba(255, 255, 255, 0.2) 100%)",
      textureOpacity: 0.4,
      frame: {
        borderGradient:
          "linear-gradient(135deg, rgba(255, 184, 108, 1) 0%, rgba(245, 183, 59, 1) 50%, rgba(240, 95, 87, 1) 100%)",
        fill: "linear-gradient(180deg, rgba(255,253,245,0.95) 0%, rgba(255,245,230,0.92) 100%)",
        highlight: "rgba(255, 255, 255, 0.65)",
        shadow: "rgba(249, 115, 22, 0.35)",
      },
      bannerColors: ["#ff6b6b", "#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#ffd166"],
      decorations: [
        {
          id: "streamer-left",
          type: "confetti",
          color: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
          size: 60,
          opacity: 0.7,
          position: { top: "16%", left: "22%" },
        },
        {
          id: "spark-right",
          type: "spark",
          color: "rgba(255, 196, 45, 0.85)",
          size: 36,
          position: { top: "62%", left: "78%" },
          blur: true,
        },
        {
          id: "confetti-bottom-left",
          type: "confetti",
          color: "rgba(255, 255, 255, 0.85)",
          size: 48,
          opacity: 0.6,
          position: { top: "70%", left: "12%" },
        },
      ],
      ambientBalloons: [
        {
          id: "ambient-left-1",
          color: "linear-gradient(180deg, #f97316 0%, #facc15 100%)",
          accentColor: "rgba(255, 255, 255, 0.4)",
          size: 180,
          position: { top: "10%", left: "-6%" },
          oscillation: 18,
        },
        {
          id: "ambient-left-2",
          color: "linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)",
          accentColor: "rgba(255,255,255,0.35)",
          size: 140,
          position: { top: "58%", left: "6%" },
          oscillation: 22,
          delay: 0.8,
        },
        {
          id: "ambient-right-1",
          color: "linear-gradient(180deg, #ef4444 0%, #ec4899 100%)",
          accentColor: "rgba(255,255,255,0.4)",
          size: 200,
          position: { top: "6%", left: "84%" },
          oscillation: 16,
          delay: 0.25,
        },
        {
          id: "ambient-right-2",
          color: "linear-gradient(180deg, #22d3ee 0%, #14b8a6 100%)",
          accentColor: "rgba(255,255,255,0.3)",
          size: 150,
          position: { top: "56%", left: "88%" },
          oscillation: 20,
          delay: 0.6,
        },
        {
          id: "ambient-bottom",
          color: "linear-gradient(180deg, #fbbf24 0%, #fb923c 100%)",
          accentColor: "rgba(255,255,255,0.35)",
          size: 160,
          position: { top: "78%", left: "24%" },
          oscillation: 24,
          delay: 1.1,
          opacity: 0.85,
        },
      ],
      balloonClusters: [
        {
          id: "cluster-left",
          position: { top: "18%", left: "8%" },
          opacity: 0.35,
          oscillation: 20,
          balloons: [
            {
              id: "cluster-left-pink",
              color: "linear-gradient(180deg, #ff5d8f 0%, #ff2d55 100%)",
              accentColor: "rgba(255,255,255,0.35)",
              offsetX: -18,
              offsetY: 0,
              size: 120,
            },
            {
              id: "cluster-left-yellow",
              color: "linear-gradient(180deg, #ffe066 0%, #ffb703 100%)",
              accentColor: "rgba(255,255,255,0.4)",
              offsetX: 18,
              offsetY: 12,
              size: 110,
            },
            {
              id: "cluster-left-blue",
              color: "linear-gradient(180deg, #3a86ff 0%, #4361ee 100%)",
              accentColor: "rgba(255,255,255,0.38)",
              offsetX: 2,
              offsetY: -26,
              size: 105,
            },
          ],
        },
        {
          id: "cluster-right",
          position: { top: "30%", left: "92%" },
          opacity: 0.32,
          oscillation: 18,
          delay: 0.4,
          balloons: [
            {
              id: "cluster-right-yellow",
              color: "linear-gradient(180deg, #ffd166 0%, #ff9f1c 100%)",
              accentColor: "rgba(255,255,255,0.4)",
              offsetX: -12,
              offsetY: 8,
              size: 125,
            },
            {
              id: "cluster-right-pink",
              color: "linear-gradient(180deg, #ff006e 0%, #f72585 100%)",
              accentColor: "rgba(255,255,255,0.35)",
              offsetX: 24,
              offsetY: 16,
              size: 115,
            },
            {
              id: "cluster-right-blue",
              color: "linear-gradient(180deg, #2196f3 0%, #1976d2 100%)",
              accentColor: "rgba(255,255,255,0.36)",
              offsetX: 8,
              offsetY: -24,
              size: 108,
            },
          ],
        },
        {
          id: "cluster-back",
          position: { top: "72%", left: "50%" },
          opacity: 0.28,
          oscillation: 24,
          delay: 0.7,
          balloons: [
            {
              id: "cluster-back-blue",
              color: "linear-gradient(180deg, #4cc9f0 0%, #4895ef 100%)",
              accentColor: "rgba(255,255,255,0.38)",
              offsetX: -28,
              offsetY: -12,
              size: 140,
            },
            {
              id: "cluster-back-yellow",
              color: "linear-gradient(180deg, #ffe066 0%, #ffd166 100%)",
              accentColor: "rgba(255,255,255,0.42)",
              offsetX: 12,
              offsetY: 0,
              size: 130,
            },
            {
              id: "cluster-back-pink",
              color: "linear-gradient(180deg, #ff4d6d 0%, #d81159 100%)",
              accentColor: "rgba(255,255,255,0.34)",
              offsetX: 36,
              offsetY: 18,
              size: 120,
            },
          ],
        },
      ],
      monogram: {
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(255, 236, 204, 0.9) 100%)",
        textColor: "#f97316",
        shadow: "0 18px 60px rgba(249, 115, 22, 0.25)",
      },
      hint: {
        headlineColor: "rgba(90, 65, 35, 0.75)",
        secondaryColor: "rgba(90, 65, 35, 0.6)",
        button: {
          background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
          textColor: "#fffbea",
          shadow: "0 22px 48px rgba(239, 68, 68, 0.35)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
        },
      },
    },
  },
  princesa: {
    name: "Reino Encantado",
    primaryGradient:
      "linear-gradient(135deg, #FF1493 0%, #FF69B4 45%, #FFB6D9 100%)",
    accentGradient: "linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)",
    accentColor: "#FF1493",
    backgroundPattern:
      "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 45%), radial-gradient(circle at 80% 85%, rgba(255,182,217,0.15) 0%, rgba(255,182,217,0) 50%), linear-gradient(180deg, #FFF0F5 0%, #FFE8F0 100%)",
    floatingDecorations: [],
    introScene: {
      backgroundGradient:
        "radial-gradient(circle at 30% 20%, rgba(255, 240, 245, 0.8) 0%, rgba(255, 240, 245, 0.4) 50%), radial-gradient(circle at 70% 80%, rgba(255, 182, 217, 0.2) 0%, rgba(255, 182, 217, 0) 50%), linear-gradient(180deg, #FFF0F5 0%, #FFE8F0 50%, #FFD4EC 100%)",
      overlayGradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 240, 245, 0.5) 50%, rgba(255, 228, 240, 0.3) 100%)",
      textureOpacity: 0.15,
      frame: {
        borderGradient:
          "linear-gradient(135deg, rgba(255, 20, 147, 0.3) 0%, rgba(255, 105, 180, 0.3) 50%, rgba(255, 182, 217, 0.3) 100%)",
        fill: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(255,240,245,0.95) 100%)",
        highlight: "rgba(255, 255, 255, 0.8)",
        shadow: "rgba(255, 20, 147, 0.15)",
      },
      bannerColors: ["#FF1493", "#FF69B4", "#FFB6D9", "#F4D03F", "#FFD4EC", "#F7DC6F"],
      decorations: [],
      ambientBalloons: [],
      balloonClusters: [],
      monogram: {
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 240, 245, 0.95) 100%)",
        textColor: "#FF1493",
        shadow: "0 18px 60px rgba(255, 20, 147, 0.2)",
      },
      hint: {
        headlineColor: "rgba(255, 20, 147, 0.95)",
        secondaryColor: "rgba(255, 105, 180, 0.85)",
        button: {
          background: "linear-gradient(135deg, #FF1493 0%, #FF69B4 100%)",
          textColor: "#FFFFFF",
          shadow: "0 22px 48px rgba(255, 20, 147, 0.35)",
          border: "1px solid rgba(255, 20, 147, 0.2)",
        },
      },
    },
    typography: {
      heading: princessFont,
      body: princessFont,
    },
  },
  dinosaurios: {
    name: "Valle Jurásico",
    primaryGradient:
      "linear-gradient(135deg, #6B9B6E 0%, #5A8A5D 45%, #4A7350 100%)",
    accentGradient: "linear-gradient(135deg, #7CAA7F 0%, #6B9B6E 100%)",
    accentColor: "#6B9B6E",
    backgroundPattern:
      "radial-gradient(circle at 15% 25%, rgba(200,196,188,0.15) 0%, rgba(200,196,188,0) 45%), linear-gradient(180deg, #F5F1E8 0%, #E8DCC8 100%)",
    floatingDecorations: [],
    introScene: {
      backgroundGradient:
        "radial-gradient(circle at 30% 20%, rgba(124, 170, 127, 0.3) 0%, rgba(107, 155, 110, 0.15) 50%), radial-gradient(circle at 70% 80%, rgba(90, 138, 93, 0.25) 0%, rgba(74, 115, 80, 0.1) 50%), linear-gradient(180deg, #A8D5A8 0%, #8BC48B 50%, #7AB87A 100%)",
      overlayGradient:
        "linear-gradient(135deg, rgba(168, 213, 168, 0.4) 0%, rgba(139, 196, 139, 0.3) 50%, rgba(122, 184, 122, 0.2) 100%)",
      textureOpacity: 0.15,
      frame: {
        borderGradient:
          "linear-gradient(135deg, rgba(107, 155, 110, 1) 0%, rgba(90, 138, 93, 1) 50%, rgba(74, 115, 80, 1) 100%)",
        fill: "linear-gradient(180deg, rgba(245,241,232,0.98) 0%, rgba(232,220,200,0.95) 100%)",
        highlight: "rgba(255, 255, 255, 0.5)",
        shadow: "rgba(107, 155, 110, 0.3)",
      },
      bannerColors: ["#FFD700", "#2D3D2D", "#6B9B6E", "#5A8A5D", "#4A7350", "#7CAA7F"],
      decorations: [],
      ambientBalloons: [],
      balloonClusters: [],
      monogram: {
        background:
          "linear-gradient(135deg, rgba(245, 241, 232, 0.95) 0%, rgba(232, 220, 200, 0.92) 100%)",
        textColor: "#2D3D2D",
        shadow: "0 18px 60px rgba(45, 61, 45, 0.25)",
      },
      hint: {
        headlineColor: "rgba(45, 61, 45, 0.95)",
        secondaryColor: "rgba(74, 115, 80, 0.85)",
        button: {
          background: "linear-gradient(135deg, #5A8A5D 0%, #4A7350 100%)",
          textColor: "#F5F1E8",
          shadow: "0 22px 48px rgba(74, 115, 80, 0.4)",
          border: "1px solid rgba(45, 61, 45, 0.3)",
        },
      },
    },
    typography: {
      heading: kidsFont,
      body: kidsFont,
    },
  },
  ositos: {
    name: "Abrazo de Ositos",
    primaryGradient:
      "linear-gradient(135deg, #fde68a 0%, #fbbf24 50%, #fb923c 100%)",
    accentGradient: "linear-gradient(135deg, #f97316 0%, #fb7185 100%)",
    accentColor: "#f97316",
    backgroundPattern:
      "radial-gradient(circle at 10% 10%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%), linear-gradient(180deg, #fff4d4 0%, #ffe0c3 100%)",
    floatingDecorations: [
      {
        id: "balloon-1",
        type: "balloon",
        color: "#fef3c7",
        size: 150,
        oscillation: 16,
        position: { top: "30%", left: "18%" },
      },
      {
        id: "star-1",
        type: "star",
        color: "rgba(255,255,255,0.95)",
        size: 90,
        oscillation: 12,
        position: { top: "22%", left: "66%" },
      },
      {
        id: "cloud-1",
        type: "cloud",
        color: "rgba(240,229,216,0.9)",
        size: 230,
        oscillation: 20,
        blur: true,
        position: { top: "64%", left: "50%" },
      },
    ],
    typography: {
      heading: kidsFont,
      body: kidsFont,
    },
  },
  cielo: {
    name: "Cielos Mágicos",
    primaryGradient:
      "linear-gradient(135deg, #93c5fd 0%, #a5f3fc 45%, #c4b5fd 100%)",
    accentGradient: "linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)",
    accentColor: "#60a5fa",
    backgroundPattern:
      "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%), linear-gradient(180deg, #f0f9ff 0%, #e0e7ff 100%)",
    floatingDecorations: [
      {
        id: "cloud-1",
        type: "cloud",
        color: "rgba(255,255,255,0.9)",
        size: 260,
        oscillation: 18,
        blur: true,
        position: { top: "58%", left: "46%" },
      },
      {
        id: "star-1",
        type: "star",
        color: "#fef9c3",
        size: 100,
        oscillation: 14,
        position: { top: "26%", left: "24%" },
      },
      {
        id: "balloon-1",
        type: "balloon",
        color: "#bfdbfe",
        size: 140,
        oscillation: 20,
        position: { top: "34%", left: "70%" },
      },
    ],
    typography: {
      heading: kidsFont,
      body: kidsFont,
    },
  },
  bosque: {
    name: "Bosque Encantado",
    primaryGradient:
      "linear-gradient(135deg, #86efac 0%, #4ade80 45%, #2dd4bf 100%)",
    accentGradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
    accentColor: "#22c55e",
    backgroundPattern:
      "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 40%), linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%)",
    floatingDecorations: [
      {
        id: "shape-1",
        type: "shape",
        color: "rgba(52,211,153,0.35)",
        size: 160,
        oscillation: 18,
        position: { top: "22%", left: "60%" },
      },
      {
        id: "star-1",
        type: "star",
        color: "rgba(255,255,255,0.85)",
        size: 100,
        oscillation: 12,
        position: { top: "28%", left: "26%" },
      },
      {
        id: "cloud-1",
        type: "cloud",
        color: "rgba(236,253,245,0.95)",
        size: 240,
        oscillation: 24,
        blur: true,
        position: { top: "66%", left: "48%" },
      },
    ],
    typography: {
      heading: kidsFont,
      body: kidsFont,
    },
  },
  "k-pop": {
    name: "K-Pop Stars",
    primaryGradient:
      "linear-gradient(135deg, #FF1493 0%, #DA70D6 45%, #9370DB 100%)",
    accentGradient: "linear-gradient(135deg, #FF69B4 0%, #BA55D3 100%)",
    accentColor: "#FF1493",
    backgroundPattern:
      "radial-gradient(circle at 25% 15%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 45%), radial-gradient(circle at 75% 85%, rgba(255,20,147,0.15) 0%, rgba(255,20,147,0) 50%), linear-gradient(180deg, #FFE4E6 0%, #FECDD3 50%, #FBB6CE 100%)",
    floatingDecorations: [
      {
        id: "star-1",
        type: "star",
        color: "#FFD700",
        size: 120,
        oscillation: 15,
        position: { top: "20%", left: "15%" },
      },
      {
        id: "star-2",
        type: "star",
        color: "#FF69B4",
        size: 90,
        oscillation: 12,
        position: { top: "35%", left: "75%" },
      },
      {
        id: "balloon-1",
        type: "balloon",
        color: "#DA70D6",
        size: 140,
        oscillation: 18,
        position: { top: "60%", left: "20%" },
      },
    ],
    introScene: {
      backgroundGradient:
        "radial-gradient(circle at 30% 20%, rgba(255, 20, 147, 0.3) 0%, rgba(218, 112, 214, 0.2) 50%), radial-gradient(circle at 70% 80%, rgba(147, 112, 219, 0.25) 0%, rgba(147, 112, 219, 0.1) 50%), linear-gradient(180deg, #FFE4E6 0%, #FECDD3 50%, #FBB6CE 100%)",
      overlayGradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 228, 230, 0.4) 50%, rgba(251, 182, 206, 0.3) 100%)",
      textureOpacity: 0.2,
      frame: {
        borderGradient:
          "linear-gradient(135deg, rgba(255, 20, 147, 0.8) 0%, rgba(218, 112, 214, 0.8) 50%, rgba(147, 112, 219, 0.8) 100%)",
        fill: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,228,230,0.92) 100%)",
        highlight: "rgba(255, 255, 255, 0.7)",
        shadow: "rgba(255, 20, 147, 0.25)",
      },
      bannerColors: ["#FF1493", "#FF69B4", "#DA70D6", "#9370DB", "#FFD700", "#FFF"],
      decorations: [
        {
          id: "disco-ball",
          type: "star",
          color: "linear-gradient(45deg, #C0C0C0 0%, #FFD700 50%, #C0C0C0 100%)",
          size: 80,
          opacity: 0.9,
          position: { top: "25%", left: "50%" },
          blur: false,
        },
        {
          id: "glitter-left",
          type: "spark",
          color: "rgba(255, 215, 0, 0.8)",
          size: 40,
          position: { top: "40%", left: "25%" },
          blur: true,
        },
        {
          id: "glitter-right",
          type: "spark",
          color: "rgba(255, 105, 180, 0.8)",
          size: 45,
          position: { top: "55%", left: "70%" },
          blur: true,
        },
      ],
      ambientBalloons: [
        {
          id: "ambient-pink-1",
          color: "linear-gradient(180deg, #FF1493 0%, #FF69B4 100%)",
          accentColor: "rgba(255, 255, 255, 0.4)",
          size: 160,
          position: { top: "15%", left: "-5%" },
          oscillation: 16,
        },
        {
          id: "ambient-purple-1",
          color: "linear-gradient(180deg, #DA70D6 0%, #9370DB 100%)",
          accentColor: "rgba(255, 255, 255, 0.35)",
          size: 180,
          position: { top: "8%", left: "85%" },
          oscillation: 18,
          delay: 0.3,
        },
        {
          id: "ambient-gold-1",
          color: "linear-gradient(180deg, #FFD700 0%, #FFA500 100%)",
          accentColor: "rgba(255, 255, 255, 0.5)",
          size: 140,
          position: { top: "65%", left: "90%" },
          oscillation: 20,
          delay: 0.6,
        },
      ],
      balloonClusters: [],
      monogram: {
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 228, 230, 0.92) 100%)",
        textColor: "#FF1493",
        shadow: "0 18px 60px rgba(255, 20, 147, 0.3)",
      },
      hint: {
        headlineColor: "rgba(255, 20, 147, 0.9)",
        secondaryColor: "rgba(218, 112, 214, 0.8)",
        button: {
          background: "linear-gradient(135deg, #FF1493 0%, #DA70D6 100%)",
          textColor: "#FFFFFF",
          shadow: "0 22px 48px rgba(255, 20, 147, 0.4)",
          border: "1px solid rgba(255, 20, 147, 0.3)",
        },
      },
    },
    typography: {
      heading: kpopFont,
      body: kpopFont,
    },
  },
};
