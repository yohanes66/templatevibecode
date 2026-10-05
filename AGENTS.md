# AGENTS.md

Rules for coding agents (Codex, Claude Code, etc.) working in this repo. Read before changing anything.

## What this repo is

A collection of free website templates (MIT licensed). People grab them with `npx degit yohanes66/templatevibecode/apps/<name>`. The Vercel deployments only exist as a showcase for the portfolio at [yohanesnick.site/work](https://yohanesnick.site/work).

Because people take a single app folder, every app must install, build, and make sense without any other file in the repo.

```text
apps/<name>/     1 folder = 1 app = 1 Vercel project
docs/            Guides: ADD_NEW_PROJECT, README_TEMPLATE, VERCEL_SETUP
```

There is no root `package.json`, workspace, or shared package. Run `npm` from inside `apps/<name>/`.

## Structure rules

- **Every app lives in `apps/<kebab-case-name>/`.** Don't create new top-level folders such as `templates/`, `projects/`, or `sites/`.
- **Don't put HTML, images, or assets in the repo root.** There is no template catalog in this repo; the showcase lives on the portfolio at [yohanesnick.site/work](https://yohanesnick.site/work).
- **Apps must be self-contained.** No imports, `url()`, or links to files outside the app folder (`../../...`). Vercel only builds the Root Directory, so anything outside it never ships.
- **One README per app, in English.** Follow [`docs/README_TEMPLATE.md`](docs/README_TEMPLATE.md). Don't create `PROJECT.md` or other metadata files.
- **Each app has its own `.gitignore`.** People who `degit` one folder don't get the root `.gitignore`.
- **The template thumbnail is `apps/<name>/cover.jpg`** (JPG, max 1600px wide, quality around 82). It is shown in the app README and in the root README gallery. QA scripts must never overwrite it.
- **Design QA notes go in `docs/design-qa.md` inside the app folder.**
- **Only link Figma Community files** (`figma.com/community/file/...`), the same ones the portfolio uses. Never write a Figma working-file link or file key (`figma.com/design/...`) anywhere in this repo; it is public.
- **Never commit build output or local artifacts:** `dist/`, `.output/`, `.vercel/`, `node_modules/`, `output/`, `.playwright-cli/`. They are all in `.gitignore`.
- **Delete assets you stop using.** When an image is replaced, remove the old file in the same commit.

## Local ports

Each app uses a fixed port (`--strictPort`) so they can run side by side:

| App | Port |
|---|---|
| scalar-ai | 3000 |
| maren-botanical | 3200 |
| norte-studio | 3300 (QA 3301) |
| sorrel-studio | 3400 |

New apps take the next free port: 3500, 3600, and so on. Add them to this table.

## Adding an app

1. Create `apps/<name>/` with its own `package.json` and `.gitignore`.
2. Use a new port in the `dev` and `preview` scripts.
3. For an SPA (Vite + TanStack Router), add a `vercel.json` that rewrites to `/index.html`.
4. Write `README.md` following the template and add `cover.jpg`.
5. Make sure `npm run build` passes in that folder.
6. Add the app to the gallery, the **Templates** table, and the **Deployment** table in the root `README.md`, plus the port table above.

The repo owner creates the Vercel project. Agents only need to write the correct Root Directory, `apps/<name>`, in the README.

## Deployment

- **Pushing to `main` deploys production** for every Vercel project connected to this repo.
- **Never move or rename `apps/<name>` without telling the owner.** The Vercel Root Directory breaks and deploys fail right away with `Root Directory ... does not exist`.
- **Run `npm run build` in every app you changed before pushing.**
- **If Vercel blocks a deploy because of a vulnerable package** (e.g. TanStack Start), update that package with `npm update <pkg>`. Never use the `DANGEROUSLY_*` flags.

## Git workflow

- **Large changes or new apps go on a branch** (`codex/<topic>`, `claude/<topic>`) with a PR to `main`. Vercel creates a preview URL for every branch.
- **Small changes** (a typo, a single CSS fix) can go straight to `main`.
- **Delete branches after merging.** Don't leave behind branches that are no longer ahead of `main`.
- **One commit, one app.** Short, lowercase commit messages, e.g. `fix mobile nav for norte studio`.
