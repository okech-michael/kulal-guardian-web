import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Impact } from "@/components/site/Impact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact · Wazee wa Mazingira" },
      { name: "description", content: "See the impact of community conservation at Mount Kulal, from restored habitats to youth-led programs and stronger local economies." },
      { property: "og:title", content: "Impact · Wazee wa Mazingira" },
      { property: "og:description", content: "See the impact of community conservation at Mount Kulal, from restored habitats to youth-led programs and stronger local economies." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/impact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/impact" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <Impact />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
