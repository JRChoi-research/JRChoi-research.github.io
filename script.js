// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Active nav on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
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

window.addEventListener('scroll', updateActiveNav);

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Publication year toggle
const yearButtons = document.querySelectorAll('.year-btn');

yearButtons.forEach(button => {
    button.addEventListener('click', function() {
        const yearPubs = this.nextElementSibling;
        const icon = this.querySelector('span');
        
        this.classList.toggle('active');
        yearPubs.classList.toggle('active');
        
        if (yearPubs.classList.contains('active')) {
            icon.textContent = '−';
        } else {
            icon.textContent = '+';
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.research-item, .pub-item, .gallery-item, .award, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Form submission (placeholder)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('This is a demo form. Please configure your email backend or use a service like Formspree, EmailJS, or Netlify Forms.');
    });
}

// Gallery lightbox (simple version)
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        // You can add lightbox functionality here
        // For now, just a simple zoom effect
        const img = this.querySelector('img');
        if (img && !this.classList.contains('video-item')) {
            // Simple implementation - you can enhance with a proper lightbox library
            console.log('Gallery item clicked:', img.src);
        }
    });
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #9fb89f, #c8dcc8);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = `${scrollPercent}%`;
    });
};

createScrollProgress();

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
    console.log('Website initialized');
});

/*
 * CUSTOMIZATION NOTES:
 * 
 * To update your profile photo:
 * 1. Replace the placeholder image URL in index.html (line with "Your+Photo")
 * 2. Or add your photo file to the repository and update the src
 * 
 * To update research images:
 * 1. Replace placeholder URLs in the Research and Gallery sections
 * 2. Or upload images to /images folder and update paths
 * 
 * To add video:
 * 1. Upload video file to repository
 * 2. Update the src in the gallery video element
 * 
 * To connect Google Scholar:
 * 1. Get your Google Scholar user ID from your profile URL
 * 2. Replace "YOUR_ID" with your actual ID in the href attributes
 * 
 * To update publications:
 * 1. Manually edit the publication items in index.html
 * 2. Or use the Google Scholar API (requires backend setup)
 * 
 * To enable contact form:
 * 1. Sign up for services like Formspree, EmailJS, or use Netlify Forms
 * 2. Follow their integration instructions
 */
