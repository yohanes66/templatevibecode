# Maren v5 implementation checks

Reference: Figma file `34T8K3XRn2jL4OlaIcbVMu`, frame `1687:2` (1440 × 7855), selected Cloud Tint component `1687:496`. Context and screenshots inspected through Figma tools and Figma CLI. All 23 v5 exports are local, alongside Jost and Instrument Serif fonts.

## Verified behavior

- TypeScript / Vite production build and cart/content self-check pass.
- Chromium and WebKit browser checks pass without page errors.
- Responsive widths: 320, 390, 640, 768, 1024, 1280, 1440, and 1920 pixels; no horizontal overflow.
- Five Cloud Tint variants preserve distinct cart entries, selected state, color, and centered position. Arrows wrap first/last; swatches, product clicks, keyboard navigation, and drag work.
- Carousel motion is measured between its start and target positions. Rapid changes retain the previous visible slots until the track settles. Sprite images load eagerly with synchronous decoding hints.
- The Safari disappearance report prompted a track layout correction: every retained product now lies inside a sized track, with layout offsets and normal overflow clipping. Browser checks reject zero or incomplete track paint bounds during rapid forward/reverse looping. Native Safari's initial render was inspected; its background capture does not advance CSS transitions reliably, so motion verification uses the WebKit browser session.
- The Sets slides on desktop and mobile, preserving the same three products. Intermediate frames are measured to reject instant replacement.
- Dialog close leaves the native modal open through its exit animation, then restores focus and scrolling. Reduced motion closes without a delay.
- Cart totals, quantity bounds, storage recovery, search, product routes, unknown-slug 404, reward accordion, and newsletter validation pass.
- The Bag uses the v5 typography, cream product tiles, square quantity controls, shipping progress, and a fixed summary beneath the scrolling item list. Its summary and last item remain reachable at 1440 × 900, 390 × 844, 320 × 480, and 844 × 390 in Chromium and WebKit.
- All product size selectors share a Phosphor caret with a 14px right inset and reserved text padding. The native select remains operable; alignment is verified at all eight responsive widths.
- Promotion arrows change three sample messages. Close removes the strip until refresh.
- Footer images retain a square aspect ratio at every checked width. At maximum scroll, the footer bottom matches the viewport bottom; copyright and legal links remain reachable.
- Native Safari footer inspected directly. Additional WebKit checks at 1440 × 695, 1440 × 1000, and 390 × 844 show no overflow below the footer.

## Motion scan

`transitions-agent` 0.11.1: initial 57/100; authorized Polish fix produced 83/100. Final scan after the requested Sets behavior: 81/100. The scanner still flags custom durations and the drawer navigation's lack of an independent panel recipe. Navigation moves with its parent drawer; the shade transform is also incorrectly classified as a modal backdrop. These are recorded rather than changing carousel timing to modal timing.

The user explicitly approved the Sets and dialog logic changes after the Polish run. Dialog CSS exit hooks from the service are connected to native close completion.

## Preview testing

The user's Chrome preview uses a native viewport that follows the actual window size. Previous headed test viewport overrides caused physical clipping or a gray area outside the document; the affected preview was replaced with a native-size window. Responsive checks now run in isolated contexts and separate headless browser sessions.

`scripts/check-browser.js` is a Playwright CLI callback that creates and closes its own context. Example from the repository root:

```sh
rtk proxy /Users/nico/.codex/skills/playwright/scripts/playwright_cli.sh --session maren-check --raw run-code "$(cat apps/maren-botanical/scripts/check-browser.js)"
```

Desktop/mobile layouts adapt the supplied desktop frame. Checkout, accounts, and sending subscriptions remain explicit demo flows.
