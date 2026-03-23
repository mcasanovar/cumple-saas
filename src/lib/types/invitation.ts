export type ThemeToken =
  | "safari"
  | "princesa"
  | "dinosaurios"
  | "ositos"
  | "cielo"
  | "bosque";

export interface ThemeConfig {
  name: string;
  primaryGradient: string;
  accentGradient: string;
  accentColor: string;
  backgroundPattern: string;
  floatingDecorations: Array<{
    id: string;
    type: "balloon" | "star" | "cloud" | "animal" | "shape";
    color: string;
    size: number;
    oscillation: number;
    blur?: boolean;
    position: {
      top: string;
      left: string;
    };
  }>;
  typography: {
    heading: string;
    body: string;
  };
  introScene?: IntroSceneConfig;
}

export interface IntroSceneConfig {
  backgroundGradient: string;
  overlayGradient: string;
  textureOpacity: number;
  frame: {
    borderGradient: string;
    fill: string;
    highlight: string;
    shadow: string;
  };
  decorations: Array<{
    id: string;
    type: "balloon" | "confetti" | "star" | "streamer" | "spark";
    color: string;
    size: number;
    opacity?: number;
    blur?: boolean;
    position: {
      top: string;
      left: string;
    };
    rotation?: number;
  }>;
  bannerColors?: string[];
  ambientBalloons?: IntroAmbientBalloon[];
  balloonClusters?: IntroBalloonCluster[];
  monogram: {
    background: string;
    textColor: string;
    shadow: string;
  };
  hint: {
    headlineColor: string;
    secondaryColor: string;
    button: {
      background: string;
      textColor: string;
      shadow: string;
      border?: string;
    };
  };
}

export interface IntroAmbientBalloon {
  id: string;
  color: string;
  accentColor?: string;
  size: number;
  position: {
    top: string;
    left: string;
  };
  oscillation?: number;
  delay?: number;
  opacity?: number;
}

export interface IntroBalloonCluster {
  id: string;
  balloons: Array<{
    id: string;
    color: string;
    accentColor?: string;
    offsetX: number;
    offsetY: number;
    size: number;
  }>;
  position: {
    top: string;
    left: string;
  };
  opacity?: number;
  oscillation?: number;
  delay?: number;
}

export interface InvitationEventInfo {
  celebrantName: string;
  age: number;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  venueImageUrl?: string;
  celebrantDescription?: string;
  invitationMessage: string;
  closingMessage: string;
}

export interface InvitationGalleryItem {
  id: string;
  caption: string;
  imageUrl: string;
}

export interface InvitationConfig {
  slug: string;
  theme: ThemeToken;
  metaTitle: string;
  metaDescription: string;
  hero: {
    headline: string;
    subheadline: string;
    featuredIllustration: string;
  };
  event: InvitationEventInfo;
  gallery: InvitationGalleryItem[];
  countdown: {
    targetDateISO: string;
  };
  intro?: InvitationIntroCopy;
}

export interface InvitationIntroCopy {
  celebrantHeadline: string;
  celebrantSubtitle: string;
  celebrantTagline: string;
  hintHeadline: string;
  buttonLabel: string;
  celebrateNameClass: string;
  detailLeft?: {
    title: string;
    subtitle: string;
    helper?: string;
  };
  detailRight?: {
    title: string;
    subtitle: string;
    helper?: string;
  };
}

export interface RSVPSubmission {
  slug: string;
  name: string;
  email: string;
  guests: number;
  message?: string;
  respondedAt: string;
}

export type RSVPActionState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export interface InvitationRenderConfig {
  invitationId: string;
  templateId: string;
  slug: string;
  theme: ThemeToken;
  metaTitle: string;
  metaDescription: string;
  hero: {
    headline: string;
    subheadline: string;
    featuredIllustration: string;
  };
  event: InvitationEventInfo;
  gallery: InvitationGalleryItem[];
  countdown: {
    targetDateISO: string;
  };
  intro: InvitationIntroCopy;
}
