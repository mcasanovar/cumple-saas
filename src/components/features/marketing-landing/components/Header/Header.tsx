"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

import { useNavigationStore } from "@/hooks/use-navigation-loader";
import { Logo } from "../Logo";

export function Header() {
  const router = useRouter();
  const startNavigation = useNavigationStore((state: any) => state.startNavigation);

  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startNavigation("/dashboard/invitaciones", router);
  };

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

        <nav className="flex items-center gap-2 md:gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="rounded-full bg-[#E63946] px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D62839] md:px-6 md:py-2.5 md:text-sm">
                Entrar
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard/invitaciones"
              onClick={handleDashboardClick}
              className="rounded-full bg-[#E63946] px-4 py-2 text-xs font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#D62839] md:px-6 md:py-2.5 md:text-sm"
            >
              Mis invitaciones
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 md:h-10 md:w-10",
                },
              }}
            />
          </Show>
        </nav>
      </div>
    </motion.header>
  );
}
