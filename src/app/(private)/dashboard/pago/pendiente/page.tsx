"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PendienteContent() {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("invitationId");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
        {/* Icono */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
          <svg className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Pago pendiente</h1>
        <p className="mt-3 text-gray-600">
          Tu pago está siendo procesado o requiere una acción manual (como un pago en efectivo). Te notificaremos cuando se confirme.
        </p>

        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-left">
          <p className="text-sm font-semibold text-yellow-800">¿Qué sigue?</p>
          <ul className="mt-2 space-y-1 text-sm text-yellow-700">
            <li>• Recibirás un email cuando el pago se acredite.</li>
            <li>• Si pagaste con efectivo, la acreditación puede tardar hasta 48 horas.</li>
            <li>• Tu invitación se activará automáticamente al confirmarse.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/invitaciones"
            className="rounded-xl bg-yellow-500 px-8 py-3 font-semibold text-white transition hover:bg-yellow-600 text-center"
          >
            Volver al dashboard
          </Link>
          {invitationId && (
            <Link
              href={`/dashboard/invitaciones/${invitationId}`}
              className="rounded-xl border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 text-center"
            >
              Ver detalle
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PagoPendientePage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PendienteContent />
    </Suspense>
  );
}
