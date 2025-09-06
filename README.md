# Birthday Scroll Story (Static Site)

A small, scroll-based storytelling site built with HTML, CSS, and JavaScript using GSAP + ScrollTrigger for animations. Designed to feel personal, minimal, and mobile-friendly.

## Quick Start

1. Edit `script.js` and personalize the content in the `CONTENT` object:

```js
const CONTENT = {
  friendName: 'My Friend',
  littleThings: [
    'The way you make everyone feel seen and valued.',
    'That laugh that turns any bad day into a good one.',
  ],
  personalMessage: 'Write your heartfelt message here…',
  finalWish: 'Happy Birthday — may all your wishes take flight! 🎈'
};
```

2. Open `index.html` in a browser (or serve the folder with any static server).

## Hosting

- Netlify: Drag-and-drop the folder or connect your repo. Build command: none. Publish directory: project root.
- Vercel: Import the repo as a static project. Framework preset: Other. Output directory: `.`
- GitHub Pages: Commit to a repository and publish the default branch or `/docs`.

## Features

- Scroll-driven animations with GSAP + ScrollTrigger
- Typewriter reveal for a personal message
- Finale with balloons + confetti
- Pastel, minimal design with a soft glass-card aesthetic
- Mobile-optimized and respects `prefers-reduced-motion`

## Customization Tips

- Colors and style tokens live in `styles.css` under `:root` as CSS variables.
- Add or remove “little things” by editing the `littleThings` array.
- If you want different effects, use GSAP timelines in `script.js` (`animateMemories`, `animateHero`, `animateFinal`).

## Attribution

- Animations powered by GSAP (`cdnjs`) and ScrollTrigger.
- Confetti by `canvas-confetti` (`jsdelivr`).

