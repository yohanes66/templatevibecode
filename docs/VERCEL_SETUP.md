# Vercel Setup

How several templates deploy from one GitHub repository, each with its own Vercel project and Root Directory.

## Architecture

```text
templatevibecode (GitHub)
├── apps/scalar-ai        → Vercel project: scalar.ai
├── apps/maren-botanical  → Vercel project: marenbotanical
├── apps/norte-studio     → Vercel project: norte
└── apps/sorrel-studio    → Vercel project: sorrel-studio
```

Each Vercel project builds and deploys only its own folder.

## Creating a project

1. In the Vercel dashboard: **Add New → Project**.
2. Import the `templatevibecode` repository.
3. Set the **Project Name** (ideally the same as the folder) and the **Root Directory**, e.g. `apps/saas-landing-page`.
4. Deploy.

Repeat for every template. You never need a new repository.

## Root Directory

This is the most important setting. It must point to the folder that contains `package.json`, e.g. `apps/saas-landing-page`, not just `apps`.

With the wrong Root Directory, Vercel can't find `package.json`, picks the wrong framework, fails the build, or deploys the wrong folder. If the folder is moved or renamed, every deploy fails with `The specified Root Directory ... does not exist` until you update the setting.

## Build settings

For Vite apps:

```text
Build Command:     npm run build
Output Directory:  dist
```

Vercel usually detects these on its own. Don't override settings that auto-detection already gets right. SPAs need a `vercel.json` rewrite to `/index.html` so deep links work.

## Deploying updates

Pushing to `main` triggers a production deployment for every Vercel project connected to the repo. Pushing to another branch creates preview deployments.

Because all projects share one repo, a push to any app rebuilds all of them. To skip builds for unchanged apps, set this as the **Ignored Build Step** in each project's settings:

```bash
git diff HEAD^ HEAD --quiet -- .
```

## Troubleshooting

| Problem | What to check |
|---|---|
| Build failed | Run `npm ci && npm run build` locally in the app folder and fix it there first |
| `Root Directory ... does not exist` | Settings → Build and Deployment → Root Directory |
| "Vulnerable package detected" | Update the package (`npm update <pkg>`) and push. Never use the `DANGEROUSLY_*` override |
| Broken assets | Use paths from `public/` (e.g. `/images/hero.webp`) or import through source, never local filesystem paths |
| Framework not detected | The Root Directory must contain `package.json` with the framework as a dependency |
| Apps interfering with each other | Each app needs its own `package.json` and config; never rely on a neighbor's dependencies |

## Deployment checklist

- [ ] Root Directory is correct
- [ ] Framework detected
- [ ] Build succeeds
- [ ] Production URL works
- [ ] Assets load
- [ ] Responsive layout works
- [ ] No significant console errors
- [ ] No navigation to other templates
