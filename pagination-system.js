// Pagination System for Projects
// This file handles pagination for project categories with 2 projects per page and swipe navigation

class ProjectPagination {
    constructor() {
        this.currentPage = {};
        this.projectsPerPage = 2;
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.init();
    }

    init() {
        this.setupPaginationContainers();
        this.setupSwipeNavigation();
        this.setupKeyboardNavigation();
    }

    // Setup pagination containers for each category
    setupPaginationContainers() {
        const categories = [
            'vr-projects', 'ar-projects', 'mr-projects',
            'game-dev-projects', '3d-modeling-projects', 'animation-projects', 'audio-video-projects'
        ];

        categories.forEach(categoryId => {
            const container = document.getElementById(categoryId);
            if (container) {
                const projectsGrid = container.querySelector('.projects-grid');
                if (projectsGrid) {
                    // Only wrap if there are projects and no pagination already exists
                    const existingPagination = projectsGrid.querySelector('.pagination-container');
                    const projectCards = projectsGrid.querySelectorAll('.project-card');
                    
                    // Only create pagination if there are actual project cards and no existing pagination
                    if (projectCards.length > 0 && !existingPagination) {
                        console.log(`Initial setup: Creating pagination for ${categoryId} with ${projectCards.length} projects`);
                        this.wrapProjectsInPagination(projectsGrid, categoryId);
                    }
                }
            }
        });
    }

    // Wrap projects in pagination structure
    wrapProjectsInPagination(projectsGrid, categoryId) {
        const projects = Array.from(projectsGrid.children);
        console.log(`Wrapping ${projects.length} projects in pagination for ${categoryId}`);
        
        // Clear the grid
        projectsGrid.innerHTML = '';

        // If no projects, don't create pagination
        if (projects.length === 0) {
            console.log('No projects to wrap, returning early');
            return;
        }

        // Create pagination container
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container';
        paginationContainer.setAttribute('data-category', categoryId);

        // Create pages container
        const pagesContainer = document.createElement('div');
        pagesContainer.className = 'pages-container';

        // Group projects into pages
        const pages = this.groupProjectsIntoPages(projects);

        // Create page elements
        pages.forEach((pageProjects, pageIndex) => {
            const page = document.createElement('div');
            page.className = 'project-page';
            page.setAttribute('data-page', pageIndex);
            page.style.display = pageIndex === 0 ? 'flex' : 'none';

            pageProjects.forEach(project => {
                page.appendChild(project);
            });

            pagesContainer.appendChild(page);
        });

        // Create navigation controls
        const navigation = this.createNavigationControls(categoryId, pages.length);

        // Assemble pagination container
        paginationContainer.appendChild(pagesContainer);
        paginationContainer.appendChild(navigation);

        // Add to projects grid
        projectsGrid.appendChild(paginationContainer);

        // Initialize current page for this category
        this.currentPage[categoryId] = 0;

        // Update navigation state
        this.updateNavigationState(categoryId, pages.length);
    }

    // Group projects into pages of 2
    groupProjectsIntoPages(projects) {
        const pages = [];
        for (let i = 0; i < projects.length; i += this.projectsPerPage) {
            pages.push(projects.slice(i, i + this.projectsPerPage));
        }
        console.log(`Grouped ${projects.length} projects into ${pages.length} pages`);
        return pages;
    }

    // Create navigation controls
    createNavigationControls(categoryId, totalPages) {
        if (totalPages <= 1) return document.createElement('div'); // No navigation needed

        const navigation = document.createElement('div');
        navigation.className = 'pagination-navigation';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => this.previousPage(categoryId));

