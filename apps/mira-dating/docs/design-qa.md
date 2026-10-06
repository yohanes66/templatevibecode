# Design QA

Checked against the Figma desktop landing and the three mobile screens at 1440×900, 820×1180, and 390×844 in Chromium (Playwright).

- No console errors on `/` or `/app`. No horizontal scroll at any width.
- Hero: one-line headline at 1440 and the phone sits below the CTAs at a 900px viewport height. Scroll parallax over 400px moves the background 312px, the phone 431px, and the cards ~510px. Pointer parallax shifts the layers by up to ±11px.
- Intro order: nav → tag → headline words → sub and CTAs → phone → cards → chat (me bubble, typing dots, Mira bubble, draft, tip). No bounce easing and no idle loops.
- Chapters: soft fade-up for the text, photo, phone, and card. The chapter 04 chat sequence ends with the debrief card visible.
- `/app`: "Roast my bio" shows the typing indicator and then a reply. Like moves Discover from Noor to Sarah. The Likes and You tabs are disabled ("Not in this demo").
- `prefers-reduced-motion`: GSAP setup is skipped and content renders in its final state.
- Every match and chat partner is a woman. The app's user persona is a man.
