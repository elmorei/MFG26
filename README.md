# MFG26 Strategy Game PoC

Phaser 3 + TypeScript + Vite proof of concept for a browser strategy game that runs on mobile and desktop, and is ready for GitHub Pages branch deployment.

## What this first step includes

- Green field rendered in a vector style.
- Randomly distributed tents (vector primitives).
- World map sized to **10x default viewport** (`12800 x 7200`).
- Camera controls:
  - Drag with mouse
  - Touch drag on mobile
  - `WASD` movement
  - Mouse wheel zoom
  - `Q/E` zoom in/out
- Zoom clamps from `0.2x` to `5x`.

## Target minimum performance tier (suggested)

- **CPU/GPU**: 2019+ mid-range mobile SoC (Snapdragon 730 / Apple A12 class) and newer.
- **Memory**: 3 GB RAM devices and above.
- **Browser**: Chrome/Edge/Safari released in the last ~3 years.
- **Frame target**: 30 FPS minimum on mobile, 60 FPS on desktop where possible.

This tier balances broad device support while keeping enough headroom for upcoming strategy mechanics.

## Project structure

```txt
.
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.ts
    ├── styles/
    │   └── style.css
    └── game/
        ├── constants.ts
        ├── gameConfig.ts
        ├── input/
        │   └── createCameraControls.ts
        └── scenes/
            └── FieldScene.ts
```

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages branch deployment

This repo is configured with `base: './'` in `vite.config.ts`, so assets are emitted as relative URLs and work when hosted from a branch deployment path.

Example Actions workflow (deploy `dist/` to `gh-pages`):

```yaml
name: Deploy Vite to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: gh-pages
```
