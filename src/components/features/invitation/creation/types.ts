export type CreationStep = "template" | "event-info" | "images" | "preview";

export type TemplateOption = {
  id: string;
  name: string;
  theme: string;
  emoji: string;
  description: string;
  previewImage?: string;
};

export type CreationFormData = {
  templateId: string;
  celebrantName: string;
  age: number;
  eventDate: string;
  eventTime: string;
  venueAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  eventIncludes: string[];
  celebrantImages: (File | null)[];
  venueImage: File | null;
};

export type CreationFlowState = {
  currentStep: CreationStep;
  formData: Partial<CreationFormData>;
  isValid: boolean;
};
