export const projects = [
  {
    slug: "kaia-house-hotel",
    name: "Kaia House Hotel",
    summary: "Full-interior refit of a 64-key boutique hotel.",
    metric: "+38%",
    result: "RevPAR after reopening",
    location: "Seminyak, Bali",
    year: "2025",
    sector: "Hospitality",
    image: "d6cfb.webp",
    before: "kaia-before.webp",
    brief:
      "Give a familiar boutique hotel a new sense of place, without losing the warmth that brought guests back.",
    approach:
      "A generous double-height lobby sets the tone. Local stone, woven pendants and custom timber furniture bring a tactile rhythm to the space, while deep blue upholstery anchors the tropical palette.",
    detail:
      "Guest arrival, back-of-house circulation and maintenance were considered alongside the interior. The result is a hotel that feels as good to operate as it does to stay in.",
  },
  {
    slug: "teduh-dining-room",
    name: "Teduh Dining Room",
    summary: "A 90-cover restaurant built around one long table.",
    metric: "4.9★",
    result: "Average guest rating",
    location: "Kemang, Jakarta",
    year: "2025",
    sector: "F&B",
    image: "c8660.webp",
    before: "teduh-before.webp",
    brief:
      "Create a neighbourhood dining room that feels intimate at lunch and comes alive after sunset.",
    approach:
      "Warm timber tables, a continuous navy banquette and softly lit plaster walls create a room with many ways to sit. A lattice screen gives diners privacy without interrupting the flow of daylight.",
    detail:
      "Table heights, acoustic comfort and service routes were tested with the operator. Custom lighting gives each table its own quiet pool of light.",
  },
  {
    slug: "lantai-tiga-offices",
    name: "Lantai Tiga Offices",
    summary: "Workplace for a 200-person fintech team.",
    metric: "+27%",
    result: "Weekly office attendance",
    location: "SCBD, Jakarta",
    year: "2024",
    sector: "Workplace",
    image: "f2889.webp",
    before: "lantai-before.webp",
    brief:
      "Make the office a place a distributed team chooses to spend time in.",
    approach:
      "Shared oak worktables sit beside the windows, with enclosed meeting rooms and a soft blue booth for focused conversations. Planting and a restrained material palette soften the industrial shell.",
    detail:
      "The plan gives equal attention to collaboration and concentration. Adaptable furniture allows the team to change its working patterns without another fit-out.",
  },
  {
    slug: "rumah-kebun",
    name: "Rumah Kebun",
    summary: "A family residence opened to its garden.",
    metric: "14 wks",
    result: "Design to handover",
    location: "Ubud, Bali",
    year: "2024",
    sector: "Residential",
    image: "b6391.webp",
    before: "rumah-before.webp",
    brief:
      "Reconnect a family living room with the garden at the heart of the house.",
    approach:
      "Full-height openings frame tropical greenery. A curved blue sofa, stone table and locally made timber chair form a relaxed conversation space, with natural textures underfoot.",
    detail:
      "The design stays deliberately quiet so daily family life and the changing garden can take the foreground. Durable materials suit the tropical climate.",
  },
] as const;

export const services = [
  {
    name: "Interior Architecture",
    copy: "Layouts, joinery and material palettes that make a space work before it looks good.",
    tags: ["Space planning", "Joinery"],
  },
  {
    name: "Hospitality Concepts",
    copy: "Hotel, restaurant and bar concepts shaped around how guests actually move and linger.",
    tags: ["Guest journey", "F&B concepts"],
  },
  {
    name: "Furniture & Objects",
    copy: "Custom furniture, lighting and objects made with our network of local workshops.",
    tags: ["Custom pieces", "Sourcing"],
  },
  {
    name: "Styling & Art Direction",
    copy: "Art, textiles and styling that finish a room and carry the brand into photos.",
    tags: ["Art curation", "Photo styling"],
  },
  {
    name: "Project Management",
    copy: "Budgets, contractors and site supervision handled until the keys change hands.",
    tags: ["Site supervision", "Cost control"],
  },
  {
    name: "Brand Environments",
    copy: "Retail and workplace interiors that translate a brand into a physical experience.",
    tags: ["Retail", "Workplace"],
  },
];

