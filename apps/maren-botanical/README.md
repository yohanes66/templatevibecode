# Maren Botanical

A self-contained beauty storefront built with React, TypeScript, Vite, and TanStack Router. The homepage follows the supplied Figma design, using all 19 original images exported with Figma CLI and locally hosted Instrument Serif / Instrument Sans fonts. Hero statistics are visible on the first screen. Desktop sections use comfortable spacing and proportionate photos/cards. The product section fills the area below the sticky header; other sections follow their content height. Mobile and tablet layouts retain natural document flow.

## Run

Requires Node.js 22.18+ (Node.js 24 recommended).

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3200. This app runs independently from the other previews in this repository.

```sh
npm run build
npm run check
npm run preview
```

Deploy `dist/` to a static host with an SPA fallback to `index.html` so product and article URLs work on direct visits. For Vercel, use Root Directory `apps/maren-botanical`; the included `vercel.json` configures the fallback.

## Customize

- `src/content.ts`: products, prices, ingredients, steps, reviews, and article content.
- `src/App.tsx`: homepage sections, shared navigation, cart, and TanStack routes.
- `src/styles.css`: Figma palette, spacing, responsive breakpoints, and native CSS animations.
- `public/images/`: original Figma source images, including all three ritual steps.
- `public/fonts/`: locally hosted fonts; no runtime Google Fonts or Figma dependency.

Routes include `/`, `/shop`, `/products/$slug`, `/journal`, `/journal/$slug`, and `/info/$topic`. Unrecognized product, article, and information slugs show a useful 404.

The bag persists locally with validated quantities and corrupted-storage recovery. Search, bag editing, mobile navigation, product details, reviews, and ritual image switching work in the browser. The sticky header keeps navigation available; the mobile menu uses the same native modal drawer as the bag, including focus trapping, Escape dismissal, and focus restoration.

The ritual automatically cycles every four seconds while visible, with a contrasting background on the active step and clickable steps for quick navigation. It keeps playing while hovered; keyboard focus pauses it for reading, and it stops offscreen or in a hidden tab. Mobile places the numbered step controls and active description inside the matching photograph, with no repeated list underneath. Trust and clinical numbers count up once on first appearance, without changing their allocated width. Reveals use gentle movement and staggered timing. All motion respects `prefers-reduced-motion`.

Checkout, account access, and newsletter submission are explicitly demo flows. Connect commerce, authentication, and email providers before accepting orders or subscriptions. Replace sample claims, policies, and editorial copy before launch. No CMS or database is required for the starter.

## Design references

- [Main frame](https://www.figma.com/design/34T8K3XRn2jL4OlaIcbVMu/Eksplorasi-Dribbble?node-id=1660-5313)
- [Additional step images](https://www.figma.com/design/34T8K3XRn2jL4OlaIcbVMu/Eksplorasi-Dribbble?node-id=451-5214)
- [TanStack Router code-based routing](https://tanstack.com/router/latest/docs/routing/code-based-routing)

The desktop frame is the fidelity reference. Tablet and mobile layouts adapt its hierarchy because the supplied links do not specify mobile frames. Figma and browser font rasterization can differ; the template does not claim byte-identical rendering.
