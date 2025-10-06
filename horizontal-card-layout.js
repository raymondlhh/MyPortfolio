// Horizontal Card Layout
// This script changes project cards from poker card style to horizontal layout

// Helper functions for creating project cards
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

function createItchioLinkSection(itchioUrl) {
    if (!itchioUrl) return '';
    
    return `
        <div class="project-itchio-link">
            <a href="${itchioUrl}" target="_blank" rel="noopener noreferrer" class="itchio-button" title="Play Game">
                <i class="fas fa-gamepad"></i>
            </a>
        </div>
    `;
}

function createGitHubLinkSection(githubUrl) {
    if (!githubUrl) return '';
    
    return `
        <div class="project-github-link">
            <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="github-button" title="View Code">
                <i class="fab fa-github"></i>
            </a>
        </div>
    `;
}

function isYouTubeVideo(url) {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
}

function createAutoplayVideoCover(videoUrl, title) {
    if (!videoUrl) return '';
    
    // Extract video ID from YouTube URL
    let videoId = '';
    if (videoUrl.includes('youtube.com/watch?v=')) {
        videoId = videoUrl.split('v=')[1].split('&')[0];
    } else if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
    } else if (videoUrl.includes('youtube.com/shorts/')) {
        videoId = videoUrl.split('shorts/')[1].split('?')[0];
    }
    
    if (!videoId) return `<img src="${videoUrl}" alt="${title}" class="project-cover">`;
    
    // Create autoplay embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
    
    return `
        <div class="project-video-cover">
            <iframe src="${embedUrl}" 
                    title="${title}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
            </iframe>
        </div>
    `;
}

// Override the original createProjectCard method with horizontal layout
function createHorizontalProjectCards() {
    if (!window.dynamicProjectLoader) {
        console.error('Dynamic project loader not found');
        return;
    }
    
    // Override with horizontal layout version
    window.dynamicProjectLoader.createProjectCard = function(project) {
        const card = document.createElement('div');
        card.className = 'project-card horizontal';
        card.setAttribute('data-project-id', project.id);

        // Handle different field name formats from Firestore
        const title = project.title || project.Name || 'Untitled Project';
        const description = project.description || project.Description || 'No description available';
        const imageUrl = project.imageUrl || project.Image || '';
        const demoUrl = project.demoUrl || project.Demo || project['Demo Link'] || '';
        const githubUrl = project.githubUrl || project['GitHub Link'] || '';
        const itchioUrl = project.itchioUrl || project.Itchio || project['Itch.io'] || '';
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
        const technologiesSection = createTechnologiesSection(technologies);
        
        // Create link sections
        const demoLinkSection = createDemoLinkSection(demoUrl);
        const githubLinkSection = createGitHubLinkSection(githubUrl);
        const itchioLinkSection = createItchioLinkSection(itchioUrl);

        // Horizontal card layout
        card.innerHTML = `
            <div class="project-image">
                ${coverSection}
                <div class="project-links">
                    ${demoLinkSection}
                    ${githubLinkSection}
                    ${itchioLinkSection}
                </div>
            </div>
            <div class="project-content">
                <h3>${title}</h3>
                <p class="project-description">${description}</p>
                ${technologiesSection}
            </div>
        `;

        return card;
    };
    
    console.log('✅ Project cards converted to horizontal layout');
}

// Add CSS styles for horizontal card layout
function addHorizontalCardStyles() {
    const style = document.createElement('style');
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
        
        .project-links {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            z-index: 10;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.3s ease;
            display: flex;
            gap: 0.75rem;
        }
        
        .project-card.horizontal .project-image:hover .project-links {
            opacity: 1;
            transform: scale(1);
        }
        
        .project-demo-link,
        .project-github-link,
        .project-itchio-link {
            display: flex;
        }
        
        .demo-button,
        .github-button,
        .itchio-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            color: white;
            border-radius: 50%;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(4px);
        }
        
        .demo-button {
            background: #ff0000;
            box-shadow: 0 2px 4px rgba(255, 0, 0, 0.3);
        }
        
        .github-button {
            background: #333;
            box-shadow: 0 2px 4px rgba(51, 51, 51, 0.3);
        }
        
        .itchio-button {
            background: #fa5c5c;
            box-shadow: 0 2px 4px rgba(250, 92, 92, 0.3);
        }
        
        .demo-button:hover {
            background: #cc0000;
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(255, 0, 0, 0.4);
        }
        
        .github-button:hover {
            background: #555;
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(51, 51, 51, 0.4);
        }
        
        .itchio-button:hover {
            background: #e53e3e;
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(250, 92, 92, 0.4);
        }
        
        .demo-button i,
        .github-button i,
        .itchio-button i {
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
            
            .project-meta {
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .meta-item {
                font-size: 0.85rem;
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
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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
    console.log('✅ Horizontal card styles added');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createHorizontalProjectCards();
        addHorizontalCardStyles();
    }, 100);
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            createHorizontalProjectCards();
            addHorizontalCardStyles();
        }, 100);
    });
} else {
    setTimeout(() => {
        createHorizontalProjectCards();
        addHorizontalCardStyles();
    }, 100);
} 