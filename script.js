// ===================================
// SULAIMAAN - LUXURIOUS PORTFOLIO JAVASCRIPT
// Enhanced with 100+ Animations & Advanced UX
// ===================================

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initializePortfolio();
});

function initializePortfolio() {
    // Performance optimization
    initPerformanceOptimizations();
    
    // Preloader
    initPreloader();
    
    // Navigation
    initNavigation();
    
    // Smooth Scrolling (without duplicate progress bar)
    initSmoothScroll();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Skill Bars Animation
    initSkillBars();
    
    // Contact Form
    initContactForm();
    
    // Scroll Indicator
    initScrollIndicator();
    
    // Scroll to Top Button
    initScrollToTop();
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================
function initPerformanceOptimizations() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.classList.add('reduced-motion');
    }
    
    // Optimize images loading
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ===================================
// MOBILE DETECTION
// ===================================
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth < 768;
}

// ===================================
// MOBILE GESTURES
// ===================================
function initMobileGestures() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe up - scroll to next section
                scrollToNextSection();
            } else {
                // Swipe down - scroll to previous section
                scrollToPreviousSection();
            }
        }
    }
    
    function scrollToNextSection() {
        const sections = document.querySelectorAll('section');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex < sections.length - 1) {
            sections[currentIndex + 1].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    function scrollToPreviousSection() {
        const sections = document.querySelectorAll('section');
        const currentSection = getCurrentSection();
        const currentIndex = Array.from(sections).indexOf(currentSection);
        
        if (currentIndex > 0) {
            sections[currentIndex - 1].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    function getCurrentSection() {
        const sections = document.querySelectorAll('section');
        let current = sections[0];
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                current = section;
            }
        });
        
        return current;
    }
}

// ===================================
// PRELOADER - TYPING EFFECT
// ===================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const typingText = document.getElementById('typingText');
    
    if (!preloader || !typingText) {
        console.warn('Preloader elements not found');
        return;
    }
    
    const text = 'SULAIMAAN';
    let index = 0;
    
    // Typing effect
    function typeText() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 150); // Typing speed
        } else {
            // Wait a bit after typing completes, then hide preloader
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                // Trigger initial animations
                triggerInitialAnimations();
            }, 1000);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 500);
}

function triggerInitialAnimations() {
    // Reveal elements with data-scroll-reveal on page load
    const heroElements = document.querySelectorAll('.hero [data-scroll-reveal]');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, index * 100);
    });
}

// ===================================
// CUSTOM CURSOR - LUXURY EFFECT
// ===================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;
        
        followerX += distX * 0.1;
        followerY += distY * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .btn, .magnetic-element');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.classList.remove('active');
        });
    });
}

