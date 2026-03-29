import type { ThemeToken } from "./invitation";

export type TemplateId =
  | "safari-adventure"
  | "princess-dreams"
  | "dino-party"
  | "space-explorer"
  | "unicorn-magic"
  | "k-pop";

export type TemplateCategory = "animals" | "fantasy" | "adventure" | "space" | "music";

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  description: string;
  theme: ThemeToken;
  category: TemplateCategory;
  hero: {
    headline: string;
    subheadline: string;
    featuredIllustration: string;
  };
  intro: {
    celebrantHeadline: string;
    celebrantSubtitle: string;
    celebrantTagline: string;
    hintHeadline: string;
    buttonLabel: string;
    celebrateNameClass: string;
  };
  defaultMessages: {
    invitationMessage: string;
    closingMessage: string;
  };
}

export interface UserInvitationData {
  id: string; // UUID v4 para seguridad (ej: "550e8400-e29b-41d4-a716-446655440000")
  userId: string;
  templateId: TemplateId;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  celebrantName: string;
  age: number;
  date: string;
  time: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  celebrantDescription: string;
  venueImage?: string;
  gallery: Array<{
    id: string;
    imageUrl: string;
    caption: string;
  }>;
  eventIncludes?: Array<{
    description: string;
    icon: string;
  }>;
  targetDateISO: string;
  introOverrides?: {
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
  };
  createdAt: string;
  updatedAt: string;
}