        // Page indicators
        const pageIndicators = document.createElement('div');
        pageIndicators.className = 'page-indicators';
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'page-indicator';
            indicator.setAttribute('data-page', i);
            indicator.addEventListener('click', () => this.goToPage(categoryId, i));
            pageIndicators.appendChild(indicator);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-btn next-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => this.nextPage(categoryId));

        // Page counter
        const pageCounter = document.createElement('div');
        pageCounter.className = 'page-counter';
        pageCounter.innerHTML = `<span class="current-page">1</span> / <span class="total-pages">${totalPages}</span>`;

        navigation.appendChild(prevBtn);
        navigation.appendChild(pageIndicators);
        navigation.appendChild(pageCounter);
        navigation.appendChild(nextBtn);

        return navigation;
    }

    // Navigation methods
    previousPage(categoryId) {
        const current = this.currentPage[categoryId] || 0;
        if (current > 0) {
            this.goToPage(categoryId, current - 1);
        }
    }

    nextPage(categoryId) {
        const current = this.currentPage[categoryId] || 0;
        const container = document.querySelector(`[data-category="${categoryId}"]`);
        if (container) {
            const totalPages = container.querySelectorAll('.project-page').length;
            if (current < totalPages - 1) {
                this.goToPage(categoryId, current + 1);
            }
        }
    }

    goToPage(categoryId, pageIndex) {
        const container = document.querySelector(`[data-category="${categoryId}"]`);
        if (!container) return;

        const pages = container.querySelectorAll('.project-page');
        const totalPages = pages.length;

        if (pageIndex < 0 || pageIndex >= totalPages) return;

        // Hide all pages
        pages.forEach(page => {
            page.style.display = 'none';
        });

        // Show target page
        pages[pageIndex].style.display = 'flex';

        // Update current page
        this.currentPage[categoryId] = pageIndex;

        // Update navigation state
        this.updateNavigationState(categoryId, totalPages);

        // Add transition effect
        pages[pageIndex].style.opacity = '0';
        setTimeout(() => {
            pages[pageIndex].style.opacity = '1';
        }, 50);
    }

    // Update navigation state (buttons, indicators, counter)
    updateNavigationState(categoryId, totalPages) {
        const container = document.querySelector(`[data-category="${categoryId}"]`);
        if (!container) return;

        const current = this.currentPage[categoryId] || 0;

        // Update previous/next buttons
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.disabled = current === 0;
            prevBtn.classList.toggle('disabled', current === 0);
        }
        
        if (nextBtn) {
            nextBtn.disabled = current === totalPages - 1;
            nextBtn.classList.toggle('disabled', current === totalPages - 1);
        }

        // Update page indicators
        const indicators = container.querySelectorAll('.page-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === current);
        });

        // Update page counter
        const currentPageSpan = container.querySelector('.current-page');
        if (currentPageSpan) {
            currentPageSpan.textContent = current + 1;
        }
    }

    // Setup swipe navigation
    setupSwipeNavigation() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    // Handle swipe gestures
    handleSwipe() {
        const swipeThreshold = 50;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            // Find the active category
            const activeCategory = document.querySelector('.project-category.active, .others-category.active');
            if (activeCategory) {
                const categoryId = activeCategory.id;
                
                if (diff > 0) {
                    // Swipe left - next page
                    this.nextPage(categoryId);
                } else {
                    // Swipe right - previous page
                    this.previousPage(categoryId);
                }
            }
        }
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const activeCategory = document.querySelector('.project-category.active, .others-category.active');
            if (!activeCategory) return;

            const categoryId = activeCategory.id;

            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousPage(categoryId);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextPage(categoryId);
                    break;
            }
        });
    }

    // Public method to refresh pagination after dynamic content loading
    refreshPagination(categoryId) {
        console.log(`Refreshing pagination for category: ${categoryId}`);
        
        const container = document.getElementById(categoryId);
        if (container) {
            const projectsGrid = container.querySelector('.projects-grid');
            if (projectsGrid) {
                // Check if there are actual project cards (not just messages)
                const projectCards = projectsGrid.querySelectorAll('.project-card');
                const noProjectsMessage = projectsGrid.querySelector('.no-projects-message');
                const errorMessage = projectsGrid.querySelector('.error-message');
                const existingPagination = projectsGrid.querySelector('.pagination-container');
                
                console.log(`Found ${projectCards.length} project cards, noProjectsMessage: ${!!noProjectsMessage}, errorMessage: ${!!errorMessage}, existingPagination: ${!!existingPagination}`);

                // Only create pagination if there are actual project cards and no existing pagination
                if (projectCards.length > 0 && !noProjectsMessage && !errorMessage && !existingPagination) {
                    console.log(`Creating pagination for ${projectCards.length} projects`);
                    this.wrapProjectsInPagination(projectsGrid, categoryId);
                } else if (existingPagination) {
                    console.log('Pagination already exists, skipping creation');
                } else {
                    console.log('No pagination created - no valid project cards found');
                }
            }
        }
    }

    // Public method to handle tab switching
    handleTabSwitch(activeCategoryId) {
        console.log(`Handling tab switch for category: ${activeCategoryId}`);
        
        // Only reset current page if it's not already set
        if (typeof this.currentPage[activeCategoryId] === 'undefined') {
            this.currentPage[activeCategoryId] = 0;
        }
        
        // Refresh pagination for the active category with a longer delay
        setTimeout(() => {
            this.refreshPagination(activeCategoryId);
        }, 300);
    }

    // Public method to force refresh pagination (for when projects are loaded)
    forceRefreshPagination(categoryId) {
        console.log(`Force refreshing pagination for category: ${categoryId}`);
        
        const container = document.getElementById(categoryId);
        if (container) {
            const projectsGrid = container.querySelector('.projects-grid');
            if (projectsGrid) {
                // Remove existing pagination
                const existingPagination = projectsGrid.querySelector('.pagination-container');
                if (existingPagination) {
                    existingPagination.remove();
                }

                // Check if there are actual project cards
                const projectCards = projectsGrid.querySelectorAll('.project-card');
                const noProjectsMessage = projectsGrid.querySelector('.no-projects-message');
                const errorMessage = projectsGrid.querySelector('.error-message');
                
                console.log(`Force refresh: Found ${projectCards.length} project cards`);

                // Create pagination if there are actual project cards
                if (projectCards.length > 0 && !noProjectsMessage && !errorMessage) {
                    console.log(`Force refresh: Creating pagination for ${projectCards.length} projects`);
                    this.wrapProjectsInPagination(projectsGrid, categoryId);
                }
            }
        }
    }
}

// Initialize pagination system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.projectPagination = new ProjectPagination();
});

// Export for use in other scripts
window.ProjectPagination = ProjectPagination; 