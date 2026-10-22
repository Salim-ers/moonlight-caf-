import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moonlight Café",
    short_name: "Moonlight",
    description: "Coffee shop de spécialité et matcha, 27 rue des Gravilliers, Paris 3e.",
    start_url: "/",
    display: "browser",
    background_color: "#faf8f3",
    theme_color: "#faf8f3",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
