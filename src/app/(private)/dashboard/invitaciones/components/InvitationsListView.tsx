"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { useDeleteInvitation } from "../hooks/useDeleteInvitation";
import { DeleteConfirmationModal } from "./delete-confirmation-modal/DeleteConfirmationModal";

export type DashboardInvitation = {
  id: string;
  title: string;
  theme: string;
  date: string;
  guests: number;
  status: string;
  slug: string;
  isPaid: boolean;
  createdAt: string;
};

type InvitationsListViewProps = {
  initialInvitations: DashboardInvitation[];
};

const themeColors: Record<string, string> = {
  Princesa: "bg-pink-100 text-pink-800",
  princesa: "bg-pink-100 text-pink-800",
  Safari: "bg-green-100 text-green-800",
  safari: "bg-green-100 text-green-800",
  Unicornio: "bg-purple-100 text-purple-800",
  dinosaurios: "bg-orange-100 text-orange-800",
  Espacial: "bg-blue-100 text-blue-800",
  "k-pop": "bg-indigo-100 text-indigo-800",
};

export function InvitationsListView({ initialInvitations }: InvitationsListViewProps) {
  const invitations = initialInvitations;
  const {
    isModalOpen,
    selectedInvitation,
    state,
    isPending,
    openModal,
    closeModal,
    handleDelete,
  } = useDeleteInvitation();

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis invitaciones</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona todas tus invitaciones en un solo lugar
          </p>
        </div>
        <Link
          href="/dashboard/invitaciones/nueva"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#E63946] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D62839]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva invitación
        </Link>
      </div>

      {/* Stats */}
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
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{invitations.length}</p>
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
              <p className="text-sm text-gray-600">Publicadas</p>
              <p className="text-2xl font-bold text-gray-900">
                {invitations.filter((i) => i.status === "published").length}
              </p>
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
              <p className="text-2xl font-bold text-gray-900">
                {invitations.reduce((acc, inv) => acc + inv.guests, 0)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Invitations list */}
      <div className="space-y-4">
        {invitations.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No tienes invitaciones</h3>
            <p className="mt-2 text-sm text-gray-600">Comienza creando tu primera invitación</p>
            <Link
              href="/dashboard/invitaciones/nueva"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#E63946] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D62839]"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Crear invitación
            </Link>
          </div>
        ) : (
          invitations.map((invitation, index) => (
            <motion.div
              key={invitation.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{invitation.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${themeColors[invitation.theme] || "bg-gray-100 text-gray-800"}`}>
                        {invitation.theme}
                      </span>
                      {invitation.status === "published" ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">Publicada</span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">Borrador</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(invitation.date).toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {invitation.guests} invitados
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {invitation.status === "published" && invitation.isPaid ? (
                      <>
                        <Link
                          href={`/dashboard/invitaciones/${invitation.id}/invitados`}
                          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Ver Invitados
                        </Link>
                        <Link
                          href={`/dashboard/invitaciones/${invitation.id}/view`}
                          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:shadow-lg"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                      </>
                    ) : (
                      <Link
                        href={`/dashboard/invitaciones/nueva?id=${invitation.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                      </Link>
                    )}
                    <button
                      onClick={() => openModal({
                        invitationId: invitation.id,
                        title: invitation.title,
                        guests: invitation.guests,
                      })}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        invitationTitle={selectedInvitation?.title || ""}
        guestsCount={selectedInvitation?.guests || 0}
        isPending={isPending}
        status={state.status}
        message={state.status === "success" || state.status === "error" ? state.message : undefined}
      />
    </div>
  );
}
