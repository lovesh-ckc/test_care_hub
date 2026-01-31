import type { Metadata } from "next";
import { Suspense } from "react";
import {
  IBM_Plex_Sans,
  Plus_Jakarta_Sans,
  Sofia,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { PwaRegister } from "@care-hub/components/PwaRegister";
import { IntroGate } from "@care-hub/components/intro/IntroGate";
import { FeedbackProvider } from "@care-hub/components/feedback/FeedbackProvider";

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const greetingFont = Sofia({
  variable: "--font-sofia",
  weight: "400",
  subsets: ["latin"],
});

const bodyAltFont = Plus_Jakarta_Sans({
  variable: "--font-plex",
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
      {
        url: "/favicons/Eu-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicons/Eu-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/favicons/Eu-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/favicons/Eu-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport = {
  themeColor: "#faf9f8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
        <FeedbackProvider>
          <Suspense fallback={children}>
            <IntroGate>{children}</IntroGate>
          </Suspense>
        </FeedbackProvider>
      </body>
    </html>
  );
}