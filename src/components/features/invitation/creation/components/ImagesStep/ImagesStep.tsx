"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import type { CreationFormData } from "../../types";

export type ImagesStepProps = {
  formData: Partial<CreationFormData>;
  onUpdate: (data: Partial<CreationFormData>) => void;
};

export function ImagesStep({ formData, onUpdate }: ImagesStepProps) {
  const celebrantRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const venueRef = useRef<HTMLInputElement>(null);

  const handleCelebrantImageChange = (index: number, file: File | null) => {
    const currentImages = formData.celebrantImages || [null, null, null];
    const newImages = [...currentImages];
    newImages[index] = file;
    onUpdate({ celebrantImages: newImages });
  };

  const handleVenueImageChange = (file: File | null) => {
    onUpdate({ venueImage: file });
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Imágenes de la invitación
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Sube las fotos que se mostrarán en la invitación
        </p>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Fotos del niño/a (3 requeridas)
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <input
                  ref={celebrantRefs[index]}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleCelebrantImageChange(
                      index,
                      e.target.files?.[0] || null
                    )
                  }
                  className="hidden"
                />
                <button
                  onClick={() => celebrantRefs[index].current?.click()}
                  className={`group relative h-48 w-full overflow-hidden rounded-xl border-2 border-dashed transition ${
                    formData.celebrantImages?.[index]
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                >
                  {formData.celebrantImages?.[index] ? (
                    <div className="flex h-full flex-col items-center justify-center">
                      <svg
                        className="h-12 w-12 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <p className="mt-2 text-sm font-medium text-green-700">
                        Imagen {index + 1} cargada
                      </p>
                      <p className="mt-1 text-xs text-green-600">
                        {formData.celebrantImages[index]?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                      <svg
                        className="h-12 w-12 text-gray-400 transition group-hover:text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <p className="mt-2 text-sm font-medium text-gray-600 group-hover:text-purple-600">
                        Subir imagen {index + 1}
                      </p>
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Foto del lugar del evento (1 requerida)
          </h2>
          <div className="mt-4">
            <input
              ref={venueRef}
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleVenueImageChange(e.target.files?.[0] || null)
              }
              className="hidden"
            />
            <button
              onClick={() => venueRef.current?.click()}
              className={`group relative h-64 w-full overflow-hidden rounded-xl border-2 border-dashed transition ${
                formData.venueImage
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
              }`}
            >
              {formData.venueImage ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <svg
                    className="h-16 w-16 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="mt-3 text-base font-medium text-green-700">
                    Imagen del lugar cargada
                  </p>
                  <p className="mt-1 text-sm text-green-600">
                    {formData.venueImage.name}
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <svg
                    className="h-16 w-16 text-gray-400 transition group-hover:text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="mt-3 text-base font-medium text-gray-600 group-hover:text-purple-600">
                    Subir imagen del lugar
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Foto del salón, jardín o espacio del evento
                  </p>
                </div>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
