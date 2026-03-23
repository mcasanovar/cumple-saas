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
  },
  {
    id: "dino-party" as TemplateId,
    name: "Dino Party",
    theme: "dinosaurios",
    emoji: "🦖",
    description: "Viaja al pasado con dinosaurios gigantes",
  },
  {
    id: "space-explorer" as TemplateId,
    name: "Space Explorer",
    theme: "cielo",
    emoji: "🚀",
    description: "Explora el universo en una aventura espacial",
  },
  {
    id: "unicorn-magic" as TemplateId,
    name: "Unicorn Magic",
    theme: "bosque",
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
