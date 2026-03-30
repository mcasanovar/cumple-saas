"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { mapFormDataToRenderConfig } from "@/lib/templates/preview-utils";
import { InvitationExperience } from "@/components/features/invitation/InvitationExperience";
import { PRICE_CLP, AVAILABLE_TEMPLATES } from "../../constants";
import type { CreationFormData } from "../../types";

export type PreviewStepProps = {
  formData: Partial<CreationFormData>;
  onConfirm: () => void;
  onOpenPreview?: () => void;
  isProcessing?: boolean;
  error?: string | null;
};

export function PreviewStep({
  formData,
  onConfirm,
  onOpenPreview,
  isProcessing,
  error
}: PreviewStepProps) {
  const [mounted, setMounted] = useState(false);
  const selectedTemplate = AVAILABLE_TEMPLATES.find(
    (t) => t.id === formData.templateId
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderConfig = useMemo(() => mapFormDataToRenderConfig(formData), [formData]);

  return (
    <div className="mx-auto w-full max-w-6xl">
      {!mounted ? (
        <div className="flex h-[600px] w-full items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
        </div>
      ) : (
        <>
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900">
              ¡Tu invitación está lista!
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Revisa cómo quedó tu invitación antes de confirmar
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Lado Izquierdo: Device Mockup */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="relative mx-auto h-[700px] w-[340px] overflow-hidden rounded-[3rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl ring-1 ring-gray-800">
                {/* Speaker/Camera notch */}
                <div className="absolute left-1/2 top-0 z-50 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-gray-900" />

                {/* Preview Iframe-like container */}
                <div className="h-full w-full overflow-hidden bg-white">
                  <div className="relative h-full w-full">
                    {/* The content with blur */}
                    <div className="h-full w-full blur-[12px] pointer-events-none">
                      <InvitationExperience
                        invitation={renderConfig}
                        isPreview={true}
                      />
                    </div>

                    {/* Central Preview Button Overlay */}
                    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/5 backdrop-blur-[2px]">
                      <motion.button
                        onClick={onOpenPreview}
                        className="group flex flex-col items-center gap-4 rounded-3xl bg-white/95 p-8 shadow-2xl transition-all hover:scale-105 hover:bg-white active:scale-95"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg transition-transform group-hover:rotate-12">
                          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <span className="text-xl font-black uppercase tracking-widest text-gray-900">
                          Ver Preview
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Gloss overlay */}
                <div className="pointer-events-none absolute inset-0 z-40 rounded-[2.5rem] bg-gradient-to-tr from-white/5 to-white/10" />
              </div>

              <button
                onClick={onOpenPreview}
                className="mt-8 flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-bold text-purple-600 shadow-md ring-1 ring-purple-100 transition hover:bg-purple-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver Preview Pantalla Completa
              </button>
            </motion.div>

            {/* Lado Derecho: Resumen y Checkout */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900">
                  Resumen de tu invitación
                </h3>

                <div className="mt-8 divide-y divide-gray-100">
                  <div className="py-4">
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Plantilla</span>
                    <div className="mt-1 flex items-center gap-3">
                      <span className="text-2xl">{selectedTemplate?.emoji}</span>
                      <span className="text-lg font-bold text-gray-900">{selectedTemplate?.name}</span>
                    </div>
                  </div>

                  <div className="py-4">
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Celebración</span>
                    <p className="mt-1 text-lg font-medium text-gray-800">
                      {formData.celebrantName} cumple {formData.age} años
                    </p>
                    <p className="text-sm text-gray-500 italic mt-0.5">"{formData.celebrantDescription}"</p>
                  </div>

                  <div className="py-4">
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Lugar y Fecha</span>
                    <p className="mt-1 text-lg text-gray-800">
                      {formData.venueName} — {formData.venueAddress}
                    </p>
                    <p className="text-gray-600">
                      {formData.eventDate} a las {formData.eventTime}
                    </p>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-purple-50 p-6 ring-1 ring-purple-100/50">
                  <h3 className="text-lg font-bold text-gray-900">
                    Resumen de compra
                  </h3>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Invitación Digital Premium</span>
                      <span className="font-bold text-gray-900">${PRICE_CLP.toLocaleString("es-CL")}</span>
                    </div>

                    <div className="border-t border-purple-200 pt-3">
                      <div className="flex justify-between text-xl font-bold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-purple-600">
                          ${PRICE_CLP.toLocaleString("es-CL")} CLP
                        </span>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                      {error}
                    </div>
                  )}

                  <button
                    onClick={onConfirm}
                    disabled={isProcessing}
                    className={`mt-6 flex w-full items-center justify-center rounded-xl py-4 text-lg font-bold text-white shadow-lg transition ${isProcessing
                      ? "cursor-not-allowed bg-purple-400"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:brightness-110"
                      }`}
                  >
                    {isProcessing ? (
                      <>
                        <svg className="mr-3 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      "Confirmar y pagar"
                    )}
                  </button>

                  <div className="mt-6 flex flex-col gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Acceso inmediato después del pago
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Editable hasta el día del evento
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Gestión de confirmaciones RSVP
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
