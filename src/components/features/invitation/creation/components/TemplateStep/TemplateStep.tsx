"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { themes } from "@/config/themes";
import type { ThemeToken } from "@/lib/types/invitation";

import { AVAILABLE_TEMPLATES } from "../../constants";
import type { CreationFormData } from "../../types";

export type TemplateStepProps = {
  formData: Partial<CreationFormData>;
  onUpdate: (data: Partial<CreationFormData>) => void;
};

export function TemplateStep({ formData, onUpdate }: TemplateStepProps) {
  const handleTemplateSelect = (templateId: string) => {
    onUpdate({ templateId });
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Elige tu plantilla mágica
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Selecciona el tema perfecto para la celebración
        </p>
      </motion.div>

      <motion.div
        className="grid gap-4 sm:grid-cols-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {AVAILABLE_TEMPLATES.map((template, index) => {
          const themeConfig = themes[template.theme as ThemeToken];
          const hasBackground = !!themeConfig;

          return (
            <motion.button
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`group relative overflow-hidden rounded-2xl border-2 p-1 text-left transition-all ${formData.templateId === template.id
                ? "border-purple-600 shadow-xl scale-[1.02]"
                : "border-gray-200 bg-white hover:border-purple-300 hover:shadow-md"
                }`}
              style={
                hasBackground
                  ? {
                    background:
                      themeConfig.introScene?.backgroundGradient ||
                      themeConfig.backgroundPattern ||
                      themeConfig.primaryGradient,
                  }
                  : undefined
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {template.previewImage && (
                <div className="absolute inset-0 z-0 overflow-hidden mix-blend-overlay">
                  <Image
                    src={template.previewImage}
                    alt={template.name}
                    fill
                    className="object-cover opacity-30 select-none point-events-none"
                  />
                </div>
              )}

              <div
                className={`flex h-full items-start gap-4 rounded-xl p-5 transition-all relative z-10 ${formData.templateId === template.id
                  ? ""
                  : ""
                  }`}
              >
                <div className="text-5xl drop-shadow-sm">{template.emoji}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 drop-shadow-sm">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {template.description}
                  </p>
                </div>
              </div>

              {formData.templateId === template.id && (
                <motion.div
                  className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 shadow-md ring-2 ring-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <svg
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {formData.templateId && (
        <motion.div
          className="space-y-6 rounded-2xl border-2 border-purple-200 bg-purple-50 p-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <label
              htmlFor="celebrantName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del niño/a
            </label>
            <input
              type="text"
              id="celebrantName"
              value={formData.celebrantName || ""}
              onChange={(e) => onUpdate({ celebrantName: e.target.value })}
              placeholder="Ej: Sofía"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Edad que cumplirá
            </label>
            <input
              type="number"
              id="age"
              min="1"
              max="18"
              value={formData.age || ""}
              onChange={(e) => onUpdate({ age: parseInt(e.target.value) || 0 })}
              placeholder="Ej: 5"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label
              htmlFor="celebrantDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción corta del festejado/a
            </label>
            <input
              type="text"
              id="celebrantDescription"
              value={formData.celebrantDescription || ""}
              onChange={(e) => onUpdate({ celebrantDescription: e.target.value })}
              placeholder="Ej: Nuestra pequeña estrella, El explorador del espacio, etc."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
