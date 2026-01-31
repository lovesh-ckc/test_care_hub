import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Care App Patient",
    short_name: "Care Patient",
    description: "Personalized patient care experience",
    start_url: "/",
    display: "standalone",
    scope: "/",
    background_color: "#faf9f8",
    theme_color: "#faf9f8",
    orientation: "portrait-primary",
    icons: [
      {
        src: "favicons/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        src: "favicons/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "favicons/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "favicons/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "favicons/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        src: "favicons/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  };
}
