"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Show, SignInButton } from "@clerk/nextjs";

import { useNavigationStore } from "@/hooks/use-navigation-loader";

const features = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Presentación animada de entrada",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Info del evento con mapa interactivo",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Confirmación de asistencia (RSVP)",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
      </svg>
    ),
    title: "Panel de control en tiempo real",
  },
];

export function FeaturesSection() {
  const router = useRouter();
  const startNavigation = useNavigationStore((state: any) => state.startNavigation);

  const handleDashboardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    startNavigation("/dashboard/invitaciones", router);
  };

  return (
    <section className="bg-[#F5F5F5] px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-5xl font-bold text-[#1A1A1A] md:text-6xl">
            Una invitación <span className="text-[#4ECDC4]">completa</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-[#6B7280] md:text-xl">
            Todo lo que necesitas para la fiesta perfecta, en un solo pago.
          </p>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-[#E63946] px-8 py-12 text-center text-white">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider opacity-90">
              INVITACIÓN DIGITAL DESDE
            </p>
            <div className="mb-2 flex items-baseline justify-center gap-1">
              <span className="text-7xl font-bold">$5,990</span>
              <span className="text-3xl font-semibold">CLP</span>
            </div>
            <p className="text-sm opacity-90">Pago único · Sin suscripción</p>
          </div>

          <div className="space-y-6 px-8 py-12 md:px-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#4ECDC4]/10 text-[#4ECDC4]">
                  {feature.icon}
                </div>
                <p className="text-lg font-medium text-[#1A1A1A]">
                  {feature.title}
                </p>
                <div className="ml-auto flex-shrink-0">
                  <svg className="h-6 w-6 text-[#4ECDC4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-8 pb-12 md:px-12">
            <Show when="signed-out">
              <SignInButton mode="modal" forceRedirectUrl="/dashboard/invitaciones">
                <motion.button
                  className="block w-full rounded-full bg-[#E63946] py-5 text-center text-lg font-bold text-white shadow-lg transition hover:bg-[#D62839]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Crear mi invitación
                </motion.button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard/invitaciones">
                <motion.div
                  onClick={handleDashboardClick}
                  className="block w-full cursor-pointer rounded-full bg-[#E63946] py-5 text-center text-lg font-bold text-white shadow-lg transition hover:bg-[#D62839]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ir al dashboard
                </motion.div>
              </Link>
            </Show>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
