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
  // Les photos sont pré-générées (npm run images → public/img) : aucune optimisation à la volée,
  // donc ni première visite lente, ni quota, ni échec de génération côté hébergeur.
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      // noms de fichiers versionnés (empreinte) : mis en cache un an par le navigateur et le CDN
      { source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
};

export default nextConfig;
