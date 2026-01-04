// Smooth scroll for navigation links
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

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// Publication year toggle functionality
const yearToggles = document.querySelectorAll('.year-toggle');

yearToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const isActive = this.classList.contains('active');
        const content = this.nextElementSibling;
        const icon = this.querySelector('.toggle-icon');
        
        if (isActive) {
            this.classList.remove('active');
            content.classList.remove('active');
            icon.textContent = '+';
        } else {
            this.classList.add('active');
            content.classList.add('active');
            icon.textContent = '−';
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .award-item, .research-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect for decorative circles
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach((circle, index) => {
        const speed = (index + 1) * 0.05;
        circle.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add smooth reveal animation to sections on load
window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .cta-button, .lab-info');
    
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Custom cursor effect (optional enhancement)
const createRipple = (e) => {
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(159, 184, 159, 0.3)';
    ripple.style.pointerEvents = 'none';
    ripple.style.left = `${e.clientX - 10}px`;
    ripple.style.top = `${e.clientY - 10}px`;
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.opacity = '1';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.transform = 'scale(4)';
        ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
};

// Add ripple effect to buttons
document.querySelectorAll('.cta-button, .contact-button, .lab-link').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Scroll progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.style.position = 'fixed';
    progress.style.top = '0';
    progress.style.left = '0';
    progress.style.width = '0%';
    progress.style.height = '3px';
    progress.style.background = 'linear-gradient(90deg, #9fb89f, #c8dcc8)';
    progress.style.zIndex = '9999';
    progress.style.transition = 'width 0.1s ease-out';
    
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = `${scrollPercent}%`;
    });
};

createScrollProgress();

// Add stagger animation to publication entries
const animatePublications = () => {
    const publications = document.querySelectorAll('.publication-entry');
    
    publications.forEach((pub, index) => {
        pub.style.opacity = '0';
        pub.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            pub.style.transition = 'all 0.5s ease-out';
            pub.style.opacity = '1';
            pub.style.transform = 'translateX(0)';
        }, index * 100);
    });
};

// Trigger publication animation when section is visible
const publicationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animatePublications();
            publicationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const publicationsSection = document.querySelector('.publications');
if (publicationsSection) {
    publicationObserver.observe(publicationsSection);
}

// Enhance hover effects with sound feedback (optional)
const addHoverSoundEffect = () => {
    const hoverElements = document.querySelectorAll('.nav-link, .cta-button, .award-item, .research-card');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
};

addHoverSoundEffect();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    handleNavbarScroll();
    
    // Add initial load animation class
    document.body.classList.add('loaded');
});
