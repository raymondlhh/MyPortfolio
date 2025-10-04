// Bigger Poker Card Size Project Cards with Justified Text
// This script makes project cards larger with justified description text

console.log('🃏 Bigger Poker Card Size Project Cards Loaded');

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

// Function to create technologies section (compact)
function createTechnologiesSection(technologies) {
    if (!technologies || technologies.length === 0) {
        return '';
    }
    
    // Limit to first 3 technologies for bigger display
    const limitedTechs = technologies.slice(0, 3);
    const techTags = limitedTechs.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    
    return `
        <div class="project-technologies">
            ${techTags}
            ${technologies.length > 3 ? `<span class="tech-more">+${technologies.length - 3}</span>` : ''}
        </div>
    `;
}

// Function to create demo link section (compact)
function createDemoLinkSection(demoUrl) {
    if (!demoUrl || demoUrl === '') {
        return '';
    }
    
    return `
        <div class="project-demo-link">
            <a href="${demoUrl}" class="demo-button" target="_blank" rel="noopener noreferrer" title="Watch Demo">
                <i class="fab fa-youtube"></i>
            </a>
        </div>
    `;
}

// Function to create Itch.io link section (compact)
function createItchioLinkSection(itchioUrl) {
    if (!itchioUrl || itchioUrl === '') {
        return '';
    }
    
    return `
        <div class="project-itchio-link">
            <a href="${itchioUrl}" class="itchio-button" target="_blank" rel="noopener noreferrer" title="Play Game">
                <i class="fas fa-gamepad"></i>
            </a>
        </div>
    `;
}

// Function to create GitHub link section (compact)
function createGitHubLinkSection(githubUrl) {
    if (!githubUrl || githubUrl === '') {
        return '';
    }
    
    return `
        <div class="project-github-link">
            <a href="${githubUrl}" class="github-button" target="_blank" rel="noopener noreferrer" title="View Code">
                <i class="fab fa-github"></i>
            </a>
        </div>
    `;
}

