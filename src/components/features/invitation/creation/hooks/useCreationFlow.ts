import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";

import type { CreationStep, CreationFormData, CreationFlowState, InvitationInitialData, ValidationError } from "../types";
import { saveInvitationProgress } from "@/app/(private)/dashboard/invitaciones/nueva/actions";

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
    // Para el preview completo en la misma pestaña para evitar bloqueos de Safari
    window.location.href = "/invitacion/preview";
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

  const saveCurrentProgress = useCallback(async () => {
    try {
      setIsSaving(true);
      const result = await saveInvitationProgress(
        formData,
        invitationId ?? undefined,
        currentStep
      );

      if (result.success && result.invitationId) {
        setInvitationId(result.invitationId);
      } else {
        console.error("Failed to save progress:", result.error);
        alert("Ocurrió un error al guardar tu progreso. Por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error saving current step:", error);
    } finally {
      setIsSaving(false);
    }
  }, [currentStep, formData, invitationId]);

  const stepErrors = useMemo<ValidationError[]>(() => {
    const errors: ValidationError[] = [];
    switch (currentStep) {
      case "template":
        if (!formData.templateId) {
          errors.push({ field: "templateId", message: "Selecciona una temática" });
        }
        if (!formData.celebrantName) {
          errors.push({ field: "celebrantName", message: "Nombre del festejado" });
        }
        if (!formData.age || formData.age <= 0) {
          errors.push({ field: "age", message: "Edad (mayor a 0)" });
        }
        if (!formData.celebrantDescription) {
          errors.push({ field: "celebrantDescription", message: "Breve descripción" });
        }
        break;
      case "event-info":
        const isDateValid = !!formData.eventDate && new Date(formData.eventDate) >= new Date(new Date().setHours(0, 0, 0, 0));
        if (!formData.eventDate) {
          errors.push({ field: "eventDate", message: "Fecha del evento" });
        } else if (!isDateValid) {
          errors.push({ field: "eventDate", message: "La fecha debe ser hoy o a futuro" });
        }
        if (!formData.eventTime) {
          errors.push({ field: "eventTime", message: "Hora del evento" });
        }
        if (!formData.venueName) {
          errors.push({ field: "venueName", message: "Nombre del lugar" });
        }
        if (!formData.venueAddress) {
          errors.push({ field: "venueAddress", message: "Dirección del lugar" });
        }
        if (!formData.coordinates) {
          errors.push({ field: "coordinates", message: "Ubicación en el mapa" });
        }
        if (!formData.eventIncludes || formData.eventIncludes.length === 0) {
          errors.push({ field: "eventIncludes", message: "Al menos un detalle (Qué incluye)" });
        }
        break;
      case "images":
        const imagesCount = formData.celebrantImages?.filter((img) => img !== null).length || 0;
        if (imagesCount < 3) {
          errors.push({ field: "celebrantImages", message: `Faltan ${3 - imagesCount} fotos del festejado` });
        }
        if (!formData.venueImage) {
          errors.push({ field: "venueImage", message: "Foto del lugar (o referencial)" });
        }
        break;
    }
    return errors;
  }, [currentStep, formData]);

  const isStepValid = useMemo(() => {
    return stepErrors.length === 0;
  }, [stepErrors]);

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

    // Pre-abrir la ventana para evitar bloqueo de pop-ups en Safari
    const paymentWindow = window.open("about:blank", "_blank");

    try {
      setIsProcessingPayment(true);
      setPaymentError(null);

      const paymentPayload = {
        templateId: formData.templateId,
        celebrantName: formData.celebrantName,
        age: formData.age,
      };

      const { createPaymentPreference } = await import("@/app/(private)/dashboard/invitaciones/nueva/actions");
      const result = await createPaymentPreference(paymentPayload, invitationId ?? undefined);

      if (result.success && paymentWindow) {
        // Redirigir la ventana ya abierta a Mercado Pago
        paymentWindow.location.href = result.checkoutUrl;

        // Redirigir la pestaña actual a la página de procesamiento
        router.push(`/dashboard/pago/procesando?invitationId=${result.invitationId}`);
      } else {
        paymentWindow?.close();
        if (!result.success) {
          setPaymentError(result.error);
        } else {
          setPaymentError("No se pudo abrir la ventana de pago. Por favor, intenta de nuevo.");
        }
        setIsProcessingPayment(false);
      }
    } catch (err) {
      paymentWindow?.close();
      console.error("Error initiating purchase:", err);
      setPaymentError("Ocurrió un error inesperado al intentar pagar.");
      setIsProcessingPayment(false);
    }
  }, [formData, isStepValid, invitationId, router]);

  return {
    currentStep,
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    saveCurrentProgress,
    isStepValid,
    stepErrors,
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
