// Custom Animation System
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations immediately
    initializeAnimations();
    // Initialize typing animation
    initTypeWriter();

    const progressBars = document.querySelectorAll('.progress');

    progressBars.forEach(bar => {
        const width = bar.dataset.width; // Get the width from the data attribute
        bar.style.width = width + '%'; // Set the width
    });
});

// Typing Animation
function initTypeWriter() {
    const text = "Aspiring Software Developer";
    const typingText = document.querySelector('.typing-text');
    let charIndex = 0;
    let isErasing = false;
    
    if (typingText) {
        typingText.textContent = ''; // Clear the text initially
        
        function type() {
            if (!isErasing && charIndex < text.length) {
                // Typing forward
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(type, 80);
            } else if (!isErasing && charIndex >= text.length) {
                // Start erasing after delay
                setTimeout(() => {
                    isErasing = true;
                    type();
                }, 2000);
            } else if (isErasing && charIndex > 0) {
                // Erasing
                charIndex--;
                typingText.textContent = text.substring(0, charIndex);
                setTimeout(type, 50);
            } else if (isErasing && charIndex === 0) {
                // Reset for next cycle
                isErasing = false;
                setTimeout(type, 500);
            }
        }
        
        setTimeout(type, 300);
    }
}

function initializeAnimations() {
    // Trigger initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animated', 'fade-up');
    }

    // Initialize all animation systems
    initScrollAnimations();
    initSkillAnimations();
    initProjectAnimations();
    initContactAnimations();
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate:not(.skill-card):not(.project-card)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => observer.observe(element));
}

function initSkillAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    const progressBar = entry.target.querySelector('.progress');
                    if (progressBar) {
                        progressBar.style.width = progressBar.getAttribute('data-width') || '0%';
                    }
                }, index * 150); // Slightly faster animation sequence
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => observer.observe(card));
}

function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated', 'fade-up');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    projectCards.forEach(card => observer.observe(card));
}

function initContactAnimations() {
    const contactElements = document.querySelectorAll('.contact-info, .social-links');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    contactElements.forEach(element => observer.observe(element));
}

// Improved Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Enhanced Active Navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            updateActiveLink(id);
        }
    });
}, {
    threshold: 0.3,
    rootMargin: "-80px 0px 0px 0px"
});

sections.forEach(section => navObserver.observe(section));

function updateActiveLink(id) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
        }
    });
}