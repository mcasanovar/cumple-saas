"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function ProcessingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitationId = searchParams.get("invitationId");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!invitationId) return;

    let pollInterval: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/payments/${invitationId}/status`);
        const data = await response.json();

        console.log("STATUS DB", { response, data });

        if (data.status === "approved") {
          router.push(`/dashboard/pago/exitoso?invitationId=${invitationId}`);
          clearInterval(pollInterval);
        } else if (data.status === "pending" || data.status === "in_process") {
          // Keep polling, but maybe show a message if it takes too long
          // The user requested to redirect to pending if it comes as pending from MP
          // But usually, we want to stay here while it's "in_process"
          // If the webhook actually settles on "pending" (e.g. cash payment), then we redirect.
          // For now, let's stick to the user's logic if the status is explicitly "pending"
          if (data.status === "pending") {
            router.push(`/dashboard/pago/pendiente?invitationId=${invitationId}`);
            clearInterval(pollInterval);
          }
        } else if (data.status === "rejected" || data.status === "cancelled") {
          router.push(`/dashboard/pago/fallido?invitationId=${invitationId}`);
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error("Error polling payment status:", error);
      }
    };

    // Initial check
    checkStatus();

    // Poll every 3 seconds
    pollInterval = setInterval(checkStatus, 3000);

    return () => clearInterval(pollInterval);
  }, [invitationId, router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <motion.div
        className="flex flex-col items-center max-w-md w-full bg-white rounded-[32px] p-10 shadow-xl border border-indigo-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative mb-8">
          <div className="h-24 w-24 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">💳</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Procesando tu pago{dots}
        </h1>

        <p className="text-gray-600 text-center mb-8">
          Estamos verificando tu transacción con Mercado Pago. No cierres esta ventana.
        </p>

        <div className="w-full bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-600 shrink-0">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs text-indigo-800 leading-relaxed">
              Una vez que completes el pago en la otra pestaña, serás redirigido automáticamente aquí.
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard/invitaciones")}
          className="mt-8 text-sm font-medium text-gray-400 hover:text-indigo-600 transition"
        >
          Volver al dashboard
        </button>
      </motion.div>
    </div>
  );
}

export default function ProcessingPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProcessingContent />
    </Suspense>
  );
}
