// Remove Project Descriptions
// This script removes all project descriptions from project cards

// Override the original createProjectCard method to remove descriptions
function removeProjectDescriptions() {
    if (!window.dynamicProjectLoader) {
        console.error('Dynamic project loader not found');
        return;
    }
    
    // Store the original method
    const originalCreateProjectCard = window.dynamicProjectLoader.createProjectCard;
    
    // Override with version that excludes descriptions
    window.dynamicProjectLoader.createProjectCard = function(project) {
        const card = document.createElement('div');
        card.className = 'project-card no-description';
        card.setAttribute('data-project-id', project.id);

        // Handle different field name formats from Firestore
        const title = project.title || project.Name || 'Untitled Project';
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

        // Create technologies section (if function exists)
        let technologiesSection = '';
        if (typeof createTechnologiesSection === 'function') {
            technologiesSection = createTechnologiesSection(technologies);
        } else if (technologies && technologies.length > 0) {
            technologiesSection = `
                <div class="project-tech">
                    ${technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            `;
        }
        
        // Create demo link section (if function exists)
        let demoLinkSection = '';
        if (typeof createDemoLinkSection === 'function') {
            demoLinkSection = createDemoLinkSection(demoUrl);
        } else if (demoUrl && demoUrl !== '') {
            demoLinkSection = `
                <div class="project-links">
                    <a href="${demoUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-youtube"></i> Demo
                    </a>
                </div>
            `;
        }

        // Card layout without description
        card.innerHTML = `
            <div class="project-image">
                ${coverSection}
                ${demoLinkSection}
            </div>
            <div class="project-content">
                <h3>${title}</h3>
                ${technologiesSection}
            </div>
        `;

        return card;
    };
    
    console.log('✅ Project descriptions removed from all project cards');
}

// Add CSS to adjust spacing for cards without descriptions
function addNoDescriptionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-card.no-description .project-content {
            padding: 1rem;
        }
        
        .project-card.no-description h3 {
            margin-bottom: 0.75rem;
        }
        
        .project-card.no-description .project-tech {
            margin-top: 0.5rem;
        }
        
        .project-card.no-description .project-links {
            margin-top: 0.5rem;
        }
        
        /* Adjust spacing for different card types */
        .project-card.no-description.poker-size .project-content {
            padding: 1rem;
        }
        
        .project-card.no-description.bigger-poker-size .project-content {
            padding: 1rem;
        }
        
        .project-card.no-description.enhanced .project-content {
            padding: 1rem;
        }
        
        .project-card.no-description.simplified .project-content {
            padding: 1rem;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        removeProjectDescriptions();
        addNoDescriptionStyles();
    }, 100);
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            removeProjectDescriptions();
            addNoDescriptionStyles();
        }, 100);
    });
} else {
    setTimeout(() => {
        removeProjectDescriptions();
        addNoDescriptionStyles();
    }, 100);
} 