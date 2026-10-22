import { MenuPage } from "@/components/pages/MenuPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("menu", "en");

export default function Page() {
  return <MenuPage locale="en" />;
}
