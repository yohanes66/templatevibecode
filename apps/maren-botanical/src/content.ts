export const products = [
  {
    slug: "restore-shampoo",
    name: "Restore Shampoo",
    step: "Step 01 — Cleanse",
    image: "shampoo",
    price: 38,
    tag: "New",
    description:
      "A gentle botanical cleanse for the scalp. Stinging nettle and ginseng lift buildup without stripping your hair’s natural oils.",
  },
  {
    slug: "restore-conditioner",
    name: "Restore Conditioner",
    step: "Step 02 — Condition",
    image: "conditioner",
    price: 38,
    description:
      "A nourishing conditioner for softer lengths. Botanical oils help replenish moisture, smooth the strand and make detangling a little easier.",
  },
  {
    slug: "root-serum",
    name: "Root Serum",
    step: "Step 03 — Treat",
    image: "serum",
    price: 64,
    tag: "Bestseller",
    description:
      "A lightweight daily scalp serum. A considered blend of botanicals supports your scalp’s natural balance without weighing your hair down.",
  },
  {
    slug: "the-restore-set",
    name: "The Restore Set",
    step: "All three steps",
    image: "restore-set",
    price: 119,
    tag: "Save 15%",
    description:
      "The complete Restore Ritual: shampoo, conditioner and root serum. Three complementary formulas, one simple routine.",
  },
];

export const ingredients = [
  {
    name: "Stinging Nettle",
    latin: "Urtica dioica",
    image: "nettle",
    benefit: "Mineral-rich leaf that helps calm the scalp and reduce shedding.",
  },
  {
    name: "Panax Ginseng",
    latin: "Panax ginseng root",
    image: "ginseng",
    benefit: "Energises the follicle to support a longer growth phase.",
  },
  {
    name: "Green Tea",
    latin: "Camellia sinensis",
    image: "green-tea",
    benefit: "Antioxidant catechins that shield the root from daily stress.",
  },
  {
    name: "Pumpkin Seed Oil",
    latin: "Cucurbita pepo",
    image: "pumpkin",
    benefit: "Replenishes the scalp’s lipid barrier for lasting comfort.",
  },
  {
    name: "Flaxseed Oil",
    latin: "Linum usitatissimum",
    image: "flaxseed",
    benefit: "Omega-3s that condition the strand and reduce breakage.",
  },
];

export const steps = [
  {
    name: "Cleanse the scalp",
    image: "ritual-cleanse",
    alt: "Woman massaging shampoo into her scalp",
    duration: "1 min",
    instruction:
      "Massage a coin-sized amount into wet roots for 60 seconds, then rinse well. Repeat if needed.",
  },
  {
    name: "Condition the lengths",
    image: "ritual-condition",
    alt: "Woman smoothing conditioner through her hair",
    duration: "3 min",
    instruction:
      "Smooth through mid-lengths to ends, comb through and leave for three minutes before rinsing.",
  },
  {
    name: "Treat the roots",
    image: "ritual-treat",
    alt: "Woman applying root serum to her scalp with a dropper",
    duration: "Daily",
    instruction:
      "Apply 4–6 drops directly to a dry or towel-dried scalp and massage in. Do not rinse.",
  },
];

export const stats = [
  ["+11%", "Increase in hair fibre diameter after 120 days"],
  ["+7%", "Increase in terminal hair density after 120 days"],
  ["−32%", "Less hair shed from the root during combing tests"],
  ["90%", "Of participants noticed visibly healthier growth"],
];

export const reviews = [
  {
    name: "Amelia R.",
    image: "avatar-amelia",
    product: "The Restore Set",
    quote:
      "“After two months my shower drain finally looks normal again. The serum is the step I’d never skip.”",
  },
  {
    name: "Sinta W.",
    image: "avatar-sinta",
    product: "Restore Shampoo",
    quote:
      "“My scalp used to itch by day two. Now it stays calm all week, and my ponytail feels thicker.”",
  },
  {
    name: "Hana K.",
    image: "avatar-hana",
    product: "Root Serum",
    quote:
      "“Light, absorbs fast and smells like a garden after rain. I’ve noticed new baby hairs along my part.”",
  },
];

export const stories = [
  {
    slug: "a-single-leaf",
    category: "Origins",
    title: "Why every formula begins with a single leaf",
    image: "journal-origins",
    body: [
      "A good routine begins with attention. For Maren, that means looking closely at the botanicals we choose and the way they belong together.",
      "Stinging nettle is the starting point of the Restore Ritual. From there, ginseng, green tea and botanical oils each have their place in a balanced formula.",
      "We believe the everyday ritual matters as much as the ingredients: a moment to slow down, care for your scalp and give your hair a gentler beginning.",
    ],
  },
  {
    slug: "the-overlooked-botanical",
    category: "Ingredients",
    title: "Nettle, the overlooked botanical",
    image: "journal-nettle",
    body: [
      "Sometimes the most familiar plants invite a second look. Stinging nettle is one of them: a green leaf with a long tradition in botanical care.",
      "In the Restore Ritual, nettle sits alongside complementary extracts and oils. Every ingredient has a role, and the formula is considered as a whole.",
      "Explore our five botanicals and make room for a routine that feels simple, thoughtful and consistent.",
    ],
  },
  {
    slug: "hair-growth-cycle",
    category: "Hair science",
    title: "Understanding the hair growth cycle",
    image: "journal-science",
    body: [
      "Hair grows in cycles. A period of active growth is followed by transition and rest, before the strand sheds and a new cycle begins.",
      "A consistent routine is a way to care for your scalp over time. Gentle cleansing, conditioning the lengths and a daily scalp ritual can become an easy rhythm.",
      "Persistent changes in shedding or scalp comfort deserve personal advice from a qualified professional. Your routine should work for you.",
    ],
  },
];

export const studySummary =
  "The full ritual was evaluated in a 120-day independent study with 48 participants experiencing excessive shedding, measured through phototrichogram imaging and standardised shedding tests.";

export type Cart = Record<string, number>;
export function readCart(value: string | null): Cart {
  try {
    const parsed: unknown = JSON.parse(value ?? "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return {};
    return Object.fromEntries(
      products.flatMap((p) => {
        const count = (parsed as Record<string, unknown>)[p.slug];
        return typeof count === "number" &&
          Number.isInteger(count) &&
          count > 0 &&
          count <= 99
          ? [[p.slug, count]]
          : [];
      }),
    );
  } catch {
    return {};
  }
}
