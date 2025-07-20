// Dynamic Project Loading System
// This file handles loading projects from Firestore and displaying them dynamically

class DynamicProjectLoader {
    constructor() {
        this.db = window.db;
    }

    // Load projects from specific collection
    async loadProjectsFromCollection(collectionName) {
        try {
            console.log(`Loading projects from collection: ${collectionName}`);
            const snapshot = await this.db.collection(collectionName).get();
            
            if (snapshot.empty) {
                console.log(`No projects found in ${collectionName} collection`);
                return [];
            }

            const projects = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                projects.push({
                    id: doc.id,
                    ...data
                });
            });

            // Sort projects by date (newest first)
            projects.sort((a, b) => {
                const dateA = a.date || a.Date || a.createdAt || new Date(0);
                const dateB = b.date || b.Date || b.createdAt || new Date(0);
                
                // Convert date strings to Date objects if needed
                const dateObjA = typeof dateA === 'string' ? new Date(dateA) : dateA;
                const dateObjB = typeof dateB === 'string' ? new Date(dateB) : dateB;
                
                // Sort by date (descending - newest first)
                return dateObjB - dateObjA;
            });

            console.log(`Loaded ${projects.length} projects from ${collectionName} (sorted by date):`, projects);
            return projects;
        } catch (error) {
            console.error(`Error loading projects from ${collectionName}:`, error);
            
            // If it's a permission error, treat it as "no projects found"
            if (error.message && error.message.includes('permissions')) {
                console.log(`Permission error for ${collectionName}, treating as no projects found`);
                return [];
            }
            
            // For other errors, still return empty array to show "no projects found"
            return [];
        }
    }

    // Create project card HTML
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project-id', project.id);

        // Handle different field name formats from Firestore
        const title = project.title || project.Name || 'Untitled Project';
        const description = project.description || project.Description || 'No description available';
        const imageUrl = project.imageUrl || project.Image || '';
        const demoUrl = project.demoUrl || project['Demo Link'] || '';
        const githubUrl = project.githubUrl || project['GitHub Link'] || '';
        const technologies = project.technologies || project.Technologies || [];

        // Create image section
        let imageSection = '';
        if (imageUrl && imageUrl !== '') {
            imageSection = `<img src="${imageUrl}" alt="${title}" class="project-cover">`;
        } else {
            imageSection = `
                <div class="project-placeholder">
                    <i class="fas fa-vr-cardboard"></i>
                </div>
            `;
        }

        // Create technologies section
        let techSection = '';
        if (technologies && technologies.length > 0) {
            techSection = technologies.map(tech => `<span>${tech}</span>`).join('');
        }

        // Create links section
        let linksSection = '';
        if (demoUrl && demoUrl !== '') {
            linksSection += `<a href="${demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> Demo</a>`;
        }
        if (githubUrl && githubUrl !== '') {
            linksSection += `<a href="${githubUrl}" class="project-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Code</a>`;
        }

        card.innerHTML = `
            <div class="project-image">
                ${imageSection}
            </div>
            <div class="project-content">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="project-tech">
                    ${techSection}
                </div>
                <div class="project-links">
                    ${linksSection}
                </div>
            </div>
        `;

        return card;
    }

    // Display projects in a container
    async displayProjects(containerSelector, collectionName) {
        try {
            // Handle CSS selector with hyphens by using getElementById for IDs
            let container;
            if (containerSelector.includes('#')) {
                const idMatch = containerSelector.match(/#([^.\s]+)/);
                if (idMatch) {
                    const elementId = idMatch[1];
                    const element = document.getElementById(elementId);
                    if (element) {
                        container = element.querySelector('.projects-grid');
                    }
                }
            }
            
            // Fallback to querySelector if getElementById didn't work
            if (!container) {
                container = document.querySelector(containerSelector);
            }
            
            if (!container) {
                console.error(`Container not found: ${containerSelector}`);
                return;
            }

            // Clear existing content
            container.innerHTML = '';

            // Load projects from Firestore
            const projects = await this.loadProjectsFromCollection(collectionName);

            if (projects.length === 0) {
                // Show no projects message
                container.innerHTML = `
                    <div class="no-projects-message">
                        <i class="fas fa-info-circle"></i>
                        <p>No projects found in this category. Projects will appear here once added to the database.</p>
                    </div>
                `;
                console.log(`No projects found for ${collectionName}, showing message`);
                return;
            }

            // Create and append project cards
            projects.forEach(project => {
                const card = this.createProjectCard(project);
                container.appendChild(card);
            });

            console.log(`Displayed ${projects.length} projects in ${containerSelector}`);

        } catch (error) {
            console.error('Error displaying projects:', error);
            let container;
            if (containerSelector.includes('#')) {
                const idMatch = containerSelector.match(/#([^.\s]+)/);
                if (idMatch) {
                    const elementId = idMatch[1];
                    const element = document.getElementById(elementId);
                    if (element) {
                        container = element.querySelector('.projects-grid');
                    }
                }
            }
            if (!container) {
                container = document.querySelector(containerSelector);
            }
            
            if (container) {
                container.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Error loading projects. Please try refreshing the page.</p>
                    </div>
                `;
            }
        }
    }

    // Load projects for specific page
    async loadPageProjects() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        console.log('Current page:', currentPage);

        switch (currentPage) {
            case 'Game.html':
                await this.displayProjects('.projects-grid', 'Game Development');
                break;
            case '3D.html':
                await this.displayProjects('.projects-grid', '3D Modeling');
                break;
            case 'Anim.html':
                await this.displayProjects('.projects-grid', '2D & 3D Animation');
                break;
            case 'Production.html':
                await this.displayProjects('.projects-grid', 'Audio & Video Production');
                break;
            case 'index.html':
            case '':
                // Load XR Projects
                console.log('Loading XR Projects...');
                await this.displayProjects('#vr-projects .projects-grid', 'Virtual Reality');
                await this.displayProjects('#ar-projects .projects-grid', 'Augmented Reality');
                await this.displayProjects('#mr-projects .projects-grid', 'Mixed Reality');
                
                // Load all others categories
                console.log('Loading all others categories...');
                await this.displayProjects('#game-dev-projects .projects-grid', 'Game Development');
                await this.displayProjects('#3d-modeling-projects .projects-grid', '3D Modeling');
                await this.displayProjects('#animation-projects .projects-grid', '2D & 3D Animation');
                await this.displayProjects('#audio-video-projects .projects-grid', 'Audio & Video Production');
                break;
            default:
                console.log('Unknown page, no projects to load');
        }
    }
}

// Initialize dynamic project loader
window.dynamicProjectLoader = new DynamicProjectLoader();

// Load projects when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing dynamic project loader...');
    
    // Wait for Firebase to initialize and retry if needed
    const maxRetries = 5;
    let retryCount = 0;
    
    const tryLoadProjects = async () => {
        try {
            // Check if Firebase and database are ready
            if (typeof firebase === 'undefined' || typeof window.db === 'undefined') {
                console.log(`Firebase not ready yet, retry ${retryCount + 1}/${maxRetries}`);
                retryCount++;
                if (retryCount < maxRetries) {
                    setTimeout(tryLoadProjects, 1000);
                    return;
                } else {
                    console.error('Firebase failed to initialize after multiple retries');
                    return;
                }
            }
            
            console.log('Firebase ready, loading projects...');
            await window.dynamicProjectLoader.loadPageProjects();
            console.log('Dynamic projects loaded successfully');
            
            // Set up others tab switching
            setupOthersTabSwitching();
        } catch (error) {
            console.error('Error loading dynamic projects:', error);
        }
    };
    
    // Start the loading process
    setTimeout(tryLoadProjects, 500);
});

// Function to handle others tab switching
function setupOthersTabSwitching() {
    const othersTabButtons = document.querySelectorAll('.others-tab-button');
    
    othersTabButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const category = button.getAttribute('data-category');
            console.log('Others tab clicked:', category);
            
            // Remove active class from all buttons and categories
            othersTabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.others-category').forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding category
            const targetCategory = document.getElementById(`${category}-projects`);
            if (targetCategory) {
                targetCategory.classList.add('active');
                
                // Check if projects are already loaded for this category
                const containerSelector = `#${category}-projects .projects-grid`;
                const container = document.querySelector(containerSelector);
                
                if (container && container.children.length > 0) {
                    // Projects are already loaded, just show the category
                    console.log(`Projects already loaded for ${category}, just showing category`);
                    
                    // Fix YouTube videos when switching to already loaded category
                    if (window.YouTubeTabFix && window.YouTubeTabFix.reloadYouTubeIframes) {
                        setTimeout(() => {
                            window.YouTubeTabFix.reloadYouTubeIframes(targetCategory);
                        }, 300);
                    }
                } else {
                    // Load projects for this category (only if not already loaded)
                    const collectionName = getCollectionNameForCategory(category);
                    console.log(`Loading projects for ${category} (${collectionName})`);
                    await window.dynamicProjectLoader.displayProjects(containerSelector, collectionName);
                    
                    // Fix YouTube videos after loading new projects
                    if (window.YouTubeTabFix && window.YouTubeTabFix.fixYouTubeVideosInProjects) {
                        setTimeout(() => {
                            window.YouTubeTabFix.fixYouTubeVideosInProjects();
                        }, 500);
                    }
                }
            }
        });
    });
}

// Function to get collection name for others category
function getCollectionNameForCategory(category) {
    const categoryMap = {
        'game-dev': 'Game Development',
        '3d-modeling': '3D Modeling',
        'animation': '2D & 3D Animation',
        'audio-video': 'Audio & Video Production'
    };
    return categoryMap[category] || 'Unknown';
}

console.log('Dynamic project loader initialized!'); 