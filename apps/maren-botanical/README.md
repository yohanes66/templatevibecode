# Maren Beauty

Responsive storefront based on Maren v5 in Figma, built with React, TypeScript, Vite, TanStack Router, and Phosphor icons. Photography, shade swatches, Jost and Instrument Serif are hosted locally.

## Run

Requires Node.js 22.18+.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3200. This app runs independently of the other previews.

```sh
npm run build
npm run check
npm run preview
```

Deploy `dist/` with an SPA fallback to `index.html`. Vercel Root Directory: `apps/maren-botanical`; `vercel.json` includes the fallback.

## Behavior

Cloud Tint loops through five shades using arrows, product clicks, swatches, keyboard arrows, or a swipe. The selected product moves to the center and its background color follows the shade. Products stay mounted through an interrupted transition, preventing gaps during repeated clicks. Carousel images load eagerly.

The Sets slides the same three products in a loop. Dialogs wait for their exit animation before closing, then restore focus and unlock document scrolling. Animation respects `prefers-reduced-motion`.

The promotion strip includes previous/next arrows, three sample promotions, and a close button. Dismissal lasts until refresh. Footer images remain square, and the document scrolls naturally through the social links and copyright.

Search, product pages, cart variants/quantities, locally persisted bag, mobile navigation, rewards accordion, and newsletter validation work. The catalog uses only the current beauty products and v5 imagery. Saved carts automatically discard retired haircare products while retaining current products and quantities. Journal routes remain available. Checkout, accounts, and newsletter sending are demo flows; no payment or information is sent.

## Customize

- `src/Beauty.tsx`: homepage, carousels, cards, and footer.
- `src/App.tsx`: navigation, promotion strip, dialogs, cart, and routes.
- `src/content.ts`: products, prices, shades, and editorial content.
- `src/styles.css`: layout, typography, breakpoints, and motion.
- `public/images/v5/`: 23 local Figma exports.
- `public/fonts/`: local fonts and licenses.

Routes: `/`, `/shop`, `/products/$slug`, `/journal`, `/journal/$slug`, and `/info/$topic`.

## Reference and verification

[Main Figma frame: Maren v5](https://www.figma.com/design/34T8K3XRn2jL4OlaIcbVMu/Eksplorasi-Dribbble?node-id=1687-2). Cloud Tint selected component: `1687:496`.

The desktop frame is the design reference; mobile/tablet layouts adapt its hierarchy. See `design-qa.md` for verification. `scripts/check-browser.js` is a Playwright CLI page callback; it creates and closes an isolated context so responsive checks cannot alter the user's preview window.
