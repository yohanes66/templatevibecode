# Design verification and motion

Source: Figma `34T8K3XRn2jL4OlaIcbVMu`, frame `1662:5602`, 1440 × 10491. Inspected and exported with the locally installed Figma CLI 2.1.2 in Safe Mode.

## Desktop reference

The reference and implementation are saved as `figma-desktop.png` and `implementation-desktop.png`. The mobile render is `implementation-mobile.png`. `nodes.json` and `text-styles.json` contain the source measurements, font settings, colors and asset hashes.

| Chapter | Figma top | Figma height | Browser top | Browser height |
|---|---:|---:|---:|---:|
| Prologue | 358 | 780 | 358 | 780 |
| The beginning | 1138 | 594 | 1138 | 594 |
| What we do | 1732 | 1406 | 1732 | 1406 |
| Selected work | 3138 | 854 | 3138 | 854 |
| Where we come from | 4936 | 1428 | 4936 | 1428 |
| Beyond the headlines | 6364 | 2003 | 6364 | 2003 |
| In their words | 8367 | 621 | 8367 | 621 |
| Your chapter | 8988 | 635 | 8988 | 635 |

All source photographs use the original image fills exported through `figma-cli eval`, encoded as lossless WebP. No screenshot is used as website content. Original image slots retain their Figma dimensions and center crops. The three additional discipline series contain fifteen generated photographs, each prepared as an individual portrait card.

The three exact font families are locally hosted: Zalando Sans Expanded, Geist, Geist Mono. Paper `#f3f1ec`, ink `#0d0d0d`, dividers `#cfccc4`, secondary copy `#5e5c57`, and accent `#2b3bff` come from the design.

CSS and Figma have small differences in font rasterization and fractional text metrics. Chapter geometry matches the reference; this is not a claim that every antialiased pixel is identical. The sticky chapter tracker updates on scroll, and the menu follows the viewport bottom.

## Motion specification

| Interaction | Motion | Purpose |
|---|---|---|
| Opening hero | 900 ms, 20 px upward reveal | A quiet introduction to the editorial story |
| Chapter text on scroll | 700 ms, opacity + 24 px upward, once | Let the reading pace lead the page |
| Discipline accordion | 450 ms grid height, 250 ms opacity | Open the photo series without a hard layout jump |
| Image hover | 900 ms, scale 1 → 1.035 | Subtle photographic detail |
| Service title hover | 350 ms, 8 px sideways; 3 px on mobile | A restrained indication that the row is interactive |
| Chapter progress | 400 ms width change | Keep chapter navigation legible |
| Menu / information dialog | 250 ms, opacity + 16 px upward; backdrop fades in 150 ms | Responsive, quiet editorial navigation |
| Links / buttons | 180 ms color change | Clear, unobtrusive feedback |

The main easing is `cubic-bezier(.22,1,.36,1)`. No autoplay, continuous marquee, forced scrolling, or parallax. `prefers-reduced-motion` removes animation, transforms and smooth scrolling, and keeps every section visible. Native dialogs trap focus, close on Escape, and return focus to their trigger.

### Polish verification — October 3, 2026

Applied the user-selected Polish mode with `transitions-agent@0.11.1`. Kept the service's explicit service-row color transition, 250 ms dialog entry, and 150 ms backdrop entry with motion-token fallbacks. No React logic or dependencies changed. The scanner score increased from 69 to 75.

The service also replaced the floating menu's hover padding with `transform: scale(1.08)`, dropping its `translateX(-50%)` centering. That two-rule change was rolled back; the original centered menu behavior is retained. Browser checks now cover menu centering while hovered at every responsive width and after the animated hover settles.

Four scanner findings remain: menu hover padding/timing (the trigger is classified as a dropdown), missing dialog exit animation, and an overlay detection at `src/App.tsx:118` that does not recognize the existing shared native dialog entry animation. Polish does not add staged text reveals or new component enter/exit state hooks. Existing text reveals and reduced-motion support remain in place.

## Browser checks

`npm run check` verifies all four galleries, all image files and original rendered image dimensions, exclusive accordion state, closing/inert panels, chapter geometry, menu navigation and restored focus, journal, native email validation, TanStack routes and direct reloads, unknown cases, scroll reveal and reduced motion. Responsive widths: 320, 375, 390, 640, 768, 1024, 1280, 1440 and 1920. No horizontal page overflow or clipped discipline headings; no browser JavaScript errors.

## Figma CLI connection

Initially the local daemon was healthy on port 3456 while FigCli remained at “Scanning…”. Restarting the Safe Mode daemon with `figma-cli connect --safe`, then closing and reopening the FigCli development plugin, restored the connection. Verified with `figma-cli eval` against the requested file and frame. No Figma document nodes were modified.

The older synchronous `export node` wrapper returned `fetch failed` in this installation; asynchronous exports through `figma-cli eval` worked. The implementation and references were exported using that working CLI path.
