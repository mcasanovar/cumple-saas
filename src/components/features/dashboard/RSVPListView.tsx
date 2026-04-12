"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatDateLong } from "@/utils/date";
import { calculateTotalGuests, calculateAllGuests, countDeclined } from "@/utils/rsvp";
import type { DashboardRSVP } from "@/lib/types/rsvp";
import { AddGuestModal } from "./AddGuestModal";
import { removeRSVPGuest } from "../../../app/(private)/dashboard/invitaciones/actions";

type RSVPListViewProps = {
  rsvps: DashboardRSVP[];
  invitationTitle: string;
};

export function RSVPListView({ rsvps, invitationTitle }: RSVPListViewProps) {
  const [addingToRSVP, setAddingToRSVP] = useState<string | null>(null);
  const [removingGuest, setRemovingGuest] = useState<{ rsvpId: string; index: number } | null>(null);

  const handleRemoveGuest = async (rsvpId: string, index: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar a este invitado?")) {
      setRemovingGuest({ rsvpId, index });
      const result = await removeRSVPGuest(rsvpId, index);
      if (!result.success) {
        alert(result.message);
      }
      setRemovingGuest(null);
    }
  };
  const totalConfirmations = rsvps.length;
  const totalAttendingGuests = calculateTotalGuests(rsvps);
  const totalRegisteredGuests = calculateAllGuests(rsvps);
  const declinedCount = countDeclined(rsvps);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{invitationTitle}</h1>
        <p className="mt-1 text-sm text-gray-600">
          Lista de confirmaciones de asistencia
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <motion.div
          className="rounded-xl bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-[#E63946]/10 p-3">
              <svg className="h-6 w-6 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total confirmaciones</p>
              <p className="text-2xl font-bold text-gray-900">{totalConfirmations}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Asistirán</p>
              <p className="text-2xl font-bold text-gray-900">{totalAttendingGuests}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl bg-white p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-[#F77F00]/10 p-3">
              <svg className="h-6 w-6 text-[#F77F00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total invitados</p>
              <p className="text-2xl font-bold text-gray-900">{totalRegisteredGuests}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="space-y-4">
        {rsvps.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No hay confirmaciones aún</h3>
            <p className="mt-2 text-sm text-gray-600">
              Cuando los invitados confirmen su asistencia, aparecerán aquí
            </p>
          </div>
        ) : (
          rsvps.map((rsvp, index) => (
            <motion.div
              key={rsvp.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">{rsvp.name}</h3>
                        {rsvp.willAttend ? (
                          <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Confirmó asistencia
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            No asistirá
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {rsvp.email && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {rsvp.email}
                          </div>
                        )}

                        {rsvp.willAttend && (
                          <div className="mt-4">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                              Invitados ({rsvp.guestCount}):
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {rsvp.guestNames.map((guestName, idx) => (
                                <div
                                  key={idx}
                                  className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all
                                    ${idx === 0
                                      ? "bg-blue-50 border-blue-200 text-blue-700"
                                      : "bg-white border-gray-200 text-gray-700 hover:border-red-200 hover:bg-red-50"
                                    }`}
                                >
                                  <span className="font-medium">{guestName}</span>
                                  {idx === 0 && (
                                    <span className="text-[10px] font-bold uppercase text-blue-400">Titular</span>
                                  )}
                                  {idx > 0 && (
                                    <button
                                      onClick={() => handleRemoveGuest(rsvp.id, idx)}
                                      disabled={removingGuest?.rsvpId === rsvp.id && removingGuest?.index === idx}
                                      className="ml-1 rounded-full p-0.5 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-500"
                                      title="Eliminar invitado"
                                    >
                                      {removingGuest?.rsvpId === rsvp.id && removingGuest?.index === idx ? (
                                        <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                      ) : (
                                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      )}
                                    </button>
                                  )}
                                </div>
                              ))}

                              <button
                                onClick={() => setAddingToRSVP(rsvp.id)}
                                className="flex items-center gap-1.5 rounded-full border-2 border-dashed border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-400 transition-all hover:border-red-300 hover:bg-red-50/50 hover:text-red-500"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Agregar
                              </button>
                            </div>
                          </div>
                        )}

                        {rsvp.message && (
                          <div className="mt-3 rounded-lg bg-gray-50 p-3">
                            <p className="mb-2 text-xs font-medium text-gray-500">Mensaje / Motivo:</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm">
                                {rsvp.message}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Confirmado el {formatDateLong(rsvp.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {declinedCount > 0 && (
        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{declinedCount}</span> {declinedCount === 1 ? "persona ha" : "personas han"} indicado que no podrán asistir
          </p>
        </div>
      )}

      {addingToRSVP && (
        <AddGuestModal
          isOpen={!!addingToRSVP}
          onClose={() => setAddingToRSVP(null)}
          rsvpId={addingToRSVP}
        />
      )}
    </div>
  );
}
