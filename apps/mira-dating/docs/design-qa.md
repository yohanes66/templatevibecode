# Design QA

Checked against the Figma desktop landing and the three mobile screens at 1440×900, 820×1180, and 390×844 in Chromium (Playwright).

- No console errors on `/` or `/app`. No horizontal scroll at any width.
- Hero: one-line headline at 1440 and the phone sits below the CTAs at a 900px viewport height. Scroll parallax over 400px moves the background 312px, the phone 431px, and the cards ~510px. Pointer parallax shifts the layers by up to ±11px.
- Intro order: nav → tag → headline words → sub and CTAs → phone → cards → chat (me bubble, typing dots, Mira bubble, draft, tip). No bounce easing and no idle loops.
- Chapters: soft fade-up for the text, photo, phone, and card. The chapter 04 chat sequence ends with the debrief card visible.
- `/app`: "Roast my bio" shows the typing indicator and then a reply. Like moves Discover from Noor to Sarah. The Likes and You tabs are disabled ("Not in this demo").
- `prefers-reduced-motion`: GSAP setup is skipped and content renders in its final state.
- Every match and chat partner is a woman. The app's user persona is a man.

Responsive fixes checked on 2026-10-07 at widths 320, 390, 600, 744, 820, 1024, and 1440px in Chromium (Playwright).

- iPad portrait: statement headline sits above the photo; both people remain visible.
- Chapter 02 photo fills the visual width in the stacked layout through 1080px; checked at 390, 744, 820, and 1024px, plus the desktop composition at 1440px.
- Footer: smaller CTA spacing and bottom padding; all three link columns stay aligned without horizontal overflow.
- Mobile chapter cards: smaller typography, padding, and widths expose more of the background visual. At 360px and below, cards flow below the photo or phone with a small overlap.
- No console errors after making the route's scroll effect return no value. `npm run build` passes.

Page padding checked in Chromium and WebKit at 17 widths from 320 to 1920px, including both sides of the 600, 900, 1080, and 1200px breakpoints.

- Nav, chapter panels, statement photo, privacy, stories, CTA, and footer share the page padding: 20px on mobile, 64px on tablet, and 120px on desktop.
- The statement heading has no extra horizontal inset on tablet or mobile. Footer columns span the content width in the stacked layout.
- Hero centering uses CSS margins; an animated desktop-to-mobile resize no longer retains the desktop transform in WebKit.
- `scripts/check-layout.js` checks both page edges, stacked chapter alignment, photo width, footer columns, text clipping, horizontal overflow, animated hero resizing, and browser errors. Run it before pushing layout changes.

With `npm run dev` running, use these commands from this app folder:

```sh
npx --yes --package @playwright/cli playwright-cli -s=mira-layout open http://127.0.0.1:3500 --browser=chrome
npx --yes --package @playwright/cli playwright-cli -s=mira-layout run-code --filename=scripts/check-layout.js
npx --yes --package @playwright/cli playwright-cli -s=mira-layout close
```

Repeat with `--browser=webkit` to check Safari's rendering engine.
