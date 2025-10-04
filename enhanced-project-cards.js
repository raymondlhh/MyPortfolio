// Enhanced Project Cards with Technologies and Demo Links
// This script creates project cards with autoplay videos, technologies, and demo links

console.log('🎯 Enhanced Project Cards with Technologies and Demo Links Loaded');

// Function to extract YouTube video ID from URL
function extractYouTubeVideoId(url) {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            return match[1];
        }
    }
    
    return null;
}

// Function to create autoplay YouTube embed URL
function createAutoplayYouTubeEmbedUrl(videoId) {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&showinfo=0&controls=0&disablekb=1&fs=0`;
}

// Function to create video cover HTML with autoplay
function createAutoplayVideoCover(videoUrl, title) {
    const videoId = extractYouTubeVideoId(videoUrl);
    
    if (!videoId) {
        // Fallback to placeholder if not a valid YouTube URL
        return `
            <div class="project-placeholder">
                <i class="fas fa-vr-cardboard"></i>
            </div>
        `;
    }
    
    const embedUrl = createAutoplayYouTubeEmbedUrl(videoId);
    
    return `
        <div class="project-video-cover">
            <iframe 
                src="${embedUrl}" 
                title="${title}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
    `;
}

// Function to check if URL is a YouTube video
function isYouTubeVideo(url) {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
}

// Function to create technologies section
function createTechnologiesSection(technologies) {
    if (!technologies || technologies.length === 0) {
        return '';
    }
    
    const techTags = technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    
    return `
        <div class="project-technologies">
            ${techTags}
        </div>
    `;
}

// Function to create demo link section
function createDemoLinkSection(demoUrl) {
    if (!demoUrl || demoUrl === '') {
        return '';
    }
    
    return `
        <div class="project-demo-link">
            <a href="${demoUrl}" class="demo-button" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-youtube"></i>
                <span>Demo</span>
            </a>
        </div>
    `;
}

// Function to create Itch.io link section
function createItchioLinkSection(itchioUrl) {
    if (!itchioUrl || itchioUrl === '') {
        return '';
    }
    
    return `
        <div class="project-itchio-link">
            <a href="${itchioUrl}" class="itchio-button" target="_blank" rel="noopener noreferrer">
                <i class="fas fa-gamepad"></i>
                <span>Play</span>
            </a>
        </div>
    `;
}

// Function to create GitHub link section
function createGitHubLinkSection(githubUrl) {
    if (!githubUrl || githubUrl === '') {
        return '';
    }
    
    return `
        <div class="project-github-link">
            <a href="${githubUrl}" class="github-button" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-github"></i>
                <span>Code</span>
            </a>
        </div>
    `;
}

// Override the original createProjectCard method with enhanced version
function createEnhancedProjectCards() {
    if (!window.dynamicProjectLoader) {
        console.error('Dynamic project loader not found');
        return;
    }
    
    // Override with enhanced version
    window.dynamicProjectLoader.createProjectCard = function(project) {
        const card = document.createElement('div');
        card.className = 'project-card enhanced';
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
            coverSection = createAutoplayVideoCover(demoUrl, title);
        } else if (imageUrl && isYouTubeVideo(imageUrl)) {
            // Use autoplay YouTube video from image field
            coverSection = createAutoplayVideoCover(imageUrl, title);
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

        // Enhanced card with name, description, technologies, and all links
        card.innerHTML = `
            <div class="project-image">
                ${coverSection}
            </div>
            <div class="project-content">
                <h3>${title}</h3>
                <p>${description}</p>
                ${technologiesSection}
                <div class="project-links">
                    ${demoLinkSection}
                    ${githubLinkSection}
                    ${itchioLinkSection}
                </div>
            </div>
        `;

        return card;
    };
    
    console.log('✅ Project cards enhanced with technologies and demo links');
}

// Add CSS styles for enhanced cards
function addEnhancedCardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-card.enhanced {
            background: var(--card-bg, #ffffff);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-color, #e5e7eb);
        }
        
        .project-card.enhanced:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .project-card.enhanced .project-image {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
        }
        
        .project-card.enhanced .project-cover {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .project-video-cover {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            background: #000;
        }
        
        .project-video-cover iframe {
            width: 100%;
            height: 100%;
            border: none;
            pointer-events: none;
        }
        
        .project-card.enhanced .project-content {
            padding: 1.5rem;
        }
        
        .project-card.enhanced h3 {
            margin: 0 0 0.75rem 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary, #1f2937);
            line-height: 1.4;
        }
        
        .project-card.enhanced p {
            margin: 0 0 1rem 0;
            color: var(--text-secondary, #6b7280);
            line-height: 1.6;
            font-size: 0.95rem;
        }
        
        .project-technologies {
            margin-bottom: 1rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        
        .tech-tag {
            background: var(--primary-color, #3b82f6);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .project-links {
            display: flex;
            gap: 0.75rem;
            flex-wrap: wrap;
            justify-content: flex-end;
        }
        
        .project-demo-link,
        .project-github-link,
        .project-itchio-link {
            display: flex;
        }
        
        .demo-button,
        .github-button,
        .itchio-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            color: white;
            padding: 0.75rem 1.25rem;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .demo-button {
            background: #ff0000;
            box-shadow: 0 2px 4px rgba(255, 0, 0, 0.2);
        }
        
        .demo-button:hover {
            background: #cc0000;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(255, 0, 0, 0.3);
        }
        
        .github-button {
            background: #333;
            box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
        }
        
        .github-button:hover {
            background: #555;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(51, 51, 51, 0.3);
        }
        
        .itchio-button {
            background: #fa5c5c;
            box-shadow: 0 2px 4px rgba(250, 92, 92, 0.2);
        }
        
        .itchio-button:hover {
            background: #e53e3e;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(250, 92, 92, 0.3);
        }
        
        .demo-button i,
        .github-button i,
        .itchio-button i {
            font-size: 1.1rem;
        }
        
        .project-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--placeholder-bg, #f3f4f6);
            color: var(--placeholder-color, #9ca3af);
        }
        
        .project-placeholder i {
            font-size: 3rem;
        }
        
        /* Dark mode support */
        [data-theme="dark"] .project-card.enhanced {
            background: var(--card-bg-dark, #1f2937);
            border-color: var(--border-color-dark, #374151);
        }
        
        [data-theme="dark"] .project-card.enhanced h3 {
            color: var(--text-primary-dark, #f9fafb);
        }
        
        [data-theme="dark"] .project-card.enhanced p {
            color: var(--text-secondary-dark, #d1d5db);
        }
        
        [data-theme="dark"] .tech-tag {
            background: var(--primary-color-dark, #60a5fa);
        }
        
        [data-theme="dark"] .project-placeholder {
            background: var(--placeholder-bg-dark, #374151);
            color: var(--placeholder-color-dark, #6b7280);
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .project-card.enhanced .project-image,
            .project-video-cover {
                height: 150px;
            }
            
            .project-card.enhanced .project-content {
                padding: 1rem;
            }
            
            .project-card.enhanced h3 {
                font-size: 1.1rem;
            }
            
            .project-card.enhanced p {
                font-size: 0.9rem;
            }
            
            .tech-tag {
                font-size: 0.75rem;
                padding: 0.2rem 0.6rem;
            }
            
            .demo-button,
            .github-button,
            .itchio-button {
                padding: 0.6rem 1rem;
                font-size: 0.85rem;
            }
            
            .project-links {
                gap: 0.5rem;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Enhanced card styles added');
}

// Function to test enhanced card creation
function testEnhancedCard() {
    const testProject = {
        Name: "VR Minimarket",
        Description: "A VR minimarket prototype where players can explore, choose, and buy products in a simulated store environment.",
        Demo: "https://www.youtube.com/watch?v=4JCJLuJrdzc",
        Tags: ["Unity", "C#", "VR"]
    };
    
    console.log('🧪 Testing enhanced card creation:');
    console.log('  Project:', testProject);
    console.log('  Technologies:', testProject.Tags);
    console.log('  Demo URL:', testProject.Demo);
    console.log('  Is YouTube:', isYouTubeVideo(testProject.Demo));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎯 Initializing enhanced project cards...');
    
    // Add styles
    addEnhancedCardStyles();
    
    // Create enhanced project cards
    setTimeout(() => {
        createEnhancedProjectCards();
        testEnhancedCard();
    }, 1000);
});

// Make functions available globally
window.extractYouTubeVideoId = extractYouTubeVideoId;
window.createAutoplayYouTubeEmbedUrl = createAutoplayYouTubeEmbedUrl;
window.isYouTubeVideo = isYouTubeVideo;
window.testEnhancedCard = testEnhancedCard; 