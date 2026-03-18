import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-kids",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cumplesaas.example"),
  title: {
    default: "CumpleSaaS | Invitaciones digitales premium",
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
    <html lang="en">
      <body className={`${baloo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
