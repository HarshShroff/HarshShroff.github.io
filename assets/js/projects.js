// Projects page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item'); // Assuming .project-item exists for filtering targets

    // Enhanced Project Filtering with Animations
    if (filterButtons.length > 0 && projectItems.length > 0) {
        // Show all projects initially with staggered animation
        projectItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filterValue = this.getAttribute('data-filter');

                // Filter projects with staggered animations
                let visibleIndex = 0;

                projectItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');

                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';

                        // Add staggered animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, visibleIndex * 100);

                        visibleIndex++;
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';

                        // Hide after animation
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }



    // Project details toggle
    const projectCards = document.querySelectorAll('.project-card');

    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            const detailsSection = card.querySelector('.project-details');

            if (detailsSection) {
                const infoSection = card.querySelector('.project-info h3');

                if (infoSection) {
                    infoSection.addEventListener('click', function() {
                        detailsSection.classList.toggle('expanded');

                        // Scroll to details if expanded
                        if (detailsSection.classList.contains('expanded')) {
                            setTimeout(() => {
                                detailsSection.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start'
                                });
                            }, 300);
                        }
                    });
                }
            }
        });
    }

    // Handle URL hash for direct project access
    const handleHashChange = function() {
        const hash = window.location.hash;

        if (hash && hash.length > 1) {
            const targetProject = document.getElementById(hash.substring(1));

            if (targetProject) {
                // Scroll to project
                setTimeout(() => {
                    targetProject.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Highlight project
                    targetProject.classList.add('highlight');

                    // Remove highlight after 2 seconds
                    setTimeout(() => {
                        targetProject.classList.remove('highlight');
                    }, 2000);
                }, 500);
            }
        }
    };

    // Run on page load
    handleHashChange();

    // Run on hash change
    window.addEventListener('hashchange', handleHashChange);
});