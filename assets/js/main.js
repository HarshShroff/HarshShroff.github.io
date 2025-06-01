// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // --- Typed.js Initialization (Homepage) ---
    if (document.getElementById('typed')) {
        const options = {
            strings: [
                'AI/ML Engineer',
                'Data Scientist',
                'Machine Learning Specialist',
                'Generative AI Developer'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true,
            smartBackspace: true,
            cursorChar: '|'
        };
        // Assuming Typed is globally available from CDN
        if (typeof Typed !== 'undefined') {
            new Typed('#typed', options);
        } else {
            console.error('Typed.js library not found.');
        }
    }

    // --- Form Submission Handler (Contact Page) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Placeholder for actual form submission logic (e.g., fetch API)
            console.log('Form data submitted (placeholder):', formData);

            contactForm.reset();

            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<p>Thank you for your message! I\'ll get back to you soon.</p>';
            contactForm.appendChild(successMessage);

            setTimeout(() => {
                if (successMessage.parentNode === contactForm) {
                    contactForm.removeChild(successMessage);
                }
            }, 5000);
        });
    }

    // --- Scroll Progress Indicator ---
    const scrollProgressBar = document.querySelector('.scroll-progress');
    if (scrollProgressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight * 100) : 0;
            scrollProgressBar.style.width = scrollPercent + '%';
        });
    }

    // --- Custom Cursor Effect ---
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);
    let cursorVisible = false;

    document.addEventListener('mousemove', function(e) {
        if (!cursorVisible) {
            cursor.style.display = 'block';
            cursorVisible = true;
        }
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.display = 'none';
        cursorVisible = false;
    });

    document.addEventListener('mouseenter', function() {
        if (!cursorVisible) {
            cursor.style.display = 'block';
            cursorVisible = true;
        }
    });

    const hoverables = document.querySelectorAll('a, button, .btn, .project-card, .skill-card, .theme-toggle, .hamburger');
    hoverables.forEach(hoverable => {
        hoverable.addEventListener('mouseenter', function() {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
        });
        hoverable.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(139, 92, 246, 0.5)';
        });
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault(); // Prevent default only if target exists
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open and active
                    if (hamburger && navMenu && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // --- Theme Toggle Functionality ---
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Default to dark mode icon
    document.body.appendChild(themeToggle);

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme: saved preference > OS preference > default (dark)
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else if (savedTheme === 'dark') {
        // Already default, no class needed
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (!prefersDark) { // If no saved theme and OS prefers light
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } // Otherwise, default dark is fine

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        const isLightMode = document.body.classList.contains('light-mode');
        themeToggle.innerHTML = isLightMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
    });

    // --- Scroll-Triggered Animations ---
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    const staggerItems = document.querySelectorAll('.stagger-item');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillBars = document.querySelectorAll('.skill-level');

    const animateOnScroll = function() {
        const screenPositionAnimate = window.innerHeight * 0.85;
        const screenPositionTimeline = window.innerHeight / 1.2;
        const screenPositionSkills = window.innerHeight * 0.8;

        // Regular fade/scale animations
        animatedElements.forEach(element => {
            if (element.getBoundingClientRect().top < screenPositionAnimate) {
                element.classList.add('visible');
            }
        });

        // Timeline animations
        timelineItems.forEach(item => {
            if (item.getBoundingClientRect().top < screenPositionTimeline) {
                item.classList.add('visible');
            }
        });

        // Skill bar animations
        skillBars.forEach(bar => {
            // Check if already animated to prevent re-triggering
            if (!bar.style.width || bar.style.width === '0px' || bar.style.width === '0%') {
                if (bar.getBoundingClientRect().top < screenPositionSkills) {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        bar.style.width = width;
                    }
                }
            }
        });

        // Staggered animations (Group by container)
        const staggerContainers = {};
        staggerItems.forEach(item => {
            const container = item.closest('.stagger-container'); // Assuming parent has this class
            if (container) {
                const containerId = container.id || container.dataset.staggerId || Math.random().toString(36).substring(7); // Need a way to identify container
                if (!container.id && !container.dataset.staggerId) container.dataset.staggerId = containerId; // Assign temp ID if needed

                if (!staggerContainers[containerId]) {
                    staggerContainers[containerId] = {
                        container: container,
                        items: [],
                        triggered: false // Flag to prevent re-triggering
                    };
                }
                staggerContainers[containerId].items.push(item);
            }
        });

        for (const id in staggerContainers) {
            const containerData = staggerContainers[id];
            // Trigger only if container is visible and not already triggered
            if (!containerData.triggered && containerData.container.getBoundingClientRect().top < screenPositionAnimate) {
                containerData.items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100); // 100ms stagger delay
                });
                containerData.triggered = true; // Mark as triggered
            }
        }
    };

    // Initial check + scroll listener for animations
    animateOnScroll(); // Run once on load
    window.addEventListener('scroll', animateOnScroll);

    // --- Lazy Loading Images ---
    const lazyImages = document.querySelectorAll('img.lazy-image, img[loading="lazy"]'); // Select images marked for lazy loading
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src || img.src; // Use data-src if available, else src

                    // Check if it's the placeholder or already loaded
                    if (img.src !== src) {
                        img.src = src;
                        img.onload = () => {
                            img.classList.add('loaded'); // Add class when fully loaded
                            img.removeAttribute('data-src'); // Clean up data attribute
                        };
                        img.onerror = () => {
                            console.error(`Failed to load image: ${src}`);
                            img.classList.add('error'); // Optional: Add error class
                        }
                    }
                    observerInstance.unobserve(img); // Stop observing once triggered
                }
            });
        }, { rootMargin: '50px 0px 50px 0px' }); // Trigger slightly before entering viewport

        lazyImages.forEach(img => {
            // Ensure images have a data-src if src is a placeholder, or just rely on native lazy loading
            if (!img.src || img.src.startsWith('data:image/')) { // If src is missing or is a placeholder
                if (img.dataset.src) {
                    observer.observe(img);
                }
            } else if (img.loading === 'lazy') {
                // Let native lazy loading handle it, but maybe add 'loaded' class on load
                img.onload = () => img.classList.add('loaded');
                img.onerror = () => img.classList.add('error');
            } else if (img.dataset.src) { // If src is set but data-src is preferred
                img.src = ""; // Clear src to force loading from data-src via observer
                observer.observe(img);
            }
            // If img.src is valid and no data-src/lazy attribute, it loads normally.
        });
    } else {
        // Fallback for browsers without IntersectionObserver (load all images)
        lazyImages.forEach(img => {
            const src = img.dataset.src || img.src;
            if (img.src !== src) {
                img.src = src;
                img.onload = () => img.classList.add('loaded');
            }
        });
    }

    // --- Project Card Expansion ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        // Find the clickable header/image area if details shouldn't trigger toggle
        const toggleArea = card.querySelector('.project-image') || card.querySelector('.project-info h3') || card; // Adjust selector as needed
        toggleArea.addEventListener('click', (e) => {
            // Prevent toggling if a link inside the card was clicked
            if (e.target.closest('a')) {
                return;
            }
            card.classList.toggle('expanded');
        });
        // Add keyboard accessibility
        toggleArea.setAttribute('role', 'button');
        toggleArea.setAttribute('tabindex', '0');
        toggleArea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('expanded');
            }
        });
    });

    // --- Project Tap Hint ---
    const tapHint = document.getElementById('tap-hint');
    const closeHintButton = document.getElementById('close-tap-hint');
    const hintKey = 'projectTapHintSeen';

    if (tapHint && closeHintButton) {
        // Show only if not seen before and on touch devices (simple check)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice && localStorage.getItem(hintKey) !== 'true') {
            tapHint.style.display = 'flex';
        } else {
            tapHint.style.display = 'none';
        }

        // Close button functionality
        closeHintButton.addEventListener('click', function() {
            tapHint.style.display = 'none';
            localStorage.setItem(hintKey, 'true');
        });

        // Hide on first card interaction (tap/click)
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                if (tapHint.style.display !== 'none') {
                    tapHint.style.display = 'none';
                    localStorage.setItem(hintKey, 'true');
                }
            }, { once: true }); // Only need to hide it once
        });
    }

}); // End of DOMContentLoaded