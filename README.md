# Linbro Fitness Park — website demo

A redesign of [linbrofitnesspark.co.za](https://linbrofitnesspark.co.za/): a scroll-choreographed home page over photos of the gym, plus separate pages for Classes, Packages, Coaches, Ladies Only and Contact.

**Live demo:** https://rolandvtonder.github.io/Linbro-Fitness-Park-website-demo/

## Run it locally

```bash
npm install
npm run dev
```

## Update the content

Class times, coaches, prices, contact details and links all live in [`src/data.ts`](src/data.ts). Photos are in `public/assets/`.

## Deploy

Every push to `main` builds the site and publishes it to GitHub Pages (see `.github/workflows/deploy.yml`). For any other host, run `npm run build` and upload the `dist/` folder.

Built with Vite, React, TypeScript, Tailwind CSS and Motion.
