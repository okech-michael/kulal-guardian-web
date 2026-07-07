import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Register } from "@/components/site/Register";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register · Wazee wa Mazingira" },
      { name: "description", content: "Join the Wazee wa Mazingira youth program and register to become a steward of Mount Kulal's conservation efforts." },
      { property: "og:title", content: "Register · Wazee wa Mazingira" },
      { property: "og:description", content: "Join the Wazee wa Mazingira youth program and register to become a steward of Mount Kulal's conservation efforts." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/register" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/register" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Nav />
      <Register />
      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
