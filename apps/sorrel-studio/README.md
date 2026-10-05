# Sorrel Studio

Responsive company profile template for an interior and hospitality design studio, built from [Figma node 1680:4640](https://www.figma.com/design/34T8K3XRn2jL4OlaIcbVMu/Eksplorasi-Dribbble?node-id=1680-4640).

## Run

Requires Node.js 22.18+ (Node 24 recommended).

```sh
npm install
npm run dev
```

Local preview: http://127.0.0.1:3400. This port is separate from Maren (3200) and Norte (3300).

```sh
npm run check
npm run build
npm run preview
```

## Included

- React, TypeScript, Vite and TanStack Router with typed project/article routes.
- All 14 homepage sections, original Figma photography, logos and avatar assets.
- Local Archivo, Geist and Pinyon Script fonts with their OFL licences.
- Four independently controlled before/after comparisons, project filters, exclusive process/experience/FAQ accordions and mobile navigation.
- Four project pages, journal archive and four articles, contact, press and privacy pages.
- A downloadable four-page company profile PDF.
- Viewport-triggered count-up metrics, staggered card/image reveals, image crossfades, animated accordion icons, restrained hover motion and reduced-motion support.

## Edit

- `src/content.ts`: projects, images, services, team, process, articles and FAQ copy.
- `src/App.tsx`: sections, page routes and interactive controls.
- `src/styles.css`: design tokens, layout, breakpoints and motion.
- `public/images`: 25 WebP images and one original Figma SVG.
- `public/fonts`: local fonts and licences.

The four `*-before.webp` files are AI-generated before-renovation concepts, based on their corresponding original Figma after views. They are illustrations for this template, not documentary renovation photographs. Built-in image_gen was used; exact prompts are in `image-prompts.json`.

The contact form prepares a `mailto:` draft in the visitor's email app; it does not send or store submissions. Company names, metrics, contact details and article bodies are demonstration content. Replace these and social profile links before launching a real business website. The project archive contains the four supplied case studies, not a fabricated 120-project dataset.

To regenerate the PDF after editing its content, install `reportlab` in your Python environment and run `python3 scripts/create-profile.py`.

## Deploy

Create a separate Vercel project with Root Directory `apps/sorrel-studio`, framework Vite, build command `npm run build`, output `dist`. `vercel.json` provides SPA rewrites for project and article deep links. No deployment was made as part of this local implementation.

The repository catalogue detail page is `../../catalog/sorrel-studio.html`. Its iframe points at the local development server; replace that URL with your deployed URL when publishing the catalogue.
