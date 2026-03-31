"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function FallidoContent() {
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("invitationId");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
        {/* Icono */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <svg className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Pago rechazado</h1>
        <p className="mt-3 text-gray-600">
          Tu pago no pudo procesarse. Por favor intenta con otro método de pago.
        </p>

        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-left">
          <p className="text-sm font-semibold text-red-800">Posibles causas:</p>
          <ul className="mt-2 space-y-1 text-sm text-red-700">
            <li>• Fondos insuficientes en la tarjeta.</li>
            <li>• Datos de la tarjeta incorrectos.</li>
            <li>• La transacción fue bloqueada por el banco.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={invitationId ? `/dashboard/invitaciones/nueva?id=${invitationId}` : "/dashboard/invitaciones/nueva"}
            className="rounded-xl bg-[#E63946] px-8 py-3 font-semibold text-white transition hover:bg-[#D62839]"
          >
            Reintentar pago
          </Link>
          <Link
            href="/dashboard/invitaciones"
            className="rounded-xl border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Volver al dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PagoFallidoPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <FallidoContent />
    </Suspense>
  );
}
