import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Team } from "@/components/site/Team";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team · Wazee wa Mazingira" },
      { name: "description", content: "Meet the leaders behind Wazee wa Mazingira, combining indigenous wisdom and youth-led conservation to protect Mount Kulal." },
      { property: "og:title", content: "Team · Wazee wa Mazingira" },
      { property: "og:description", content: "Meet the leaders behind Wazee wa Mazingira, combining indigenous wisdom and youth-led conservation to protect Mount Kulal." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/team" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/team" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <Team />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
