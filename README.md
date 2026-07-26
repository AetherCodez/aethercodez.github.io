# AetherCodez site

Static demo site for `SPA.js` and `CacheBuster.js`, built for GitHub Pages. No build step —
just push this folder to a repo named `AetherCodez.github.io` (or enable Pages on any repo)
and it works as-is.

## One manual step: the real avatar

I couldn't fetch your actual GitHub avatar image from this environment (`avatars.githubusercontent.com`
isn't reachable from here), so `assets/logos/avatar.svg` is a placeholder monogram in your
orange/dark-grey palette, standing in for both the favicon and the nav logo.

To swap in your real avatar:

1. Download it from `https://github.com/AetherCodez.png` (or your profile's "Download" option).
2. Save it as `assets/logos/avatar.png` (or keep the `.svg` extension if you export a vector version).
3. Update the two `<link rel="icon" ...>` tags and the three `<img src="assets/logos/avatar.svg">`
   nav tags (one per HTML page) to point at the new filename.

Everything else — layout, fonts, copy, the two demos — is ready to go.

## Adding a new package

You shouldn't need to touch any HTML for this. Two steps:

1. Drop a logo/icon file (svg or png, square works best) into `assets/logos/`.
2. Add an entry to `projects.json`:

```json
{
  "id": "your-project",
  "name": "YourProject.js",
  "tagline": "One or two sentences describing what it does.",
  "icon": "assets/logos/your-project.svg",
  "initials": "YP",
  "size": "~4 KB min",
  "deps": 0,
  "license": "MIT",
  "extraTag": "~300 lines",
  "demoUrl": "demo/YourProject.js/index.html",
  "repoUrl": "https://github.com/AetherCodez/YourProject.js"
}
```

That's it — the homepage grid is rendered from this file by `assets/code/render-projects.js`.
Field notes:

- `icon` is optional. If you leave it out, the card falls back to showing `initials` as a
  monogram instead (that's what the current SPA.js/CacheBuster.js cards effectively look like
  without a custom icon).
- `demoUrl` just needs to point somewhere — it doesn't have to be a fancy interactive demo like
  the two existing ones. A plain page with a usage snippet works fine; build out the fancier
  stuff later if you want it.
- **Testing locally**: `projects.json` is loaded with `fetch()`, which browsers block on the
  `file://` protocol. Run a quick local server to preview changes (`python3 -m http.server`
  from the site root, then open `localhost:8000`) rather than double-clicking `index.html`.
  This isn't an issue on GitHub Pages, which serves over `https://`.

## Structure

```
index.html                       homepage
projects.json                    package list — edit this to add/remove cards
demo/SPA.js/index.html           SPA.js demo (simulated browser chrome)
demo/CacheBuster.js/index.html   CacheBuster.js demo (simulated cache log)
assets/logos/                    avatar placeholder + per-package icons
assets/fonts/                    self-hosted Geist + Geist Mono (woff2, MIT/OFL licensed)
assets/code/style.css            shared design system
assets/code/main.js              shared behavior (copy buttons)
assets/code/render-projects.js   reads projects.json, builds the homepage cards
assets/code/spa-demo.js          SPA.js demo logic
assets/code/cachebuster-demo.js  CacheBuster.js demo logic
```

## Notes on the demos

Both demo widgets are **simulations** built to visually explain what each library does —
they don't load the actual minified scripts from jsDelivr, since the effects (wrapping the
whole page in an iframe, forcing a real hard reload) aren't things you'd want happening
inside a page that's also trying to explain them. The usage snippets above each demo are
the real, copy-pasteable script tags.
