"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

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

        <nav className="hidden items-center gap-4 md:flex">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-full bg-[#E63946] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D62839]">
                Crear cuenta
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard/invitaciones"
              className="rounded-full bg-[#E63946] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D62839]"
            >
              Mis invitaciones
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </Show>
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
