// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Landing section animations
function initLandingAnimations() {
    const tl = gsap.timeline();
    
    tl.to('.main-title', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
    })
    .to('.friend-name', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
    }, '-=0.5')
    .to('.celebration-emoji', {
        duration: 0.8,
        opacity: 1,
        scale: 1,
        ease: 'back.out(1.7)'
    }, '-=0.3')
    .to('.scroll-indicator', {
        duration: 0.5,
        opacity: 1,
        ease: 'power2.out'
    }, '-=0.2');
}

// Memory sections scroll animations
function initMemoryAnimations() {
    gsap.utils.toArray('.memory-section').forEach((section, index) => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 100
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Animate text elements with stagger
        gsap.fromTo(section.querySelector('.memory-text h3'), {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.fromTo(section.querySelector('.memory-text p'), {
            opacity: 0,
            x: 50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Typewriter effect for personal message
function initTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriter');
    const message = "You are one of the most incredible people I know. Your friendship has brought so much joy and laughter into my life. Thank you for being you - kind, funny, supportive, and absolutely amazing. I'm so grateful to have you in my life, and I can't wait to see all the wonderful things this new year will bring for you. Love you lots! 💕";
    
    let i = 0;
    const speed = 30; // typing speed in milliseconds
    
    function typeWriter() {
        if (i < message.length) {
            typewriterElement.textContent += message.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    
    // Start typewriter when section comes into view
    ScrollTrigger.create({
        trigger: '.personal-message-section',
        start: 'top 70%',
        onEnter: () => {
            if (typewriterElement.textContent === '') {
                typewriterElement.textContent = '';
                typeWriter();
            }
        }
    });
}

// Personal message section animations
function initPersonalMessageAnimations() {
    gsap.fromTo('.personal-message-section .message-container h3', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.personal-message-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
}

// Final section animations
function initFinalAnimations() {
    // Main content animation
    gsap.fromTo('.final-content h2', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.final-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    gsap.fromTo('.final-content p', {
        opacity: 0,
        y: 30
    }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.3,
        scrollTrigger: {
            trigger: '.final-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Balloon animations
    gsap.utils.toArray('.balloon').forEach((balloon, index) => {
        gsap.fromTo(balloon, {
            opacity: 0,
            y: 100,
            scale: 0.5
        }, {
            opacity: 1,
            y: -200,
            scale: 1,
            duration: 3,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.final-section',
                start: 'top 60%',
                onEnter: () => {
                    gsap.to(balloon, {
                        animation: 'balloon-rise 3s ease-out forwards',
                        delay: index * 0.2
                    });
                }
            }
        });
    });

    // Confetti animations
    gsap.utils.toArray('.confetti').forEach((confetti, index) => {
        gsap.fromTo(confetti, {
            opacity: 0,
            y: -100,
            rotation: 0
        }, {
            opacity: 1,
            y: 200,
            rotation: 360,
            duration: 4,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.final-section',
                start: 'top 50%',
                onEnter: () => {
                    gsap.to(confetti, {
                        animation: 'confetti-fall 4s ease-out forwards',
                        delay: index * 0.2
                    });
                }
            }
        });
    });
}

// Parallax effect for floating hearts
function initParallaxEffects() {
    gsap.utils.toArray('.heart').forEach((heart, index) => {
        gsap.to(heart, {
            y: -50,
            rotation: 10,
            duration: 2 + index * 0.5,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true
        });
    });
}

// Smooth scroll behavior
function initSmoothScroll() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile touch optimizations
function initMobileOptimizations() {
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Add touch feedback for interactive elements
    document.querySelectorAll('.memory-section, .personal-message-section, .final-section').forEach(section => {
        section.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        section.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images if any are added later
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0.1);
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial states
    gsap.set('.main-title', { opacity: 0, y: 50 });
    gsap.set('.friend-name', { opacity: 0, y: 50 });
    gsap.set('.celebration-emoji', { opacity: 0, scale: 0.5 });
    gsap.set('.scroll-indicator', { opacity: 0 });
    gsap.set('.memory-section', { opacity: 0, y: 100 });
    gsap.set('.memory-text h3', { opacity: 0, x: -50 });
    gsap.set('.memory-text p', { opacity: 0, x: 50 });
    gsap.set('.personal-message-section .message-container h3', { opacity: 0, y: 30 });
    gsap.set('.final-content h2', { opacity: 0, y: 50 });
    gsap.set('.final-content p', { opacity: 0, y: 30 });
    gsap.set('.balloon', { opacity: 0, y: 100, scale: 0.5 });
    gsap.set('.confetti', { opacity: 0, y: -100, rotation: 0 });

    // Initialize all animation functions
    initLandingAnimations();
    initMemoryAnimations();
    initPersonalMessageAnimations();
    initTypewriterEffect();
    initFinalAnimations();
    initParallaxEffects();
    initSmoothScroll();
    initMobileOptimizations();
    initPerformanceOptimizations();

    // Add some extra sparkle with random floating elements
    createFloatingSparkles();
});

// Create floating sparkles for extra magic
function createFloatingSparkles() {
    const sparkleContainer = document.createElement('div');
    sparkleContainer.className = 'sparkle-container';
    sparkleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(sparkleContainer);

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 1rem;
            opacity: 0;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation: sparkleFloat 4s ease-out forwards;
        `;
        
        sparkleContainer.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 4000);
    }

    // Add CSS for sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            20% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
            }
            80% {
                opacity: 1;
                transform: translateY(-80vh) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100vh) scale(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Create sparkles periodically
    setInterval(createSparkle, 2000);
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to memory sections
    document.querySelectorAll('.memory-section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        section.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Add a subtle cursor trail effect
document.addEventListener('DOMContentLoaded', function() {
    let mouseX = 0, mouseY = 0;
    let trail = [];
    const trailLength = 10;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.push({ x: mouseX, y: mouseY });
        if (trail.length > trailLength) {
            trail.shift();
        }
    });

    function createTrail() {
        if (trail.length > 0) {
            const point = trail[0];
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: fixed;
                left: ${point.x}px;
                top: ${point.y}px;
                width: 4px;
                height: 4px;
                background: rgba(255, 182, 193, 0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: trailFade 0.5s ease-out forwards;
            `;
            document.body.appendChild(dot);
            
            setTimeout(() => {
                dot.remove();
            }, 500);
        }
        requestAnimationFrame(createTrail);
    }

    // Add CSS for trail animation
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes trailFade {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(trailStyle);

    createTrail();
});