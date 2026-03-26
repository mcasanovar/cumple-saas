"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { themes } from "@/config/themes";
import type { ThemeToken } from "@/lib/types/invitation";
import { AVAILABLE_TEMPLATES } from "@/components/features/invitation/creation/constants";

export function TemplatesSection() {
  return (
    <section id="plantillas" className="bg-[#F8FAFC] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-4xl font-extrabold text-[#1A1A1A] md:text-6xl tracking-tight">
            Nuestras plantillas <span className="text-[#E63946] italic">mágicas</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
            Elige entre nuestras temáticas diseñadas por expertos y personaliza cada detalle en minutos.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {AVAILABLE_TEMPLATES.map((template, index) => {
            const themeConfig = themes[template.theme as ThemeToken];
            const hasBackground = !!themeConfig;

            return (
              <motion.div
                key={template.id}
                className="group relative flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border-2 border-slate-100 bg-white p-1 transition-all group-hover:border-purple-200 group-hover:shadow-2xl group-hover:-translate-y-2"
                  style={
                    hasBackground
                      ? {
                        background:
                          themeConfig.introScene?.backgroundGradient ||
                          themeConfig.backgroundPattern ||
                          themeConfig.primaryGradient,
                      }
                      : undefined
                  }
                >
                  {/* Glass Background Overlay */}
                  <div className="absolute inset-2 overflow-hidden rounded-[2.2rem] bg-white opacity-0 transition-opacity group-hover:opacity-10" />

                  {/* Preview Image if available */}
                  {template.previewImage && (
                    <div className="absolute inset-0 z-0 overflow-hidden mix-blend-overlay">
                      <Image
                        src={template.previewImage}
                        alt={template.name}
                        fill
                        className="object-cover opacity-20 transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  )}

                  <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
                    <motion.div
                      className="mb-6 text-7xl drop-shadow-xl"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {template.emoji}
                    </motion.div>

                    <div className="space-y-2">
                      <div className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A] opacity-60">
                        {template.theme}
                      </div>
                      <h3 className="text-2xl font-black text-[#1A1A1A] drop-shadow-sm">
                        {template.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="mt-6 px-4 text-center">
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    {template.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-slate-400 font-medium">¿Buscas algo diferente? Estamos creando nuevas temáticas cada mes.</p>
        </motion.div>
      </div>
    </section>
  );
}
