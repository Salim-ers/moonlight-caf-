import { LegalNoticePage } from "@/components/pages/LegalPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("legal", "fr");

export default function Page() {
  return <LegalNoticePage locale="fr" />;
}
