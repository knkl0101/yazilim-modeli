import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CoraStepNav } from "@/components/CORA/CoraStepNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "C.O.R.A — Sürekli Test Döngüsü",
    template: "%s · C.O.R.A",
  },
  description:
    "Planlama ve Analiz, Geliştirme, Test, Uygulama ve Bakım ve Destek aşamalarında sürekli doğrulama modeli.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--cora-bg)] font-sans text-[var(--cora-fg)] antialiased`}
        style={{ backgroundColor: "#070b12", color: "#e8ecf4" }}
      >
        <div className="cora-grid-bg fixed inset-0 -z-10 opacity-[0.35]" aria-hidden />
        <CoraStepNav />
        {children}
      </body>
    </html>
  );
}
