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


## Why the previous Pages deploy showed a blank page

If GitHub Pages publishes repository source files directly (without running Vite build), the browser receives `index.html` that references TypeScript entry code (`/src/main.ts`). Browsers cannot execute raw TypeScript modules, so the game does not boot.

This repo now includes `.github/workflows/static.yml` to install deps, run `npm run build`, and publish `dist/` to Pages.

This repo is configured with `base: './'` in `vite.config.ts`, so assets are emitted as relative URLs and work when hosted from a branch deployment path.

Deployment is handled by `.github/workflows/static.yml` in this repository:

- installs dependencies
- builds with Vite (`npm run build`)
- uploads `dist/`
- deploys via GitHub Pages official actions

After pushing to `main`, GitHub Pages should publish the built game correctly.
