# Design and interaction verification

Reference: Figma `34T8K3XRn2jL4OlaIcbVMu`, node `1680:4640` (1440 × 13088).

Implemented all fourteen homepage sections with the original section order, professional palette, Archivo/Geist/Pinyon Script typography and static asset slots. Absolute layout from the Figma prototype was translated into responsive grids and flex layout.

## Assets

All 21 supplied raster assets and the original dot SVG were downloaded locally. Raster assets were encoded as WebP without changing their compositions; total image payload is approximately 4.5 MB. All displayed images were checked after scrolling the page. Original downloads and the Figma reference are preserved under ignored `output/research/sorrel` in the workspace.

| Design slot | Local assets | Desktop geometry |
|---|---|---|
| Hero / Kaia project / contact thumbnail | `d6cfb.webp` | 640 × 720 hero; card cover; 180 × 220 thumbnail |
| Six client logos | `c455f`, `b917d`, `43223`, `5f1e8`, `43b96`, `d6612` (WebP) | 120 × 32, contained |
| Teduh / Lantai / Rumah project cards | `c8660`, `f2889`, `b6391` (WebP) | 460px image height, cover |
| Three testimonial avatars | `4770d`, `9521f`, `599c4` (WebP) | 44px / 40px / 40px |
| Four partner portraits | `ca77f`, `36009`, `ed92c`, `b35a5` (WebP) | 440px image height, cover |
| Featured journal / three articles | `9c40e`, `08dab`, `e738f`, `a506c` (WebP) | 640px feature; 300px article images |
| Contact background | `b6391.webp` | 760px section height, cover |
| Credential dot | `3ba18.svg` | 6 × 6 |

The four `kaia-before`, `teduh-before`, `lantai-before`, and `rumah-before` WebP images were generated with the built-in image_gen tool, using each corresponding original image as the edit target. Prompts preserve camera position, framing, structural openings and exterior planting. Exact prompts are in `image-prompts.json`. Before views are identified as generated concepts on case study pages and in the documentation.

## Checks passed

- `npm run check`: all 26 images/SVG, three fonts, real PDF header, route slug uniqueness and email query encoding including ampersands, newlines and Unicode.
- `npm run build`: TypeScript and production Vite build.
- Browser layout: 320, 390, 768, 1024 and 1440px; no horizontal overflow, unloaded visible images or unrevealed content.
- Mobile menu opens, closes, and supports Escape with focus returned to the menu button.
- All four before/after switches update independently; process, experience and FAQ accordions expand and collapse exclusively within each group.
- Project filtering, project navigation, refreshed deep links and individual journal articles work.
- Contact receives the selected engagement model and uses native required/email validation. The form prepares an email draft, not a backend submission.
- Projects, project detail, journal, article, contact, press, privacy and 404 checked at mobile, tablet and desktop widths; no runtime errors.
- Metrics count once when they enter the viewport, preserve units/decimals and finish at exact values. Screen readers receive the final metric without repeated announcements.
- Grid cards reveal with a short stagger and image mask; plus/minus icon lines transition as accordion panels open and close.
- Reduced motion removes entrance/hover animation, counting and smooth scrolling while keeping all content and final metrics visible.
- Company profile PDF downloads as a real four-page PDF; all pages rendered and visually reviewed.
- Catalogue contains four templates, with Sorrel detail page and embedded local preview.

Screenshots are stored in ignored `output/playwright/`. The shipped `preview.jpg` is an implementation screenshot, not the Figma frame export.

## Scope

No deployment was performed. Fictional studio details, metrics, journal bodies and external social links are template content. The supplied four case studies populate the project archive; the design's studio-wide counts are not expanded into invented case studies.
