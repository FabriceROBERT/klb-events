import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Playfair_Display } from "next/font/google";
import { MotionProvider } from "@/app/components/Motion";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KLB Events - Animation DJ",
  description:
    "DJ professionnel en Île-de-France : mariages, anniversaires, soirées d’entreprise. Sonorisation, lumières, videobooth 360° et châteaux gonflables.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // "relative" : référence de mesure pour les animations liées au scroll
    <html lang="fr" className="relative">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${playfair.variable} font-sans antialiased`}>
        <MotionProvider>{children}</MotionProvider>
        <div
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
          aria-hidden="true">
          <div className="grain" />
        </div>
      </body>
    </html>
  );
}
