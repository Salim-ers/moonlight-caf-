import { FavoritesPage } from "@/components/pages/FavoritesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("favorites", "fr");

export default function Page() {
  return <FavoritesPage locale="fr" />;
}
