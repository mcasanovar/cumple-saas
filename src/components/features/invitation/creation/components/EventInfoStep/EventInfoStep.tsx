"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { CreationFormData } from "../../types";
import { EVENT_ICON_LIST } from "../../constants";
import { IconSelector } from "./components/IconSelector";
import MapView from "@/components/shared/map-view/MapView";
import { IconRenderer } from "@/components/shared/icon-renderer/IconRenderer";

export type EventInfoStepProps = {
  formData: Partial<CreationFormData>;
  onUpdate: (data: Partial<CreationFormData>) => void;
};

export function EventInfoStep({ formData, onUpdate }: EventInfoStepProps) {
  const [newItem, setNewItem] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string>(EVENT_ICON_LIST[0] ?? "🎉");
  const [iconSelectorOpen, setIconSelectorOpen] = useState(false);

  const handleAddItem = () => {
    if (newItem.trim()) {
      const currentItems = formData.eventIncludes || [];
      onUpdate({
        eventIncludes: [...currentItems, { description: newItem.trim(), icon: selectedIcon }]
      });
      setNewItem("");
    }
  };

  const handleRemoveItem = (index: number) => {
    const currentItems = formData.eventIncludes || [];
    onUpdate({ eventIncludes: currentItems.filter((item, i) => i !== index) });
  };

  const handleEditItem = (index: number, updates: Partial<{ description: string; icon: string }>) => {
    const currentItems = formData.eventIncludes || [];
    const updatedItems = currentItems.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    onUpdate({ eventIncludes: updatedItems });
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center sm:text-left"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Información del evento
        </h1>
        <p className="mt-2 sm:mt-3 text-base sm:text-lg text-gray-600">
          Cuéntanos los detalles de la celebración
        </p>
      </motion.div>

      <motion.div
        className="space-y-6 sm:space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="eventDate"
              className="block text-sm font-semibold text-gray-700 ml-1"
            >
              📅 Fecha del evento
            </label>
            <input
              type="date"
              id="eventDate"
              min={new Date().toISOString().split("T")[0]}
              value={formData.eventDate || ""}
              onChange={(e) => onUpdate({ eventDate: e.target.value })}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="eventTime"
              className="block text-sm font-semibold text-gray-700 ml-1"
            >
              ⏰ Hora del evento
            </label>
            <input
              type="time"
              id="eventTime"
              value={formData.eventTime || ""}
              onChange={(e) => onUpdate({ eventTime: e.target.value })}
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="venueName"
              className="block text-sm font-semibold text-gray-700 ml-1"
            >
              📍 Nombre del lugar
            </label>
            <input
              type="text"
              id="venueName"
              value={formData.venueName || ""}
              onChange={(e) => onUpdate({ venueName: e.target.value })}
              placeholder="Ej: Salón Fiesta Mágica"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="venueAddress"
              className="block text-sm font-semibold text-gray-700 ml-1"
            >
              🏠 Dirección del evento
            </label>
            <input
              type="text"
              id="venueAddress"
              value={formData.venueAddress || ""}
              onChange={(e) => onUpdate({ venueAddress: e.target.value })}
              placeholder="Ej: Av. Providencia 1234"
              className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="map-view"
            className="block text-sm font-semibold text-gray-700 ml-1"
          >
            🗺️ Ubicación en el mapa
          </label>
          <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
            <MapView
              initialAddress={formData.venueAddress || ""}
              initialCoordinates={formData.coordinates}
              onLocationSelect={(coordinates, address) => {
                onUpdate({
                  coordinates: coordinates,
                  venueAddress: address
                });
              }}
            />
          </div>
          <p className="px-1 text-[10px] sm:text-xs text-gray-500 italic">
            * Mueve el marcador o busca la dirección para que tus invitados lleguen fácil.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 sm:p-6 border border-gray-100 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800">
              🎁 ¿Qué incluirá el evento?
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Agrega detalles como Show, Coctel, etc.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-2 shrink-0">
              <IconSelector
                selectedIcon={selectedIcon}
                onIconSelect={setSelectedIcon}
                isOpen={iconSelectorOpen}
                onToggle={() => setIconSelectorOpen(!iconSelectorOpen)}
              />
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                placeholder="Ej: Show en vivo"
                className="flex-1 sm:hidden rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
              placeholder="Ej: Show en vivo, Coctel..."
              className="hidden sm:block flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
            />

            <button
              onClick={handleAddItem}
              className="w-full sm:w-auto rounded-xl bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-purple-500/20 transition-all hover:bg-purple-700 active:scale-95"
            >
              Agregar
            </button>
          </div>

          <AnimatePresence>
            {formData.eventIncludes && formData.eventIncludes.length > 0 && (
              <motion.div
                className="grid gap-2 sm:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {formData.eventIncludes.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-purple-100 bg-purple-50/50 px-4 py-3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <IconRenderer icon={item.icon} className="text-xl" />
                      <span className="text-sm font-medium text-gray-800">{item.description}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(index)}
                      className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/30 p-5 sm:p-6">
          <h3 className="text-base font-bold text-purple-900 flex items-center gap-2">
            ✨ Textos Personalizados (Opcional)
          </h3>
          <p className="mt-1 text-xs text-purple-700/70 mb-4">
            Personaliza el mensaje de bienvenida.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="introHeadline"
                className="block text-[11px] font-bold uppercase tracking-wider text-purple-800/60 ml-1"
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
                className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="introButton"
                className="block text-[11px] font-bold uppercase tracking-wider text-purple-800/60 ml-1"
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
                className="w-full rounded-xl border border-purple-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
