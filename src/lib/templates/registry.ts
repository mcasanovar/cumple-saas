import type { TemplateDefinition, TemplateId, TemplateCategory } from "@/lib/types/template";

import { dinoPartyTemplate } from "./dino-party/template";
import { kPopTemplate } from "./k-pop/template";
import { princessPartyTemplate } from "./princess-party/template";
import { safariAdventureTemplate } from "./safari-adventure/template";

const TEMPLATE_REGISTRY: Record<TemplateId, TemplateDefinition | null> = {
  "safari-adventure": safariAdventureTemplate,
  "princess-dreams": princessPartyTemplate,
  "dino-party": dinoPartyTemplate,
  "space-explorer": null,
  "unicorn-magic": null,
  "k-pop": kPopTemplate,
};

export function getTemplateById(id: TemplateId): TemplateDefinition {
  const template = TEMPLATE_REGISTRY[id];
  if (!template) {
    throw new Error(`Template "${id}" not found or not yet implemented`);
  }
  return template;
}

export function getAllTemplates(): TemplateDefinition[] {
  return Object.values(TEMPLATE_REGISTRY).filter(
    (template): template is TemplateDefinition => template !== null
  );
}

export function getTemplatesByCategory(
  category: TemplateCategory
): TemplateDefinition[] {
  return getAllTemplates().filter((template) => template.category === category);
}

export function isTemplateAvailable(id: TemplateId): boolean {
  return TEMPLATE_REGISTRY[id] !== null;
}
