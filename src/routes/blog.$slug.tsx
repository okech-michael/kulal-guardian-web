import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress, BlurReveal } from "@/components/site/Cinematic";
import { getPost, posts } from "@/content/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Story not found · Wazee wa Mazingira" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} · Wazee wa Mazingira` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
    };
  },
  notFoundComponent: StoryNotFound,
  component: StoryPage,
});

function StoryNotFound() {
  return (
    <main>
      <Nav />
      <section className="container-x flex min-h-[70svh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-[2.2rem]">Story not found</h1>
        <p className="mt-4 site-section-copy">This dispatch may have been moved or renamed.</p>
        <Link to="/blog" className="site-button-primary mt-8">Back to the journal</Link>
      </section>
      <Footer />
    </main>
  );
}

/* ── Minimal editorial markdown renderer ─────────────────────── */
function renderInline(text: string, key: string) {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${key}-b${i}`} className="font-semibold text-foreground">{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={`${key}-i${i}`}>{token.slice(1, -1)}</em>);
    }
    last = m.index + token.length;
    i += 1;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function Article({ body }: { body: string }) {
  const blocks = body.trim().split(/\n{2,}/);
  const out: React.ReactNode[] = [];
  let listBuffer: string[] = [];
  let olBuffer: string[] = [];

  const flushUl = (k: string) => {
    if (!listBuffer.length) return;
    out.push(
      <ul key={`ul-${k}`} className="my-7 space-y-3 pl-5">
        {listBuffer.map((li, i) => (
          <li key={i} className="relative list-none pl-5 text-[1.05rem] leading-[1.9] text-foreground/80">
            <span className="absolute left-0 top-[0.85em] h-1.5 w-1.5 rounded-full bg-accent" />
            {renderInline(li, `uli-${k}-${i}`)}
          </li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };
  const flushOl = (k: string) => {
    if (!olBuffer.length) return;
    out.push(
      <ol key={`ol-${k}`} className="my-7 space-y-3 pl-6">
        {olBuffer.map((li, i) => (
          <li key={i} className="list-decimal text-[1.05rem] leading-[1.9] text-foreground/80 marker:font-display marker:text-accent">
            {renderInline(li, `oli-${k}-${i}`)}
          </li>
        ))}
      </ol>,
    );
    olBuffer = [];
  };

  blocks.forEach((raw, idx) => {
    const block = raw.trim();
    const k = String(idx);

    if (/^[-*]\s+/.test(block)) {
      flushOl(k);
      block.split("\n").forEach((l) => listBuffer.push(l.replace(/^[-*]\s+/, "")));
      flushUl(k);
      return;
    }
    if (/^\d+\.\s+/.test(block)) {
      flushUl(k);
      block.split("\n").forEach((l) => olBuffer.push(l.replace(/^\d+\.\s+/, "")));
      flushOl(k);
      return;
    }
    flushUl(k);
    flushOl(k);

    if (block.startsWith("## ")) {
      out.push(
        <h2 key={k} className="mt-14 font-display text-[1.7rem] leading-tight sm:text-[2.05rem]">
          {block.slice(3)}
        </h2>,
      );
      return;
    }
    if (block.startsWith("### ")) {
      out.push(<h3 key={k} className="mt-10 font-display text-[1.35rem]">{block.slice(4)}</h3>);
      return;
    }
    if (block.startsWith("> ")) {
      out.push(
        <blockquote key={k} className="my-12 border-l-4 border-accent pl-7">
          <p className="font-display text-[1.35rem] leading-[1.5] text-primary sm:text-[1.6rem]">
            {renderInline(block.replace(/^>\s?/gm, ""), `q-${k}`)}
          </p>
        </blockquote>,
      );
      return;
    }
    out.push(
      <p key={k} className="mt-6 text-[1.08rem] leading-[1.95] text-foreground/80">
        {renderInline(block, `p-${k}`)}
      </p>,
    );
  });

  return <div>{out}</div>;
}

function StoryPage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      <ScrollProgress />
      <Nav />

      {/* Cover */}
      <header className="relative h-[78svh] min-h-[520px] w-full overflow-hidden bg-primary">
        <img src={post.image} alt={post.imageAlt} className="h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/45" />
        <div className="absolute inset-x-0 bottom-0 pb-14">
          <div className="container-x">
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-accent">{post.category}</span>
            <h1 className="mt-4 max-w-4xl font-display text-[2.1rem] leading-[1.08] text-white text-balance sm:text-[3.1rem]">
              {post.title}
            </h1>
            <p className="mt-5 text-[0.92rem] text-white/75">
              {post.author} · {post.authorRole} · {post.date} · {post.readingTime} min read
            </p>
          </div>
        </div>
      </header>

      {/* Body */}
      <article className="bg-background py-16 sm:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-[46rem]">
            <BlurReveal>
              <p className="border-l-4 border-accent pl-6 font-display text-[1.3rem] leading-[1.6] text-primary sm:text-[1.5rem]">
                {post.excerpt}
              </p>
            </BlurReveal>
            <Article body={post.body} />

            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
              <Link to="/blog" className="group inline-flex items-center gap-2 text-[0.96rem] font-semibold text-primary">
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
                All stories
              </Link>
              <button
                onClick={() => window.dispatchEvent(new Event("openDonationModal"))}
                className="site-button-primary"
              >
                Support this work <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="bg-muted py-20 sm:py-24">
        <div className="container-x">
          <h2 className="font-display text-[1.7rem] sm:text-[2.1rem]">Keep reading</h2>
          <div className="mt-10 grid gap-7 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group block overflow-hidden rounded-[1.6rem] bg-card shadow-card transition-all duration-500 hover:-translate-y-2 hover:shadow-elegant"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={p.image} alt={p.imageAlt} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                </div>
                <div className="p-7">
                  <span className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-accent">{p.category}</span>
                  <h3 className="mt-3 font-display text-[1.24rem] leading-snug">{p.title}</h3>
                  <p className="mt-3 site-card-copy line-clamp-2">{p.excerpt}</p>
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
