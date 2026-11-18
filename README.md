# Remedy storefront

A React landing page reconstructed from the supplied desktop and mobile campaign screenshots. Includes Tailwind CSS, Swiper, Motion mini, editable components, original campaign media and a prerendered production build.

## Run locally

Use Node.js 22.12 or newer. From this directory:

```sh
npm ci
npm run dev
```

## Build and preview

```sh
npm run build
npm run preview
```

Deploy the contents of `dist/` at the root of a static website. The included build can be served immediately. Opening the HTML directly from the filesystem does not run ES modules. Configure HTTPS and compressed HTTP responses on the host.

## Media

The hero uses the requested Shopify MP4 at every breakpoint, with the same campaign video bundled locally as a fallback. The poster remains visible while playback starts. Autoplay respects reduced-motion and data-saving settings. Short review clips are bundled locally for fast inline playback. Selecting an active card opens its full streaming video. The default product photography is optimized locally. Set `VITE_REMOTE_IMAGES=true` and rebuild to use the original image CDN URLs.

## Storefront behavior

All navigation stays on this storefront. Product details, bundle selection, routine browsing, Skinpedia article previews and checkout review open locally. The bag persists on this device. Prices reflect the project catalog snapshot in US dollars. The preview does not process payments, create customer accounts, or send newsletter subscriptions.

## Animation

`Belief.jsx` draws an outline around “healthy” and erases and reveals “great skin” when the section enters the viewport. It loads Motion mini on demand and respects reduced motion. Find Your Remedy supports mouse dragging, touch swiping and arrow buttons. Second opinions centers the first clip, advances every eight seconds while visible, and loops with inline sound, pause and add-to-bag controls. The navigation stays pinned above the page while scrolling.

## Project layout

- `src/App.jsx` composes the landing page and manages the bag.
- `src/components/` contains the hero, product gallery, animated statement, editorial sections, stories, Skinpedia, footer and local detail views.
- `src/shared.jsx` contains media, icons and accessible dialogs.
- `src/Carousel.jsx` enhances native scrolling with Swiper.
- `src/style.css` contains the responsive layout and theme.
- `src/start.js` and `src/main.jsx` hydrate the prerendered storefront.
- `scripts/render.mjs` renders the initial HTML and inlines its stylesheet.
- `audit.json` records the production build's local Lighthouse measurements. The results apply to the listed test profiles; deployment, network and hardware affect scores.
