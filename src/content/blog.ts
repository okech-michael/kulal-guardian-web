import canopy from "@/assets/forest-canopy.jpg";
import landscape from "@/assets/kulal-landscape.jpg";
import wildlife from "@/assets/wildlife.jpg";
import elders from "@/assets/community-elders.jpeg";
import youth from "@/assets/youth-planting.jpeg";
import sapling from "@/assets/sapling.jpeg";

export type Post = {
  slug: string;
  title: string;
  category: "Conservation" | "Community" | "Youth" | "Climate" | "Culture" | "Wildlife";
  excerpt: string;
  date: string;
  readingTime: number;
  author: string;
  authorRole: string;
  image: string;
  imageAlt: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "the-forest-that-makes-rain",
    title: "The forest that makes rain",
    category: "Conservation",
    excerpt:
      "On Mount Kulal, the cloud forest does not wait for rain — it harvests it from the air. Understanding that single fact explains almost everything about why this mountain must be protected.",
    date: "12 March 2025",
    readingTime: 9,
    author: "Wazee wa Mazingira",
    authorRole: "Conservation team",
    image: canopy,
    imageAlt: "Mist moving through the ancient forest canopy of Mount Kulal",
    body: `
Stand on the eastern ridge of Mount Kulal at five in the morning and you will hear water where there should be none. Below you, the Chalbi desert stretches out grey and silent. Above you, in the dark, the forest is dripping.

## Water out of air

The mechanism is called occult precipitation, and it is one of the quieter miracles of tropical highland ecology. Moist air pushed inland from Lake Turkana rises against the flank of the mountain, cools, and condenses into a near-permanent band of mist. That mist does not fall as rain. Instead it drifts through the canopy, where millions of leaf surfaces, lichens and mosses comb the droplets out of the air. The droplets merge, run down branches and trunks, and reach the soil.

A mature cloud forest can deliver more water to the ground this way than the rain gauge ever records. On Kulal, elders describe entire dry seasons where the sky gave nothing and the springs still ran. The forest was doing the work.

> "The rain comes from the trees. When you cut the trees, you are not clearing land — you are closing a tap." — a Samburu elder, Gatab

## Why the canopy is not decoration

This is the part that outside planners have historically found hardest to accept. A forest that captures mist only works if it retains its structure. The tall emergent trees intercept the highest moisture. The middle canopy holds humidity long enough for condensation to continue after the mist has passed. The understorey and leaf litter slow the water so it soaks into volcanic soil rather than sheeting off the slope.

Remove any one layer and the system degrades disproportionately. Selective logging of the largest trees — historically the most commercially attractive activity — removes precisely the layer doing the most atmospheric work. A forest can look intact from a distance while its water function has already collapsed.

## What the springs mean downslope

Twelve major springs emerge from the base of the Kulal massif. They supply drinking water to settlements, watering points for cattle, camels, goats and sheep, and dry-season refuge for wildlife pushed off the plains. In a drought year, the difference between a functioning spring and a dry one is the difference between a household staying on its land and joining the slow migration toward town.

This is why we describe forest protection here as drought infrastructure rather than environmentalism. The vocabulary matters. When conservation is framed as an aesthetic preference, it competes with survival. When it is framed as water security, it becomes survival.

## The work, in practice

Protecting the water function of Kulal comes down to unglamorous, repeated tasks:

- Walking the forest boundary and recording new cutting, encroachment and fire scars.
- Raising indigenous seedlings — *Juniperus procera*, *Olea europaea* subsp. *cuspidata*, *Podocarpus falcatus* — in community nurseries rather than importing fast-growing exotics that drink more than they give.
- Negotiating grazing calendars so that highland pastures rest during regeneration windows.
- Protecting spring eyes with fencing and vegetated buffers so livestock cannot trample the source.
- Training young people to do all of the above, so that the knowledge outlives the people who hold it.

None of this photographs like a rescue. All of it is why the springs still run.

## A measurable promise

Since our community nurseries began operating at scale, more than forty thousand indigenous seedlings have gone into the ground across the reserve's degraded margins. Survival rates in the mist belt exceed seventy percent — remarkably high for dryland restoration — precisely because the forest they are joining still makes its own weather.

Every seedling that survives to canopy height adds a fraction of a litre per hour to the mountain's harvest. Multiply that across decades and you begin to understand what the elders were protecting when they started walking these ridges in 1971.
`,
  },
  {
    slug: "fifty-years-of-elders",
    title: "Fifty years of elders: how a movement began without funding",
    category: "Culture",
    excerpt:
      "Wazee wa Mazingira means 'Elders of the Environment'. It started as an unpaid agreement between neighbours and became an internationally recognised conservation institution.",
    date: "2 February 2025",
    readingTime: 8,
    author: "Wazee wa Mazingira",
    authorRole: "Heritage & culture desk",
    image: elders,
    imageAlt: "Elders of the Mount Kulal community in discussion under a tree",
    body: `
There is no founding document. There is no launch photograph. What exists instead is a memory, repeated consistently by people who were young at the time: a series of conversations, held under trees, about springs that were arriving late.

## The problem the elders named

By the late 1960s the pattern was clear to anyone who moved livestock seasonally. Water points that had been reliable within living memory were becoming unreliable. The obvious explanations — poor rains, more animals — were true but incomplete. The elders who would become Wazee wa Mazingira added a third: the forest above the springs was thinning.

That observation required no scientific instrument. It required a lifetime of walking the same paths and the cultural habit of comparing what you see now with what your grandparents described.

## Authority without office

The movement's first tool was legitimacy. In pastoralist governance, elders hold the authority to set grazing seasons, arbitrate access to water, and impose social consequences on those who ignore agreements. Wazee wa Mazingira did not invent a new institution; it pointed an existing one at a new problem.

The early rules were simple and enforceable by reputation rather than by police:

- No cutting of the large canopy species anywhere in the mist belt.
- No settlement expansion above an agreed contour.
- No charcoal production inside the reserve, for any buyer, at any price.
- Seasonal rest for the highland pastures, announced publicly and observed collectively.

Compliance was not perfect. It never is. But it was high enough, for long enough, that the forest above the springs survived a period in which comparable highland forests across the region were cleared.

## Recognition, eight years later

In 1979, Mount Kulal was designated a UNESCO Biosphere Reserve under the Man and the Biosphere programme. From the outside, this looked like an international body conferring status on a place. From the inside, it looked like confirmation of an argument the elders had been making for a decade: that this landscape was exceptional, and that its exceptional character was inseparable from the people living in it.

Biosphere reserves are explicitly designed around that idea — a protected core, a buffer of managed use, and a transition zone of settlement and livelihood. It is one of the few international conservation frameworks that starts by assuming people belong in the landscape.

> "We were not given a mandate in 1979. We were given a name for what we were already doing."

## What changed, and what did not

Over five decades the movement acquired the apparatus of an organisation: a registered community-based organisation, an office, bank accounts, project reporting, nursery infrastructure, a youth programme with formal training modules, and eventually international recognition through the UNESCO-Greece Melina Mercouri International Prize.

What did not change is where decisions are made. Every project on Kulal still begins in a village meeting, and every plan still has to survive questioning by people who will personally live with the outcome. Outside funding is welcome. Outside direction, historically, has been the thing most likely to fail here.

## The succession problem

The founding generation is passing. This is the single largest risk the movement carries — larger than drought, larger than funding. Ecological memory is not written down. The knowledge of which slope regenerates after fire, which spring responds to which rainfall pattern, which tree indicates groundwater, exists in the heads of people in their seventies and eighties.

Our youth programme exists for exactly this reason. It is often described as employment or skills training, and it is both. But its central purpose is transmission: pairing young scouts with elders on the same ridge, on the same walk, until the observations transfer.

Fifty years in, that is the work that matters most.
`,
  },
  {
    slug: "youth-who-stayed",
    title: "The youth who stayed",
    category: "Youth",
    excerpt:
      "In every dryland community, young people face the same question: leave, or find a future here. On Mount Kulal, a growing number are choosing the mountain.",
    date: "18 January 2025",
    readingTime: 7,
    author: "Wazee wa Mazingira",
    authorRole: "Youth programme",
    image: youth,
    imageAlt: "Young conservation scouts planting seedlings on the slopes of Mount Kulal",
    body: `
The statistics on rural youth migration in northern Kenya are not subtle. Where there is no visible economic future, young people leave — for Marsabit town, for Nairobi, for whatever work can be found. What follows is predictable: households lose labour, elders lose successors, and landscapes lose the daily human attention that keeps agreements enforced.

## Making the second option real

Our youth conservation programme is built on a straightforward premise. If staying is going to compete with leaving, staying has to offer training, income and status. Not one of the three — all three.

The programme runs across several tracks:

**Forest scouting.** Trainees learn boundary patrol, incident recording, GPS mapping and basic ecological monitoring. They produce the data that makes our reporting credible to partners, and they are the first responders when fire or illegal cutting is spotted.

**Nursery management.** Seed collection from identified mother trees, germination protocols for slow indigenous species, potting, hardening off, and transplant timing. This is technical work with a long feedback loop; it teaches patience.

**Beekeeping and forest enterprise.** Honey from the mist belt is exceptional and commands a premium. It is also the clearest demonstration available that an intact forest pays better than a burned one.

**Eco-guiding and interpretation.** Visitors to a UNESCO Biosphere Reserve want more than a viewpoint. Guides trained in ecology, cultural history and hospitality convert the mountain's status into local income.

**Digital and advocacy skills.** Mapping, photography, reporting and climate advocacy — the tools that let this community speak for itself in rooms where decisions about it are made.

## Pairing with elders

Every track includes time on the mountain with elders. This is non-negotiable and it is the part participants most often single out afterwards. A trainee can learn a germination protocol from a manual. They can only learn which specific slope holds moisture into September by walking it with someone who has watched it for sixty years.

> "I came for the stipend. I stayed because I realised nobody outside this place actually knows this mountain."

## Results, honestly stated

More than six hundred young people have passed through some part of the programme. Not all of them stayed in conservation — many used the training as a stepping stone, which we consider a legitimate outcome. What we can say is that the number of trained, equipped people walking the forest boundary each month is now higher than at any point in the movement's history, and that incident response times have fallen sharply.

We can also say that the age profile of decision-making meetings has changed. Ten years ago, a village conservation meeting was overwhelmingly grey-haired. Today it is not.

## What we still need

Equipment remains the constraint. Boots, rain gear, GPS units, first aid kits, radios and reliable stipends are the difference between a motivated volunteer and a functioning scout. A single fully equipped scout costs less than most organisations spend on a workshop, and produces data every week for years.

If there is one thing worth funding on this mountain, it is a young person who decided to stay.
`,
  },
  {
    slug: "island-in-the-desert",
    title: "An island in the desert: the biodiversity of Mount Kulal",
    category: "Wildlife",
    excerpt:
      "Isolated by desert on all sides, Kulal's highland forest has been evolving on its own terms for a very long time. The result is a species list found nowhere else.",
    date: "9 December 2024",
    readingTime: 8,
    author: "Wazee wa Mazingira",
    authorRole: "Monitoring team",
    image: wildlife,
    imageAlt: "Wildlife within the Mount Kulal Biosphere Reserve",
    body: `
Biologists use the phrase *sky island* for a highland ecosystem separated from others by inhospitable lowland. The metaphor is exact on Kulal. The forest sits at altitude, surrounded on every side by arid plains that most montane species cannot cross. What lives up there has, in evolutionary terms, been marooned.

## What isolation produces

Isolation produces endemism. Populations cut off from their relatives drift, adapt and eventually diverge. Kulal's most famous example is the White-eye that carries the mountain's name — a bird whose entire global range is measured in a handful of square kilometres of this forest. It is a species that exists because this canopy exists, and would not survive the canopy's loss.

The plant list runs past seven hundred documented species, with the mist belt supporting juniper, wild olive and podocarpus stands alongside an understorey of ferns, orchids and mosses more typical of far wetter regions of Kenya. Over one hundred and eighty bird species have been recorded across the reserve, mixing highland forest specialists with dryland and migratory species using the mountain as a refuge.

## Wildlife under pressure

Larger fauna use Kulal as dry-season refuge. Greater kudu, klipspringer, baboon troops, leopard, and a long list of smaller mammals concentrate around the mountain when the plains fail. In severe drought years, that concentration is extreme — and it is precisely then that human and livestock pressure on the same water sources peaks.

Managing that convergence is one of the harder ongoing negotiations in our work. Protecting a spring absolutely means excluding livestock. Excluding livestock in a drought means asking a herder to accept losses. Sustainable answers here look like buffered access points, rotational timing and compensation mechanisms — not fences and prohibition.

## Monitoring without a budget

Formal ecological survey is expensive. Our approach has been to build a monitoring system out of the people already walking the mountain. Scouts record sightings, water levels, fire scars, cutting incidents and phenology — when species flower, fruit and seed — on a standard form. Over years, that dataset becomes genuinely valuable, and it is owned by the community that produced it.

> A dataset gathered by outsiders leaves when the project ends. A dataset gathered by residents stays.

## Climate is changing the baseline

The mist belt is the vulnerable variable. Cloud forests worldwide are sensitive to changes in the altitude at which condensation occurs; a warming atmosphere lifts that band upward. On a mountain of finite height, the moisture band can eventually rise above the summit, and the forest that depends on it has nowhere to go.

We do not have the instrumentation to measure that shift precisely on Kulal, and we would welcome research partners who do. What our scouts report anecdotally is consistent with the global pattern: mist arriving later, sitting higher, and clearing faster than elders remember.

## Why it matters beyond the mountain

An endemic bird is a compelling reason to protect a forest, but it is rarely a sufficient one for a household deciding whether to cut a tree. The stronger argument is the one this mountain makes for itself: the same canopy structure that shelters endemic species is the structure that harvests water for people. Biodiversity here is not in competition with human need. It is the mechanism that serves it.
`,
  },
  {
    slug: "drought-and-the-grazing-calendar",
    title: "Drought and the grazing calendar",
    category: "Climate",
    excerpt:
      "Pastoralist grazing systems are often described as a threat to rangelands. On Mount Kulal, a well-run grazing calendar is one of the most effective conservation tools we have.",
    date: "21 October 2024",
    readingTime: 7,
    author: "Wazee wa Mazingira",
    authorRole: "Rangelands working group",
    image: landscape,
    imageAlt: "The arid plains beneath Mount Kulal during the dry season",
    body: `
The default outside assumption about pastoralism in the drylands is that it degrades land. Too many animals, too little grass, an inevitable tragedy of the commons. It is a durable idea, and on Mount Kulal it is mostly wrong.

## Mobility is the management

Dryland vegetation is adapted to being grazed hard and then left alone. What damages it is not intensity but continuity — the same pasture grazed every month of every year without recovery. Traditional pastoralist systems avoid exactly that through mobility: herds move on a seasonal circuit, and specific pastures are held in reserve.

On Kulal, highland pasture is traditionally treated as dry-season reserve. It is deliberately not grazed during the rains, when lowland grass is available, so that it carries forage into the hardest months. The rule is ecological and social at once, and it is enforced by elders rather than by fence.

## What has been breaking the system

Three pressures have strained the calendar:

**Settlement.** Permanent settlement near water points converts mobile grazing into continuous grazing in a radius around each village. The vegetation nearest the water takes the damage.

**Loss of grazing corridors.** Where movement between seasonal pastures is blocked — by land tenure change, conflict, or infrastructure — herds are forced to stay put.

**Compressed drought cycles.** When drought returns before the pasture has recovered from the previous one, the reserve is consumed early and there is nothing behind it.

## Working with the calendar, not against it

Our rangelands work does not attempt to reduce herd numbers by decree; that approach has failed everywhere it has been tried without alternatives. Instead it strengthens the institution that already exists:

- Publicly agreed opening and closing dates for highland pasture each season, announced through the same channels that always carried them.
- Protected spring buffers so that water access does not destroy the vegetation around the source.
- Reseeding and gully control on the most degraded lowland patches, so that pressure on the highland reserve is reduced.
- Fodder banks and hay storage as a genuinely new element — a hedge against the compressed drought cycle that traditional practice never had to plan for.

## Drought response as conservation

The most damaging thing that happens to Kulal's forest is a desperate drought. When lowland forage fails completely, herds move upslope into the mist belt, browse regenerating seedlings, and trample soil in the exact zone where restoration is most fragile. Years of nursery work can be undone in weeks.

That is why we treat drought preparedness — fodder reserves, early warning, water point management, destocking support — as forest conservation. The forest survives droughts in proportion to how well the communities beneath it survive them.

> Every drought that a household weathers on the plains is a drought the forest does not have to absorb.

## The honest position

We are not going to out-argue the climate. What we can do is widen the margin: more reserve pasture, more stored fodder, better water distribution, earlier warning, and a functioning social agreement about where animals go when things get bad. That margin is the difference between a hard year and an irreversible one.
`,
  },
  {
    slug: "a-seedling-is-a-fifty-year-promise",
    title: "A seedling is a fifty-year promise",
    category: "Community",
    excerpt:
      "Indigenous highland trees grow slowly. Planting one is an act of confidence in a community's continuity — and a logistical exercise most restoration projects underestimate.",
    date: "5 September 2024",
    readingTime: 6,
    author: "Wazee wa Mazingira",
    authorRole: "Nursery programme",
    image: sapling,
    imageAlt: "An indigenous seedling raised in a community nursery on Mount Kulal",
    body: `
There is a reason so many tree-planting campaigns choose fast-growing exotics. They germinate reliably, grow visibly within a single reporting cycle, and photograph well. On Mount Kulal we mostly do not plant them, and the reason is water.

## Slow trees, honest water

An *Eucalyptus* will outgrow a *Juniperus procera* many times over in the first five years, and will draw far more groundwater doing it. On a mountain whose entire value proposition is water yield, planting thirsty fast growers to hit a seedling count would be self-defeating.

So our nurseries work with what belongs here: African pencil cedar, wild olive, podocarpus, croton, and a range of understorey species collected as seed from identified mother trees within the reserve. These species germinate unevenly, need shade and patience in the nursery, and take years to reach canopy. They also happen to be the species the mist belt is made of.

## What a nursery actually involves

Running a community nursery is less romantic than it sounds:

1. **Seed collection** from mapped mother trees, timed to fruiting, which varies by species and by year.
2. **Pre-treatment** — many highland species need soaking, scarification or specific temperature handling before they will germinate at all.
3. **Germination beds** under shade netting, watered consistently through the dry months.
4. **Potting on** into tubes with the right soil mix, which for volcanic highland soils means getting drainage right or losing the batch to rot.
5. **Hardening off** — gradually exposing seedlings to sun and wind so they survive transplant shock.
6. **Transplant timing** — putting seedlings into the ground at the start of a reliable wet window, not when a visiting delegation happens to be available.
7. **Aftercare** — the step almost everyone skips, and the step that determines survival rate.

## Survival rate is the only honest metric

Seedlings planted is a vanity number. Any organisation can raise it. Seedlings alive after three years is the figure that reflects whether restoration actually happened.

In the mist belt, our survival rates exceed seventy percent, which is high for dryland restoration and is largely a function of two things: planting the right species in the right microsite, and having local scouts responsible for aftercare in the seasons afterwards. On the drier lower margins, survival drops substantially, and we say so.

## Who owns the trees

Each nursery is managed by a community group, and the seedlings belong to the villages that raise them. Some go into reserve restoration; others go to households for woodlots, shade, fruit and fodder. That distribution is deliberate. A restoration programme that only puts trees in a protected area, and none in the hands of the people living beside it, is a programme that will need guards forever.

> The best protection a tree can have is a household that wanted it there.

## The long arithmetic

A cedar planted this season will not function as a mist-harvesting canopy tree within the working life of the person who planted it. That is the point. The elders who started this work in 1971 planted trees they knew they would not sit under.

Fifty-four years later, some of those trees are catching water for people who never met them.
`,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export const categories = Array.from(new Set(posts.map((p) => p.category)));
