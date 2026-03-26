"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { CreationFormData } from "../../types";

export type EventInfoStepProps = {
  formData: Partial<CreationFormData>;
  onUpdate: (data: Partial<CreationFormData>) => void;
};

export function EventInfoStep({ formData, onUpdate }: EventInfoStepProps) {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      const currentItems = formData.eventIncludes || [];
      onUpdate({ eventIncludes: [...currentItems, newItem.trim()] });
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const currentItems = formData.eventIncludes || [];
    onUpdate({ eventIncludes: currentItems.filter((_, i) => i !== index) });
  };

  const handleMapClick = () => {
    if (formData.venueAddress) {
      onUpdate({
        coordinates: {
          lat: -33.4489,
          lng: -70.6693,
        },
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Información del evento
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Cuéntanos los detalles de la celebración
        </p>
      </motion.div>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha del evento
            </label>
            <input
              type="date"
              id="eventDate"
              value={formData.eventDate || ""}
              onChange={(e) => onUpdate({ eventDate: e.target.value })}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label
              htmlFor="eventTime"
              className="block text-sm font-medium text-gray-700"
            >
              Hora del evento
            </label>
            <input
              type="time"
              id="eventTime"
              value={formData.eventTime || ""}
              onChange={(e) => onUpdate({ eventTime: e.target.value })}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="venueName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del lugar
            </label>
            <input
              type="text"
              id="venueName"
              value={formData.venueName || ""}
              onChange={(e) => onUpdate({ venueName: e.target.value })}
              placeholder="Ej: Salón Fiesta Mágica"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>

          <div>
            <label
              htmlFor="venueAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección del evento
            </label>
            <input
              type="text"
              id="venueAddress"
              value={formData.venueAddress || ""}
              onChange={(e) => onUpdate({ venueAddress: e.target.value })}
              placeholder="Ej: Av. Providencia 1234"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </div>

        {formData.venueAddress && (
          <motion.div
            className="overflow-hidden rounded-xl border-2 border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 300 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex h-full items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="mb-4 text-6xl">🗺️</div>
                <p className="mb-4 text-gray-600">
                  Mapa interactivo (simulado)
                </p>
                <button
                  onClick={handleMapClick}
                  className="rounded-full bg-purple-500 px-6 py-2 text-white transition hover:bg-purple-600"
                >
                  Confirmar ubicación
                </button>
                {formData.coordinates && (
                  <p className="mt-2 text-sm text-green-600">
                    ✓ Ubicación confirmada
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            ¿Qué incluirá el evento?
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Agrega todo lo que tendrá la celebración
          </p>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
              placeholder="Ej: Show en vivo, Coctel, Barra de licores"
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />
            <button
              onClick={handleAddItem}
              className="rounded-xl bg-purple-500 px-6 py-3 text-white transition hover:bg-purple-600"
            >
              Agregar
            </button>
          </div>

          <AnimatePresence>
            {formData.eventIncludes && formData.eventIncludes.length > 0 && (
              <motion.div
                className="mt-4 space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formData.eventIncludes.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 px-4 py-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="text-gray-900">{item}</span>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="text-red-500 transition hover:text-red-700"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="rounded-2xl border-2 border-purple-200 bg-purple-50 p-6">
          <h3 className="text-lg font-bold text-gray-900">
            Textos Personalizados (Opcional)
          </h3>
          <p className="mt-1 text-sm text-gray-600 mb-4">
            Cambia los textos que aparecerán al abrir la invitación.
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="introHeadline"
                className="block text-sm font-medium text-gray-700"
              >
                Título de apertura
              </label>
              <input
                type="text"
                id="introHeadline"
                value={formData.customTexts?.introHeadline || ""}
                onChange={(e) =>
                  onUpdate({
                    customTexts: {
                      ...formData.customTexts,
                      introHeadline: e.target.value,
                    },
                  })
                }
                placeholder="Ej: ¿Estás listo?"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label
                htmlFor="introButton"
                className="block text-sm font-medium text-gray-700"
              >
                Texto del botón
              </label>
              <input
                type="text"
                id="introButton"
                value={formData.customTexts?.introButton || ""}
                onChange={(e) =>
                  onUpdate({
                    customTexts: {
                      ...formData.customTexts,
                      introButton: e.target.value,
                    },
                  })
                }
                placeholder="Ej: Abrir invitación"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
