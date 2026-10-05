# Adding a New Template

How to add a new template to this repo. Add one whenever a design is ready; there's no need to fill the repo all at once.

## 1. Pick a name

Short, descriptive, lowercase kebab-case:

```text
saas-landing-page
fintech-dashboard
ai-website-builder
```

Avoid names like `SaaS Landing Page`, `landingPageFinal`, or `new-project-2`.

## 2. Create the folder

Every template lives in `apps/`:

```bash
mkdir apps/saas-landing-page
```

Scaffold the app there, or copy existing source in. The folder needs its own `package.json` and `.gitignore`, and must not reference anything outside itself.

## 3. Test locally

```bash
cd apps/saas-landing-page
npm install
npm run dev
```

Check desktop, tablet, mobile, navigation, buttons, animation, images, fonts, and the console.

## 4. Build

```bash
npm run build
```

It must finish without errors. Vite outputs to `dist/`.

## 5. Add the README and thumbnail

- Write `README.md` following [`README_TEMPLATE.md`](README_TEMPLATE.md).
- Add `cover.jpg` (max 1600px wide).
- Add the template to the gallery and the **Templates** table in the root README.

## 6. Commit

From the repo root:

```bash
git add apps/saas-landing-page
git commit -m "add saas landing page"
git push
```

For a new template, prefer a branch and a PR so Vercel gives you a preview URL first.

## 7. Create the Vercel project

1. In Vercel, **Add New → Project** and import `templatevibecode`.
2. Set **Root Directory** to `apps/saas-landing-page`.
3. Check that the framework is detected correctly, then deploy.

Every Vercel project can use the same repository. See [`VERCEL_SETUP.md`](VERCEL_SETUP.md).

## 8. Verify the deployment

Open the production URL and check that:

- the page renders, and assets, fonts, and images load;
- animation runs and the layout is responsive on mobile;
- there's no private or debug information;
- there's no navigation to other templates.

## Don't

Don't build templates as routes inside one app (`/saas`, `/fintech`, `/crypto`). Each template is its own app in `apps/` with its own deployment.
