export type CreationStep = "template" | "event-info" | "images" | "preview";

export type TemplateOption = {
  id: string;
  name: string;
  theme: string;
  emoji: string;
  description: string;
  previewImage?: string;
};

export type EventIncludeItem = {
  description: string;
  icon: string;
};

export type CreationFormData = {
  templateId: string;
  celebrantName: string;
  age: number;
  celebrantDescription: string;

  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  eventIncludes: EventIncludeItem[];

  customTexts: {
    introHeadline?: string;
    introButton?: string;
    detailLeftTitle?: string;
    detailRightTitle?: string;
  };

  celebrantImages: (string | null)[];
  venueImage: string | null;
};

export type CreationFlowState = {
  currentStep: CreationStep;
  formData: Partial<CreationFormData>;
  isValid: boolean;
};
export type InvitationInitialData = {
  id: string;
  currentStep: CreationStep;
  formData: Partial<CreationFormData>;
};
