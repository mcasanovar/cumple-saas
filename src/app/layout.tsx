import type { Metadata } from "next";
import { Baloo_2, Great_Vibes } from "next/font/google";
import { Kalam } from "next/font/google";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";

import { NavigationLoader } from "@/components/shared/NavigationLoader/NavigationLoader";
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

const avengers = localFont({
  src: [
    {
      path: "../../public/fonts/avengers/AVENGEANCE HEROIC AVENGER.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/avengers/AVENGEANCE HEROIC AVENGER BD.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/avengers/AVENGEANCE HEROIC AVENGER BI.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/avengers/AVENGEANCE HEROIC AVENGER AT.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-avengers",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nvitame.com"),
  title: {
    default: "nvitame | Invitaciones digitales premium",
    template: "%s | nvitame",
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
      <html lang="es">
        <body className={`${baloo.variable} ${greatVibes.variable} ${kalam.variable} ${avengers.variable} antialiased`}>
          <NavigationLoader />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
