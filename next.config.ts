import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
    qualities: [70, 82],
    deviceSizes: [480, 640, 828, 1080, 1280, 1672, 1920, 2560],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
