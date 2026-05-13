import type { Metadata } from "next";
import { Noto_Serif, Manrope, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Toaster } from "sonner";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WAAFA | Digital Couture",
  description: "Elegance in each fabric. Discover our latest collection of handcrafted gowns, where minimal silhouette meets striking vibrant detail.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${manrope.variable} ${inter.variable} h-full antialiased selection:bg-primary-container selection:text-on-primary-container`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
