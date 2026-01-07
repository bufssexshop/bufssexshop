import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import { CartManager } from "@/components/cart/CartManager";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buf's Sex Shop | Sensualidad y Placer",
  description: "La tienda líder en productos eróticos con envíos discretos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${geistSans.variable} antialiased font-sans bg-black overflow-x-hidden`}>
        <Navbar />
        <main>
          {children}
        </main>

        <CartManager />
        <Footer />
        <Toaster position="bottom-right" richColors theme="dark" />
      </body>
    </html>
  );
}