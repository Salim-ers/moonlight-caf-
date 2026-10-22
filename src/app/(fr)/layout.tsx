import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/layout/RootShell";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("fr");
export const viewport: Viewport = { themeColor: "#fff9f0", colorScheme: "light" };

export default function FrenchRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="fr">{children}</RootShell>;
}
