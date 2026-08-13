import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { projects } from "@/content/projects";

export function Projects() {
  const [lead, ...rest] = projects;

  return (
    <section id="projects" className="bg-background py-12 sm:py-16">
      <div className="container-x">
        <Reveal>
          <span className="site-section-label">Projects &amp; Programs</span>
          <h2 className="site-section-title max-w-3xl">
            Work that takes root in the soil and the soul of Kulal.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <Link
            to="/projects/$slug"
            params={{ slug: lead.slug }}
            className="group mt-8 grid overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant lg:grid-cols-2"
          >
            <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[26rem]">
              <img
                src={lead.cover}
                alt={lead.title}
                className="h-full w-full object-cover transition-transform duration-[1.6s] group-hover:scale-110"
              />
              <span className="absolute left-5 top-5 rounded-full bg-accent px-3.5 py-1.5 text-[0.8rem] font-semibold uppercase tracking-wider text-accent-foreground">
                Flagship · {lead.tag}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
              <p className="text-[0.85rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {lead.location}
              </p>
              <h3 className="font-display text-[2rem] leading-tight text-foreground sm:text-[2.6rem]">
                {lead.title}
              </h3>
              <p className="site-card-copy max-w-xl">{lead.summary}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
                {lead.results.slice(0, 3).map((r) => (
                  <div key={r.label}>
                    <div className="font-display text-2xl text-primary">{r.value}</div>
                    <div className="text-sm text-muted-foreground">{r.label}</div>
                  </div>
                ))}
              </div>
              <span className="mt-2 inline-flex items-center gap-2 text-[1rem] font-semibold text-primary group-hover:text-accent">
                Explore this project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1.5 text-[0.82rem] font-semibold uppercase tracking-wider text-accent-foreground">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="site-card-title">{p.title}</h3>
                  <p className="mt-3 site-card-copy">{p.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[0.98rem] font-semibold text-primary group-hover:text-accent">
                    View project
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
