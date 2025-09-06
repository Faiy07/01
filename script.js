// Content configuration — edit these to personalize
const CONTENT = {
  friendName: 'My Friend',
  littleThings: [
    'The way you make everyone feel seen and valued.',
    'That laugh that turns any bad day into a good one.',
    'Late-night chats that go from silly to life-deep in minutes.',
    'Your courage to try new things and make them your own.',
    'Every tiny kindness you never expect credit for.',
  ],
  personalMessage:
    "On your special day, I just wanted to say how grateful I am for you. You bring light, warmth, and joy into my life in a hundred little ways. Here’s to more memories, more laughter, and more adventures together. Happy Birthday!",
  finalWish: 'Happy Birthday — may all your wishes take flight! 🎈'
};

// Feature flags based on user preferences
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Helpers
function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

function typeText(el, text, cps = 24) {
  if (!el) return;
  if (reduceMotion) {
    el.textContent = text;
    el.classList.remove('typing');
    return;
  }
  el.textContent = '';
  el.classList.add('typing');
  const chars = [...text];
  let index = 0;
  const delay = 1000 / cps;
  const tick = () => {
    if (index < chars.length) {
      el.textContent += chars[index++];
      setTimeout(tick, delay);
    } else {
      el.classList.remove('typing');
    }
  };
  setTimeout(tick, 150);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function setupBalloons(container) {
  if (!container) return [];
  const colors = ['#fca5a5', '#fdba74', '#fde68a', '#a7f3d0', '#93c5fd', '#c4b5fd', '#fbcfe8'];
  const balloons = [];
  for (let i = 0; i < 10; i++) {
    const b = createEl('div', 'balloon');
    b.style.left = `${randomBetween(2, 96)}%`;
    b.style.background = colors[i % colors.length];
    container.appendChild(b);
    balloons.push(b);
  }
  return balloons;
}

function launchBalloons(balloons) {
  if (!balloons || reduceMotion) return;
  balloons.forEach((b, i) => {
    const duration = randomBetween(6, 10);
    const delay = randomBetween(0, 1.2);
    const x = randomBetween(-40, 40);
    gsap.fromTo(
      b,
      { y: '20vh', x: 0, opacity: 0 },
      { y: '-120vh', x, opacity: 1, ease: 'power1.out', duration, delay }
    );
  });
}

function launchConfetti(canvas) {
  if (!canvas || reduceMotion || typeof confetti === 'undefined') return;
  const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });
  // A few celebratory bursts
  const bursts = 6;
  const shoot = (i) => {
    myConfetti({
      particleCount: 120,
      spread: 70,
      startVelocity: 45,
      origin: { x: Math.random(), y: Math.random() * 0.2 + 0.1 },
      ticks: 220
    });
    if (i < bursts - 1) setTimeout(() => shoot(i + 1), 350);
  };
  shoot(0);
}

function buildMemories(container, items) {
  if (!container || !Array.isArray(items)) return [];
  const sections = [];
  items.forEach((text, idx) => {
    const section = createEl('section', 'section memory');
    section.setAttribute('aria-label', `Memory ${idx + 1}`);
    const card = createEl('div', 'card');
    const p = createEl('p', '', text);
    card.appendChild(p);
    section.appendChild(card);
    container.appendChild(section);
    sections.push(section);
  });
  return sections;
}

function animateHero() {
  const title = document.querySelector('.hero .name');
  const subtitle = document.querySelector('.hero .subtitle');
  if (!title || !subtitle) return;

  if (reduceMotion) {
    gsap.set([title, subtitle], { opacity: 1, y: 0 });
    return;
  }
  const tl = gsap.timeline();
  tl.from(title, { opacity: 0, y: 30, duration: 0.9, ease: 'power2.out' })
    .from(subtitle, { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' }, '-=0.4');
}

function animateMemories(sections) {
  if (!sections || reduceMotion) return;
  sections.forEach((section) => {
    const card = section.querySelector('.card');
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 76%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

function animateMessage(messageEl, text) {
  ScrollTrigger.create({
    trigger: '#message',
    start: 'top 70%',
    once: true,
    onEnter: () => typeText(messageEl, text)
  });
}

function animateFinal(finalEl) {
  const canvas = document.getElementById('confettiCanvas');
  const balloonsContainer = finalEl.querySelector('.balloons');
  const balloons = setupBalloons(balloonsContainer);

  ScrollTrigger.create({
    trigger: finalEl,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      launchBalloons(balloons);
      launchConfetti(canvas);
      const heading = finalEl.querySelector('h2');
      if (heading && !reduceMotion) {
        gsap.from(heading, { opacity: 0, y: 24, duration: 0.8, ease: 'power2.out' });
      }
    }
  });
}

function init() {
  // Personalize
  document.title = `Happy Birthday, ${CONTENT.friendName}!`;
  const friendNameEl = document.getElementById('friendName');
  if (friendNameEl) friendNameEl.textContent = CONTENT.friendName;
  const finalWishEl = document.getElementById('finalWish');
  if (finalWishEl) finalWishEl.textContent = CONTENT.finalWish;

  // Build memories
  const memoriesContainer = document.getElementById('memories');
  const memorySections = buildMemories(memoriesContainer, CONTENT.littleThings);

  // Register animations
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    animateHero();
    animateMemories(memorySections);
    animateMessage(document.getElementById('typewriter'), CONTENT.personalMessage);
    animateFinal(document.getElementById('final'));
  }
}

// Resize confetti canvas to section
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
});

// Initialize after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  init();
  // Trigger initial resize to size the canvas correctly
  window.dispatchEvent(new Event('resize'));
});

