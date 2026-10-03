# Figma implementation checks

Reference: file `34T8K3XRn2jL4OlaIcbVMu`, frame `1660:5313` (1440 × 7301). Inspected and exported through Figma CLI. Additional step images: `1661:5599` and `1661:5601` on page `451:5214`.

All 19 original source images are local and non-empty. The following table records the original Figma geometry and initial implementation. The subsequent interaction and viewport adjustments intentionally adapt these dimensions.

| Section | Figma / browser top | Figma / browser height |
| --- | ---: | ---: |
| Announcement | 0 | 35 |
| Header | 35 | 88 |
| Hero | 123 | 820 |
| Ticker | 943 | 69 |
| Products | 1012 | 998 |
| Ingredients | 2010 | 871 |
| Ritual | 2881 | 1000 |
| Results | 3881 | 579 |
| Reviews | 4460 | 763 |
| Journal | 5223 | 887 |
| Newsletter | 6110 | 518 |
| Footer | 6628 | 673 |

## Verification

- `npm run build`: TypeScript and production build pass.
- `npm run check`: invalid/corrupted cart recovery, allowed product keys, integer quantity bounds, unique product slugs, and all content assets pass.
- Playwright browser checks: ritual images and pressed states, review controls, cart addition/removal/subtotals/persistence, explicit demo checkout, native dialog Escape and focus restoration, search results/empty state, product/article direct routes, unknown-slug 404, email validation, mobile navigation, reduced motion, and scroll reveal pass. No page errors.
- No horizontal overflow at 320, 390, 640, 768, 1024, 1280, 1440, and 1920 pixels.
- Desktop and mobile screenshots visually reviewed. Typography and colors follow the supplied reference; section geometry adapts to the available viewport. Browser and Figma text rasterization have small differences; byte-identical rendering is not claimed.

Reference exports and screenshots remain in the local implementation workspace. Runnable browser verification is included as `scripts/check-browser.js` and `scripts/check-motion.js` (Playwright page callbacks). Screenshots produced by these checks are local QA artifacts.

## Requested interaction refinements

The subsequent interaction update adds a sticky header, a shared mobile menu/bag drawer, softer staggered reveals, first-appearance number counting, automatic ritual cycling with contrasting, clickable active steps, and synchronized photo captions on mobile. Horizontal step separators and photo overlay controls were removed. These intentional design refinements supersede the original ritual presentation shown in the Figma frame.

The updated build and browser checks pass: a complete autoplay cycle with four seconds per step continues while hovered, mobile photographs and captions advance together, numbers animate only on first appearance, the shared drawer restores focus, and the sticky header keeps anchored content visible. Six responsive widths have no horizontal overflow; the broader route/cart checks pass at eight widths with no browser errors.

Mobile step navigation now sits inside the photo as numbered controls with a contrasting active state. The repeated list below the image is removed. All three steps fit without overlapping the active caption at 320, 390, and 640 pixels, with touch targets of at least 44 pixels.

Mobile/tablet layouts are adaptations of the desktop design. Checkout, account access, and newsletter sending require providers before production use.

## Viewport height adjustment

The hero uses the available stable viewport height after the announcement and header. Its photo follows the content height, while the three statistics remain in a shared row with wrapping labels. Desktop sections retain at least 64 pixels of vertical padding. Only the product section has a viewport-height minimum; clinical results and newsletter follow their content height. Journal images retain a consistent aspect ratio rather than compressing with viewport height.

Browser checks cover 1024 × 600, 1280 × 650, 1440 × 780, 1512 × 820, 1728 × 980, and 1920 × 900: hero statistics are visible without scrolling, padding remains generous, and cards have no clipped content. The product section fills the area below the header. Other sections allow natural scrolling; mobile/tablet sections retain natural document flow.

The full browser checks pass in Chromium and WebKit. Native drawer focus restoration was corrected for Safari pointer clicks. Build, autoplay/count-up, responsive indicators, and reduced-motion checks pass; no page errors were observed.