export const processes = [
  {
    name: "Hospitality",
    summary: "A dedicated team embedded from concept to opening night.",
    points: [
      ["Lead designer from day one.", "Owns the concept through opening."],
      [
        "Operator-first thinking.",
        "Back-of-house, flow and maintenance planned early.",
      ],
      [
        "Local makers network.",
        "Custom pieces built within two hours of site.",
      ],
      ["One budget, one timeline.", "Contractors and suppliers managed by us."],
      ["Brand in every detail.", "Signage, uniforms and tableware aligned."],
      ["Opening support.", "Snag lists, styling and launch-day shoot."],
    ],
  },
  {
    name: "Residential",
    summary: "One lead designer and a small studio crew for your home.",
    points: [
      [
        "Start with your everyday.",
        "A conversation about how you live, host and rest.",
      ],
      [
        "One point of contact.",
        "Your lead designer stays with the project throughout.",
      ],
      [
        "Materials that age well.",
        "Practical choices for a home, not a showroom.",
      ],
      [
        "A clear sequence.",
        "Design, procurement and site work planned together.",
      ],
    ],
  },
  {
    name: "Workplace & Retail",
    summary: "Brand-led spaces delivered on tight, phased timelines.",
    points: [
      ["Listen to the team.", "Workshops reveal how people use the space."],
      [
        "Keep the doors open.",
        "Phased delivery minimises disruption to your business.",
      ],
      ["Room to evolve.", "Flexible layouts grow with your team."],
      [
        "Brand made physical.",
        "Materials, signage and details tell one story.",
      ],
    ],
  },
];

export const models = [
  {
    name: "Full Service",
    question: "Opening a new venue and need one team to take it all the way?",
    duration: "6–18 months",
  },
  {
    name: "Design & Build",
    question: "Have a concept but need it detailed and built?",
    duration: "3–9 months",
  },
  {
    name: "Refresh Sprint",
    question: "Want a fresh look without closing your doors?",
    duration: "4–10 weeks",
  },
  {
    name: "Space Audit",
    question: "Need a second opinion before you commit budget?",
    duration: "1–3 weeks",
  },
];

export const sectors = [
  {
    name: "Hotels & Resorts",
    count: 12,
    rows: [
      [
        "Kaia House Hotel",
        "64-key boutique hotel — full interior refit",
        "2024–2025",
      ],
      [
        "Arunika Villas",
        "Eight private pool villas and a shared clubhouse",
        "2024",
      ],
      [
        "Hotel Senja",
        "Lobby, bar and rooftop for a city business hotel",
        "2023",
      ],
      ["Pondok Lereng", "Mountain retreat with 22 cabins", "2022–2023"],
      [
        "The Linden Suites",
        "Serviced apartments, 3 floors of public space",
        "2021",
      ],
    ],
  },
  {
    name: "Restaurants & Bars",
    count: 18,
    rows: [
      ["Teduh Dining Room", "A 90-cover neighbourhood restaurant", "2025"],
    ],
  },
  {
    name: "Workplaces",
    count: 9,
    rows: [
      [
        "Lantai Tiga Offices",
        "A flexible workplace for a 200-person team",
        "2024",
      ],
    ],
  },
  {
    name: "Residences",
    count: 24,
    rows: [["Rumah Kebun", "A family residence opened to its garden", "2024"]],
  },
  {
    name: "Retail & Showrooms",
    count: 7,
    rows: [
      [
        "Brand environments",
        "Retail planning, displays and custom furniture",
        "Ongoing",
      ],
    ],
  },
];

export const team = [
  {
    name: "Anindya Kusuma",
    role: "Founding Partner, Creative Director",
    image: "ca77f.webp",
  },
  { name: "Rafi Hartono", role: "Partner, Architecture", image: "36009.webp" },
  { name: "Mei Lin Tan", role: "Partner, Hospitality", image: "ed92c.webp" },
  {
    name: "Sekar Ayudia",
    role: "Head of Furniture & Objects",
    image: "b35a5.webp",
  },
];

