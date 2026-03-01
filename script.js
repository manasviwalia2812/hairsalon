// Sticky Navbar & Scroll Reveal
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const reveals = document.querySelectorAll('.scroll-reveal');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval = setInterval(nextSlide, 5000);
let currentSlide = 0;
const counters = document.querySelectorAll('.counter');

// Mobile Menu Toggle
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    reveals.forEach(reveal => {
        const top = reveal.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) reveal.classList.add('visible');
    });
});

// Services 3D Tilt
const cards = document.querySelectorAll('.tilt-3d');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = (y / (rect.height / 2)) * -15;
        const rotY = (x / (rect.width / 2)) * 15;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.05,1.05,1.05)`;
        card.style.boxShadow = `${-rotY}px ${rotX}px 20px rgba(212,175,55,0.3)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
        card.style.boxShadow = 'none';
    });
});



// Hero Slider


function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    if (slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}



dots.forEach((dot, index) => {
    const triggerSlide = () => {
        if (currentSlide !== index) {
            currentSlide = index;
            showSlide(currentSlide);
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
    };
    dot.addEventListener('click', triggerSlide);
    dot.addEventListener('mouseenter', triggerSlide);
});

// Animated Stat Counters
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS roughly

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + suffix;
                }
            };

            updateCounter();
            observer.unobserve(counter); // only animate once
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});
