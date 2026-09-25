export type Point = [pre: string, bold: string, post?: string]

export const plans: { name: string; copy: string; monthly: number; cta: string; featured?: boolean; points: Point[] }[] = [
  {
    name: 'Starter',
    copy: 'For solo founders and small brands starting with AI visibility.',
    monthly: 10,
    cta: 'Get started',
    points: [
      ['Track up to ', '3 brands'],
      ['Monitor ', '50 search', ' prompts'],
      ['', 'Weekly', ' visibility report'],
      ['', 'Basic', ' SEO, GEO, and AEO insights'],
      ['', '1', ' user seat'],
    ],
  },
  {
    name: 'Growth',
    copy: 'For teams improving visibility across AI search channels.',
    monthly: 30,
    cta: 'Get started',
    featured: true,
    points: [
      ['Track up to ', '10 brands'],
      ['Monitor ', '250 search', ' prompts'],
      ['', 'Daily', ' visibility report'],
      ['', 'Competitor', ' comparison'],
      ['', 'Intent', ' based recommendation'],
      ['Up to ', '5 User', ' seats'],
    ],
  },
  {
    name: 'Scale',
    copy: 'For agencies and companies managing multiple markets.',
    monthly: 100,
    cta: 'Talk to sales',
    points: [
      ['Track up to ', 'Unlimited brands'],
      ['Monitor ', '1.000+ search', ' prompts'],
      ['', 'Advanced', ' SEO, GEO, and AEO insights'],
      ['', 'Multi client', ' workspace'],
      ['', 'Priority', ' support'],
      ['', 'Custom', ' on boarding'],
    ],
  },
]

export const reviewColumns = [
  [
    {
      logo: 'powersurge',
      company: 'Powersurge',
      quote: 'Scalar.ai has been a game-changer for our team—everything we need for SEO, geo, and AEO is right at our fingertips, allowing us to dive into new projects effortlessly.',
      name: 'Nikolas Gibbons',
      role: 'Product Designer, Powersurge',
      avatar: 'nikolas',
    },
    {
      logo: 'railspeed',
      company: 'Railspeed',
      quote: 'We love Scalar.ai! It has streamlined our SEO and geo processes significantly.',
      name: 'Marco Kelly',
      role: 'UI Designer, Railspeed',
      avatar: 'marco',
    },
  ],
  [
    {
      logo: 'goodwell',
      company: 'Goodwell',
      quote: 'Scalar.ai is our secret weapon for meeting deadlines. It equips us with everything necessary to kick off quickly.',
      name: 'Ammar Foley',
      role: 'UX Designer, Goodwell',
      avatar: 'ammar',
    },
    {
      logo: 'quixotic',
      company: 'Quixotic',
      quote: "Scalar.ai is by far the best tool we've used for SEO and geo tasks. It provides everything we need to start any project.",
      name: 'Florence Shaw',
      role: 'Web Designer, Quixotic',
      avatar: 'florence',
    },
  ],
  [
    {
      logo: 'stack3dlab',
      company: 'Stack3d Lab',
      quote: "Our workflow has improved tremendously since we adopted Scalar.ai. It's user-friendly, and the resources are exceptional. I highly recommend it!",
      name: 'Mathilde Lewis',
      role: 'Project Lead, Stack3d Lab',
      avatar: 'mathilde',
    },
    {
      logo: 'magnolia',
      company: 'Magnolia',
      quote: "Scalar.ai is a true game-changer for our projects. We can't imagine going back to our old methods without it.",
      name: 'Stefan Sears',
      role: 'UI/UX Designer, Magnolia',
      avatar: 'stefan',
    },
  ],
]

export const socials = [
  ['x', 'X'],
  ['linkedin', 'LinkedIn'],
  ['facebook', 'Facebook'],
  ['github', 'GitHub'],
]

export const features = [
  ['Keyword Intelligence', 'See if a keyword is already “owned” in AI answers or still open, so you focus on winnable growth.', 'keyword'],
  ['AI-Citation Content Engine', 'Create content for AI assistants that includes structured feedback and can be easily exported.', 'evidence'],
  ['Brand Visibility Dashboard', 'SoV analysis, competitor insights, and one-click content creation for your brand.', 'brands'],
]

export const ctaPoints = ['30-day free trial', 'Personalized onboarding', 'Access to all features']
