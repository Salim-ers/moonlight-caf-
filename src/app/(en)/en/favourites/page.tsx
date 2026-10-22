import { FavoritesPage } from "@/components/pages/FavoritesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("favorites", "en");

export default function Page() {
  return <FavoritesPage locale="en" />;
}
