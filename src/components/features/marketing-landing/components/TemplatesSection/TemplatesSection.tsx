"use client";

import { motion } from "framer-motion";

const templates = [
  {
    id: 1,
    name: "Aventura Espacial",
    emoji: "🚀",
    bgColor: "bg-[#1e3a5f]",
    illustration: "space",
  },
  {
    id: 2,
    name: "Safari de Amigos",
    emoji: "🦁",
    bgColor: "bg-[#8fbc5e]",
    illustration: "safari",
  },
  {
    id: 3,
    name: "Castillo Mágico",
    emoji: "🏰",
    bgColor: "bg-[#c8a2d8]",
    illustration: "castle",
  },
  {
    id: 4,
    name: "Bajo el Mar",
    emoji: "🐠",
    bgColor: "bg-[#5ec8d8]",
    illustration: "ocean",
  },
  {
    id: 5,
    name: "Dino-Fiesta",
    emoji: "�",
    bgColor: "bg-[#f5a962]",
    illustration: "dino",
  },
];

export function TemplatesSection() {
  return (
    <section id="plantillas" className="bg-[#F5F5F5] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-5xl font-bold text-[#1A1A1A] md:text-6xl">
            Nuestras plantillas <span className="text-[#E63946]">mágicas</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-[#666666] md:text-xl">
            Elige entre 5 temáticas increíbles y personaliza cada detalle.
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className="group flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative mb-4 w-full overflow-hidden rounded-3xl shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
                <div className={`aspect-[3/4] ${template.bgColor} flex items-center justify-center p-6`}>
                  <div className="text-center text-white">
                    <div className="mb-4 text-7xl">{template.emoji}</div>
                    <div className="text-2xl font-bold">Happy</div>
                    <div className="text-2xl font-bold">Birthday</div>
                    <div className="mt-2 text-xl font-bold">PARTY</div>
                  </div>
                </div>
              </div>
              <h3 className="text-center text-lg font-bold text-[#1A1A1A]">
                {template.emoji} {template.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
