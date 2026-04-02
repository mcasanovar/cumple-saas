import type { Metadata } from "next";
import { Baloo_2, Great_Vibes } from "next/font/google";
import { Kalam } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-kids",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-kpop",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cumplesaas.example"),
  title: {
    default: "nvitame | Invitaciones digitales premium",
    template: "%s | CumpleSaaS",
  },
  description:
    "Experiencias digitales mágicas para cumpleaños infantiles. Personaliza invitaciones con transiciones inmersivas y RSVP integrado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${baloo.variable} ${greatVibes.variable} ${kalam.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
