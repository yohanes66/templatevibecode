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
