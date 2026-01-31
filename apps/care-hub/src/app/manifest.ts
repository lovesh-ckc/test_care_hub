import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Care App Patient",
    short_name: "Care Patient",
    description: "Personalized patient care experience",

    start_url: "/",
    scope: "/",

    display: "standalone",
    orientation: "portrait-primary",

    background_color: "#ffffff",
    theme_color: "#faf9f8",

    icons: [
      // Standard PWA icons
      {
        src: "/favicons/Eu-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicons/Eu-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },

      // Maskable icons (CRITICAL for correct Android scaling)
      {
        src: "/favicons/Eu-icon-192x192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicons/Eu-icon-512x512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
