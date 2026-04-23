import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gradual — Kademeli Alışkanlık Takibi",
  description: "10 alışkanlık, kademeli olarak aç. Her gün bir adım.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Gradual" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-zinc-50 antialiased dark:bg-zinc-950">{children}</body>
    </html>
  );
}
