import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Reveal } from "@/components/site/Reveal";
import { WordReveal, BlurReveal, ScrollProgress } from "@/components/site/Cinematic";
import { posts, categories } from "@/content/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal · Stories from Mount Kulal | Wazee wa Mazingira" },
      { name: "description", content: "Long-form reporting on cloud forest conservation, pastoralist culture, youth leadership and climate resilience on Mount Kulal, Marsabit County, Kenya." },
      { property: "og:title", content: "Journal · Stories from Mount Kulal" },
      { property: "og:description", content: "Long-form reporting on conservation, culture, youth and climate on Mount Kulal, Kenya." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [active, setActive] = useState<string>("All");
  const lead = posts[0]!;
  const rest = posts.slice(1);
  const filtered = active === "All" ? rest : rest.filter((p) => p.category === active);

  return (
    <main>
      <ScrollProgress />
      <Nav />

      {/* Editorial masthead */}
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 text-primary-foreground sm:pt-44 sm:pb-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">The Journal</span>
          </Reveal>
          <WordReveal
            as="h1"
            text="Dispatches from a mountain that makes its own weather."
            className="mt-4 max-w-4xl font-display text-[2.3rem] leading-[1.06] text-white text-balance sm:text-[3.2rem]"
          />
          <BlurReveal delay={0.15}>
            <p className="mt-7 max-w-2xl text-[1.06rem] leading-[1.85] text-white/80">
              Reporting from the slopes of Mount Kulal on conservation science, indigenous
              knowledge, pastoralist livelihoods, youth leadership and the climate pressures
              reshaping northern Kenya.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* Lead story */}
      <section className="bg-background py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <Link
              to="/blog/$slug"
              params={{ slug: lead.slug }}
              className="group grid overflow-hidden rounded-[2rem] bg-card shadow-card transition-all duration-500 hover:shadow-elegant lg:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
                <img src={lead.image} alt={lead.imageAlt} className="h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-108" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <span className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-accent">
                  Featured · {lead.category}
                </span>
                <h2 className="mt-4 font-display text-[1.8rem] leading-tight sm:text-[2.3rem]">{lead.title}</h2>
                <p className="mt-4 site-section-copy">{lead.excerpt}</p>
                <p className="mt-6 text-[0.88rem] text-muted-foreground">
                  {lead.date} · {lead.readingTime} min read
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-primary">
                  Read the story
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Filters + grid */}
      <section className="bg-muted py-16 sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap gap-2.5">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-5 py-2 text-[0.88rem] font-semibold transition-all duration-300 ${
                  active === c
                    ? "border-transparent bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-accent hover:text-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block h-full overflow-hidden rounded-[1.6rem] bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.image} alt={p.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                  </div>
                  <div className="p-7">
                    <span className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-accent">{p.category}</span>
                    <h3 className="mt-3 font-display text-[1.3rem] leading-snug">{p.title}</h3>
                    <p className="mt-3 site-card-copy line-clamp-3">{p.excerpt}</p>
                    <p className="mt-5 text-[0.85rem] text-muted-foreground">{p.date} · {p.readingTime} min read</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
