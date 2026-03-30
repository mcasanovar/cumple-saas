"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { CREATION_STEPS } from "./constants";
import { useCreationFlow } from "./hooks/useCreationFlow";
import { TemplateStep } from "./components/TemplateStep";
import { EventInfoStep } from "./components/EventInfoStep";
import { ImagesStep } from "./components/ImagesStep";
import { PreviewStep } from "./components/PreviewStep";
import type { InvitationInitialData } from "./types";

type InvitationCreationProps = {
  initialData?: InvitationInitialData | null;
};

export function InvitationCreation({ initialData }: InvitationCreationProps) {
  const router = useRouter();
  const {
    currentStep,
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoBack,
    saveCurrentProgress,
    handlePurchase,
    handleOpenPreview,
    isProcessingPayment,
    paymentError,
    isSaving,
    invitationId,
  } = useCreationFlow(initialData);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
              <TemplateStep formData={formData} onUpdate={updateFormData} />
            )}
            {currentStep === "event-info" && (
              <EventInfoStep formData={formData} onUpdate={updateFormData} />
            )}
            {currentStep === "images" && (
              <ImagesStep formData={formData} onUpdate={updateFormData} />
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
          className="mt-12 flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex gap-4">
            <button
              onClick={goToPreviousStep}
              disabled={!canGoBack || isSaving}
              className={`rounded-xl px-8 py-3 font-medium transition ${canGoBack && !isSaving
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : "cursor-not-allowed bg-gray-100 text-gray-400"
                }`}
            >
              ← Atrás
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleExit}
              className="rounded-xl bg-white border border-gray-300 px-8 py-3 font-medium text-gray-700 transition hover:bg-gray-50 hover:shadow-sm"
            >
              Salir
            </button>

            {currentStep !== "preview" && (
              <button
                onClick={goToNextStep}
                disabled={!canGoNext || isSaving}
                className={`flex items-center gap-2 rounded-xl px-8 py-3 font-medium transition ${canGoNext && !isSaving
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:brightness-110"
                    : "cursor-not-allowed bg-gray-200 text-gray-400"
                  }`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
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
