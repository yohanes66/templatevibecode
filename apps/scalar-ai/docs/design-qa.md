# Scalar.ai Design QA

## Evidence

- Source visual truth: Figma frame `Scalar.ai Landing Page` (`2010:7627`), captured with Figma CLI at `/tmp/scalar-verify.png`.
- Source frame: 1440×6244 design pixels; verification capture: 462×2000 pixels.
- Implementation: `http://127.0.0.1:4173/`.
- Desktop screenshot: `output/playwright/scalar-desktop-final.png` at a 1440×1000 CSS viewport, device scale factor 1; full page 1440×6113 pixels.
- Mobile screenshot: `output/playwright/scalar-mobile.png` at a 390×844 CSS viewport, device scale factor 1; full page 390×8577 pixels.
- Full comparison: `output/playwright/scalar-comparison-final.png`.
- Focused comparisons: `output/playwright/scalar-comparison-hero.png` and `output/playwright/scalar-comparison-pricing.png`.
- Comparison normalization: the implementation was scaled to 462 pixels wide while preserving aspect ratio, then padded to 462×2000 to match the Figma verification capture. The combined comparison places Figma on the left and the implementation on the right.
- State: dark theme, monthly billing, navigation closed.

## Fidelity Review

- Fonts and typography: Inter matches the primary Figma typography and the corrected 48px desktop hero scale. Responsive wrapping remains readable at 390px. Satoshi is only approximated by Inter for the small brand lockup.
- Spacing and layout rhythm: the 1280px desktop container, 32px card gaps, seven-section flow, vertical rhythm, and responsive single-column layouts match the source composition.
- Colors and visual tokens: the implementation uses the extracted `#0c0e12`, `#13161b`, `#94979c`, and `#fbb902` palette with source-equivalent borders and dark surfaces.
- Image quality and asset fidelity: mountain backgrounds, dashboard screens, feature previews, avatars, and favicon were exported directly from the selected Figma frame. No placeholder imagery remains.
- Copy and content: hero, feature, case-study, pricing, review, CTA, and footer content follow the selected frame.

## Comparison History

1. Initial desktop pass found the hero and section headings oversized, a missing responsive space around hidden line breaks, an undersized CTA dashboard, and a missing favicon.
   - Fixes: aligned display sizes to the extracted 48px/36px scale, preserved whitespace around responsive breaks, enlarged the CTA dashboard crop, and exported the Figma logo as `favicon.png`.
   - Post-fix evidence: `output/playwright/scalar-comparison-final.png` and `output/playwright/scalar-comparison-hero.png`.
2. Interaction testing found the decorative pricing glow intercepting pointer events.
   - Fix: added `pointer-events: none` to the decorative pseudo-element.
   - Post-fix evidence: monthly/yearly buttons both work and update `$10/$30/$100` to `$8/$24/$80`.
3. Mobile testing found no horizontal page overflow or clipped core controls at 390px.
   - Evidence: `output/playwright/scalar-mobile.png`; the mobile menu opens, closes after navigation, and pricing navigation lands on the intended section.

## Browser Checks

- Primary interactions tested: mobile menu, navigation anchors, monthly/yearly pricing toggle, primary CTA anchors.
- Console errors after final reload: 0.
- Production build: passed.

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- P3: the review-card masonry offsets are intentionally subtler than the static Figma composition to keep the responsive grid predictable.
- P3: the small Satoshi brand treatment falls back to Inter because no licensed Satoshi webfont was provided.

## Final Result

final result: passed

## 2026-09-25 Rebuild

The earlier pass above only approximated the design: most sections used guessed sizes, Phosphor icons in place of the exported Figma icons, and flat cropped screenshots in the bento. Every section was rebuilt from `get_design_context` for frame `4599:43035`.

- Verification: each section captured at a 1440px viewport (reduced motion) and diffed against the Figma render of the same node. All seven section heights now match exactly (1024 / 1142 / 992 / 1024 / 998 / 704 / 360); mean per-pixel difference 0.4–3.3 per section.
- Bento: skewed dashboard shots, the floating ChatGPT/Gemini score cards, and the sentiment chart card are positioned exactly as in Figma. Source screenshots are shown whole, not cropped from the top.
- Pricing: sparkle bullets (grey, gold on Growth), bold/gold highlights, the faded Growth sparkle decoration, and the centered glow. Feature copy corrected (e.g. "1 user seat", "Up to 5 User seats", "Custom on boarding").
- Header/footer/CTA: Figma logomark plus the Satoshi wordmark (Fontshare), 16px nav, CTA sparkle bullets, and footer socials X / LinkedIn / Facebook / GitHub.
- Two causes of systematic drift, now fixed:
  - Figma strokes do not add to layout size, but CSS borders do. Button/toggle/badge padding is reduced by the border width, and cards use an inset outline.
  - Google Fonts serves Inter 4, which is ~0.1% wider than Figma's Inter 3.19. That pushed the hero and pricing copy onto an extra line. Inter 3.19 is now loaded from `@fontsource/inter@4.5.15`.
- The case-study frame uses an outside 8px stroke in Figma; this is reproduced with a negative margin.
- Motion: scroll reveal (gated behind `.reveal-ready`), hero background pan, mockup entrance + float, card hover lifts with parallax on the inner illustrations, and pricing glow pulse. All of it is disabled by `prefers-reduced-motion`.
- Mobile (390px): no horizontal overflow; the bento, pricing, reviews, and CTA sections stack.
- Remaining known deviation: the bento cell corners are clipped to a 16px radius (Figma clips them square).

### Follow-up (same day)

- Pricing border was hidden behind the positioned card header (outlines paint below positioned descendants). It is now drawn by a `::after` overlay. The Growth card border is a rotating conic gradient built on `@property --border-angle`.
- Reviews: each column is a seamless vertical marquee. Left and right columns move up, the middle column moves down, each at a different speed. The marquee pauses on hover, and cards fade in and out at the top and bottom edges.
- Parallax: CSS scroll-driven animations (`animation-timeline: view()`) on the hero background/copy and on the case-study background/frame. Parents use `overflow: clip`, because `overflow: hidden` would make them the view() scroller. At rest (page top, section in view) positions still match the design.
- Responsive: the bento, case-study, and CTA illustrations are sized in design px times `--u` (container width ÷ design width), so the composition scales instead of breaking; copy keeps its real size. The case-study frame keeps the design's top-crop ratio (1232:568).
- Bento hover: cursor-following gold spotlight and border glow. Each layer has its own path and stagger (skewed shots straighten, mini cards cascade, the chart lifts, screenshots rise).
- Re-verified: all seven sections still match Figma height exactly at 1440px; no horizontal overflow at 390px or 768px.
