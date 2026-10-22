import { CookiesPage } from "@/components/pages/LegalPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("cookies", "fr");

export default function Page() {
  return <CookiesPage locale="fr" />;
}
