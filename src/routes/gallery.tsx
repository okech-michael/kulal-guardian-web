import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Gallery } from "@/components/site/Gallery";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Wazee wa Mazingira" },
      { name: "description", content: "Browse photos showcasing the natural beauty of Mount Kulal and the community conservation work carried out by Wazee wa Mazingira." },
      { property: "og:title", content: "Gallery · Wazee wa Mazingira" },
      { property: "og:description", content: "Browse photos showcasing the natural beauty of Mount Kulal and the community conservation work carried out by Wazee wa Mazingira." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/gallery" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/gallery" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <Gallery />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
