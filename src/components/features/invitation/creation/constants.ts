import type { TemplateOption } from "./types";

export const AVAILABLE_TEMPLATES: TemplateOption[] = [
  {
    id: "safari-adventure",
    name: "Safari Adventure",
    theme: "safari",
    emoji: "🦁",
    description: "Una aventura salvaje llena de animales y diversión",
  },
  {
    id: "princess-dreams",
    name: "Princess Dreams",
    theme: "princess",
    emoji: "👑",
    description: "Un reino mágico de princesas y castillos",
  },
  {
    id: "dino-party",
    name: "Dino Party",
    theme: "dinosaur",
    emoji: "🦖",
    description: "Viaja al pasado con dinosaurios gigantes",
  },
  {
    id: "space-explorer",
    name: "Space Explorer",
    theme: "space",
    emoji: "🚀",
    description: "Explora el universo en una aventura espacial",
  },
  {
    id: "unicorn-magic",
    name: "Unicorn Magic",
    theme: "unicorn",
    emoji: "🦄",
    description: "Un mundo mágico de unicornios y arcoíris",
  },
];

export const CREATION_STEPS = [
  { id: "template", label: "Plantilla", number: 1 },
  { id: "event-info", label: "Información", number: 2 },
  { id: "images", label: "Imágenes", number: 3 },
] as const;

export const PRICE_CLP = 5990;
