import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site-config";

export default function robots(): MetadataRoute.Robots {
  // Sur les déploiements de prévisualisation Vercel, on évite l'indexation.
  const isProd = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: isProd ? [{ userAgent: "*", allow: "/" }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
