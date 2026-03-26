"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import type { InvitationRenderConfig } from "@/lib/types/invitation";
import { InvitationExperience } from "@/components/features/invitation/InvitationExperience";
import { mapFormDataToRenderConfig } from "@/lib/templates/preview-utils";

export default function InvitationPreviewPage() {
  const [renderConfig, setRenderConfig] = useState<InvitationRenderConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem("invitation_preview_data");
    
    if (!savedData) {
      setIsLoading(false);
      return;
    }

    try {
      const formData = JSON.parse(savedData);
      const config = mapFormDataToRenderConfig(formData);
      setRenderConfig(config);
    } catch (err) {
      console.error("Error parsing preview data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Prevenir errores de hidratación: no renderizar nada sustancial en el servidor
  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500 border-t-transparent mx-auto" />
          <p className="text-gray-600 font-medium">Cargando previsualización...</p>
        </div>
      </div>
    );
  }

  if (!renderConfig) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md text-center">
          <div className="mb-6 text-6xl">✨</div>
          <h1 className="mb-3 text-2xl font-bold text-gray-900">No hay datos de preview</h1>
          <p className="mb-8 text-gray-600">
            Parece que no hay una invitación en proceso. Regresa al creador para configurar tu invitación.
          </p>
          <button
            onClick={() => router.push("/dashboard/invitaciones/nueva")}
            className="rounded-xl bg-purple-600 px-8 py-3 font-bold text-white transition hover:bg-purple-700"
          >
            Ir al creador
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed left-4 top-4 z-[100]">
        <div className="rounded-full bg-black/80 px-4 py-2 text-xs font-bold text-white backdrop-blur-md border border-white/20">
          MODO PREVIEW PRIVADO
        </div>
      </div>
      <InvitationExperience invitation={renderConfig} />
    </>
  );
}
