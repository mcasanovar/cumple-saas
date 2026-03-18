"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Logo } from "../Logo";

export function Header() {
  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 bg-[#FAF3E0]/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#plantillas"
            className="text-sm font-medium text-[#1A1A1A] transition hover:text-[#E63946]"
          >
            Plantillas
          </a>
          <Link
            href="/crear-cuenta"
            className="rounded-full bg-[#E63946] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D62839]"
          >
            Crear cuenta gratis
          </Link>
        </nav>

        <button
          className="flex flex-col gap-1 md:hidden"
          aria-label="Menú"
        >
          <span className="h-0.5 w-6 bg-[#1A1A1A]" />
          <span className="h-0.5 w-6 bg-[#1A1A1A]" />
          <span className="h-0.5 w-6 bg-[#1A1A1A]" />
        </button>
      </div>
    </motion.header>
  );
}
