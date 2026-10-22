import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // CSS inliné dans le <head> : plus de requête bloquante avant le premier affichage
  // (15 Ko gzip, visiteurs majoritairement nouveaux venus de la recherche locale).
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos fournies en 1672 × 941 : aucune taille supérieure n'est générée (pas d'agrandissement artificiel).
    qualities: [60, 72],
    deviceSizes: [480, 640, 828, 1080, 1280, 1672],
    imageSizes: [160, 256, 384],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
