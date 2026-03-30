"use client";

import { motion, AnimatePresence } from "framer-motion";

type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  invitationTitle: string;
  guestsCount: number;
  isPending: boolean;
  status: "idle" | "success" | "error";
  message?: string;
};

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  invitationTitle,
  guestsCount,
  isPending,
  status,
  message,
}: DeleteConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mx-4 rounded-2xl bg-white p-6 shadow-2xl">
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
                ¿Eliminar invitación?
              </h3>

              {/* Description */}
              <p className="mb-4 text-center text-gray-600">
                Estás a punto de eliminar <strong className="text-gray-900">{invitationTitle}</strong>
              </p>

              {/* Warning */}
              <div className="mb-6 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                <div className="flex items-start gap-2">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="font-medium">Esta acción no se puede deshacer</p>
                    {guestsCount > 0 && (
                      <p className="mt-1">
                        Se ocultarán {guestsCount} confirmacion{guestsCount === 1 ? "" : "es"} de asistencia
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Status message */}
              {status === "success" && (
                <div className="mb-4 rounded-lg bg-green-100 p-3 text-center text-sm font-medium text-green-800">
                  {message}
                </div>
              )}
              {status === "error" && (
                <div className="mb-4 rounded-lg bg-red-100 p-3 text-center text-sm font-medium text-red-800">
                  {message}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  disabled={isPending || status === "success"}
                  className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isPending || status === "success"}
                  className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Eliminando...
                    </span>
                  ) : (
                    "Eliminar"
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
