/* ============================================
 * Personal Homepage - Main JavaScript
 * Version: v2.0
 * Author: Hunpyo Ju
 * Date: 2025-12-15
 * ============================================ */

// ============================================
// Content Protection
// ============================================
function initContentProtection() {
    document.body.classList.add('protected');

    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable text selection
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable drag
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+C, Ctrl+S, Ctrl+U, Ctrl+P
        if (e.ctrlKey && ['c', 's', 'u', 'p'].includes(e.key.toLowerCase())) {
            e.preventDefault();
            return false;
        }
        // F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
    });
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Highlight current page in navigation
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ============================================
// GSAP Animations
// ============================================
function initAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        // Fallback: show all elements
        document.querySelectorAll('.fade-up').forEach(el => {
            el.classList.add('animated');
        });
        return;
    }

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Hero animation on load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-cta');
    gsap.to(heroElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
    });

    // Fade up animations for sections
    document.querySelectorAll('.fade-up').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Stats counter animation
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count')) || 0;
        const suffix = stat.getAttribute('data-suffix') || '';

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(stat, {
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                        const progress = this.progress();
                        stat.textContent = Math.floor(target * progress) + suffix;
                    }
                });
            },
            once: true
        });
    });
}

// ============================================
// Video Handling
// ============================================
function initVideoHandling() {
    const videos = document.querySelectorAll('video[data-autoplay]');

    if (typeof IntersectionObserver === 'undefined') {
        // Fallback: play all videos
        videos.forEach(video => video.play());
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.3 });

    videos.forEach(video => {
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        observer.observe(video);
    });
}

// ============================================
// Copy to Clipboard
// ============================================
function initCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.getAttribute('data-copy');
            if (!text) return;

            try {
                await navigator.clipboard.writeText(text);
                const originalText = btn.textContent;
                btn.textContent = 'Copied!';
                btn.style.background = 'var(--color-primary)';
                btn.style.color = 'white';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    });
}

// ============================================
// Initialize
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initContentProtection();
    initNavigation();
    initAnimations();
    initVideoHandling();
    initCopyButtons();
});

// Reinitialize animations on page show (for back/forward navigation)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        initAnimations();
    }
});
