# Design QA

Checked against the Figma desktop landing and the three mobile screens at 1440×900, 820×1180, and 390×844 in Chromium (Playwright).

- No console errors on `/` or `/app`. No horizontal scroll at any width.
- Hero: one-line headline at 1440 and the phone sits below the CTAs at a 900px viewport height. Scroll parallax over 400px moves the background 312px, the phone 431px, and the cards ~510px. Mouse movement does not shift the hero layers.
- Intro order: nav → tag → headline words → sub and CTAs → phone → cards → chat (me bubble, typing dots, Mira bubble, draft, tip). No bounce easing and no idle loops.
- Chapters: soft fade-up for the text, photo, phone, and card. The chapter 04 chat sequence ends with the debrief card visible.
- `/app`: "Roast my bio" shows the typing indicator and then a reply. Like moves Discover from Noor to Sarah. The Likes and You tabs are disabled ("Not in this demo").
- `prefers-reduced-motion`: GSAP setup is skipped and content renders in its final state.
- Every match and chat partner is a woman. The app's user persona is a man.

Responsive fixes checked on 2026-10-07 at widths 320, 390, 600, 744, 820, 1024, and 1440px in Chromium (Playwright).

- iPad portrait: statement headline sits above the photo; both people remain visible.
- Chapter 02 photo fills the visual width at every breakpoint, including the two-column layout on iPad landscape and desktop. The width and both photo edges must match the visual container; there is no 85% desktop exception.
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
npx --yes --package @playwright/cli playwright-cli -s=mira-layout run-code --filename=scripts/check-video.js
npx --yes --package @playwright/cli playwright-cli -s=mira-layout close
```

Repeat with `--browser=webkit` to check Safari's rendering engine.

Video hero checked in Chromium and WebKit at widths 320, 390, 600, 601, 744, 901, 1133, 1440, and 1920px, including iPad portrait/landscape and a short desktop viewport, plus the 17-width layout check above.

- Both variants use exactly seconds 3–10 of the supplied 9,243,738-byte source, without an added blend or transition. The desktop/tablet loop is 4,445,097 bytes at the original 1920×1080 resolution. The mobile crop is 2,019,844 bytes at 810×1080, without downsampling. Both use H.264 CRF 22 at 24fps with 168 frames, no audio, and fast-start metadata. The 265,876-byte WebP poster matches the first frame at full resolution.
- Desktop SSIM against the decoded original improves from 0.963546 to 0.989230 over the full seven seconds. Retina screenshots at device scale factor 2 cover mobile, iPad portrait/landscape, and desktop.
- Widths above 600px use the desktop video, including iPad in either orientation. Mobile-to-tablet/desktop resizing upgrades a playing portrait video. Narrowing retains the higher-quality source; iPad rotation does not download another variant. A manually paused video stays paused during resize and upgrades on resume. The video covers the hero without blank edges, and the pause button does not overlap copy or floating cards.
- The 44px play/pause target sits at the bottom-right of the hero. It has a white icon with no filled background, blur, or ring. Tablet cards leave room above it; the icon clears the phone even at 320px. `scripts/check-video.js` checks placement, transparency, and overlap.
- Manual pause preserves the current frame. Moving the mouse across the hero does not change the background position or resume playback. Playback pauses outside the hero and when the tab is hidden, then resumes when visible unless manually paused. Hidden-tab handling was checked by dispatching the visibility event with a hidden document state.
- Reduced motion and Save-Data skip video requests. Blocked autoplay keeps the poster and offers a play button; network failure keeps the poster. `scripts/check-video.js` exercises these cases.
- Layout containment keeps the scaled phone's internal width from causing horizontal overflow in WebKit when motion is disabled. The 320–1920px layout checks and production build pass.

Chapter cards and couple framing checked in Chromium and WebKit at 21 widths from 320 to 1920px, including iPad landscape widths 1133, 1180, 1194, and 1366px.

- Chapter typography, padding, chips, and buttons follow the visual column's width through CSS container units. Narrow two-column layouts no longer switch back to oversized desktop cards. Small date-plan cards omit secondary captions.
- The debrief thread participates in normal layout and sets a minimum height for its photo; the photo expands with the content. Cards and bubbles stay inside the chapter panel. The checks now include the debrief, which the earlier overflow check omitted.
- The statement photo retains the source aspect ratio on tablet and desktop, with right-aligned framing and no parallax zoom. Mobile uses a 4:3 frame that retains both people. Through 1366px the heading sits above the photo.
- Retina screenshots cover chapters 02–04 and the statement at 390, 744, 1133, and 1440px. Animated debrief containment is checked at mobile, iPad portrait/landscape, and 1366px, alongside the existing static layout checks. `npm run build` passes.
