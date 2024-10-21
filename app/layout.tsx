import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SarvaBazaar - Your One-Stop Marketplace",
  description:
    "SarvaBazaar is a comprehensive online shopping platform offering a diverse range of products, from everyday essentials to luxury items. Explore everything you need in one place with quality, variety, and convenience at your fingertips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
