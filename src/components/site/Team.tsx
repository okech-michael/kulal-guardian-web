import { Reveal } from "./Reveal";
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
  {
    img: receptionist,
    name: "Joseph Lengoiyap",
    title: "Receptionist",
    details: "Office: Wazee wa Mazingira Office • Location: Gatab",
    quote: `"A warm welcome and a helping hand create the first step toward meaningful conservation."`,
  },
  {
    img: shukuri,
    name: "Shukuri Lasapicho",
    title: "Mt. Kulal Tour Guide",
    details: "Contact: 0729924433",
    quote: `"Every trail tells a story, and every visitor becomes part of Mt. Kulal's legacy."`,
  },
  {
    img: tali,
    name: "Tali Lenyumba",
    title: "Forest Guard",
    details: "Area: Arapal",
  },
  {
    img: lemaim,
    name: "Lemaim Lenawamuro",
    title: "Forest Guard",
    details: "Area: Arapal",
  },
  {
    img: sapuki,
    name: "Sapuki Lengoyiap",
    title: "Forest Guard",
    details: "Area: Gatab Junction Village",
  },
  {
    img: lchekuti,
    name: "Lchekuti Legumato",
    title: "Forest Guard",
    details: "Area: Gatab Lagoon",
  },
  {
    img: lmeli,
    name: "Lmeli Lemunguku",
    title: "Forest Guard",
    details: "Area: Gatab Nkaibelech",
  },
  {
    img: lepolote,
    name: "Lepolote Lolokuria",
    title: "Forest Guard",
    details: "Area: Nkororoi Village",
  },
  {
    img: lkaruni,
    name: "Lkaruni Lenarokushu",
    title: "Forest Guard",
    details: "Area: Larachi Sub-location",
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
                    {m.bio ? (
                      <p className="site-card-copy text-foreground/85">{m.bio}</p>
                    ) : null}
                    {m.details ? (
                      <p className="mt-3 text-sm text-muted-foreground">{m.details}</p>
                    ) : null}
                    {m.quote ? (
                      <blockquote className="mt-4 border-l-2 border-accent pl-4 italic text-muted-foreground">{m.quote}</blockquote>
                    ) : null}
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
              Wazee wa Mazingira believes environmental conservation, indigenous knowledge, and cultural heritage are deeply interconnected. Our work is rooted in community participation; convening elders, empowering youth, and collaborating with local stewards to protect Mount Kulal for present and future generations. When communities lead, conservation endures.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
