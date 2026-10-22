import { VisitPage } from "@/components/pages/VisitPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("visit", "en");

export default function Page() {
  return <VisitPage locale="en" />;
}
