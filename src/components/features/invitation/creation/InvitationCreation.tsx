"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { CREATION_STEPS } from "./constants";
import { useCreationFlow } from "./hooks/useCreationFlow";
import { TemplateStep } from "./components/TemplateStep";
import { EventInfoStep } from "./components/EventInfoStep";
import { ImagesStep } from "./components/ImagesStep";
import { PreviewStep } from "./components/PreviewStep";
import type { InvitationInitialData, ValidationError } from "./types";

type InvitationCreationProps = {
  initialData?: InvitationInitialData | null;
};

function ValidationModal({
  isOpen,
  onClose,
  errors,
}: {
  isOpen: boolean;
  onClose: () => void;
  errors: ValidationError[];
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-8 text-center text-white">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold">Faltan por completar</h3>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-6">
              <div className="space-y-3">
                {errors.map((error, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    className="flex items-center gap-3 rounded-2xl bg-pink-50 p-4 border border-pink-100"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white">
                      {idx + 1}
                    </div>
                    <span className="text-sm font-semibold text-pink-700">
                      {error.message}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-gray-900 py-4 text-center font-bold text-white transition-all hover:bg-gray-800 active:scale-[0.98]"
              >
                Entendido, voy a completar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function InvitationCreation({ initialData }: InvitationCreationProps) {
  const router = useRouter();
  const [showValidationModal, setShowValidationModal] = useState(false);
  const {
    currentStep,
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    isStepValid,
    stepErrors,
    canGoBack,
    saveCurrentProgress,
    handlePurchase,
    handleOpenPreview,
    isProcessingPayment,
    paymentError,
    isSaving,
    invitationId,
  } = useCreationFlow(initialData);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const handleExit = useCallback(async () => {
    try {
      await saveCurrentProgress();
      router.push("/dashboard/invitaciones");
    } catch (err) {
      console.error("Error saving on exit:", err);
      router.push("/dashboard/invitaciones");
    }
  }, [router, saveCurrentProgress]);

  const currentStepNumber = CREATION_STEPS.findIndex(
    (step) => step.id === currentStep
  );

  const handleContinue = useCallback(async () => {
    if (isStepValid) {
      await goToNextStep();
    } else {
      setShowValidationModal(true);
    }
  }, [isStepValid, goToNextStep]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
        errors={stepErrors}
      />
      {/* Stepper siempre visible para mejor guía */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <div className="flex items-center justify-between">
            {CREATION_STEPS.map((step, index) => (
              <div key={step.id} className="flex flex-1 items-center">
                <div className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition ${index <= currentStepNumber
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-500"
                      }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`ml-3 hidden font-medium sm:block ${index <= currentStepNumber
                      ? "text-purple-600"
                      : "text-gray-500"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < CREATION_STEPS.length - 1 && (
                  <div className="mx-4 h-0.5 flex-1 bg-gray-200">
                    <div
                      className={`h-full transition-all duration-500 ${index < currentStepNumber
                        ? "w-full bg-purple-500"
                        : "w-0"
                        }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === "template" && (
              <TemplateStep
                formData={formData}
                onUpdate={updateFormData}
                errors={stepErrors}
              />
            )}
            {currentStep === "event-info" && (
              <EventInfoStep
                formData={formData}
                onUpdate={updateFormData}
                errors={stepErrors}
              />
            )}
            {currentStep === "images" && (
              <ImagesStep
                formData={formData}
                onUpdate={updateFormData}
                errors={stepErrors}
              />
            )}
            {currentStep === "preview" && (
              <PreviewStep
                formData={formData}
                onConfirm={handlePurchase}
                onOpenPreview={handleOpenPreview}
                isProcessing={isProcessingPayment}
                error={paymentError}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex order-2 sm:order-1 gap-3 sm:gap-4">
            <button
              onClick={goToPreviousStep}
              disabled={!canGoBack || isSaving}
              className={`flex-1 sm:flex-none rounded-xl px-6 sm:px-8 py-3.5 sm:py-3 text-sm sm:text-base font-bold transition-all active:scale-95 ${canGoBack && !isSaving
                ? "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50"
                : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
            >
              ← Atrás
            </button>

            <button
              onClick={handleExit}
              className="flex-1 sm:flex-none rounded-xl bg-white border-2 border-gray-200 px-6 sm:px-8 py-3.5 sm:py-3 text-sm sm:text-base font-bold text-gray-600 transition-all hover:bg-red-50 hover:border-red-100 hover:text-red-600 active:scale-95"
            >
              Salir
            </button>
          </div>

          <div className="flex order-1 sm:order-2 w-full sm:w-auto">
            {currentStep !== "preview" && (
              <button
                onClick={handleContinue}
                disabled={isSaving}
                className={`flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-10 sm:px-12 py-4 sm:py-3 text-base font-black uppercase tracking-wider transition-all active:scale-95 shadow-lg ${!isSaving
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/20 hover:shadow-xl hover:brightness-110"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>Continuar →</>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
