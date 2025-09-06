## Birthday Scroll Story (Static Site)

A single-page, scroll-based storytelling site built with HTML/CSS/JS and GSAP + ScrollTrigger.

### Features
- Smooth scroll reveals for each memory or "little thing"
- Typewriter reveal for a personal message
- Finale with rising pastel balloons and a closing wish
- Mobile-first, lightweight, and respects `prefers-reduced-motion`

### Quick Start
1. Open `index.html` in your browser.
2. Edit `script.js` to customize the content (name, little things, and message).
3. Optionally tweak colors/spacing in `styles.css`.

### Customize
In `script.js`, edit the CONFIG at the top:

```js
const CONFIG = {
  friendName: 'Ava',
  littleThings: [
    { title: 'Your laugh', text: "It turns any ordinary day into something bright." },
    // ...
  ],
  personalMessage: "Write your heartfelt note here...",
  balloonColors: ['#f9a8d4', '#a78bfa', '#86efac']
};
```

You can also change the document title and the closing wish by editing `index.html` text content directly if you prefer.

### Deploy
- Netlify: Drag and drop the folder in the Netlify UI, or connect a repo.
- Vercel: `vercel` from the project folder, or import the repo in the dashboard.
- GitHub Pages: Commit to a repo, enable GitHub Pages for the main branch.

Because this is a static site, no build step is required.

### Accessibility & Motion
- The page respects `prefers-reduced-motion`. On devices where users prefer less motion, animations are disabled and content is shown immediately.
- Semantic sections and `aria-label`s are included for assistive tech.

### Notes
- GSAP and ScrollTrigger are loaded via CDN for simplicity.
- Keep images to a minimum for the most lightweight experience. If you add media, compress appropriately.

