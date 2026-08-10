import { Reveal } from "./Reveal";
import { WordReveal, BlurReveal } from "./Cinematic";
import hero from "@/assets/hero-mount-kulal.jpg";
import chairman from "@/assets/mr-chairman.jpeg";
import secretary from "@/assets/mr-secreatary.jpeg";
import treasurer from "@/assets/mr-treasurer.jpeg";
import receptionist from "@/assets/Receptionist-wazee Gatab.jpeg";
import shukuri from "@/assets/Shukuri Lasapicho .jpeg";
import tali from "@/assets/Tali Lenyumba - Forest Guard - Arapal.jpeg";
import lemaim from "@/assets/Lemaim Lenawamuro-Forest guar -Arapal.jpeg";
import sapuki from "@/assets/Forest-guard-Gatab-Junction-village.jpeg";
import lchekuti from "@/assets/Forest guard Gatab Lgoon.jpeg";
import lmeli from "@/assets/Forest guard Gatab Nkaibelech.jpeg";
import lepolote from "@/assets/Forest guard Nkororoi village.jpeg";
import lkaruni from "@/assets/Forest guard Larachi sub location.jpeg";
import josephLekupuny from "@/assets/Joseph-lekupuny.jpeg";
import peterLekula from "@/assets/Forest-guard-Lolkujita.jpeg";

type Member = {
  img: string;
  name: string;
  title: string;
  roleDescription: string;
  bio?: string;
  details?: string;
  quote?: string;
  focus?: string[];
};

const leadership: Member[] = [
  {
    img: chairman,
    name: "Joseph Leiti Lengoiyap",
    title: "Chairperson",
    roleDescription:
      "Provides strategic leadership for the organization and represents Wazee wa Mazingira in partnerships, public engagement, and conservation planning across Mount Kulal.",
    bio: "A community elder who has walked the slopes of Mount Kulal since childhood, Joseph brings decades of customary knowledge into modern conservation planning. He chairs the elders' councils that document indigenous grazing and forest law, and has led the organisation's engagement with county government, national agencies and international partners, including the delegation recognised by UNESCO in 2025.",
    focus: ["Strategy & governance", "Elders' councils", "Partnerships"],
    quote: `"Protecting Mount Kulal today is preserving our heritage for generations yet to come."`,
  },
  {
    img: secretary,
    name: "Timothy Lmaimpya Ledany",
    title: "Secretary",
    roleDescription:
      "Coordinates records, communications, and member activities so conservation efforts remain documented, organized, and responsive to community needs.",
    bio: "Timothy built the organisation's record system from a set of handwritten notebooks into a maintained register of more than four hundred members, twenty years of minutes and a searchable archive of planting records. He convenes the village barazas where programme decisions are made and keeps the line open between the mountain's settlements and the Gatab office.",
    focus: ["Records & archive", "Community mobilisation", "Reporting"],
    quote: `"Every record we keep and every voice we hear strengthens the future of conservation."`,
  },
  {
    img: treasurer,
    name: "Moses Lemuni",
    title: "Treasurer",
    roleDescription:
      "Oversees financial stewardship with transparency so resources are directed toward conservation programs, community support, and long-term environmental protection.",
    bio: "Moses manages the organisation's finances with a discipline that has earned the trust of both village members and international funders. He designed the per-surviving-seedling payment model that now rewards nursery groups for outcomes rather than deliveries, and presents open accounts at every annual general meeting.",
    focus: ["Financial stewardship", "Grant compliance", "Community accountability"],
    quote: `"True stewardship is measured by how faithfully every resource serves both people and nature."`,
  },
];

const operations: Member[] = [
  {
    img: receptionist,
    name: "Joseph Lengoiyap",
    title: "Receptionist",
    roleDescription:
      "Serves as the first point of contact for visitors, community members, and partners, welcoming guests and coordinating office communication at the Wazee wa Mazingira office in Gatab.",
    details: "Wazee wa Mazingira Office · Gatab",
    quote: `"A warm welcome and a helping hand create the first step toward meaningful conservation."`,
  },
  {
    img: shukuri,
    name: "Shukuri Lasapicho",
    title: "Mt. Kulal Tour Guide",
    roleDescription:
      "Guides visitors through Mount Kulal's landscapes, sharing conservation stories while promoting responsible travel and appreciation for the mountain's cultural and ecological value.",
    details: "Contact: 0729924433",
    quote: `"Every trail tells a story, and every visitor becomes part of Mt. Kulal's legacy."`,
  },
];

const guards: Member[] = [
  { img: tali, name: "Tali Lenyumba", title: "Forest Guard", details: "Arapal", roleDescription: "Protects the forests of Arapal by monitoring wildlife habitats, preventing illegal activity, and supporting community-led conservation." },
  { img: lemaim, name: "Lemaim Lenawamuro", title: "Forest Guard", details: "Arapal", roleDescription: "Works with the Arapal community to preserve forest ecosystems through patrols, awareness work and protection of indigenous vegetation." },
  { img: sapuki, name: "Sapuki Lengoyiap", title: "Forest Guard", details: "Gatab Junction Village", roleDescription: "Oversees conservation around Gatab Junction by protecting forest resources and encouraging responsible use of natural resources." },
  { img: lchekuti, name: "Lchekuti Legumato", title: "Forest Guard", details: "Gatab Lagoon", roleDescription: "Supports conservation near Gatab Lagoon through routine patrols, habitat protection and collaboration with residents." },
  { img: lmeli, name: "Lmeli Lemunguku", title: "Forest Guard", details: "Gatab Nkaibelech", roleDescription: "Safeguards the forests of Nkaibelech by preventing illegal logging and supporting restoration efforts." },
  { img: lepolote, name: "Lepolote Lolokuria", title: "Forest Guard", details: "Nkororoi Village", roleDescription: "Protects forests around Nkororoi by preserving wildlife habitats and strengthening community participation." },
  { img: lkaruni, name: "Lkaruni Lenarokushu", title: "Forest Guard", details: "Larachi Sub-location", roleDescription: "Leads patrols within Larachi, protecting indigenous ecosystems and promoting sustainable resource management." },
  { img: josephLekupuny, name: "Joseph Lekupuny", title: "Forest Guard", details: "Mbarnat Village", roleDescription: "Protects the forests around Mbarnat through patrols and support for sustainable community practice." },
  { img: peterLekula, name: "Peter Lekula", title: "Forest Guard", details: "Lolkujita", roleDescription: "Monitors forest conditions in Lolkujita and strengthens community stewardship of the area." },
];

