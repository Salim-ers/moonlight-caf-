import { StoryPage } from "@/components/pages/StoryPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("story", "fr");

export default function Page() {
  return <StoryPage locale="fr" />;
}
