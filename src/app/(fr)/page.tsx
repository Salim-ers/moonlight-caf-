import { HomePage } from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("home", "fr");

export default function Page() {
  return <HomePage locale="fr" />;
}
