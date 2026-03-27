"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { uploadImageAction } from "@/app/(private)/dashboard/invitaciones/nueva/actions";
import type { CreationFormData } from "../../types";
import { ALLOWED_IMAGE_FORMATS, ALLOWED_MIME_TYPES } from "../../constants";

export type ImagesStepProps = {
  formData: Partial<CreationFormData>;
  onUpdate: (data: Partial<CreationFormData>) => void;
};

export function ImagesStep({ formData, onUpdate }: ImagesStepProps) {
  const celebrantRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const venueRef = useRef<HTMLInputElement>(null);

  const [uploadingSlots, setUploadingSlots] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File, type: "celebrant" | "venue", index?: number) => {
    const slotKey = type === "venue" ? "venue" : `celebrant-${index}`;

    // Validar formato de archivo
    const fileExtension = "." + file.name.split('.').pop()?.toLowerCase();
    const isValidFormat = ALLOWED_IMAGE_FORMATS.includes(fileExtension as any);
    const isValidMimeType = ALLOWED_MIME_TYPES.includes(file.type as any);

    if (!isValidFormat || !isValidMimeType) {
      setError("Solo se permiten archivos .jpeg, .jpg y .png");
      return;
    }

    try {
      setUploadingSlots(prev => ({ ...prev, [slotKey]: true }));
      setError(null);

      const uploadData = new FormData();
      uploadData.append("file", file);

      const result = await uploadImageAction(uploadData);

      console.log('result', result)

      if (result.success && result.url) {
        if (type === "venue") {
          onUpdate({ venueImage: result.url });
        } else if (typeof index === "number") {
          const currentImages = [...(formData.celebrantImages || [null, null, null])];
          currentImages[index] = result.url;
          onUpdate({ celebrantImages: currentImages });
        }
      } else {
        setError(result.error || "Error al subir la imagen");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Error de conexión al subir la imagen");
    } finally {
      setUploadingSlots(prev => ({ ...prev, [slotKey]: false }));
    }
  };

  const Loader = () => (
    <div className="flex flex-col items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent" />
      <p className="mt-2 text-xs font-medium text-purple-600">Subiendo...</p>
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-900">
          Imágenes de la invitación
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Sube las fotos que se mostrarán en la invitación
        </p>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100"
        >
          {error}
        </motion.div>
      )}

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Fotos del niño/a (3 requeridas solo en formato jpeg, jpg o png)
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((index) => {
              const isUploading = uploadingSlots[`celebrant-${index}`];
              const imageUrl = formData.celebrantImages?.[index];

              console.log('Image', imageUrl)

              return (
                <div key={index}>
                  <input
                    ref={celebrantRefs[index]}
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(file, "celebrant", index);
                    }}
                    className="hidden"
                  />
                  <button
                    disabled={isUploading}
                    onClick={() => celebrantRefs[index].current?.click()}
                    className={`group relative h-48 w-full overflow-hidden rounded-xl border-2 border-dashed transition ${imageUrl
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
                      } ${isUploading ? "cursor-not-allowed opacity-70" : ""}`}
                  >
                    <AnimatePresence mode="wait">
                      {isUploading ? (
                        <motion.div
                          key="loader"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex h-full items-center justify-center"
                        >
                          <Loader />
                        </motion.div>
                      ) : imageUrl ? (
                        <motion.div
                          key="image"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="h-full w-full"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imageUrl}
                            alt={`Imagen ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-white text-xs font-bold uppercase tracking-wider">Cambiar Foto</p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="placeholder"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex h-full flex-col items-center justify-center"
                        >
                          <svg
                            className="h-12 w-12 text-gray-400 transition group-hover:text-purple-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          <p className="mt-2 text-sm font-medium text-gray-600 group-hover:text-purple-600">
                            Subir imagen {index + 1}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Foto del lugar del evento (1 requerida)
          </h2>
          <div className="mt-4">
            <input
              ref={venueRef}
              type="file"
              accept=".jpeg,.jpg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file, "venue");
              }}
              className="hidden"
            />
            {(() => {
              const isUploading = uploadingSlots["venue"];
              const imageUrl = formData.venueImage;

              return (
                <button
                  disabled={isUploading}
                  onClick={() => venueRef.current?.click()}
                  className={`group relative h-64 w-full overflow-hidden rounded-xl border-2 border-dashed transition ${imageUrl
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50"
                    } ${isUploading ? "cursor-not-allowed opacity-70" : ""}`}
                >
                  <AnimatePresence mode="wait">
                    {isUploading ? (
                      <motion.div
                        key="loader"
                        className="flex h-full items-center justify-center"
                      >
                        <Loader />
                      </motion.div>
                    ) : imageUrl ? (
                      <motion.div
                        key="image"
                        className="h-full w-full"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageUrl}
                          alt="Lugar del evento"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm font-bold uppercase tracking-wider">Cambiar Foto del Lugar</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        className="flex h-full flex-col items-center justify-center"
                      >
                        <svg
                          className="h-16 w-16 text-gray-400 transition group-hover:text-purple-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        <p className="mt-3 text-base font-medium text-gray-600 group-hover:text-purple-600">
                          Subir imagen del lugar
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          Foto del salón, jardín o espacio del evento
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              );
            })()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
