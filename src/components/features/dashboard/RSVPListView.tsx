"use client";

import { motion } from "framer-motion";
import { formatDateLong } from "@/utils/date";
import { calculateTotalGuests, calculateAllGuests, countDeclined } from "@/utils/rsvp";
import type { DashboardRSVP } from "@/lib/types/rsvp";

type RSVPListViewProps = {
  rsvps: DashboardRSVP[];
  invitationTitle: string;
};

export function RSVPListView({ rsvps, invitationTitle }: RSVPListViewProps) {
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

                        {rsvp.willAttend && rsvp.guestCount > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-medium">{rsvp.guestCount}</span> {rsvp.guestCount === 1 ? "invitado" : "invitados"}
                          </div>
                        )}

                        {rsvp.guestNames && rsvp.guestNames.length > 0 && rsvp.willAttend && (
                          <div className="mt-3 rounded-lg bg-gray-50 p-3">
                            <p className="mb-2 text-xs font-medium text-gray-500">Nombres de invitados:</p>
                            <div className="flex flex-wrap gap-2">
                              {rsvp.guestNames.map((guestName, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center rounded-full bg-white px-3 py-1 text-sm text-gray-700 shadow-sm"
                                >
                                  {guestName}
                                </span>
                              ))}
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
    </div>
  );
}
