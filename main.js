/* ============================================
 * Enhanced Research Portfolio - JavaScript
 * Version: 2.0
 * ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initContactForm();
});

/* ============================================
 * Navigation
 * ============================================ */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Highlight current page
    highlightCurrentPage();
    
    // Active link on scroll (for single-page sections)
    window.addEventListener('scroll', debounce(updateActiveNavLink, 100));
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0) return;
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            link.classList.remove('active');
            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        }
    });
}

/* ============================================
 * Smooth Scroll
 * ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navHeight = document.querySelector('.nav')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
 * Scroll Animations
 * ============================================ */
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements
        document.querySelectorAll('.fade-up').forEach(el => {
            el.classList.add('animate-in');
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all fade-up elements
    document.querySelectorAll('.fade-up').forEach(item => {
        observer.observe(item);
    });
}

/* ============================================
 * Contact Form
 * ============================================ */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Here you would normally send the data to a server
    console.log('Form submitted:', data);
    
    // Show success message
    showFormMessage('Thank you! Your message has been sent successfully.', 'success');
    
    // Reset form
    e.target.reset();
}

function showFormMessage(message, type) {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Remove existing message
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    messageEl.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 6px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;
    
    form.appendChild(messageEl);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
        messageEl.style.transition = 'opacity 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 5000);
}

/* ============================================
 * Parallax Effect (Optional)
 * ============================================ */
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });
}

/* ============================================
 * Utility Functions
 * ============================================ */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ============================================
 * Page Visibility
 * ============================================ */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

/* ============================================
 * Resize Handler
 * ============================================ */
window.addEventListener('resize', debounce(() => {
    // Handle responsive changes if needed
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Close mobile menu on desktop
    if (window.innerWidth > 768) {
        if (navToggle) navToggle.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    }
}, 250));

/* ============================================
 * Print Event
 * ============================================ */
window.addEventListener('beforeprint', () => {
    console.log('Preparing to print...');
});

window.addEventListener('afterprint', () => {
    console.log('Print completed');
});
