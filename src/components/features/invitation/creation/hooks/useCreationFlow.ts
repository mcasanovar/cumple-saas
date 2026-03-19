import { useState, useCallback, useMemo } from "react";

import type { CreationStep, CreationFormData, CreationFlowState } from "../types";

export function useCreationFlow() {
  const [currentStep, setCurrentStep] = useState<CreationStep>("template");
  const [formData, setFormData] = useState<Partial<CreationFormData>>({
    eventIncludes: [],
    celebrantImages: [null, null, null],
    venueImage: null,
  });

  const updateFormData = useCallback(
    (updates: Partial<CreationFormData>) => {
      setFormData((prev) => ({ ...prev, ...updates }));
    },
    []
  );

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
          formData.age > 0
        );
      case "event-info":
        return !!(
          formData.eventDate &&
          formData.eventTime &&
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
  };
}
