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

            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                console.error('Please fill in all required fields.');
                // Add a user-facing error message here instead of console.log
                return;
            }

            const formData = {
                name: name,
                email: email,
                subject: document.getElementById('subject').value,
                message: message
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
    // Note: This feature can sometimes interfere with user experience on mobile devices.
    // It's a stylistic choice, but can be disabled for a cleaner experience on smaller screens.
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
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
    }


    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Close mobile menu if open
                    if (hamburger && navMenu && hamburger.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });

    // --- Theme Toggle Functionality ---
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Apply theme: saved preference > OS preference > default (dark)
        if (savedTheme === 'light' || (savedTheme === null && !prefersDark)) {
            document.body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            const isLightMode = document.body.classList.contains('light-mode');
            themeToggle.innerHTML = isLightMode ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        });
    }

    // --- Scroll-Triggered Animations ---
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
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
            if (!bar.style.width || bar.style.width === '0px' || bar.style.width === '0%') {
                if (bar.getBoundingClientRect().top < screenPositionSkills) {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        bar.style.width = width;
                    }
                }
            }
        });
    };

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // --- Project Card Expansion on Projects Page ---
    const projectCards = document.querySelectorAll('.project-item');
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            const detailsSection = card.querySelector('.project-details');
            if (detailsSection) {
                card.addEventListener('click', (e) => {
                    // Prevent toggling if a link inside the card was clicked
                    if (e.target.closest('a')) {
                        return;
                    }
                    card.classList.toggle('expanded');

                    // Scroll to details if expanded
                    if (card.classList.contains('expanded')) {
                        setTimeout(() => {
                            card.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }, 300);
                    }
                });
            }
        });
    }

}); // End of DOMContentLoaded