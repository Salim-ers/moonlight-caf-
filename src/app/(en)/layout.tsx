import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/layout/RootShell";
import { rootMetadata } from "@/lib/seo";

export const metadata: Metadata = rootMetadata("en");
export const viewport: Viewport = { themeColor: "#faf8f3", colorScheme: "light" };

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
