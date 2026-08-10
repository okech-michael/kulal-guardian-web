import youth from "@/assets/youth-planting.jpeg";
import wildlife from "@/assets/wildlife.jpg";
import education from "@/assets/education.jpeg";
import elders from "@/assets/community-elders.jpeg";
import officeLaunch from "@/assets/office-launch.jpeg";
import sapling from "@/assets/sapling.jpeg";
import forest from "@/assets/forest-canopy.jpg";
import landscape from "@/assets/kulal-landscape.jpg";
import hero from "@/assets/hero-mount-kulal.jpg";

export type ProjectDownload = { label: string; description: string; kind: string };

export type Project = {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  cover: string;
  location: string;
  status: "Ongoing" | "Scaling" | "Completed";
  years: string;
  partners: string[];
  challenge: string[];
  activities: { title: string; body: string }[];
  results: { value: string; label: string }[];
  outcomes: string[];
  gallery: { src: string; caption: string }[];
  testimonial: { quote: string; name: string; role: string };
  downloads: ProjectDownload[];
};

export const projects: Project[] = [
  {
    slug: "kulal-indigenous-tree-initiative",
    tag: "Reforestation",
    title: "Kulal Indigenous Tree Initiative",
    summary:
      "Restoring 50 hectares of degraded cloud forest with indigenous species nurtured by local women's groups.",
    cover: youth,
    location: "Gatab, Arapal & Larachi, Mount Kulal",
    status: "Ongoing",
    years: "2019 — present",
    partners: ["Kenya Forest Service", "Marsabit County Government", "Village women's groups"],
    challenge: [
      "Mount Kulal's cloud forest is an isolated island of moisture in one of Kenya's driest counties. It feeds the springs that sustain thousands of pastoralist households, yet decades of charcoal burning, fuelwood harvesting and prolonged drought have thinned its canopy along the lower slopes.",
      "Conventional replanting projects failed here because seedlings were trucked in from lowland nurseries, poorly matched to altitude, and abandoned after the launch ceremony. What Kulal needed was not more seedlings, but local ownership of the entire chain: seed collection, nursery, planting and aftercare.",
    ],
    activities: [
      { title: "Community seed banks", body: "Elders identify mother trees of Olea africana, Juniperus procera and Hagenia abyssinica; youth collect and store seed with traditional drying methods." },
      { title: "Three village nurseries", body: "Women's groups in Gatab, Arapal and Larachi run the nurseries, earning income per surviving seedling rather than per seedling delivered." },
      { title: "Rain-window planting", body: "Planting is timed to the short and long rains, with basins dug ahead of the first storms to trap runoff." },
      { title: "Twelve-month aftercare", body: "Each planting block is assigned to a household that waters, mulches and protects it through the first dry season." },
    ],
    results: [
      { value: "42,000+", label: "Indigenous seedlings raised" },
      { value: "78%", label: "Seedling survival rate" },
      { value: "50 ha", label: "Forest under restoration" },
      { value: "9", label: "Women's groups earning income" },
    ],
    outcomes: [
      "Three previously dry seasonal springs now flow for an additional six weeks each year.",
      "Household income from nursery work averages KES 6,400 per month during planting seasons.",
      "Charcoal kiln sightings in the restoration blocks have fallen by more than two thirds.",
    ],
    gallery: [
      { src: sapling, caption: "A Hagenia seedling ready for the long rains" },
      { src: forest, caption: "Restored canopy on the eastern slope" },
      { src: youth, caption: "Youth planting crew at Arapal" },
    ],
    testimonial: {
      quote:
        "We used to plant trees for visitors to photograph. Now we plant them for our grandchildren to sit under, and we are paid for the ones that live.",
      name: "Naserian Lengoiyap",
      role: "Gatab Women's Nursery Group",
    },
    downloads: [
      { label: "Project brief (2026)", description: "Eight-page overview of methodology, budget and outcomes.", kind: "PDF" },
      { label: "Species & survival dataset", description: "Per-block planting records and annual survival counts.", kind: "CSV" },
    ],
  },
  {
    slug: "community-office-launch",
    tag: "Institutional",
    title: "Community Conservation Office",
    summary:
      "A permanent base at Gatab where conservation planning, outreach and partnership work is coordinated.",
    cover: officeLaunch,
    location: "Gatab Town, Mount Kulal",
    status: "Completed",
    years: "2024 — 2025",
    partners: ["Marsabit County Government", "Local business community"],
    challenge: [
      "For years Wazee wa Mazingira operated from under a tree. Records were kept in members' homes, visiting partners had nowhere to meet, and reporting relied on whoever happened to be travelling to Marsabit town with a phone signal.",
      "Without a physical base, institutional memory was fragile and the organisation was difficult for funders to assess.",
    ],
    activities: [
      { title: "Site negotiation", body: "The community allocated land at Gatab junction through a public baraza and elders' consensus." },
      { title: "Construction with local labour", body: "Built by artisans from Gatab and Nkororoi using locally sourced stone and timber offcuts." },
      { title: "Records digitisation", body: "Two decades of paper minutes, membership rolls and planting records were scanned and indexed." },
      { title: "Public opening", body: "Launched with county officials, elders and youth groups in attendance." },
    ],
    results: [
      { value: "1", label: "Permanent community office" },
      { value: "20 yrs", label: "Of records digitised" },
      { value: "14", label: "Partner meetings hosted" },
      { value: "6", label: "Local artisans employed" },
    ],
    outcomes: [
      "Visitors, researchers and county officers now have a single point of contact on the mountain.",
      "Membership registration moved from a notebook to a maintained register with over 400 active members.",
    ],
    gallery: [
      { src: officeLaunch, caption: "Opening day at the Gatab office" },
      { src: elders, caption: "Elders' council in session" },
    ],
    testimonial: {
      quote: "The office gave us an address. An address gave us partners.",
      name: "Timothy Lmaimpya Ledany",
      role: "Secretary, Wazee wa Mazingira",
    },
    downloads: [
      { label: "Office launch report", description: "Construction, costs and community contribution summary.", kind: "PDF" },
    ],
  },
  {
    slug: "biodiversity-watch",
    tag: "Biodiversity",
    title: "Kulal Biodiversity Watch",
    summary:
      "Citizen-science monitoring of birds, mammals and pollinators across the Kulal ecosystem.",
    cover: wildlife,
    location: "Mount Kulal ecosystem, Marsabit County",
    status: "Scaling",
    years: "2021 — present",
    partners: ["National Museums of Kenya", "Community ranger network"],
    challenge: [
      "Mount Kulal is a UNESCO Biosphere Reserve, yet almost no continuous wildlife data existed for the massif. Conservation decisions were being made on the strength of anecdote and decade-old surveys.",
      "Professional survey teams are expensive and visit rarely. The people who walk these slopes daily — herders, guards and guides — held the observations, but had no way to record them.",
    ],
    activities: [
      { title: "Ranger training", body: "Community rangers trained in transect walking, species identification and standardised data forms." },
      { title: "Quarterly transects", body: "Fixed routes across four altitude bands, walked at dawn every quarter." },
      { title: "Pollinator plots", body: "Monitoring of bee and butterfly activity in restored versus degraded blocks." },
      { title: "Data contribution", body: "Records submitted to national biodiversity databases and shared back with the community in plain language." },
    ],
    results: [
      { value: "3", label: "Bird species newly recorded" },
      { value: "16", label: "Trained community rangers" },
      { value: "4", label: "Altitude bands monitored" },
      { value: "20", label: "Quarterly survey rounds" },
    ],
    outcomes: [
      "Documented the return of greater kudu to the eastern slopes after years of absence.",
      "Pollinator counts in restored blocks are running roughly double those in adjacent degraded land.",
    ],
    gallery: [
      { src: wildlife, caption: "Wildlife on the Kulal massif" },
      { src: landscape, caption: "Survey transect across the eastern band" },
    ],
    testimonial: {
      quote:
        "I have herded on this mountain since I was a boy. Now what I see is written down, and it counts for something.",
      name: "Lkaruni Lenarokushu",
      role: "Forest Guard, Larachi",
    },
    downloads: [
      { label: "Species checklist", description: "Cumulative list of recorded species by altitude band.", kind: "PDF" },
      { label: "Transect data", description: "Raw quarterly observation records.", kind: "CSV" },
    ],
  },
  {
    slug: "green-schools-of-kulal",
    tag: "Education",
    title: "Green Schools of Kulal",
    summary:
      "Environmental clubs in 14 primary and secondary schools across Loiyangalani, Gatab and Kargi wards.",
    cover: education,
    location: "Loiyangalani, Gatab & Kargi wards",
    status: "Ongoing",
    years: "2018 — present",
    partners: ["School boards", "Ministry of Education (county office)"],
    challenge: [
      "Children in Kulal grow up surrounded by one of Kenya's rarest ecosystems, yet the syllabus they study describes forests they will never visit and rivers that do not exist here.",
      "Meanwhile, schools were spending scarce budget on fuelwood and had no shade in compounds that reach punishing temperatures by mid-morning.",
    ],
    activities: [
      { title: "School environmental clubs", body: "Weekly club sessions led by trained patron teachers with locally written lesson material." },
      { title: "School tree nurseries", body: "Each participating school runs a nursery that supplies its own compound and sells surplus seedlings." },
      { title: "Field days on the mountain", body: "Learners walk the restoration blocks and meet the rangers and elders who manage them." },
      { title: "Inter-school conservation festival", body: "An annual competition of debates, plays and nursery yields." },
    ],
    results: [
      { value: "3,200+", label: "Learners reached" },
      { value: "14", label: "Schools with active clubs" },
      { value: "9,000+", label: "Trees planted in school compounds" },
      { value: "8", label: "Annual festivals held" },
    ],
    outcomes: [
      "Several club alumni have returned as forest guards and nursery supervisors.",
      "Participating schools report measurable shade cover and reduced fuelwood spending.",
    ],
    gallery: [
      { src: education, caption: "Club session in Gatab" },
      { src: youth, caption: "Learners planting on field day" },
    ],
    testimonial: {
      quote:
        "My pupils can name thirty indigenous trees now. Five years ago they could name three, and two of those were exotics.",
      name: "Patron Teacher",
      role: "Gatab Primary School",
    },
    downloads: [
      { label: "Club curriculum guide", description: "Term-by-term lesson outlines for patron teachers.", kind: "PDF" },
    ],
  },
  {
    slug: "elders-indigenous-knowledge",
    tag: "Heritage",
    title: "Elders & Indigenous Knowledge",
    summary:
      "Documenting traditional ecological knowledge and embedding it in modern conservation planning.",
    cover: elders,
    location: "Mount Kulal & surrounding settlements",
    status: "Ongoing",
    years: "2016 — present",
    partners: ["Community elders' councils", "Cultural heritage researchers"],
    challenge: [
      "The management rules that kept Mount Kulal intact for generations were never written down. They live in the memory of elders — grazing rotations, sacred groves, taboos on felling certain species near water.",
      "As that generation passes, the risk is not only cultural loss but practical loss: conservation plans drawn up without this knowledge repeatedly failed on the ground.",
    ],
    activities: [
      { title: "Quarterly elders' councils", body: "Structured recorded sessions on grazing, water, forest taboos and seasonal indicators." },
      { title: "Oral history archive", body: "Audio recordings in Samburu and Rendille, transcribed and indexed by theme." },
      { title: "Knowledge-to-plan workshops", body: "Elders and technical staff jointly translate customary rules into operational management guidance." },
      { title: "Intergenerational walks", body: "Elders lead youth across the mountain naming places, species and their governing rules." },
    ],
    results: [
      { value: "40", label: "Elders' councils convened" },
      { value: "120+", label: "Hours of oral history recorded" },
      { value: "7", label: "Sacred groves formally mapped" },
      { value: "2", label: "Languages archived" },
    ],
    outcomes: [
      "Customary grazing rotations are now built into the mountain's grazing management plan.",
      "Sacred grove boundaries are recognised in county-level restoration planning.",
    ],
    gallery: [
      { src: elders, caption: "Elders' council session" },
      { src: hero, caption: "The mountain the rules were written for" },
    ],
    testimonial: {
      quote:
        "We did not invent conservation. We are only writing down what our fathers already knew before it disappears with us.",
      name: "Joseph Leiti Lengoiyap",
      role: "Chairperson, Wazee wa Mazingira",
    },
    downloads: [
      { label: "Indigenous knowledge compendium", description: "Thematic summary of documented customary practice.", kind: "PDF" },
      { label: "Sacred grove map", description: "Mapped boundaries of the seven recorded groves.", kind: "PDF" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
