# README Template

Every app in `apps/` has one `README.md` in this format, written in English. There is no separate `PROJECT.md`; metadata lives in the table at the top of the README.

## Format

````md
# <Template Name>

![<Template Name>](cover.jpg)

<One sentence: what it is and who it's for.>

| | |
|---|---|
| Live demo | https://<alias>.vercel.app |
| Type | Landing page / Company profile / Storefront / Dashboard |
| Stack | Framework, React, Vite, TypeScript, CSS |
| Design | [Figma Community: <name>](https://www.figma.com/community/file/...) (free) |
| Vercel | Project `<vercel-name>`, Root Directory `apps/<folder>` |
| Local port | <port> |

## Getting Started

Requires Node.js <version>.

```bash
npm ci
npm run dev        # http://127.0.0.1:<port>
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the build |

## Features

- Short bullets: interactions, pages, motion, accessibility.

Routes: `/`, ...

## Editing

| File | Contents |
|---|---|
| `src/content.ts` | Copy and data |
| `src/styles.css` | Styling |

## Notes

- Demo content, generated assets, limitations (forms don't send data, etc.).

## QA

[`docs/design-qa.md`](docs/design-qa.md)
````

Keep code, file names, and technical terms as they are.

## Suggested Folder Structure

```text
<template-name>/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/          # with OFL license files
├── src/
├── docs/
│   └── design-qa.md
├── .gitignore
├── cover.jpg           # thumbnail, max 1600px wide
├── README.md
├── package.json
├── vercel.json
└── index.html
```

You don't have to follow this exactly.

## Checklists

### Design

- [ ] Desktop, tablet, and mobile match the design
- [ ] Spacing, typography, color, radius, and shadows match
- [ ] Hover states where needed
- [ ] Animation is restrained and respects `prefers-reduced-motion`

### Development

- [ ] `npm ci`, `npm run dev`, and `npm run build` succeed
- [ ] No console errors, missing assets, or broken imports
- [ ] No hardcoded localhost URLs
- [ ] Image sizes are reasonable and unused assets are deleted
- [ ] Fonts load correctly

### Public release

- [ ] Only the template's own pages; no navigation to other templates
- [ ] No test copy, internal notes, secrets, or API keys
- [ ] No Figma working-file links (Community links only)
- [ ] Browser title and metadata match the template
- [ ] `cover.jpg` added and the template is listed in the root README

### Vercel

- [ ] Root Directory points to `apps/<folder>`
- [ ] Framework preset, build command, and output directory are correct
- [ ] Production deployment succeeds and the live demo opens on mobile
