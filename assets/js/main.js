// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Typed.js initialization (for homepage)
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

        new Typed('#typed', options);
    }


    // Form submission handler
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send the data to a server
            // For now, we'll just show a success message

            // Clear form
            contactForm.reset();

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<p>Thank you for your message! I\'ll get back to you soon.</p>';

            contactForm.appendChild(successMessage);

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // Scroll Progress Indicator
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight * 100;
        document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
    });

    // Custom Cursor Effect
    document.addEventListener('DOMContentLoaded', function() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-effect';
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', function(e) {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Enlarge cursor on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .btn, .project-card, .skill-card');
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

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', function() {
            cursor.style.display = 'none';
        });

        document.addEventListener('mouseenter', function() {
            cursor.style.display = 'block';
        });
    });



    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });
});

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create theme toggle button
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    document.body.appendChild(themeToggle);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');

        // Update button icon
        if (document.body.classList.contains('light-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });
});


// Scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    const staggerItems = document.querySelectorAll('.stagger-item');

    const animateOnScroll = function() {
        // Regular animations
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;

            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });

        // Staggered animations
        const staggerContainers = {};

        staggerItems.forEach(item => {
            const container = item.closest('.stagger-container');
            if (container) {
                if (!staggerContainers[container.id]) {
                    staggerContainers[container.id] = {
                        container: container,
                        items: []
                    };
                }
                staggerContainers[container.id].items.push(item);
            }
        });

        for (const id in staggerContainers) {
            const containerData = staggerContainers[id];
            const containerPosition = containerData.container.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.85;

            if (containerPosition < screenPosition) {
                containerData.items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 100);
                });
            }
        }
    };

    // Run once on page load
    animateOnScroll();

    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});


// Animate timeline items on scroll
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineItems.length > 0) {
        const animateOnScroll = function() {
            timelineItems.forEach(item => {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;

                if (itemPosition < screenPosition) {
                    item.classList.add('visible');
                }
            });
        };

        // Run once on page load
        animateOnScroll();

        // Run on scroll
        window.addEventListener('scroll', animateOnScroll);
    }
});

// Lazy Loading Images with Animation
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('.project-image img, .profile-container img');

    lazyImages.forEach(img => {
        // Add lazy-image class
        img.classList.add('lazy-image');

        // Store original src
        const originalSrc = img.src;
        img.removeAttribute('src');
        img.setAttribute('data-src', originalSrc);

        // Create intersection observer
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    img.setAttribute('src', src);
                    img.onload = () => {
                        img.classList.add('loaded');
                    };

                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        observer.observe(img);
    });
});

// Animate skill bars when visible
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-level');

    const animateSkillBars = function() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight * 0.8;

            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    };

    // Run once on page load
    setTimeout(animateSkillBars, 500);

    // Run on scroll
    window.addEventListener('scroll', animateSkillBars);
});


document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state
            this.classList.toggle('expanded');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const tapHint = document.getElementById('tap-hint');
    const closeHint = document.getElementById('close-tap-hint');
    const hintKey = 'projectTapHintSeen';

    // Show only if not seen before
    if (localStorage.getItem(hintKey) !== 'true') {
        tapHint.style.display = 'flex';
    } else {
        tapHint.style.display = 'none';
    }

    // Close button
    closeHint.addEventListener('click', function() {
        tapHint.style.display = 'none';
        localStorage.setItem(hintKey, 'true');
    });

    // Hide on first card tap/click
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            if (tapHint.style.display !== 'none') {
                tapHint.style.display = 'none';
                localStorage.setItem(hintKey, 'true');
            }
        });
    });
});