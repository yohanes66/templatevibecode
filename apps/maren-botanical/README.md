# Maren Botanical

![Maren Botanical](cover.jpg)

Responsive beauty storefront with a shade-picking carousel and a bag that persists in the browser.

| | |
|---|---|
| Live demo | https://yohanesnickmarenbotanical.vercel.app |
| Type | E-commerce storefront |
| Stack | TanStack Router, React, Vite, TypeScript, CSS, Phosphor Icons |
| Design | [Figma Community: Maren](https://www.figma.com/community/file/1688265085265846630/maren-beauty-landing-page) (free) |
| Vercel | Project `marenbotanical`, Root Directory `apps/maren-botanical` |
| Local port | 3200 |

## Getting Started

Requires Node.js 22.18+.

```bash
npm ci
npm run dev        # http://127.0.0.1:3200
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type check + production build to `dist/` |
| `npm run preview` | Preview the build |
| `npm run check` | Validate catalog data, assets, and bag logic |

## Features

- **Cloud Tint carousel.** Pick from five shades with the arrows, a product click, a swatch, the keyboard arrow keys, or a swipe. The selected product slides to the center and the background follows its shade. Products stay mounted through an interrupted transition, so rapid clicks never leave gaps.
- **The Sets.** A looping carousel of the same three products.
- **Promotion strip.** Three promotions with previous/next arrows and a close button. A dismissed strip comes back on refresh.
- **Dialogs.** Dialogs close after their exit animation, then restore focus and unlock page scrolling.
- **Working pages.** Search, product pages, cart variants and quantities, a bag saved in `localStorage`, mobile navigation, a rewards accordion, and newsletter validation.
- **Bag migration.** Saved bags drop retired haircare products automatically and keep current products and quantities.
- Animation respects `prefers-reduced-motion`.

Routes: `/`, `/shop`, `/products/$slug`, `/journal`, `/journal/$slug`, `/info/$topic`.

## Editing

| File | Contents |
|---|---|
| `src/Beauty.tsx` | Homepage, carousels, cards, footer |
| `src/App.tsx` | Navigation, promotion strip, dialogs, cart, routes |
| `src/content.ts` | Products, prices, shades, editorial content |
| `src/styles.css` | Layout, typography, breakpoints, motion |
| `public/images/` | Product and editorial photography |
| `public/fonts/` | Jost and Instrument Serif with their licenses |

## Notes

- Checkout, accounts, and newsletter sending are demo flows. No payment or personal data is sent.
- The desktop frame is the design reference; mobile and tablet layouts adapt its hierarchy.
- `scripts/check-browser.js` is a page callback for Playwright CLI. It opens and closes its own browser context, so responsive checks never touch your preview window.

## QA

[`docs/design-qa.md`](docs/design-qa.md)
