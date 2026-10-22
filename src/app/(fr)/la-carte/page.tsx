import { MenuPage } from "@/components/pages/MenuPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("menu", "fr");

export default function Page() {
  return <MenuPage locale="fr" />;
}
