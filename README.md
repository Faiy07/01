# 🎉 Birthday Scroll Story Website

A beautiful, interactive scroll-based birthday website that tells a story through smooth animations and heartfelt messages.

## ✨ Features

- **Scroll-triggered animations** using GSAP and ScrollTrigger
- **Responsive design** optimized for mobile devices
- **Typewriter effect** for the personal message
- **Floating hearts and sparkles** for magical ambiance
- **Balloon and confetti animations** for the grand finale
- **Smooth parallax effects** and hover interactions
- **Clean, modern design** with soft pastel colors

## 🚀 Quick Start

1. **Customize the content:**
   - Edit the friend's name in `index.html` (line 15)
   - Modify the memory sections with your own messages
   - Update the personal message in `script.js` (line 45)

2. **Host the website:**
   - **Netlify**: Drag and drop the folder to netlify.com
   - **Vercel**: Connect your GitHub repo to vercel.com
   - **GitHub Pages**: Push to a GitHub repo and enable Pages
   - **Any static hosting**: Upload the files to any web server

## 🎨 Customization

### Changing Colors
Edit the CSS gradients in `styles.css`:
- Landing section: Lines 25-26
- Memory sections: Lines 95-110
- Personal message: Line 150
- Final section: Line 200

### Adding More Sections
1. Copy a memory section in `index.html`
2. Add a new background color in `styles.css`
3. The animations will work automatically!

### Modifying Animations
All animations are controlled in `script.js`:
- Landing animations: `initLandingAnimations()`
- Memory sections: `initMemoryAnimations()`
- Typewriter effect: `initTypewriterEffect()`
- Final surprise: `initFinalAnimations()`

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Touch-friendly interactions
- Optimized font sizes for mobile
- Smooth scrolling on all devices
- Reduced motion support for accessibility

## 🎯 Performance

- Lightweight (under 100KB total)
- Uses CDN for GSAP library
- Optimized animations with hardware acceleration
- Lazy loading support for future images

## 💝 Perfect For

- Birthday surprises
- Anniversary celebrations
- Thank you messages
- Love letters
- Any special occasion!

## 🛠️ Technical Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (ES6+)** - Interactive functionality
- **GSAP** - Professional animation library
- **ScrollTrigger** - Scroll-based animation triggers

---

Made with 💕 for someone special. Enjoy the magic! ✨