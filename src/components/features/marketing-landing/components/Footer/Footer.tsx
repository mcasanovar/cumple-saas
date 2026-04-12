"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Show, SignInButton } from "@clerk/nextjs";

import { useNavigationStore } from "@/hooks/use-navigation-loader";
import { Logo } from "../Logo";

export function Footer() {
  const router = useRouter();
  const startNavigation = useNavigationStore((state: any) => state.startNavigation);

  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startNavigation("/dashboard/invitaciones", router);
  };

  return (
    <footer className="bg-[#1A1A1A] px-6 py-12 text-white md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4">
              <Logo className="[&_span]:!text-white [&_span:last-child]:!text-[#E63946]" />
            </div>
            <p className="text-sm text-gray-400">
              Crea invitaciones mágicas que tus invitados amarán
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="mb-4 font-semibold">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#plantillas" className="transition hover:text-white">
                  Plantillas
                </a>
              </li>
              <li>
                <Show when="signed-out">
                  <SignInButton mode="modal" forceRedirectUrl="/dashboard/invitaciones">
                    <button className="transition hover:text-white">
                      Entrar
                    </button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <Link
                    href="/dashboard/invitaciones"
                    onClick={handleDashboardClick}
                    className="transition hover:text-white"
                  >
                    Dashboard
                  </Link>
                </Show>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Precios
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="mb-4 font-semibold">Soporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  Centro de ayuda
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="transition hover:text-white">
                  Términos de uso
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-white">
                  Cookies
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>© 2024 InvitaFiesta. Todos los derechos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
}
