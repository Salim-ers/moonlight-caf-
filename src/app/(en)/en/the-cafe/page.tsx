import { CafePage } from "@/components/pages/CafePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("cafe", "en");

export default function Page() {
  return <CafePage locale="en" />;
}
