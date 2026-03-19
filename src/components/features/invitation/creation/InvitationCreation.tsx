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

export function InvitationCreation() {
  const router = useRouter();
  const {
    currentStep,
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    canGoNext,
    canGoBack,
  } = useCreationFlow();

  const handleConfirmPurchase = useCallback(() => {
    console.log("Datos de la invitación:", formData);
    alert("¡Compra confirmada! Redirigiendo al dashboard...");
    router.push("/dashboard/invitaciones");
  }, [formData, router]);

  const currentStepNumber = CREATION_STEPS.findIndex(
    (step) => step.id === currentStep
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {currentStep !== "preview" && (
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 py-6">
            <div className="flex items-center justify-between">
              {CREATION_STEPS.map((step, index) => (
                <div key={step.id} className="flex flex-1 items-center">
                  <div className="flex items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition ${
                        index <= currentStepNumber
                          ? "bg-purple-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`ml-3 hidden font-medium sm:block ${
                        index <= currentStepNumber
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
                        className={`h-full transition-all duration-500 ${
                          index < currentStepNumber
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
      )}

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
                onConfirm={handleConfirmPurchase}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {currentStep !== "preview" && (
          <motion.div
            className="mt-12 flex justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={goToPreviousStep}
              disabled={!canGoBack}
              className={`rounded-xl px-8 py-3 font-medium transition ${
                canGoBack
                  ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  : "cursor-not-allowed bg-gray-100 text-gray-400"
              }`}
            >
              ← Atrás
            </button>

            <button
              onClick={goToNextStep}
              disabled={!canGoNext}
              className={`rounded-xl px-8 py-3 font-medium transition ${
                canGoNext
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:brightness-110"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
            >
              Continuar →
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
