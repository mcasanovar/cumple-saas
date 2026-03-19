"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/features/marketing-landing/components/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white transition-transform max-md:hidden">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-gray-200 p-6">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/dashboard/invitaciones"
              className="flex items-center gap-3 rounded-lg bg-[#E63946] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#D62839]"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Mis invitaciones
            </Link>
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3 px-4 py-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                  },
                }}
              />
              <span className="text-sm font-medium text-gray-700">Mi cuenta</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="w-full flex-1 md:ml-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white md:hidden">
          <div className="flex items-center justify-between p-4">
            <Logo />
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            />
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-screen p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
