import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Moonlight Café",
    short_name: "Moonlight",
    description: "Coffee shop créatif : café de spécialité, matcha et pâtisseries maison, 27 rue des Gravilliers, Paris 3e.",
    start_url: "/",
    display: "browser",
    background_color: "#fff9f0",
    theme_color: "#fff9f0",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