export function Team() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[70svh] overflow-hidden">
        <img src={hero} alt="Mount Kulal landscape" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-background" />
        <div className="container-x relative flex min-h-[70svh] flex-col justify-end pb-20 pt-40">
          <Reveal>
            <span className="site-section-label text-accent">The people of the mountain</span>
          </Reveal>
          <WordReveal
            as="h1"
            text="The hands and memory behind Mount Kulal"
            delay={0.1}
            className="mt-5 max-w-4xl font-display text-[2.4rem] leading-[1.05] text-white sm:text-[3.8rem]"
          />
          <BlurReveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-[1.1rem] leading-[1.9] text-white/85">
              Elders who remember the forest as it was, guards who walk it every morning, and young people
              determined it will still be here in fifty years.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* Leadership spotlight */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Leadership spotlight</span>
            <h2 className="mt-4 site-section-title max-w-3xl">Those who carry the mandate</h2>
          </Reveal>

          <div className="mt-16 space-y-16 sm:space-y-24">
            {leadership.map((m, i) => (
              <Reveal key={m.name} delay={0.05}>
                <article
                  className={`grid items-center gap-10 lg:grid-cols-12 ${
                    i % 2 ? "lg:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="lg:col-span-5">
                    <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-muted shadow-elegant">
                      <div className="aspect-[4/5] overflow-hidden">
                        <img
                          src={m.img}
                          alt={m.name}
                          className="h-full w-full object-cover object-center transition-transform duration-[1.6s] hover:scale-105"
                        />
                      </div>
                      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <span className="text-[0.78rem] uppercase tracking-[0.22em] text-accent">{m.title}</span>
                        <p className="mt-1 font-display text-[1.5rem] leading-tight text-white">{m.name}</p>
                      </figcaption>
                    </div>
                  </figure>

                  <div className="lg:col-span-7">
                    <span className="site-section-label">{m.title}</span>
                    <h3 className="mt-3 font-display text-[1.9rem] leading-tight text-foreground sm:text-[2.4rem]">
                      {m.name}
                    </h3>
                    <p className="mt-5 text-[1.06rem] leading-[1.9] text-foreground/80">{m.roleDescription}</p>
                    {m.bio && (
                      <p className="mt-4 text-[1.06rem] leading-[1.9] text-foreground/70">{m.bio}</p>
                    )}
                    {m.focus && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {m.focus.map((f) => (
                          <li
                            key={f}
                            className="rounded-full border border-border bg-card px-4 py-2 text-[0.9rem] font-semibold text-foreground/70"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    )}
                    {m.quote && (
                      <blockquote className="mt-8 border-l-2 border-accent pl-6 font-display text-[1.25rem] leading-[1.6] italic text-foreground/80 sm:text-[1.45rem]">
                        {m.quote}
                      </blockquote>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Operations */}
      <section className="bg-muted/50 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">Office &amp; visitors</span>
            <h2 className="mt-4 site-section-title max-w-3xl">Where the mountain meets its guests</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {operations.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.07}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card sm:flex-row">
                  <div className="h-64 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48">
                    <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {m.title}
                    </span>
                    <h3 className="mt-2 site-card-title">{m.name}</h3>
                    {m.details && <p className="mt-1 text-[0.95rem] font-semibold text-primary">{m.details}</p>}
                    <p className="mt-4 site-card-copy">{m.roleDescription}</p>
                    {m.quote && (
                      <blockquote className="mt-4 border-l-2 border-accent pl-4 text-[0.98rem] italic text-muted-foreground">
                        {m.quote}
                      </blockquote>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Forest guards */}
      <section className="bg-background py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <span className="site-section-label">The forest guards</span>
            <h2 className="mt-4 site-section-title max-w-3xl">Nine villages, nine pairs of eyes</h2>
            <p className="mt-5 max-w-2xl site-section-copy">
              Each guard is chosen by the village they protect. They patrol at dawn, record what they see, and
              answer to their neighbours before anyone else.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {guards.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.05}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={m.img}
                      alt={m.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-[1.4s] group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                      <h3 className="min-w-0 site-card-title">{m.name}</h3>
                      <span className="shrink-0 rounded-full bg-accent/15 px-3 py-1 text-[0.78rem] font-semibold uppercase tracking-wider text-primary">
                        {m.details}
                      </span>
                    </div>
                    <p className="mt-3 site-card-copy">{m.roleDescription}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/50 py-20 sm:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="site-section-title max-w-3xl">Leading conservation through community</h2>
            <p className="mt-6 max-w-3xl site-section-copy">
              Wazee wa Mazingira believes environmental conservation, indigenous knowledge and cultural heritage
              are inseparable. Our work is rooted in community participation: convening elders, empowering youth
              and collaborating with local stewards to protect Mount Kulal. When communities lead, conservation
              endures.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
