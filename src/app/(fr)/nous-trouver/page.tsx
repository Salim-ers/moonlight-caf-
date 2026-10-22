import { VisitPage } from "@/components/pages/VisitPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("visit", "fr");

export default function Page() {
  return <VisitPage locale="fr" />;
}
