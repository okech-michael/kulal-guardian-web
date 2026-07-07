import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Projects } from "@/components/site/Projects";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects · Wazee wa Mazingira" },
      { name: "description", content: "Explore the conservation and community development projects led by Wazee wa Mazingira around Mount Kulal." },
      { property: "og:title", content: "Projects · Wazee wa Mazingira" },
      { property: "og:description", content: "Explore the conservation and community development projects led by Wazee wa Mazingira around Mount Kulal." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/projects" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <Projects />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
