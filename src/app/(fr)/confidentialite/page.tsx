import { PrivacyPage } from "@/components/pages/LegalPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("privacy", "fr");

export default function Page() {
  return <PrivacyPage locale="fr" />;
}
