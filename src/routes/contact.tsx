import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · Wazee wa Mazingira" },
      { name: "description", content: "Get in touch with Wazee wa Mazingira to support conservation, connect with the youth program, or learn more about Mount Kulal." },
      { property: "og:title", content: "Contact · Wazee wa Mazingira" },
      { property: "og:description", content: "Get in touch with Wazee wa Mazingira to support conservation, connect with the youth program, or learn more about Mount Kulal." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/contact" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <Contact />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
