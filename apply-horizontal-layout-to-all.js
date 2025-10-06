// Apply Horizontal Card Layout to All Project Categories
// This script ensures all project cards use the same horizontal layout as VR projects

function applyHorizontalLayoutToAllProjects() {
    console.log('🔄 Applying horizontal card layout to all project categories...');
    
    // Wait for dynamic project loader to be available
    if (!window.dynamicProjectLoader) {
        console.log('⏳ Waiting for dynamic project loader...');
        setTimeout(applyHorizontalLayoutToAllProjects, 500);
        return;
    }
    
    // Override the createProjectCard method for all categories
    const originalCreateProjectCard = window.dynamicProjectLoader.createProjectCard;
    
    window.dynamicProjectLoader.createProjectCard = function(project) {
        const card = document.createElement('div');
        card.className = 'project-card horizontal';
        card.setAttribute('data-project-id', project.id);

        // Handle different field name formats from Firestore
        const title = project.title || project.Name || 'Untitled Project';
        const description = project.description || project.Description || 'No description available';
        const imageUrl = project.imageUrl || project.Image || '';
        const demoUrl = project.demoUrl || project.Demo || project['Demo Link'] || '';
        const technologies = project.technologies || project.Technologies || project.Tags || [];

        // Create cover section - prioritize demo URL for video
        let coverSection = '';
        if (demoUrl && isYouTubeVideo(demoUrl)) {
            // Use autoplay YouTube video from demo field
            coverSection = createAutoplayVideoCover ? createAutoplayVideoCover(demoUrl, title) : `<img src="${demoUrl}" alt="${title}" class="project-cover">`;
        } else if (imageUrl && isYouTubeVideo(imageUrl)) {
            // Use autoplay YouTube video from image field
            coverSection = createAutoplayVideoCover ? createAutoplayVideoCover(imageUrl, title) : `<img src="${imageUrl}" alt="${title}" class="project-cover">`;
        } else if (imageUrl && imageUrl !== '') {
            // Use regular image
            coverSection = `<img src="${imageUrl}" alt="${title}" class="project-cover">`;
        } else {
            // Fallback to placeholder
            coverSection = `
                <div class="project-placeholder">
                    <i class="fas fa-vr-cardboard"></i>
                </div>
            `;
        }

        // Create technologies section
        const technologiesSection = createTechnologiesSection ? createTechnologiesSection(technologies) : '';
        
        // Create demo link section
        const demoLinkSection = createDemoLinkSection ? createDemoLinkSection(demoUrl) : '';

        // Horizontal card layout
        card.innerHTML = `
            <div class="project-image">
                ${coverSection}
                ${demoLinkSection}
            </div>
            <div class="project-content">
                <h3>${title}</h3>
                <p class="project-description">${description}</p>
                ${technologiesSection}
            </div>
        `;

        return card;
    };
    
    console.log('✅ Horizontal card layout applied to all project categories');
}

