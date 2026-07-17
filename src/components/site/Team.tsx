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
import josephLekupuny from "@/assets/Joseph-lekupuny.jpeg";
import peterLekula from "@/assets/Forest-guard-Lolkujita.jpeg";

const teamMembers = [
  {
    img: chairman,
    name: "Joseph Leiti Lengoiyap",
    title: "Chairperson",
    roleDescription: "Provides strategic leadership for the organization and represents Wazee wa Mazingira in partnerships, public engagement, and conservation planning across Mount Kulal.",
    quote: `"Protecting Mount Kulal today is preserving our heritage for generations yet to come."`,
  },
  {
    img: secretary,
    name: "Timothy Lmaimpya Ledany",
    title: "Secretary",
    roleDescription: "Coordinates records, communications, and member activities so conservation efforts remain documented, organized, and responsive to community needs.",
    quote: `"Every record we keep and every voice we hear strengthens the future of conservation."`,
  },
  {
    img: treasurer,
    name: "Moses Lemuni",
    title: "Treasurer",
    roleDescription: "Oversees financial stewardship with transparency so resources are directed toward conservation programs, community support, and long-term environmental protection.",
    quote: `"True stewardship is measured by how faithfully every resource serves both people and nature."`,
  },
  {
    img: receptionist,
    name: "Joseph Lengoiyap",
    title: "Receptionist",
    roleDescription: "Serves as the first point of contact for visitors, community members, and partners, welcoming guests and coordinating office communication at the Wazee wa Mazingira office in Gatab.",
    details: "Office: Wazee wa Mazingira Office • Location: Gatab",
    quote: `"A warm welcome and a helping hand create the first step toward meaningful conservation."`,
  },
  {
    img: shukuri,
    name: "Shukuri Lasapicho",
    title: "Mt. Kulal Tour Guide",
    roleDescription: "Guides visitors through Mount Kulal's landscapes, sharing conservation stories while promoting responsible travel and appreciation for the mountain's cultural and ecological value.",
    details: "Contact: 0729924433",
    quote: `"Every trail tells a story, and every visitor becomes part of Mt. Kulal's legacy."`,
  },
  {
    img: tali,
    name: "Tali Lenyumba",
    title: "Forest Guard",
    roleDescription: "Protects the forests of Arapal by monitoring wildlife habitats, preventing illegal activity, and supporting community-led conservation around the area.",
    details: "Area: Arapal",
  },
  {
    img: lemaim,
    name: "Lemaim Lenawamuro",
    title: "Forest Guard",
    roleDescription: "Works closely with the Arapal community to preserve forest ecosystems through regular patrols, awareness initiatives, and protection of indigenous vegetation and wildlife.",
    details: "Area: Arapal",
  },
  {
    img: sapuki,
    name: "Sapuki Lengoyiap",
    title: "Forest Guard",
    roleDescription: "Oversees conservation efforts around Gatab Junction Village by protecting forest resources, reporting environmental threats, and encouraging responsible use of natural resources.",
    details: "Area: Gatab Junction Village",
  },
  {
    img: lchekuti,
    name: "Lchekuti Legumato",
    title: "Forest Guard",
    roleDescription: "Supports conservation near Gatab Lagoon through routine patrols, habitat protection, and collaboration with local residents to maintain biodiversity.",
    details: "Area: Gatab Lagoon",
  },
  {
    img: lmeli,
    name: "Lmeli Lemunguku",
    title: "Forest Guard",
    roleDescription: "Safeguards the forests of Gatab Nkaibelech by preventing illegal logging, supporting restoration efforts, and promoting environmental stewardship among local communities.",
    details: "Area: Gatab Nkaibelech",
  },
  {
    img: lepolote,
    name: "Lepolote Lolokuria",
    title: "Forest Guard",
    roleDescription: "Protects the forests surrounding Nkororoi Village by preserving wildlife habitats, monitoring conservation activities, and strengthening community participation in environmental protection.",
    details: "Area: Nkororoi Village",
  },
  {
    img: lkaruni,
    name: "Lkaruni Lenarokushu",
    title: "Forest Guard",
    roleDescription: "Leads conservation efforts within Larachi Sub-location through regular forest patrols, protection of indigenous ecosystems, and partnerships with residents to promote sustainable natural resource management.",
    details: "Area: Larachi Sub-location",
  },
  {
    img: josephLekupuny,
    name: "Joseph Lekupuny",
    title: "Forest Guard",
    roleDescription: "Protects the forests around Mbarnat village by conducting patrols, preventing illegal activity, and supporting the local community in sustainable conservation practices.",
    details: "Area: Mbarnat village",
  },
  {
    img: peterLekula,
    name: "Peter Lekula",
    title: "Forest Guard",
    roleDescription: "Supports conservation efforts in Lolkujita by monitoring forest conditions, helping prevent environmental threats, and strengthening community stewardship of the area.",
    details: "Area: Lolkujita",
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
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-card transition-transform hover:-translate-y-1">
                  <div className="flex items-center gap-5">
                    <div className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 flex-shrink-0 overflow-hidden rounded-full border border-border/60 bg-muted">
                      <img src={m.img} alt={m.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="site-card-title">{m.name}</h3>
                      <p className="mt-1 text-base font-semibold uppercase tracking-[0.12em] text-muted-foreground">{m.title}</p>
                      {m.title === "Mt. Kulal Tour Guide" && m.details ? (
                        <p className="mt-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Contact:</span>{" "}
                          <span className="font-semibold">{m.details.replace("Contact: ", "")}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    {m.roleDescription ? (
                      <p className="text-base leading-relaxed text-foreground/80">{m.roleDescription}</p>
                    ) : null}
                    {m.details && m.title !== "Mt. Kulal Tour Guide" ? (
                      <p className="mt-3 text-base text-muted-foreground">{m.details}</p>
                    ) : null}
                    {m.quote ? (
                      <blockquote className="mt-4 border-l-2 border-accent pl-4 text-base italic text-muted-foreground">{m.quote}</blockquote>
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
