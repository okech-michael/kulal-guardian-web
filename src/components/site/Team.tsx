import { Reveal } from "./Reveal";
import hero from "@/assets/hero-mount-kulal.jpg";
import chairman from "@/assets/mr-chairman.jpeg";
import secretary from "@/assets/mr-secreatary.jpeg";
import treasurer from "@/assets/mr-treasurer.jpeg";

const teamMembers = [
  {
    img: chairman,
    name: "Joseph Leiti Lengoiyap",
    title: "Chairperson",
    bio: `Provides strategic leadership for the organization, oversees all conservation initiatives, represents Wazee wa Mazingira in partnerships and public engagements, and ensures that the organization's mission of protecting Mount Kulal and preserving cultural heritage remains at the center of every project.`,
    quote: `"Protecting Mount Kulal is protecting our history, our identity, and the future of generations yet to come."`,
  },
  {
    img: secretary,
    name: "Timothy Lmaimpya Ledany",
    title: "Secretary",
    bio: `Coordinates organizational activities, manages official records and communications, documents conservation initiatives, and ensures effective collaboration between members, partners, and stakeholders.`,
    quote: `"Every documented effort today becomes a legacy of conservation for tomorrow."`,
  },
  {
    img: treasurer,
    name: "Moses Lemuni",
    title: "Treasurer",
    bio: `Manages the organization's financial resources with transparency and accountability, ensuring that funds are effectively utilized to support environmental conservation projects, community programs, and cultural heritage preservation.`,
    quote: `"Every resource entrusted to us is an investment in the protection of Mount Kulal and the prosperity of our communities."`,
  },
];

export function Team() {
  return (
    <main>
      <section className="relative">
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
          <img src={hero} alt="Mount Kulal landscape" className="h-full w-full object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/95" />
        </div>
        <div className="container-x py-28 sm:py-36">
          <Reveal>
            <span className="site-section-label text-accent">Meet Our Leadership</span>
            <h1 className="mt-4 max-w-4xl site-section-title text-white">Meet Our Leadership Team</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-3xl site-section-copy text-white/90">
              These are the leaders guiding Wazee wa Mazingira in its mission to conserve Mount Kulal's unique ecosystem and preserve the region's cultural heritage for future generations.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="container-x">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {teamMembers.map((m, i) => (
              <Reveal key={m.name} delay={0.06 * i}>
                <article className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-5">
                    <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border border-border/60 bg-muted sm:h-24 sm:w-24">
                      <img src={m.img} alt={m.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="site-card-title">{m.name}</h3>
                      <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">{m.title}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="site-card-copy text-foreground/85">{m.bio}</p>
                    <blockquote className="mt-4 border-l-2 border-accent pl-4 italic text-muted-foreground">{m.quote}</blockquote>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background/50 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="site-section-title">Leading Conservation Through Community</h2>
            <p className="mt-6 max-w-3xl site-section-copy">
              Wazee wa Mazingira believes environmental conservation, indigenous knowledge, and cultural heritage are deeply interconnected. Our work is rooted in community participation — convening elders, empowering youth, and collaborating with local stewards to protect Mount Kulal for present and future generations. When communities lead, conservation endures.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
