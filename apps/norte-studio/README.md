# Norte Studio

Standalone editorial landing page from [the Norte Figma frame](https://www.figma.com/design/34T8K3XRn2jL4OlaIcbVMu/Eksplorasi-Dribbble?node-id=1662-5602).

```bash
npm install
npm run dev
```

Open http://127.0.0.1:3300. `npm run build` creates `dist/`. Deploy on Vercel with Root Directory `apps/norte-studio`, build command `npm run build`, and output directory `dist`.

`npm run check` starts a separate QA server on port 3301 and runs the browser checks through Playwright CLI (Node 24+, Chromium, and npm network access required on the first run).

The app uses React, TanStack Router and CSS. Routes: `/`, `/work`, `/work/$slug`. Nineteen original Figma photographs are exported locally as lossless WebP. Each additional discipline has five newly generated editorial photographs. All three font families are self-hosted with their OFL licenses.

The floating menu, chapter progress, four galleries, work routes, journal and information dialogs work. Contact uses `mailto:`. Newsletter is a clearly labeled UI preview; it stores and sends no email. Community profiles, social destinations and the Indonesian introduction are demo content; connect real destinations and a mailing provider before production use.

See [design/QA.md](design/QA.md) for the design measurements and motion specification.
