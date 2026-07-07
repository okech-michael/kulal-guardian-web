import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Awards } from "@/components/site/Awards";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards · Wazee wa Mazingira" },
      { name: "description", content: "Read about the recognition and awards received by Wazee wa Mazingira for conservation and community leadership." },
      { property: "og:title", content: "Awards · Wazee wa Mazingira" },
      { property: "og:description", content: "Read about the recognition and awards received by Wazee wa Mazingira for conservation and community leadership." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/awards" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/awards" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <Awards />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
