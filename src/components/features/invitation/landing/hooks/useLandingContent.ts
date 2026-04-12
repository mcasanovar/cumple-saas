import { useMemo } from "react";

import type {
  IntroSceneConfig,
  InvitationConfig,
  InvitationGalleryItem,
  ThemeConfig,
  ThemeToken,
  EventFeature,
} from "@/lib/types/invitation";
import { getDateComponents } from "@/utils/date";

const FALLBACK_SCENE: IntroSceneConfig = {
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

export type LandingHighlight = {
  icon: string;
  label: string;
  value: string;
  helper?: string;
};

export type LandingFeature = {
  title: string;
  description: string;
  icon: string;
  color: string;
};

export type LandingContent = {
  scene: IntroSceneConfig;
  heroTopLine: string;
  heroNameLine: string;
  heroNameLineClass: string;
  badgeLabel: string;
  detailHighlights: LandingHighlight[];
  celebrantDescription: string;
  celebrantName: string;
  celebrantAge: number;
  galleryItems: InvitationGalleryItem[];
  featureList: LandingFeature[];
  closingMessage: string;
  heroSubheadline: string;
  typography: ThemeConfig["typography"];
  themeToken?: ThemeToken;
  venue: {
    name: string;
    address: string;
    showMap: boolean;
    imageUrl?: string;
    coordinates?: InvitationConfig["event"]["coordinates"];
    mapsUrl?: string;
  };
};

export function useLandingContent(invitation: InvitationConfig, theme: ThemeConfig): LandingContent {
  return useMemo(() => {
    const { event, hero, gallery, intro, countdown, features } = invitation;

    const scene = theme.introScene ?? FALLBACK_SCENE;

    const dateComponents = getDateComponents(countdown?.targetDateISO || event.date);

    const weekdayLabel = dateComponents?.weekday ?? "";
    const dayNumber = dateComponents?.day ?? "";
    const monthLabel = dateComponents?.monthShort ?? "";
    const yearLabel = dateComponents?.year ?? "";

    const heroTopLine = hero.headline.includes(event.celebrantName)
      ? hero.headline.replace(event.celebrantName, "").trim() || hero.headline
      : hero.headline;

    const detailHighlights: LandingHighlight[] = [
      {
        icon: "📅",
        label: weekdayLabel,
        value: `${dayNumber} ${monthLabel}`.trim(),
        helper: yearLabel,
      },
      {
        icon: "⏰",
        label: "HORA",
        value: event.time?.toUpperCase() ?? "",
        helper: "¡Puntualitos!",
      },
      {
        icon: "📍",
        label: "LUGAR",
        value: event.venueName,
        helper: event.venueAddress,
      },
    ];

    const featureList: LandingFeature[] = features && features.length > 0
      ? features.map(feature => ({
        title: feature.title,
        description: feature.description,
        icon: feature.icon,
        color: feature.color,
      }))
      : [
        {
          title: "Cóctel & Snacks",
          description: "Bocadillos deliciosos para todos",
          icon: "🥐",
          color: "#ff6b3d",
        },
        {
          title: "Barra Libre",
          description: "Porque los papás también celebran",
          icon: "🍹",
          color: "#2f6bff",
        },
        {
          title: "Inflables & Juegos",
          description: "Diversión sin límites para los peques",
          icon: "🎠",
          color: "#ff6b3d",
        },
        {
          title: "Show en Vivo",
          description: "Animación y personajes increíbles",
          icon: "🎤",
          color: "#2f6bff",
        },
        {
          title: "Mesa de Dulces",
          description: "12 sabores esperándote",
          icon: "🍭",
          color: "#2f6bff",
        },
        {
          title: "La Gran Piñata",
          description: "¡El momento que todos esperan!",
          icon: "🎉",
          color: "#ff6b3d",
        },
      ];

    return {
      scene,
      heroTopLine,
      heroNameLine: `${event.celebrantName}!`,
      heroNameLineClass: intro?.celebrateNameClass ?? "",
      badgeLabel: intro?.hintHeadline?.toUpperCase() ?? "¡ESTÁS INVITADO!",
      detailHighlights,
      celebrantDescription: event.celebrantDescription ?? event.invitationMessage,
      celebrantName: event.celebrantName,
      celebrantAge: event.age,
      galleryItems: gallery.slice(0, 3),
      featureList,
      closingMessage: event.closingMessage,
      heroSubheadline: hero.subheadline,
      typography: theme.typography,
      themeToken: invitation.theme,
      venue: {
        name: event.venueName,
        address: event.venueAddress,
        showMap: event.showMap ?? true,
        imageUrl: event.venueImageUrl,
        coordinates: event.coordinates,
        mapsUrl: event.googleMapsUrl,
      },
    };
  }, [invitation, theme]);
}
