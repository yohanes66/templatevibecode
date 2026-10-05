# Sorrel Studio

![Sorrel Studio](cover.jpg)

Responsive company profile template for an interior and hospitality design studio.

| | |
|---|---|
| Live demo | https://yohanesnicksorrel.vercel.app |
| Type | Company profile |
| Stack | TanStack Router, React, Vite, TypeScript, CSS |
| Design | [Figma Community: Sorrel](https://www.figma.com/community/file/1688204741451715618/sorrel-company-profile) (free) |
| Vercel | Project `sorrel-studio`, Root Directory `apps/sorrel-studio` |
| Local port | 3400 |

## Getting Started

Requires Node.js 22.18+ (Node 24 recommended).

```bash
npm ci
npm run dev        # http://127.0.0.1:3400
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type check + production build to `dist/` |
| `npm run preview` | Preview the build |
| `npm run check` | Validate content data and assets |

## Features

- All 14 homepage sections with the original photography, logos, and avatars from the design.
- Four independently controlled before/after comparisons, project filters, exclusive accordions (process, experience, FAQ), and mobile navigation.
- Four project pages, a journal archive with four articles, plus contact, press, and privacy pages.
- A downloadable four-page company profile PDF.
- Count-up metrics on scroll, staggered card and image reveals, image crossfades, animated accordion icons, restrained hover motion, and reduced-motion support.

## Editing

| File | Contents |
|---|---|
| `src/content.ts` | Projects, images, services, team, process, articles, FAQ |
| `src/App.tsx` | Sections, page routes, interactive controls |
| `src/styles.css` | Design tokens, layout, breakpoints, motion |
| `public/images/` | 25 WebP images and one SVG from the design |
| `public/fonts/` | Archivo, Geist, and Pinyon Script with their OFL licenses |

To regenerate the PDF after editing its content, install `reportlab` in your Python environment and run `python3 scripts/create-profile.py`.

## Notes

- The four `*-before.webp` files are AI-generated (image_gen) before-renovation concepts based on the "after" views in the design. They are illustrations, not real renovation photos. The exact prompts are in `image-prompts.json`.
- The contact form only prepares a `mailto:` draft in the visitor's email app. Nothing is sent or stored.
- Company names, metrics, contact details, article bodies, and social links are demo content. Replace them before using this for a real business.
- The project archive holds the four case studies from the design, not a 120-project dataset.
- `vercel.json` adds SPA rewrites for project and article deep links.

## QA

[`docs/design-qa.md`](docs/design-qa.md)