// ===================================
// SPLIT TEXT ANIMATION
// ===================================
function initSplitText() {
    const splitTextElements = document.querySelectorAll('.split-text');
    
    splitTextElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${index * 0.03}s`;
            element.appendChild(span);
        });
    });
}

// ===================================
// MAGNETIC ELEMENTS
// ===================================
function initMagneticElements() {
    const magneticElements = document.querySelectorAll('.magnetic-element');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.3;
            const moveY = y * 0.3;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// ===================================
// PARTICLE CANVAS - INTERACTIVE PHYSICS
// ===================================
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 80;
    const mouse = { x: null, y: null, radius: 150 };
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(212, 175, 55, ${Math.random() * 0.5 + 0.3})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = dx / distance;
                const directionY = dy / distance;
                this.x -= directionX * force * 3;
                this.y -= directionY * force * 3;
            }
            
            // Boundary check
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }
    }
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Connect particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 - distance / 500})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
    
    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===================================
// PARALLAX EFFECTS
// ===================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        // Hero parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Portrait parallax
        const heroPortrait = document.querySelector('.hero-portrait');
        if (heroPortrait) {
            heroPortrait.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        // Floating particles
        const floatingParticles = document.querySelectorAll('.floating-particle');
        floatingParticles.forEach((particle, index) => {
            const speed = 0.1 + (index * 0.05);
            particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===================================
// TILT EFFECT (3D)
// ===================================
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.hover-tilt');
    
    tiltElements.forEach(element => {
        // Add smooth transition for reset
        element.style.transition = 'transform 0.3s ease-out';
        
        element.addEventListener('mouseenter', () => {
            // Remove transition during movement for responsiveness
            element.style.transition = 'none';
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduced rotation for subtler effect
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            // Re-enable transition for smooth reset
            element.style.transition = 'transform 0.3s ease-out';
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ===================================
// PAGE TRANSITIONS
// ===================================
function initPageTransitions() {
    // Page transition overlay disabled for internal links
    // Smooth scrolling is handled by initSmoothScroll()
    // Keep this function for potential external page transitions in the future
    const pageTransition = document.getElementById('pageTransition');
    if (pageTransition) {
        pageTransition.style.display = 'none';
    }
}

// ===================================
// ENHANCED NAVIGATION WITH PERFORMANCE OPTIMIZATION
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let ticking = false;
    
    // Optimized scroll handler with throttling
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Navbar scroll effect
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
    
    // Mobile menu toggle with improved animation
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        const isActive = navMenu.classList.contains('active');
        
        // Add rotation animation to hamburger
        mobileMenuToggle.style.transform = isActive ? 'rotate(90deg)' : 'rotate(0deg)';
        
        icon.setAttribute('data-lucide', isActive ? 'x' : 'menu');
        lucide.createIcons();
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : 'visible';
    });
    
    // Enhanced active link detection with Intersection Observer
    const observerOptions = {
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        navObserver.observe(section);
    });
    
    // Close mobile menu on link click with smooth animation
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                mobileMenuToggle.style.transform = 'rotate(0deg)';
                document.body.style.overflow = 'visible';
                lucide.createIcons();
            }
        });
    });
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            mobileMenuToggle.style.transform = 'rotate(0deg)';
            document.body.style.overflow = 'visible';
            lucide.createIcons();
        }
    });
}

// ===================================
// ENHANCED SMOOTH SCROLLING WITH LERP
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Note: Progress bar is now created in initScrollIndicator() to avoid duplication
    
    // Simple smooth scroll using native behavior
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                // Use native smooth scroll - most reliable
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    });
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================
function createScrollProgress() {
    // Check if progress bar already exists (from initScrollIndicator)
    if (document.querySelector('.scroll-progress')) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    let ticking = false;
    
    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });
}

// ===================================
// UTILITY: Check for reduced motion preference
// ===================================
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (!scrollToTopBtn) return;
    
    let ticking = false;
    
    // Show/hide button based on scroll position
    function updateScrollToTop() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollToTop);
            ticking = true;
        }
    }, { passive: true });
    
    // Smooth scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollToTop();
    });
    
    function smoothScrollToTop() {
        const startPosition = window.pageYOffset;
        const duration = 1000;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // easeOutExpo for smooth deceleration
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const run = startPosition * (1 - easeProgress);
            
            window.scrollTo(0, run);
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
}

// ===================================
// ENHANCED SCROLL ANIMATIONS WITH PERFORMANCE OPTIMIZATION
// ===================================
function initScrollAnimations() {
    // Enhanced observer options for better performance
    const observerOptions = {
        threshold: [0, 0.1, 0.2, 0.3],
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Main scroll reveal observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                const animationType = entry.target.getAttribute('data-animation') || 'fadeInUp';
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                    entry.target.classList.add(animationType);
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-scroll-reveal
    const revealElements = document.querySelectorAll('[data-scroll-reveal]');
    revealElements.forEach(el => {
        observer.observe(el);
    });
    
    // Enhanced legacy support with staggered animations
    const animatedElements = document.querySelectorAll(
        '.skill-card, .project-card, .interest-card, .about-text, .visual-card, .contact-info, .contact-form'
    );
    
    animatedElements.forEach((el, index) => {
        if (!el.hasAttribute('data-scroll-reveal')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px) scale(0.95)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const legacyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Staggered animation for multiple elements
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0) scale(1)';
                        }, index * 100);
                        legacyObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            legacyObserver.observe(el);
        }
    });
    
    // Parallax scroll effect for hero elements
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// ===================================
// SKILL BARS ANIMATION
// ===================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===================================
// ENHANCED CONTACT FORM
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error
        clearFieldError(field);
        
        // Validate based on field type
        let isValid = true;
        let errorMessage = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (field.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters';
        } else if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function clearErrors(e) {
        clearFieldError(e.target);
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Form submission - sends to Google Apps Script
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isFormValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showNotification('Please fix the errors above', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Sending...';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        try {
            // Send to Google Apps Script
            const response = await fetch('https://script.google.com/macros/s/AKfycbyoakGyDknrnedybEAMke2qcgCF1UnXp-4IY1MvJL-AgXyuVeS37TRLp8S6rTcv8Nys/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            // Show success (no-cors doesn't return response, so we assume success)
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            
        } catch (error) {
            showNotification('Sorry, there was an error. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
        }
    });
    
    // Add form field styles
    const formStyles = document.createElement('style');
    formStyles.textContent = `
        .form-group input.error,
        .form-group textarea.error {
            border-color: #e74c3c;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
        
        .field-error {
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            animation: fadeInUp 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            transform: translateY(-2px);
            box-shadow: 0 0 0 3px var(--shadow-light), 0 4px 15px rgba(212, 175, 55, 0.1);
        }
        
        .btn.loading span {
            opacity: 0.7;
        }
    `;
    document.head.appendChild(formStyles);
}

// ===================================
// ENHANCED NOTIFICATION SYSTEM
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => existingNotification.remove(), 300);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: 'check-circle',
        error: 'alert-circle',
        warning: 'alert-triangle',
        info: 'info'
    };
    
    const colorMap = {
        success: '#D4AF37',
        error: '#e74c3c',
        warning: '#f39c12',
        info: '#3498db'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${iconMap[type] || 'info'}"></i>
            <p>${message}</p>
            <button class="notification-close" aria-label="Close notification">
                <i data-lucide="x"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colorMap[type] || colorMap.info};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        max-width: 400px;
        cursor: pointer;
        transition: transform 0.2s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
        position: relative;
    `;
    
    notification.querySelector('i').style.cssText = `
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    `;
    
    notification.querySelector('p').style.cssText = `
        margin: 0;
        font-weight: 500;
        flex: 1;
        line-height: 1.4;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        opacity: 0.7;
        transition: opacity 0.2s ease;
        margin-left: 0.5rem;
    `;
    
    // Add animation styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            .notification:hover {
                transform: translateX(-5px);
            }
            .notification-close:hover {
                opacity: 1 !important;
                background: rgba(255, 255, 255, 0.1) !important;
            }
            @media (max-width: 480px) {
                .notification {
                    right: 10px !important;
                    left: 10px !important;
                    max-width: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    lucide.createIcons();
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeNotification();
    });
    
    // Click to dismiss
    notification.addEventListener('click', closeNotification);
    
    function closeNotification() {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }
    
    // Auto-remove after delay (longer for errors)
    const delay = type === 'error' ? 8000 : 5000;
    setTimeout(closeNotification, delay);
    
    return notification;
}

