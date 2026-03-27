import type { TemplateId } from "@/lib/types/template";

import type { TemplateOption } from "./types";

export const AVAILABLE_TEMPLATES: TemplateOption[] = [
  {
    id: "safari-adventure" as TemplateId,
    name: "Safari Adventure",
    theme: "safari",
    emoji: "🦁",
    description: "Una aventura salvaje llena de animales y diversión",
  },
  {
    id: "princess-dreams" as TemplateId,
    name: "Princess Dreams",
    theme: "princesa",
    emoji: "👑",
    description: "Un reino mágico de princesas y castillos",
    previewImage: "/elsa-frozen.png",
  },
  {
    id: "dino-party" as TemplateId,
    name: "Dino Party",
    theme: "dinosaurios",
    emoji: "🦖",
    description: "Viaja al pasado con dinosaurios gigantes",
  },
  {
    id: "k-pop" as TemplateId,
    name: "K-Pop Stars",
    theme: "k-pop",
    emoji: "🎤",
    description: "Para la próxima gran estrella de la música",
    previewImage: "/k-pop.png",
  },
];

export const CREATION_STEPS = [
  { id: "template", label: "Plantilla", number: 1 },
  { id: "event-info", label: "Información", number: 2 },
  { id: "images", label: "Imágenes", number: 3 },
] as const;

export const PRICE_CLP = 5990;

export const ALLOWED_IMAGE_FORMATS = [".jpeg", ".jpg", ".png"] as const;
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"] as const;
export const ACCEPTED_IMAGE_TYPES = ".jpeg,.jpg,.png";

export const EVENT_ICONS = [
  "🎭", "🎪", "🎨", "🎵", "🎤", "🎸", "🎹", "🥁", "🎺", "🎷",
  "🎯", "🎲", "🎳", "🎮", "🕹️", "🎰", "🧩", "🎭", "🎪", "🎨",
  "🍕", "🍔", "🍟", "🌭", "🥤", "🧃", "🍬", "🍭", "🧁", "🍰",
  "🎂", "🎈", "🎉", "🎊", "🎁", "🎀", "🏆", "🥇", "👑", "⭐",
  "🌟", "✨", "💫", "🎆", "🎇", "🎃", "🎄", "🎅", "🤡", "🦸",
  "🦹", "🧸", "🎠", "🎡", "🎢", "🎪", "🎭", "🎨", "🎪", "🎭"
] as const;