// Add CSS styles for horizontal card layout (if not already added)
function addHorizontalCardStylesToAll() {
    // Check if styles already exist
    if (document.querySelector('style[data-horizontal-layout]')) {
        console.log('✅ Horizontal card styles already exist');
        return;
    }
    
    const style = document.createElement('style');
    style.setAttribute('data-horizontal-layout', 'true');
    style.textContent = `
        .project-card.horizontal {
            background: var(--card-bg, #1f2937);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-color, #374151);
            width: 100%;
            max-width: 600px;
            height: auto;
            display: flex;
            flex-direction: column;
            margin: 0;
        }
        
        .project-card.horizontal:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }
        
        .project-card.horizontal .project-image {
            position: relative;
            width: 100%;
            height: 300px;
            overflow: hidden;
            flex-shrink: 0;
        }
        
        .project-card.horizontal .project-cover {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .project-video-cover {
            position: relative;
            width: 100%;
            height: 300px;
            overflow: hidden;
            background: #000;
        }
        
        .project-video-cover iframe {
            width: 100%;
            height: 300px;
            border: none;
            pointer-events: none;
        }
        
        .project-card.horizontal .project-content {
            padding: 2rem;
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 250px;
        }
        
        .project-card.horizontal h3 {
            margin: 0 0 1.5rem 0;
            font-size: 2rem;
            font-weight: 600;
            color: var(--text-primary, #f9fafb);
            line-height: 1.3;
        }
        
        .project-description {
            color: var(--text-secondary, #d1d5db);
            line-height: 1.6;
            font-size: 1.1rem;
            margin: 0 0 1.5rem 0;
            flex: 1;
            overflow-y: auto;
            max-height: 150px;
            padding-right: 8px;
            scrollbar-width: thin;
            scrollbar-color: var(--text-secondary, #6b7280) transparent;
        }
        
        .project-description::-webkit-scrollbar {
            width: 4px;
        }
        
        .project-description::-webkit-scrollbar-track {
            background: transparent;
        }
        
        .project-description::-webkit-scrollbar-thumb {
            background: var(--text-secondary, #6b7280);
            border-radius: 2px;
        }
        
        .project-description::-webkit-scrollbar-thumb:hover {
            background: var(--text-primary, #9ca3af);
        }
        
        .project-technologies {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
        }
        
        .tech-tag {
            background: var(--primary-color, #3b82f6);
            color: white;
            padding: 0.4rem 1rem;
            border-radius: 12px;
            font-size: 0.9rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        
        .tech-more {
            background: var(--secondary-color, #6b7280);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .project-demo-link {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            z-index: 10;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
        }
        
        .project-card.horizontal .project-image:hover .project-demo-link {
            opacity: 1;
            transform: scale(1);
        }
        
        .demo-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            background: #ff0000;
            color: white;
            border-radius: 50%;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(255, 0, 0, 0.3);
            backdrop-filter: blur(4px);
        }
        
        .demo-button:hover {
            background: #cc0000;
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(255, 0, 0, 0.4);
        }
        
        .demo-button i {
            font-size: 1rem;
        }
        
        .project-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--placeholder-bg, #374151);
            color: var(--placeholder-color, #6b7280);
        }
        
        .project-placeholder i {
            font-size: 3rem;
        }
        
        /* Dark mode support */
        [data-theme="dark"] .project-card.horizontal {
            background: var(--card-bg-dark, #1f2937);
            border-color: var(--border-color-dark, #374151);
        }
        
        [data-theme="dark"] .project-card.horizontal h3 {
            color: var(--text-primary-dark, #f9fafb);
        }
        
        [data-theme="dark"] .project-description {
            color: var(--text-secondary-dark, #d1d5db);
        }
        
        [data-theme="dark"] .tech-tag {
            background: var(--primary-color-dark, #60a5fa);
        }
        
        [data-theme="dark"] .tech-more {
            background: var(--secondary-color-dark, #9ca3af);
        }
        
        [data-theme="dark"] .project-placeholder {
            background: var(--placeholder-bg-dark, #374151);
            color: var(--placeholder-color-dark, #6b7280);
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .project-card.horizontal {
                flex-direction: column;
                height: auto;
                max-width: 100%;
            }
            
            .project-card.horizontal .project-image {
                width: 100%;
                height: 200px;
            }
            
            .project-card.horizontal .project-content {
                padding: 1.25rem;
            }
            
            .project-card.horizontal h3 {
                font-size: 1.3rem;
            }
            
            .project-description {
                font-size: 0.9rem;
            }
            
            .tech-tag {
                font-size: 0.75rem;
                padding: 0.2rem 0.6rem;
            }
            
            .demo-button {
                width: 32px;
                height: 32px;
            }
            
            .demo-button i {
                font-size: 0.9rem;
            }
        }
        
        /* Grid layout for multiple cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 2rem;
            padding: 1rem;
            justify-items: center;
        }
        
        @media (max-width: 1400px) {
            .projects-grid {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }
        
        @media (max-width: 768px) {
            .projects-grid {
                gap: 1rem;
                padding: 0.5rem;
            }
        }
        
        /* Ensure proper overflow handling */
        .project-card.horizontal {
            overflow: hidden;
        }
        
        .project-card.horizontal .project-image {
            overflow: hidden;
        }
        
        .project-card.horizontal .project-content {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Horizontal card styles added for all categories');
}

// Helper functions (if not already defined)
function createTechnologiesSection(technologies) {
    if (!technologies || technologies.length === 0) return '';
    
    const displayCount = 3;
    const displayTechs = technologies.slice(0, displayCount);
    const remainingCount = technologies.length - displayCount;
    
    let html = '<div class="project-technologies">';
    
    displayTechs.forEach(tech => {
        html += `<span class="tech-tag">${tech}</span>`;
    });
    
    if (remainingCount > 0) {
        html += `<span class="tech-more">+${remainingCount} more</span>`;
    }
    
    html += '</div>';
    return html;
}

function createDemoLinkSection(demoUrl) {
    if (!demoUrl) return '';
    
    return `
        <div class="project-demo-link">
            <a href="${demoUrl}" target="_blank" rel="noopener noreferrer" class="demo-button" title="Watch Demo">
                <i class="fab fa-youtube"></i>
            </a>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        applyHorizontalLayoutToAllProjects();
        addHorizontalCardStylesToAll();
        setupTabSwitchingListener();
    }, 100);
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            applyHorizontalLayoutToAllProjects();
            addHorizontalCardStylesToAll();
            setupTabSwitchingListener();
        }, 100);
    });
} else {
    setTimeout(() => {
        applyHorizontalLayoutToAllProjects();
        addHorizontalCardStylesToAll();
        setupTabSwitchingListener();
    }, 100);
}

