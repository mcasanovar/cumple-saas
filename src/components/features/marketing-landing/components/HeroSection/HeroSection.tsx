"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Show, SignInButton } from "@clerk/nextjs";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-[#FFD6E8]/40 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-[#B8C4FF]/30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[20%] h-36 w-36 rounded-full bg-[#FFE5B4]/40 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#FFE5E5] px-4 py-2 text-sm font-medium text-[#E63946]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-lg">🎉</span>
          <span>Más de 12.000 fiestas confiaron en nosotros</span>
        </motion.div>

        <motion.h1
          className="mb-6 text-5xl font-bold leading-tight text-[#1A1A1A] md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Haz que su día{" "}
          <span className="text-[#E63946]">brille</span>
          <br />
          desde el primer mensaje
        </motion.h1>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-lg text-[#666666] md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Crea invitaciones animadas mágicas que tus invitados amarán. En 2 minutos, desde tu móvil.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Show when="signed-out">
            <SignInButton mode="modal" forceRedirectUrl="/dashboard/invitaciones">
              <button className="group inline-flex items-center gap-2 rounded-full bg-[#E63946] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_60px_rgba(230,57,70,0.3)] transition hover:-translate-y-1 hover:bg-[#D62839] hover:shadow-[0_25px_70px_rgba(230,57,70,0.4)]">
                <span className="text-xl">🎊</span>
                <span>Empezar ahora</span>
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard/invitaciones"
              className="group inline-flex items-center gap-2 rounded-full bg-[#E63946] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_60px_rgba(230,57,70,0.3)] transition hover:-translate-y-1 hover:bg-[#D62839] hover:shadow-[0_25px_70px_rgba(230,57,70,0.4)]"
            >
              <span className="text-xl">🎊</span>
              <span>Ir al dashboard</span>
            </Link>
          </Show>
          <a
            href="#plantillas"
            className="inline-flex items-center gap-2 rounded-full bg-[#F77F00] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#E67300]"
          >
            Ver plantillas
          </a>
        </motion.div>
      </div>
    </section>
  );
}
