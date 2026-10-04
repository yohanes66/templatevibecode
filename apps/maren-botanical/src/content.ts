export type ShopProduct = {
  slug: string;
  name: string;
  step: string;
  image: string;
  price: number;
  description: string;
  tag?: string;
  crop?: number[];
  shadeIndex?: number;
};

export const shades = [
  {
    name: "Bare",
    color: "#d9b49e",
    dark: false,
    left: -46.87,
    description: "A soft nude for an effortless, everyday finish.",
  },
  {
    name: "Petal",
    color: "#edb8bf",
    dark: false,
    left: -212.11,
    description: "A fresh petal pink that brightens your day.",
  },
  {
    name: "Rosewood",
    color: "#99545a",
    dark: true,
    left: -375.39,
    description: "A soft brick-rose that warms every skin tone.",
  },
  {
    name: "Fig",
    color: "#6e3446",
    dark: true,
    left: -536.72,
    description: "A rich berry for a deep, lived-in flush.",
  },
  {
    name: "Coral",
    color: "#e58a72",
    dark: false,
    left: -701.17,
    description: "A vivid peach-coral for a warm, fresh glow.",
  },
];

export const beautyProducts: ShopProduct[] = [
  {
    slug: "overnight-lip-mask",
    name: "Overnight Lip Mask",
    step: "Lip",
    image: "v5/02fe6",
    crop: [300, 300, 0, 0],
    price: 24,
    tag: "Bestseller",
    description: "Lip mask + balm for soft, cushioned lips by morning",
  },
  {
    slug: "daily-gel-cream",
    name: "Daily Gel Cream",
    step: "Skin",
    image: "v5/02fe6",
    crop: [300, 300, -100, 0],
    price: 34,
    tag: "New",
    description: "Lightweight gel moisturiser in a travel-friendly tube",
  },
  {
    slug: "barrier-mist",
    name: "Barrier Mist",
    step: "Skin",
    image: "v5/02fe6",
    crop: [300, 300, -200, 0],
    price: 28,
    description: "A calming facial mist that resets dry, stressed skin",
  },
  {
    slug: "body-silk-oil",
    name: "Body Silk Oil",
    step: "Body",
    image: "v5/02fe6",
    crop: [300, 320.72, 0, -106.91],
    price: 38,
    description: "Fast-absorbing body oil with a soft, skin-close scent",
  },
  {
    slug: "soft-cleanse-balm",
    name: "Soft Cleanse Balm",
    step: "Skin",
    image: "v5/02fe6",
    crop: [300, 320.72, -100, -106.91],
    price: 26,
    description: "A soft cleansing balm for your everyday skincare ritual.",
  },
  {
    slug: "smoothing-body-polish",
    name: "Smoothing Body Polish",
    step: "Body",
    image: "v5/02fe6",
    crop: [300, 320.72, -200, -106.91],
    price: 30,
    description: "A considered body polish for soft, smooth skin.",
  },
  {
    slug: "hand-cream-duo",
    name: "Hand Cream Duo",
    step: "Body",
    image: "v5/02fe6",
    crop: [300, 281.8, 0, -181.8],
    price: 22,
    description: "Everyday care for your hands, wherever you go.",
  },
  {
    slug: "the-intro-set",
    name: "The Intro Set",
    step: "Sets",
    image: "v5/962e7",
    crop: [300, 100, 0, 0],
    price: 68,
    description: "The essentials for a considered everyday routine.",
  },
  {
    slug: "the-glow-duo",
    name: "The Glow Duo",
    step: "Sets",
    image: "v5/962e7",
    crop: [300, 100, -100, 0],
    price: 52,
    description: "Two complementary formulas, one easy ritual.",
  },
  {
    slug: "five-minute-morning",
    name: "Five-Minute Morning",
    step: "Sets",
    image: "v5/962e7",
    crop: [300, 100, -200, 0],
    price: 96,
    description: "A complete ritual for a slower start to your day.",
  },
  {
    slug: "weekend-glow-kit",
    name: "The Weekend Glow Kit",
    step: "Kit",
    image: "v5/24244",
    price: 78,
    description:
      "Cloud Tint, Barrier Mist and a travel-size Body Oil in a reusable linen pouch.",
  },
  ...shades.map((shade, shadeIndex) => ({
    slug: `cloud-tint-${shade.name.toLowerCase()}`,
    name: `Cloud Tint — ${shade.name}`,
    step: "Lip",
    image: "v5/101ca",
    crop: [848.44, 102.55, shade.left, -0.85],
    shadeIndex,
    price: 24,
    description: shade.description,
  })),
];
export const products: ShopProduct[] = beautyProducts;

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
