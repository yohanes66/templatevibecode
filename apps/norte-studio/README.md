# Norte Studio

![Norte Studio](cover.jpg)

Editorial landing page for a fashion, beauty & lifestyle studio, with a gallery for each of its four disciplines.

| | |
|---|---|
| Live demo | https://yohanesnicknorte.vercel.app |
| Type | Editorial agency landing page |
| Stack | TanStack Router, React 19, Vite 8, TypeScript, CSS |
| Design | [Figma Community: Norte](https://www.figma.com/community/file/1688202903613718549/norte-fashion-agency-landing-page) (free) |
| Vercel | Project `norte`, Root Directory `apps/norte-studio` |
| Local port | 3300 (QA: 3301) |

## Getting Started

```bash
npm ci
npm run dev        # http://127.0.0.1:3300
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Type check + production build to `dist/` |
| `npm run preview` | Preview the build |
| `npm run check` | Starts a QA server on port 3301 and runs browser checks through Playwright CLI (needs Node 24+, Chromium, and npm network access on the first run) |

## Features

- Floating menu, per-chapter progress, four discipline galleries, work pages, journal, and information dialogs.
- Contact uses `mailto:`.
- Mobile and tablet layouts adapt the desktop editorial layout.

Routes: `/`, `/work`, `/work/$slug`.

## Editing

| File | Contents |
|---|---|
| `src/App.tsx` | Sections, routes, and interactions |
| `src/content.ts` | Copy, galleries, and work data |
| `src/styles.css` | Layout, typography, breakpoints, motion |
| `public/` | Photography and fonts |

## Notes

- 19 original photographs are exported from Figma as lossless WebP. The Influence, Events, and Content panels each have five generated editorial photographs.
- All three font families are self-hosted with their OFL licenses.
- The newsletter is a UI preview only. It doesn't store or send any email.
- Community profiles, social links, and the Indonesian introduction are demo content. Connect real destinations and a mailing provider before using it in production.

## QA

[`docs/design-qa.md`](docs/design-qa.md): design measurements and motion spec.
