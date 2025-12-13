// Initialize Lucide Icons
lucide.createIcons();

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
        navbar.classList.remove('py-4');
        navbar.classList.add('py-2');
    } else {
        navbar.classList.remove('nav-scrolled');
        navbar.classList.add('py-4');
        navbar.classList.remove('py-2');
    }
});

// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobileMenu.classList.toggle('mobile-menu-open');
    document.body.classList.toggle('overflow-hidden');
}

menuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

mobileLinks.forEach(link => {
    link.addEventListener('click', toggleMenu);
});

// GSAP Animations

// Hero Section Timeline
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTl.to('.hero-badge', {
    y: 0,
    opacity: 1,
    duration: 0.8,
    delay: 0.2
})
    .to('.hero-title', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2
    }, "-=0.4")
    .to('.hero-text', {
        y: 0,
        opacity: 1,
        duration: 0.8
    }, "-=0.6")
    .to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.8
    }, "-=0.6")
    .to('.hero-img-container', {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
    }, "-=1");

// Scroll Animations for Sections
const sections = document.querySelectorAll('section');

sections.forEach(section => {
    // Section Headers
    const header = section.querySelector('.section-header');
    if (header) {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });
    }

    // Feature Cards (About Section)
    const features = section.querySelectorAll('.feature-card');
    if (features.length > 0) {
        gsap.from(features, {
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        });
    }

    // Product Cards
    const products = section.querySelectorAll('.product-card');
    if (products.length > 0) {
        gsap.from(products, {
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        });
    }
});

// Hover effect for product cards (Javascript tilt alternative using simple GSAP)
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on mouse position
        const xPct = x / rect.width - 0.5;
        const yPct = y / rect.height - 0.5;

        gsap.to(card.querySelector('img'), {
            scale: 1.1,
            duration: 0.5
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('img'), {
            scale: 1,
            duration: 0.5
        });
    });
});
