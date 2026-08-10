import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { WordReveal, BlurReveal, PanoramaStrip } from "@/components/site/Cinematic";
import { getProject, projects, type Project } from "@/content/projects";
import { ArrowLeft, ArrowUpRight, Download, MapPin, CalendarDays, Users } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found · Wazee wa Mazingira" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} · Wazee wa Mazingira`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main>
      <Nav />

      <section className="relative min-h-[78svh] overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background" />
        <div className="container-x relative flex min-h-[78svh] flex-col justify-end pb-16 pt-36">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
              {project.tag}
            </span>
          </Reveal>
          <WordReveal
            as="h1"
            text={project.title}
            delay={0.1}
            className="mt-6 max-w-4xl font-display text-[2.4rem] leading-[1.05] text-white sm:text-[3.6rem]"
          />
          <BlurReveal delay={0.25}>
            <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.8] text-white/85">{project.summary}</p>
          </BlurReveal>
          <BlurReveal delay={0.35}>
            <dl className="mt-10 grid gap-6 border-t border-white/20 pt-8 sm:grid-cols-3">
              <div className="flex min-w-0 items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="text-[0.75rem] uppercase tracking-[0.2em] text-white/60">Location</dt>
                  <dd className="mt-1 text-white">{project.location}</dd>
                </div>
              </div>
              <div className="flex min-w-0 items-start gap-3">
                <CalendarDays className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="text-[0.75rem] uppercase tracking-[0.2em] text-white/60">Timeline</dt>
                  <dd className="mt-1 text-white">{project.years} · {project.status}</dd>
                </div>
              </div>
              <div className="flex min-w-0 items-start gap-3">
                <Users className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="text-[0.75rem] uppercase tracking-[0.2em] text-white/60">Partners</dt>
                  <dd className="mt-1 text-white">{project.partners.join(" · ")}</dd>
                </div>
              </div>
            </dl>
          </BlurReveal>
        </div>
      </section>

      {/* Challenge / background */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="site-section-label">The challenge</span>
              <h2 className="mt-4 font-display text-[1.9rem] leading-tight text-foreground sm:text-[2.4rem]">
                Why this work matters
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            {project.challenge.map((p, i) => (
              <Reveal key={i} delay={0.08 * i}>
                <p className="mb-6 text-[1.08rem] leading-[1.9] text-foreground/80">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PanoramaStrip src={project.gallery[0]?.src ?? project.cover} alt={project.title} />

      {/* Activities */}
      <section className="bg-muted/50 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">What we do</span>
            <h2 className="mt-4 site-section-title max-w-3xl">Activities on the ground</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {project.activities.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <article className="h-full rounded-3xl border border-border/70 bg-card p-7 shadow-card">
                  <span className="font-display text-[1.6rem] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 site-card-title">{a.title}</h3>
                  <p className="mt-3 site-card-copy">{a.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Results</span>
            <h2 className="mt-4 site-section-title max-w-3xl">What has changed</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 rounded-3xl bg-primary px-6 py-12 text-primary-foreground shadow-elegant sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
            {project.results.map((r) => (
              <div key={r.label} className="text-center">
                <div className="font-display text-[2.2rem] text-accent sm:text-[2.8rem]">{r.value}</div>
                <div className="mt-3 text-[0.95rem] uppercase tracking-wider text-primary-foreground/75">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {project.outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <li className="h-full rounded-2xl border-l-2 border-accent bg-card p-6 text-[1.02rem] leading-[1.8] text-foreground/80 shadow-card">
                  {o}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-muted/50 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">From the field</span>
            <h2 className="mt-4 site-section-title max-w-3xl">Project gallery</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((g, i) => (
              <Reveal key={g.caption} delay={i * 0.07}>
                <figure className="group overflow-hidden rounded-3xl bg-card shadow-card">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={g.src}
                      alt={g.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                    />
                  </div>
                  <figcaption className="p-5 text-[0.98rem] text-muted-foreground">{g.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <blockquote className="mx-auto max-w-4xl text-center">
              <p className="font-display text-[1.6rem] leading-[1.5] text-foreground sm:text-[2.2rem]">
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <footer className="mt-8 text-[0.95rem] uppercase tracking-[0.18em] text-muted-foreground">
                {project.testimonial.name} · {project.testimonial.role}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Downloads */}
      <section className="bg-muted/50 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Downloads</span>
            <h2 className="mt-4 site-section-title max-w-3xl">Documents &amp; data</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {project.downloads.map((d) => (
              <div
                key={d.label}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-card"
              >
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-foreground">{d.label}</h3>
                  <p className="mt-1 text-[0.95rem] text-muted-foreground">{d.description}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[0.9rem] font-semibold text-primary-foreground">
                  <Download className="h-4 w-4" />
                  {d.kind}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[0.9rem] text-muted-foreground">
            Requesting a document? Write to us via the{" "}
            <Link to="/contact" className="font-semibold text-primary hover:text-accent">
              contact page
            </Link>{" "}
            and we will send it directly.
          </p>
        </div>
      </section>

      {/* More projects */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
            <h2 className="min-w-0 truncate site-section-title">More projects</h2>
            <Link
              to="/projects"
              className="inline-flex shrink-0 items-center gap-1.5 text-[0.98rem] font-semibold text-primary hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-3xl border border-border/70 bg-card transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="site-card-title">{p.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-primary group-hover:text-accent">
                    View project <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <Toaster richColors position="top-center" />
    </main>
  );
}
