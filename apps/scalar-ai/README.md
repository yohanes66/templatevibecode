# Scalar.ai

![Scalar.ai](cover.jpg)

SaaS landing page for Scalar.ai, an AI visibility platform that helps brands show up in search engines, generative AI answers, and answer engines (SEO, GEO, AEO).

| | |
|---|---|
| Live demo | https://yohanesnickscalar.vercel.app |
| Type | SaaS marketing website |
| Stack | TanStack Start (React 19, SSR), Vite, TypeScript, plain CSS |
| Design | [Figma Community: Scalar](https://www.figma.com/community/file/1688200935581515789/scalar-a-saas-landing-page-concept-for-an-ai-visibility-platform-that-helps-brandsaas-landing-page) (free) |
| Vercel | Project `scalar.ai`, Root Directory `apps/scalar-ai` |
| Local port | 3000 |

## Getting Started

```bash
npm ci
npm run dev        # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (Nitro output in `.output/`) |
| `npm run preview` | Preview the build |
| `npm run generate-routes` | Regenerate `src/routeTree.gen.ts` |

## Features

- **Pixel-perfect to Figma.** At a 1440×1024 viewport, all seven sections match the design heights exactly.
- **Proportional responsive layout.** The bento, case study, and CTA illustrations scale with the container width (`container-type: inline-size` + a `--u` unit), so the composition holds up on small screens.
- **Viewport-height aware.** Vertical spacing tightens on short laptop screens (700–1024px) to keep the key content above the fold.
- **Motion.** Reveal on scroll, parallax via CSS scroll-driven animations, bento hover with a cursor-following spotlight, a rotating gradient border on the featured plan, and a review marquee (vertical on desktop, horizontal on mobile).
- **Accessible.** `prefers-reduced-motion` turns off all animation. Content duplicated for the marquee is `aria-hidden`.

Section order (`src/routes/index.tsx`): `Hero` → `Features` → `CaseStudy` → `Pricing` → `Reviews` → `Cta` → `Footer`.

## Editing

| File | Contents |
|---|---|
| `src/data/content.ts` | Repeated copy: pricing, plan features, reviews, social links |
| `src/sections/` | One file per section; one-off copy (headings, hero) lives here |
| `src/components/` | Reusable components: `Logo`, `Mockup`, `Header` |
| `src/lib/motion.ts` | Reveal on scroll and pointer tracking |
| `src/routes/` | `__root` (head/meta) and `index` (the page) |
| `src/styles/global.css` | All styling |
| `public/` | `icons/`, `images/`, `logos/` exported from Figma |

`src/routeTree.gen.ts` is generated. Don't edit it by hand.

## Notes

- Icons: Phosphor Icons plus SVGs exported from Figma. Fonts: Inter 3.19 (`@fontsource`) and Satoshi (Fontshare).
- The Vercel framework preset is set in `vercel.json` (`tanstack-start`).
- Vercel blocks deploys when `@tanstack/react-start` has a known vulnerability. If a deploy fails with "Vulnerable TanStack Start package", run `npm update @tanstack/react-start @tanstack/react-router`.

## QA

[`docs/design-qa.md`](docs/design-qa.md)
