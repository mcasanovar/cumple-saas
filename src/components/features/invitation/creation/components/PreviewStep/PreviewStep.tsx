"use client";

import { motion } from "framer-motion";

import { PRICE_CLP, AVAILABLE_TEMPLATES } from "../../constants";
import type { CreationFormData } from "../../types";

export type PreviewStepProps = {
  formData: Partial<CreationFormData>;
  onConfirm: () => void;
};

export function PreviewStep({ formData, onConfirm }: PreviewStepProps) {
  const selectedTemplate = AVAILABLE_TEMPLATES.find(
    (t) => t.id === formData.templateId
  );

  return (
    <div className="mx-auto w-full max-w-5xl">
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
          Revisa los detalles antes de confirmar tu compra
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white">
              <div className="text-center">
                <div className="mb-4 text-6xl">{selectedTemplate?.emoji}</div>
                <h2 className="text-3xl font-bold">
                  {formData.celebrantName} cumple {formData.age} años
                </h2>
                <p className="mt-2 text-lg opacity-90">
                  {selectedTemplate?.name}
                </p>
              </div>
            </div>

            <div className="space-y-6 p-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Fecha y hora
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {formData.eventDate} a las {formData.eventTime}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Lugar
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {formData.venueAddress}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  El evento incluye
                </h3>
                <ul className="mt-2 space-y-1">
                  {formData.eventIncludes?.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-900">
                      <svg
                        className="mr-2 h-5 w-5 text-green-500"
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Galería
                </h3>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {formData.celebrantImages?.map((img, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg bg-gradient-to-br from-purple-200 to-pink-200"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="sticky top-8 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900">
              Resumen de compra
            </h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    Invitación Digital Premium
                  </p>
                  <p className="text-sm text-gray-600">
                    Plantilla: {selectedTemplate?.name}
                  </p>
                </div>
                <p className="font-bold text-gray-900">
                  ${PRICE_CLP.toLocaleString("es-CL")}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">
                    ${PRICE_CLP.toLocaleString("es-CL")} CLP
                  </span>
                </div>
              </div>

              <button
                onClick={onConfirm}
                className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-lg font-bold text-white shadow-lg transition hover:shadow-xl hover:brightness-110"
              >
                Confirmar y pagar
              </button>

              <div className="space-y-2 text-xs text-gray-500">
                <p className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-500"
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
                  Acceso inmediato después del pago
                </p>
                <p className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-500"
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
                  Editable hasta el día del evento
                </p>
                <p className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-500"
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
                  Gestión de confirmaciones RSVP
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
