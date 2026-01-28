import type { Metadata } from "next";
import {
  IBM_Plex_Sans,
  Plus_Jakarta_Sans,
  Sofia,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { PwaRegister } from "@care-hub/components/PwaRegister";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const greetingFont = Sofia({
  variable: "--font-sofia",
  weight: "400",
  subsets: ["latin"],
});

const bodyAltFont = IBM_Plex_Sans({
  variable: "--font-plex",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Care App Patient",
  description: "Personalized patient care experience",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Care App Patient",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/icon-180.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport = {
  themeColor: "#ff8b00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${greetingFont.variable} ${bodyAltFont.variable} bg-[color:var(--surface)] text-[color:var(--ink)] antialiased`}
      >
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
