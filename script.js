/*
  Birthday Story - GSAP Scroll Experience
  - Customizable content below
  - Mobile-first, reduced-motion aware
*/

// ---------- Customize here ----------
const CONFIG = {
  friendName: 'Ava',
  littleThings: [
    { title: 'Your laugh', text: "It turns any ordinary day into something bright." },
    { title: 'Coffee walks', text: "Those early morning chats are my favorite ritual." },
    { title: 'Your courage', text: "You keep showing up with heart, no matter what." },
    { title: 'The playlists', text: "You somehow always pick the right song at the right time." },
    { title: 'How you care', text: "You make people feel seen, and that is a rare gift." },
  ],
  personalMessage:
    "Another year around the sun, and somehow you shine brighter.\n\nThank you for your kindness, your humor, and for being you.\nI’m so lucky to walk beside you in this life.\n\nHappiest birthday — here’s to the magic ahead!",
  balloonColors: [
    '#f9a8d4', // pink
    '#a78bfa', // lavender
    '#86efac', // mint
    '#fbcfe8', // light pink
    '#c4b5fd', // light purple
    '#bbf7d0', // light mint
  ],
};

// ---------- Utils ----------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function createStoryItems(container, items) {
  const grid = document.createElement('div');
  grid.className = 'grid';
  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'story-item';
    const title = document.createElement('h3');
    title.textContent = item.title;
    const para = document.createElement('p');
    para.textContent = item.text;
    card.appendChild(title);
    card.appendChild(para);
    grid.appendChild(card);
  }
  container.appendChild(grid);
}

async function typewriterEffect(targetEl, fullText, charDelay = 22) {
  if (!targetEl) return;
  if (prefersReducedMotion) {
    targetEl.textContent = fullText;
    return;
  }
  targetEl.textContent = '';
  for (let index = 0; index < fullText.length; index++) {
    const character = fullText[index];
    targetEl.textContent += character;
    const isNewline = character === '\n';
    const delay = isNewline ? 80 : charDelay + Math.random() * 35;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function createBalloon(color) {
  const el = document.createElement('div');
  el.className = 'balloon';
  el.style.background = color;
  el.style.left = `${randomInRange(0, 100)}%`;
  el.style.width = `${randomInRange(28, 48)}px`;
  el.style.height = `${randomInRange(38, 66)}px`;
  return el;
}

function launchBalloons(container, colors, count = 18) {
  if (!container) return;
  const timeline = gsap.timeline({ defaults: { ease: 'sine.out' } });
  const balloons = [];
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length];
    const balloon = createBalloon(color);
    container.appendChild(balloon);
    balloons.push(balloon);
    const horizontalDrift = randomInRange(-60, 60);
    const duration = randomInRange(6, 10);
    const delay = randomInRange(0, 1.6);
    timeline.to(balloon, {
      y: '-120vh',
      x: `+=${horizontalDrift}`,
      rotate: randomInRange(-10, 10),
      duration,
      delay,
      onComplete: () => balloon.remove(),
    }, 0);
  }
  return timeline;
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  // Populate name
  const nameEl = document.getElementById('friend-name');
  if (nameEl) nameEl.textContent = CONFIG.friendName;
  document.title = `Happy Birthday, ${CONFIG.friendName}!`;

  // Build story items
  const storyContainer = document.getElementById('story-container');
  createStoryItems(storyContainer, CONFIG.littleThings);

  // Reduced motion: skip animation setup
  if (prefersReducedMotion) {
    const closing = document.getElementById('closing-wish');
    if (closing) closing.style.opacity = '1';
    const typeTarget = document.getElementById('typewriter');
    typewriterEffect(typeTarget, CONFIG.personalMessage, 0);
    return;
  }

  // GSAP setup
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero intro animation
    gsap.from('#hero .headline', { y: 24, opacity: 0, duration: 0.9, ease: 'power2.out' });
    gsap.from('#hero .subhead', { y: 14, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power2.out' });
    gsap.from('#hero .hint', { y: 8, opacity: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' });

    // Story cards reveal on scroll
    const cards = document.querySelectorAll('.story-item');
    cards.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 0.4,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: Math.min(index * 0.02, 0.2),
      });
    });

    // Typewriter triggers when section enters
    ScrollTrigger.create({
      trigger: '#message',
      start: 'top 70%',
      once: true,
      onEnter: () => typewriterEffect(document.getElementById('typewriter'), CONFIG.personalMessage),
    });

    // Finale: balloons + reveal closing wish
    ScrollTrigger.create({
      trigger: '#finale',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const tl = launchBalloons(document.getElementById('balloon-container'), CONFIG.balloonColors, 22);
        gsap.to('#closing-wish', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.2 });
        return tl;
      },
    });
  }
});