export const articles = [
  {
    slug: "one-strange-chair",
    title: "Why every lobby needs one slightly strange chair",
    category: "Column",
    author: "Anindya Kusuma",
    time: "4 min read",
    image: "9c40e.webp",
    date: "12 September 2026",
    paragraphs: [
      "A hotel lobby has a difficult job. It needs to welcome everyone, make arrivals feel effortless, and say something particular about the place. A room where every object is agreeable can do the first two things and still be forgotten.",
      "One slightly strange chair changes the conversation. Perhaps it has an unexpected curve, an unusually deep blue, or a proportion that makes you stop for a second. It gives the room a point of view without asking the whole room to shout.",
      "The important word is slightly. A chair still needs to be a good place to sit. We test the seat, the fabric and the way it wears before we fall in love with the silhouette. Character should make a place more inviting.",
      "At Sorrel, we often begin with a calm material palette and leave room for one piece that surprises us. Local makers help turn that small moment into something specific to the project. It becomes the seat a guest remembers, and sometimes the reason they take a photograph.",
    ],
  },
  {
    slug: "living-with-lime-plaster",
    title: "Living with lime plaster in a tropical climate",
    category: "Materials",
    author: "Rafi Hartono",
    time: "6 min read",
    image: "08dab.webp",
    date: "4 September 2026",
    paragraphs: [
      "Lime plaster makes daylight visible. Its subtle surface variation gives a quiet wall depth, especially when light falls across it from a garden or courtyard.",
      "In the tropics, specification begins with the substrate, exposure and ventilation. We work with applicators on samples on site, rather than choosing a finish from a small square in the studio.",
      "The beauty of the material comes from variation. We discuss that with clients before work begins, and agree on maintenance and touch-up procedures with the contractor. A material that needs care should come with a clear plan for that care.",
    ],
  },
  {
    slug: "what-guests-remember",
    title: "What guests remember from a hotel room after one night",
    category: "Hospitality",
    author: "Mei Lin Tan",
    time: "8 min read",
    image: "e738f.webp",
    date: "28 August 2026",
    paragraphs: [
      "Guests rarely describe a room using a material specification. They remember whether they slept well, where they put their bag, and how the room felt when they opened the curtains.",
      "We map those ordinary moments before we start drawing. A light switch within reach, a place for a wet towel, a chair that works for reading: small decisions make a stay feel considered.",
      "A strong interior concept gives these practical details a shared language. The room feels distinctive because it works as a whole, from the arrival sequence to the last light switched off.",
    ],
  },
  {
    slug: "custom-furniture-budget",
    title: "How we budget a custom furniture program",
    category: "Process",
    author: "Sekar Ayudia",
    time: "5 min read",
    image: "a506c.webp",
    date: "19 August 2026",
    paragraphs: [
      "Custom furniture can give a project its character, but a good program begins with priorities. We decide which pieces need to be unique, which can be adapted, and which should be sourced.",
      "Prototypes have a place in both the budget and the timeline. They let us check comfort, construction and finish with the maker before a piece is repeated across a hotel or restaurant.",
      "We keep a live schedule that connects quantities, lead times and installation dates. That makes the conversation with clients concrete: every choice has a purpose and a cost we can discuss together.",
    ],
  },
];

export const faqs = [
  [
    "How does a project with Sorrel usually start?",
    "With a paid discovery week: site visit, brief workshop and a feasibility check on budget and timeline. You leave with a written direction whether or not we continue together.",
  ],
  [
    "What is your typical budget range?",
    "The budget depends on the size, location and scope of your space. During discovery we build an initial cost plan with you, separating design fees, construction, furniture and contingency.",
  ],
  [
    "Do you work outside Indonesia?",
    "Yes. Our studios in Jakarta, Bali and Singapore work across Southeast Asia. We coordinate with local consultants and makers, with site visits agreed as part of the project scope.",
  ],
  [
    "Can you work with our existing architect or contractor?",
    "Absolutely. We agree on responsibilities, drawings and approval milestones early, so your architect, contractor and our design team can work from one clear plan.",
  ],
  [
    "Do you design custom furniture for every project?",
    "We use custom pieces where they add value, alongside carefully sourced furniture. Your brief, budget and timeline determine the right balance.",
  ],
  [
    "How involved do we need to be during construction?",
    "We handle routine coordination and site supervision. You join scheduled reviews and key approvals, with concise progress updates between milestones.",
  ],
];

export const logos = [
  "c455f.webp",
  "b917d.webp",
  "43223.webp",
  "5f1e8.webp",
  "43b96.webp",
  "d6612.webp",
];

export function inquiryUrl(
  name: string,
  email: string,
  type: string,
  message: string,
) {
  const subject = `Project inquiry — ${type}`;
  const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\nProject type: ${type}\n\n${message.trim()}`;
  return `mailto:hello@sorrel.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function formatCount(value: string, progress: number) {
  const parts = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!parts || progress >= 1) return value;
  const decimals = parts[2].split(".")[1]?.length || 0;
  const count = (Number(parts[2]) * Math.max(0, progress)).toFixed(decimals);
  return `${parts[1]}${count}${parts[3]}`;
}
