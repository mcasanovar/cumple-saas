import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

import type { CreationStep, CreationFormData, CreationFlowState, InvitationInitialData } from "../types";
import { saveInvitationProgress } from "@/app/(private)/dashboard/invitaciones/nueva/actions";
import type { BypassPaymentResult } from "@/app/(private)/dashboard/invitaciones/nueva/actions";

export function useCreationFlow(initialData?: InvitationInitialData | null) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CreationStep>(initialData?.currentStep || "template");
  const [invitationId, setInvitationId] = useState<string | null>(initialData?.id || null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<CreationFormData>>(initialData?.formData || {
    eventIncludes: [],
    celebrantImages: [null, null, null],
    venueImage: null,
    celebrantDescription: "",
    venueName: "",
    customTexts: {},
  });

  const updateFormData = useCallback(
    (updates: Partial<CreationFormData>) => {
      setFormData((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // Sincronizar con localStorage para previsualización mediante efecto (más robusto contra hidratación)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const timeout = setTimeout(() => {
        localStorage.setItem("invitation_preview_data", JSON.stringify(formData));
      }, 300); // Debounce leve para no penalizar performance e hidratación inmediata
      return () => clearTimeout(timeout);
    }
  }, [formData]);

  const handleOpenPreview = useCallback(() => {
    // Para el preview completo en pestaña nueva, usamos localStorage
    // Nota: Las imágenes cargadas por el usuario podrían no persistir si son Files
    // en una recarga directa de la nueva pestaña, pero el flujo continuo funcionará.
    window.open("/invitacion/preview", "_blank");
  }, []);

  const goToNextStep = useCallback(async () => {
    const steps: CreationStep[] = ["template", "event-info", "images", "preview"];
    const currentIndex = steps.indexOf(currentStep);

    if (currentIndex < steps.length - 1) {
      try {
        setIsSaving(true);
        // Persistir progreso en cada paso
        const result = await saveInvitationProgress(formData, invitationId ?? undefined, steps[currentIndex + 1]);

        if (result.success && result.invitationId) {
          setInvitationId(result.invitationId);
          setCurrentStep(steps[currentIndex + 1]);
        } else {
          console.error("Failed to save progress:", result.error);
          alert("Ocurrió un error al guardar tu progreso. Por favor intenta de nuevo.");
        }
      } catch (error) {
        console.error("Step transition error:", error);
      } finally {
        setIsSaving(false);
      }
    }
  }, [currentStep, formData, invitationId]);

  const goToPreviousStep = useCallback(() => {
    const steps: CreationStep[] = ["template", "event-info", "images", "preview"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: CreationStep) => {
    setCurrentStep(step);
  }, []);

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case "template":
        return !!(
          formData.templateId &&
          formData.celebrantName &&
          formData.age &&
          formData.age > 0 &&
          formData.celebrantDescription
        );
      case "event-info":
        // Validar fecha mayor o igual a hoy
        const isDateValid = !!formData.eventDate && new Date(formData.eventDate) >= new Date(new Date().setHours(0, 0, 0, 0));

        return !!(
          isDateValid &&
          formData.eventTime &&
          formData.venueName &&
          formData.venueAddress &&
          formData.coordinates &&
          formData.eventIncludes &&
          formData.eventIncludes.length > 0
        );
      case "images":
        return !!(
          formData.celebrantImages &&
          formData.celebrantImages.filter((img) => img !== null).length === 3 &&
          formData.venueImage
        );
      case "preview":
        return true;
      default:
        return false;
    }
  }, [currentStep, formData]);

  const canGoNext = useMemo(() => {
    return isStepValid && currentStep !== "preview";
  }, [isStepValid, currentStep]);

  const canGoBack = useMemo(() => {
    return currentStep !== "template";
  }, [currentStep]);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handlePurchase = useCallback(async () => {
    if (!isStepValid) return;
    try {
      setIsProcessingPayment(true);
      setPaymentError(null);

      // Detectar si estamos en desarrollo para usar bypass
      const isDev = process.env.NODE_ENV === "development";

      if (isDev) {
        // Modo desarrollo: bypass de pago
        const { simulatePaymentSuccess } = await import("@/app/(private)/dashboard/invitaciones/nueva/actions");
        const result: BypassPaymentResult = await simulatePaymentSuccess(formData, invitationId ?? undefined);

        if (result.success && result.slug) {
          // Redirigir a página de éxito con parámetros del bypass
          window.location.href = `/dashboard/pago/exitoso?bypass=true&slug=${result.slug}&invitationId=${result.invitationId}`;
        } else {
          setPaymentError(result.error || "Error al procesar el pago simulado.");
          setIsProcessingPayment(false);
        }
      } else {
        // Modo producción: usar MercadoPago
        const paymentPayload = {
          templateId: formData.templateId,
          celebrantName: formData.celebrantName,
          age: formData.age,
        };

        const { createPaymentPreference } = await import("@/app/(private)/dashboard/invitaciones/nueva/actions");
        const result = await createPaymentPreference(paymentPayload);

        if (result.success) {
          window.location.href = result.checkoutUrl;
        } else {
          setPaymentError(result.error);
          setIsProcessingPayment(false);
        }
      }
    } catch (err) {
      console.error("Error initiating purchase:", err);
      setPaymentError("Ocurrió un error inesperado al intentar pagar.");
      setIsProcessingPayment(false);
    }
  }, [formData, isStepValid, invitationId]);

  return {
    currentStep,
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isStepValid,
    canGoNext,
    canGoBack,
    handlePurchase,
    handleOpenPreview,
    isProcessingPayment,
    paymentError,
    isSaving,
    invitationId,
  };
}
