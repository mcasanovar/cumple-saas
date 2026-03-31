"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Confetti } from "@/components/shared/confetti/Confetti";
import { publishInvitationAction } from "@/app/(private)/dashboard/invitaciones/nueva/actions";

function ExitosContent() {
  const searchParams = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isActivating, setIsActivating] = useState(true);
  const hasActivated = useRef(false);

  const invitationId = searchParams.get("invitationId");
  const payment_id = searchParams.get("payment_id");
  const external_reference = searchParams.get("external_reference");

  const [dbUrl, setDbUrl] = useState<string>("");

  useEffect(() => {
    async function activateInvitation() {
      if (!invitationId || hasActivated.current) return;

      try {
        hasActivated.current = true;
        const result = await publishInvitationAction(invitationId);
        if (result.success) {
          console.log("Invitación activada con éxito");
          // Si la activación fue exitosa, intentamos obtener la invitación para ver su url_ext_invitation
          // Aunque publishInvitationAction ya la guarda, aquí podríamos refrescarla o 
          // simplemente construirla si sabemos que el ID es válido.
        } else {
          console.error("Error al activar invitación:", result.error);
        }
      } catch (err) {
        console.error("Error activating invitation:", err);
      } finally {
        setIsActivating(false);
      }
    }

    activateInvitation();
  }, [invitationId]);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== "undefined"
    ? `${window.location.protocol}//${window.location.host}`
    : "");

  // Usamos el ID de la invitación para construir la URL, pero ahora sabemos que está en la BD.
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

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 sm:p-6">
        <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-10 text-center shadow-xl">
          {/* Icono */}
          <div className="mx-auto mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-green-100">
            <svg className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">¡Pago exitoso!</h1>

          {isActivating ? (
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
              <p className="text-xs sm:text-sm text-gray-500 italic">Activando tu invitación...</p>
            </div>
          ) : (
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
              {shareableUrl
                ? "Tu invitación digital está lista. ¡Comparte el link con tus invitados!"
                : "Tu invitación digital está siendo preparada. En breve estará disponible."
              }
            </p>
          )}

          {payment_id && (
            <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-gray-400">
              ID de pago: <span className="font-mono font-medium text-gray-600">{payment_id}</span>
            </p>
          )}

          {/* Link para compartir */}
          {shareableUrl && (
            <div className="mt-6 space-y-3 rounded-2xl border border-green-200 bg-green-50 p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600/10 text-green-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-green-800">Link para compartir</p>
              </div>

              <div className="group relative">
                <div className="flex flex-col gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={shareableUrl}
                      readOnly
                      className="w-full rounded-xl border border-green-200 bg-white px-4 py-3.5 text-xs font-medium text-gray-700 shadow-inner focus:outline-none"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition-all hover:bg-green-700 active:scale-[0.98]"
                  >
                    {copied ? (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        ¡COPIADO!
                      </>
                    ) : (
                      <>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        COPIAR LINK
                      </>
                    )}
                  </button>
                </div>
              </div>

              <p className="text-center text-[10px] font-medium text-green-600/80">
                Pega este link en WhatsApp para enviarlo a tus invitados
              </p>
            </div>
          )}

          {/* Referencia cuando no hay slug */}
          {!shareableUrl && external_reference && (
            <div className="mt-6 space-y-3 rounded-2xl border border-green-200 bg-green-50 p-4 shadow-sm sm:p-5">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600/10 text-green-600">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-green-800">Referencia de invitación</p>
              </div>

              <div className="rounded-xl border border-green-200 bg-white p-3 font-mono text-[10px] break-all text-green-700 shadow-inner">
                {external_reference}
              </div>

              <p className="text-center text-[10px] font-medium text-green-600/80">
                Tu invitación se está procesando. El link estará disponible pronto.
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
