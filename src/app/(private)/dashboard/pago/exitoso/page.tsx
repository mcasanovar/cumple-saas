import { Suspense } from "react";
import Link from "next/link";
import type { PaymentCallbackParams } from "@/lib/types/payment";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function ExitosContent({ params }: { params: PaymentCallbackParams }) {
  const { payment_id, external_reference, status } = params;

  // El slug se construirá desde la BD cuando se integre Supabase.
  // Por ahora usamos el external_reference (UUID) como identificador.
  const invitationRef = external_reference ?? "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl">
        {/* Icono */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">¡Pago exitoso!</h1>
        <p className="mt-3 text-gray-600">
          Tu invitación digital está siendo preparada. En breve estará disponible.
        </p>

        {payment_id && (
          <p className="mt-4 text-sm text-gray-400">
            ID de pago: <span className="font-mono font-medium text-gray-600">{payment_id}</span>
          </p>
        )}

        {/* Nota: cuando se integre Supabase, aquí se mostrará el link real */}
        {invitationRef && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-800">Referencia de invitación:</p>
            <p className="mt-1 break-all font-mono text-xs text-green-700">{invitationRef}</p>
            <p className="mt-2 text-xs text-green-600">
              El link compartible estará disponible una vez integrada la base de datos.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard/invitaciones"
            className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Ir a mis invitaciones
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function PagoExitosoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolved = await searchParams;
  const params: PaymentCallbackParams = {
    payment_id: typeof resolved.payment_id === "string" ? resolved.payment_id : undefined,
    status: typeof resolved.status === "string" ? (resolved.status as PaymentCallbackParams["status"]) : undefined,
    external_reference: typeof resolved.external_reference === "string" ? resolved.external_reference : undefined,
    merchant_order_id: typeof resolved.merchant_order_id === "string" ? resolved.merchant_order_id : undefined,
  };

  return (
    <Suspense>
      <ExitosContent params={params} />
    </Suspense>
  );
}