// Function to listen for tab switching and reapply horizontal layout
function setupTabSwitchingListener() {
    // Listen for others tab switching
    const othersTabButtons = document.querySelectorAll('.others-tab-button');
    othersTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Apply horizontal layout immediately and then monitor for new cards
            console.log('🔄 Tab switched, applying horizontal layout...');
            applyHorizontalLayoutToNewCards();
            
            // Set up a more aggressive monitoring for new cards
            const checkInterval = setInterval(() => {
                const newCards = document.querySelectorAll('.project-card:not(.horizontal)');
                if (newCards.length > 0) {
                    applyHorizontalLayoutToNewCards();
                } else {
                    clearInterval(checkInterval);
                }
            }, 100);
            
            // Stop checking after 2 seconds to avoid infinite loops
            setTimeout(() => clearInterval(checkInterval), 2000);
        });
    });
    
    // Listen for XR project tab switching
    const xrTabButtons = document.querySelectorAll('.tab-button');
    xrTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Apply horizontal layout immediately and then monitor for new cards
            console.log('🔄 XR tab switched, applying horizontal layout...');
            applyHorizontalLayoutToNewCards();
            
            // Set up a more aggressive monitoring for new cards
            const checkInterval = setInterval(() => {
                const newCards = document.querySelectorAll('.project-card:not(.horizontal)');
                if (newCards.length > 0) {
                    applyHorizontalLayoutToNewCards();
                } else {
                    clearInterval(checkInterval);
                }
            }, 100);
            
            // Stop checking after 2 seconds to avoid infinite loops
            setTimeout(() => clearInterval(checkInterval), 2000);
        });
    });
}

// Function to apply horizontal layout to newly created cards
function applyHorizontalLayoutToNewCards() {
    // Find all project cards that don't have the horizontal class
    const cards = document.querySelectorAll('.project-card:not(.horizontal)');
    
    cards.forEach(card => {
        // Apply styles immediately to prevent visual flashing
        card.style.cssText = `
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            max-width: 600px !important;
            height: auto !important;
            margin: 0 !important;
            background: var(--card-bg, #1f2937) !important;
            border-radius: 12px !important;
            overflow: hidden !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
            border: 1px solid var(--border-color, #374151) !important;
        `;
        
        // Add horizontal class
        card.classList.add('horizontal');
        
        // Ensure the card has the proper structure
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');
        
        if (!image || !content) {
            console.log('⚠️ Card structure incomplete, skipping...');
            return;
        }
        
        // Apply immediate styles to image and content
        if (image) {
            image.style.cssText = `
                position: relative !important;
                width: 100% !important;
                height: 300px !important;
                overflow: hidden !important;
                flex-shrink: 0 !important;
            `;
        }
        
        if (content) {
            content.style.cssText = `
                padding: 2rem !important;
                flex: 1 !important;
                display: flex !important;
                flex-direction: column !important;
                min-height: 250px !important;
            `;
        }
        
        console.log('✅ Applied horizontal layout to new card');
    });
    
    if (cards.length > 0) {
        console.log(`✅ Applied horizontal layout to ${cards.length} new cards`);
    }
}

console.log('📋 Apply Horizontal Layout to All Projects script loaded'); 