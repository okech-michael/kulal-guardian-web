import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { About } from "@/components/site/About";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Wazee wa Mazingira" },
      { name: "description", content: "Learn about Wazee wa Mazingira and our mission to protect Mount Kulal through community-led conservation and youth empowerment." },
      { property: "og:title", content: "About · Wazee wa Mazingira" },
      { property: "og:description", content: "Learn about our mission to protect Mount Kulal through community-led conservation and youth empowerment." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/about" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <About />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
