import { NotFoundPage } from "@/components/pages/NotFoundPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("notFound", "fr");

export default function NotFound() {
  return <NotFoundPage locale="fr" />;
}
