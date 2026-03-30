"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Confetti } from "@/components/shared/confetti/Confetti";

function ExitosContent() {
  const searchParams = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);

  const invitationId = searchParams.get("invitationId");
  const payment_id = searchParams.get("payment_id");
  const external_reference = searchParams.get("external_reference");

  const baseUrl = typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : "";
  const shareableUrl = invitationId ? `${baseUrl}/invitacion/${invitationId}` : "";

  const handleCopyLink = async () => {
    if (!shareableUrl) return;
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          duration={5000}
          onComplete={() => setShowConfetti(false)}
        />
      )}

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
            {shareableUrl
              ? "Tu invitación digital está lista. ¡Comparte el link con tus invitados!"
              : "Tu invitación digital está siendo preparada. En breve estará disponible."
            }
          </p>

          {payment_id && (
            <p className="mt-4 text-sm text-gray-400">
              ID de pago: <span className="font-mono font-medium text-gray-600">{payment_id}</span>
            </p>
          )}

          {/* Link para compartir */}
          {shareableUrl && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-800">Link de tu invitación:</p>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={shareableUrl}
                  readOnly
                  className="flex-1 rounded-lg border border-green-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  {copied ? "¡Copiado!" : "Copiar"}
                </button>
              </div>
              <p className="mt-2 text-xs text-green-600">
                Copia este link y compártelo con tus invitados
              </p>
            </div>
          )}

          {/* Referencia cuando no hay slug */}
          {!shareableUrl && external_reference && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-800">Referencia de invitación:</p>
              <p className="mt-1 break-all font-mono text-xs text-green-700">{external_reference}</p>
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
    </>
  );
}

export default function PagoExitosoPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
      </div>
    }>
      <ExitosContent />
    </Suspense>
  );
}
