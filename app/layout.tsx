import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { BackToTop } from "@/components/BackToTop";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Claudia V. — Ilustração e design",
  description:
    "Portefólio de ilustração e design: trabalhos de teor infantil, familiar, editorial e branding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${archivo.variable} ${inter.variable} antialiased`}>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