// ===================================
// ENHANCED SCROLL INDICATORS AND PROGRESS (FIXED - NO DUPLICATES)
// ===================================
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Single progress bar element (no nested div to avoid conflicts)
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }

    // Click scroll indicator -> go to About
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    let ticking = false;
    function update() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        progressBar.style.width = scrollPercent + '%';

        // Hide scroll indicator after some scroll
        if (scrollIndicator) {
            if (scrollTop > 300) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });

    // Run once on load
    update();
}

// ===================================
// PARALLAX EFFECT (Optional Enhancement)
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// CURSOR EFFECT (Optional Enhancement)
// ===================================
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #D4AF37;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(212, 175, 55, 0.2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// Uncomment to enable custom cursor
// initCursorEffect();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Lazy load images (if you add images later)
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
    
    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c✨ Welcome to SULAIMAAN\'s Portfolio ✨', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cCrafted with elegance and precision', 'color: #1C1C1C; font-size: 14px; font-style: italic;');


// ===================================
// CERTIFICATE VIEWER WITH PDF.JS
// ===================================
function initCertificateViewer() {
    const modal = document.getElementById('certificateModal');
    const modalClose = document.getElementById('modalClose');
    const canvas = document.getElementById('certificateCanvas');
    const viewButtons = document.querySelectorAll('.view-certificate-btn');
    
    if (!modal || !canvas || viewButtons.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomLevelSpan = document.getElementById('zoomLevel');
    const modalTitle = document.getElementById('modalTitle');
    
    let pdfDoc = null;
    let currentPage = 1;
    let scale = 1.5;
    
    // Configure PDF.js worker
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    
    // Open certificate modal
    viewButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const certificatePath = encodeURI(button.getAttribute('data-certificate'));
            const certificateName = button.getAttribute('data-title') || 'Certificate';
            
            modalTitle.textContent = certificateName;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            await loadPDF(certificatePath);
            lucide.createIcons();
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'visible';
        pdfDoc = null;
        currentPage = 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Load PDF
    async function loadPDF(url) {
        try {
            const loadingTask = pdfjsLib.getDocument(url);
            pdfDoc = await loadingTask.promise;
            totalPagesSpan.textContent = pdfDoc.numPages;
            await renderPage(1);
            updateNavigationButtons();
        } catch (error) {
            console.error('Error loading PDF:', error);
            showNotification('Error loading certificate. Opening in new tab...', 'error');
            // Fallback: open PDF in a new tab
            try { 
                window.open(url, '_blank', 'noopener,noreferrer'); 
            } catch (e) {
                console.error('Could not open PDF:', e);
            }
        }
    }
    
    // Render page
    async function renderPage(pageNum) {
        if (!pdfDoc) return;
        try {
            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: scale });
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            await page.render({
                canvasContext: ctx,
                viewport: viewport
            }).promise;
            
            currentPage = pageNum;
            currentPageSpan.textContent = pageNum;
            updateNavigationButtons();
        } catch (error) {
            console.error('Error rendering page:', error);
        }
    }
    
    // Navigation
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) renderPage(currentPage - 1);
    });
    
    nextPageBtn.addEventListener('click', () => {
        if (pdfDoc && currentPage < pdfDoc.numPages) renderPage(currentPage + 1);
    });
    
    function updateNavigationButtons() {
        prevPageBtn.disabled = currentPage <= 1;
        nextPageBtn.disabled = !pdfDoc || currentPage >= pdfDoc.numPages;
    }
    
    // Zoom controls
    zoomInBtn.addEventListener('click', () => {
        if (scale < 3) {
            scale += 0.25;
            zoomLevelSpan.textContent = Math.round(scale * 100) + '%';
            if (pdfDoc) renderPage(currentPage);
        }
    });
    
    zoomOutBtn.addEventListener('click', () => {
        if (scale > 0.5) {
            scale -= 0.25;
            zoomLevelSpan.textContent = Math.round(scale * 100) + '%';
            if (pdfDoc) renderPage(currentPage);
        }
    });
}

// Initialize certificate viewer after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof pdfjsLib !== 'undefined') {
        initCertificateViewer();
    }
});