// Override the original createProjectCard method with bigger poker card size
function createBiggerPokerCardSizeProjectCards() {
    if (!window.dynamicProjectLoader) {
        console.error('Dynamic project loader not found');
        return;
    }
    
    // Override with bigger poker card size version
    window.dynamicProjectLoader.createProjectCard = function(project) {
        const card = document.createElement('div');
        card.className = 'project-card bigger-poker-size';
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

        // Create technologies section (compact)
        const technologiesSection = createTechnologiesSection(technologies);
        
        // Create link sections (compact)
        const demoLinkSection = createDemoLinkSection(demoUrl);
        const githubLinkSection = createGitHubLinkSection(githubUrl);
        const itchioLinkSection = createItchioLinkSection(itchioUrl);

        // Bigger poker card size layout
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
                <p>${description}</p>
                ${technologiesSection}
            </div>
        `;

        return card;
    };
    
    console.log('✅ Project cards converted to bigger poker card size');
}

// Add CSS styles for bigger poker card size
function addBiggerPokerCardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-card.bigger-poker-size {
            background: var(--card-bg, #ffffff);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-color, #e5e7eb);
            width: 360px;
            height: 520px;
            display: flex;
            flex-direction: column;
            margin: 1.5rem;
        }
        
        .project-card.bigger-poker-size:hover {
            transform: translateY(-10px) scale(1.03);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
        }
        
        .project-card.bigger-poker-size .project-image {
            position: relative;
            width: 100%;
            height: 260px;
            overflow: hidden;
            flex-shrink: 0;
        }
        
        .project-card.bigger-poker-size .project-cover {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .project-video-cover {
            position: relative;
            width: 100%;
            height: 260px;
            overflow: hidden;
            background: #000;
        }
        
        .project-video-cover iframe {
            width: 100%;
            height: 100%;
            border: none;
            pointer-events: none;
        }
        
        .project-card.bigger-poker-size .project-content {
            padding: 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        
        .project-card.bigger-poker-size h3 {
            margin: 0 0 0.75rem 0;
            font-size: 1.4rem;
            font-weight: 600;
            color: var(--text-primary, #1f2937);
            line-height: 1.3;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        
        .project-card.bigger-poker-size p {
            margin: 0 0 1rem 0;
            color: var(--text-secondary, #6b7280);
            line-height: 1.6;
            font-size: 1rem;
            flex: 1;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            text-align: justify;
            text-justify: inter-word;
        }
        
        .project-technologies {
            margin-top: auto;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            align-items: center;
        }
        
        .tech-tag {
            background: var(--primary-color, #3b82f6);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 16px;
            font-size: 0.8rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.4px;
        }
        
        .tech-more {
            background: var(--secondary-color, #6b7280);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 16px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .project-links {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            z-index: 10;
            display: flex;
            gap: 0.75rem;
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
            width: 40px;
            height: 40px;
            color: white;
            border-radius: 50%;
            text-decoration: none;
            font-weight: 500;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(4px);
        }
        
        .demo-button {
            background: #ff0000;
            box-shadow: 0 3px 6px rgba(255, 0, 0, 0.3);
        }
        
        .demo-button:hover {
            background: #cc0000;
            transform: scale(1.15);
            box-shadow: 0 6px 12px rgba(255, 0, 0, 0.4);
        }
        
        .github-button {
            background: #333;
            box-shadow: 0 3px 6px rgba(51, 51, 51, 0.3);
        }
        
        .github-button:hover {
            background: #555;
            transform: scale(1.15);
            box-shadow: 0 6px 12px rgba(51, 51, 51, 0.4);
        }
        
        .itchio-button {
            background: #fa5c5c;
            box-shadow: 0 3px 6px rgba(250, 92, 92, 0.3);
        }
        
        .itchio-button:hover {
            background: #e53e3e;
            transform: scale(1.15);
            box-shadow: 0 6px 12px rgba(250, 92, 92, 0.4);
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
        [data-theme="dark"] .project-card.bigger-poker-size {
            background: var(--card-bg-dark, #1f2937);
            border-color: var(--border-color-dark, #374151);
        }
        
        [data-theme="dark"] .project-card.bigger-poker-size h3 {
            color: var(--text-primary-dark, #f9fafb);
        }
        
        [data-theme="dark"] .project-card.bigger-poker-size p {
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
            .project-card.bigger-poker-size {
                width: 300px;
                height: 440px;
                margin: 1rem;
            }
            
            .project-card.bigger-poker-size .project-image,
            .project-video-cover {
                height: 200px;
            }
            
            .project-card.bigger-poker-size .project-content {
                padding: 1.25rem;
            }
            
            .project-card.bigger-poker-size h3 {
                font-size: 1.2rem;
            }
            
            .project-card.bigger-poker-size p {
                font-size: 0.9rem;
                -webkit-line-clamp: 3;
            }
            
            .tech-tag {
                font-size: 0.75rem;
                padding: 0.2rem 0.6rem;
            }
            
            .demo-button,
            .github-button,
            .itchio-button {
                width: 36px;
                height: 36px;
            }
            
            .demo-button i,
            .github-button i,
            .itchio-button i {
                font-size: 1rem;
            }
        }
        
        /* Grid layout for multiple cards */
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 2rem;
            justify-items: center;
            padding: 1.5rem;
        }
        
        @media (max-width: 768px) {
            .projects-grid {
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
                padding: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Bigger poker card size styles added');
}

// Function to test bigger poker card creation
function testBiggerPokerCard() {
    const testProject = {
        Name: "VR Minimarket",
        Description: "A VR minimarket prototype where players can explore, choose, and buy products in a simulated store environment. This immersive experience allows users to navigate through a realistic 3D store, interact with products, and practice shopping in virtual reality.",
        Demo: "https://www.youtube.com/watch?v=4JCJLuJrdzc",
        Tags: ["Unity", "C#", "VR", "3D Modeling"]
    };
    
    console.log('🧪 Testing bigger poker card creation:');
    console.log('  Project:', testProject);
    console.log('  Technologies:', testProject.Tags);
    console.log('  Demo URL:', testProject.Demo);
    console.log('  Card size: 360px × 520px (bigger poker card ratio)');
    console.log('  Description: Justified text with 4 lines max');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🃏 Initializing bigger poker card size project cards...');
    
    // Add styles
    addBiggerPokerCardStyles();
    
    // Create bigger poker card size project cards
    setTimeout(() => {
        createBiggerPokerCardSizeProjectCards();
        testBiggerPokerCard();
    }, 1000);
});

// Make functions available globally
window.extractYouTubeVideoId = extractYouTubeVideoId;
window.createAutoplayYouTubeEmbedUrl = createAutoplayYouTubeEmbedUrl;
window.isYouTubeVideo = isYouTubeVideo;
window.testBiggerPokerCard = testBiggerPokerCard; 