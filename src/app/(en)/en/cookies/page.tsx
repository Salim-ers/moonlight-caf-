import { CookiesPage } from "@/components/pages/LegalPages";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("cookies", "en");

export default function Page() {
  return <CookiesPage locale="en" />;
}
