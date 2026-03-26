"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Show, SignInButton } from "@clerk/nextjs";

const steps = [
  {
    number: "1",
    title: "Elige",
    description: "Selecciona la plantilla que más te guste de nuestras 4 temáticas.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Personaliza",
    description: "Rellena la información necesaria como nombre, dirección del evento y fecha.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Revisa y envía",
    description: "Confirma tu invitación y comparte el link por WhatsApp. ¡Listo!",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
  },
];

export function StepsSection() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4 text-3xl font-bold leading-tight text-[#1A1A1A] sm:text-4xl md:text-6xl">
            Crea tu invitación en{" "}
            <span className="inline-block rounded-2xl bg-[#FFE5D9] px-3 py-1 text-[#F77F00] sm:px-4">
              3 pasos
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#6B7280] sm:text-lg md:text-xl">
            Así de fácil. Sin complicaciones, sin estrés.
          </p>
        </motion.div>

        <div className="relative mb-16">
          <div className="absolute left-[12.5%] right-[12.5%] top-[60px] hidden h-1 bg-gradient-to-r from-[#E63946] via-[#F77F00] to-[#F77F00] md:block" />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="relative z-10 mb-8 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[#F77F00] text-5xl font-bold text-white shadow-lg">
                  {step.number}
                </div>

                <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFE5E5] text-[#E63946]">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-[#1A1A1A]">
                    {step.title}
                  </h3>
                  <p className="text-[#6B7280]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="mb-6 text-lg text-[#6B7280]">
            ¿Listo para hacer magia? ✨
          </p>
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard/invitaciones">
              <button className="inline-flex items-center gap-3 rounded-full bg-[#E63946] px-10 py-5 text-lg font-bold text-white shadow-lg transition hover:bg-[#D62839] hover:shadow-xl">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Crear mi primera invitación</span>
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard/invitaciones"
              className="inline-flex items-center gap-3 rounded-full bg-[#E63946] px-10 py-5 text-lg font-bold text-white shadow-lg transition hover:bg-[#D62839] hover:shadow-xl"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Ir al dashboard</span>
            </Link>
          </Show>
        </motion.div>
      </div>
    </section>
  );
}
