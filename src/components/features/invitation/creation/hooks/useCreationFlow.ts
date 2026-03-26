import { useState, useCallback, useMemo } from "react";

import type { CreationStep, CreationFormData, CreationFlowState } from "../types";

export function useCreationFlow() {
  const [currentStep, setCurrentStep] = useState<CreationStep>("template");
  const [formData, setFormData] = useState<Partial<CreationFormData>>({
    eventIncludes: [],
    celebrantImages: [null, null, null],
    venueImage: null,
    celebrantDescription: "",
    venueName: "",
    customTexts: {},
  });

  const updateFormData = useCallback(
    (updates: Partial<CreationFormData>) => {
      setFormData((prev) => {
        const next = { ...prev, ...updates };
        
        // Guardar en localStorage para previsualización (excluyendo archivos por ahora)
        if (typeof window !== "undefined") {
          const previewData = { ...next };
          // Los Files no se pueden serializar a JSON
          delete (previewData as any).celebrantImages;
          delete (previewData as any).venueImage;
          localStorage.setItem("invitation_preview_data", JSON.stringify(previewData));
        }
        
        return next;
      });
    },
    []
  );

  const handleOpenPreview = useCallback(() => {
    // Para el preview completo en pestaña nueva, usamos localStorage
    // Nota: Las imágenes cargadas por el usuario podrían no persistir si son Files
    // en una recarga directa de la nueva pestaña, pero el flujo continuo funcionará.
    window.open("/invitacion/preview", "_blank");
  }, []);

  const goToNextStep = useCallback(() => {
    const steps: CreationStep[] = ["template", "event-info", "images", "preview"];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  }, [currentStep]);

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
        return !!(
          formData.eventDate &&
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

      // Creamos un payload liviano solo con lo necesario para MercadoPago
      // (evitando enviar imágenes base64 que exceden 1MB)
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
    } catch (err) {
      console.error("Error initiating purchase:", err);
      setPaymentError("Ocurrió un error inesperado al intentar pagar.");
      setIsProcessingPayment(false);
    }
  }, [formData, isStepValid]);

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
  };
}
