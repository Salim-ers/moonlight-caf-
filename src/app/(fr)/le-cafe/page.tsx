import { CafePage } from "@/components/pages/CafePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("cafe", "fr");

export default function Page() {
  return <CafePage locale="fr" />;
}
