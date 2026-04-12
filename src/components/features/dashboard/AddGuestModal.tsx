"use client";

import { useState, useActionState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addRSVPGuest } from "../../../app/(private)/dashboard/invitaciones/actions";
import type { AddGuestState } from "../../../app/(private)/dashboard/invitaciones/actions";

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  rsvpId: string;
}

export function AddGuestModal({ isOpen, onClose, rsvpId }: AddGuestModalProps) {
  const [name, setName] = useState("");
  const [state, formAction, isPending] = useActionState<AddGuestState, FormData>(
    addRSVPGuest,
    { status: "idle" }
  );

  useEffect(() => {
    if (state.status === "success") {
      setName("");
      onClose();
    }
  }, [state.status, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Agregar acompañante</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="rsvpId" value={rsvpId} />
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nombre del acompañante
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-black focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                required
                autoFocus
              />
            </div>

            {state.status === "error" && (
              <p className="text-sm text-red-500">{state.message}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-[#E63946] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#D62839] disabled:opacity-50"
              >
                {isPending ? "Agregando..." : "Agregar"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
