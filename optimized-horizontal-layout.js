// Optimized Horizontal Layout for All Project Cards
// This script consolidates all project card functionality into one optimized solution

// Helper functions
function extractYouTubeVideoId(url) {
    if (!url) return null;
    // Handle all YouTube URL formats, including Shorts
    let videoId = null;
    // Standard watch URL
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
    }
    // Fallback: try to match with regex
    if (!videoId) {
        const match = url.match(/[?&]v=([^&]+)/);
        if (match) videoId = match[1];
    }
    return videoId;
}

function isYouTubeVideo(url) {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
}

function createAutoplayVideoCover(videoUrl, title) {
    if (!videoUrl) return '';
    
    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) return `<img src="${videoUrl}" alt="${title}" class="project-cover">`;
    
    // Create autoplay embed URL (simple version like original)
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

// New: Click-to-play YouTube cover
function createYouTubeCoverWithPlay(videoUrl, title) {
    console.log('createYouTubeCoverWithPlay called with:', { videoUrl, title });
    const videoId = extractYouTubeVideoId(videoUrl);
    console.log('Extracted video ID:', videoId);
    if (!videoId) {
        console.log('No video ID found, returning empty string');
        return '';
    }
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    // Always use the standard embed URL, even for Shorts
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
    const containerId = `yt-cover-${videoId}-${Math.floor(Math.random() * 100000)}`;
    console.log('Created YouTube cover with:', { videoId, thumbnailUrl, embedUrl, containerId });
    return `
        <div class="project-video-cover" id="${containerId}">
            <img src="${thumbnailUrl}" alt="${title}" class="project-video-thumbnail">
            <div class="video-overlay" data-container-id="${containerId}" data-embed-url="${embedUrl}" data-title="${title}">
                <i class='fas fa-play-circle'></i>
            </div>
        </div>
    `;
}

// Make playYouTubeVideo globally available
window.playYouTubeVideo = function(containerId, embedUrl, title) {
    console.log('playYouTubeVideo called with:', { containerId, embedUrl, title });
    const container = document.getElementById(containerId);
    if (container) {
        console.log('Container found, replacing content with iframe');
        container.innerHTML = `
            <iframe 
                src="${embedUrl}" 
                title="${title}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                style="width:100%;height:100%;">
            </iframe>
        `;
        console.log('Iframe inserted successfully');
    } else {
        console.error('Container not found:', containerId);
    }
};

// Main function to override createProjectCard with horizontal layout
function createOptimizedHorizontalCards() {
    if (!window.dynamicProjectLoader) {
        console.error('Dynamic project loader not found');
        return;
    }
    
    // Override with horizontal layout version (same as original)
    window.dynamicProjectLoader.createProjectCard = function(project) {
        const card = document.createElement('div');
        card.className = 'project-card horizontal';
        card.setAttribute('data-project-id', project.id);

        // Handle different field name formats from Firestore
        const title = project.title || project.Name || 'Untitled Project';
        const description = project.description || project.Description || 'No description available';
        const imageUrl = project.imageUrl || project.Image || '';
        const demoUrl = project.demoUrl || project.Demo || project['Demo Link'] || project.demo || '';
        const technologies = project.technologies || project.Technologies || project.Tags || [];

        // Debug logging for AR projects
        if (title.toLowerCase().includes('ar') || title.toLowerCase().includes('augmented')) {
            console.log('AR Project Debug:', {
                title,
                demoUrl,
                imageUrl,
                project: project
            });
        }

        // Create cover section - always prioritize demoUrl YouTube video
        let coverSection = '';
        if (demoUrl && isYouTubeVideo && isYouTubeVideo(demoUrl)) {
            // Always use click-to-play YouTube video from demo field if present
            console.log('Creating YouTube video cover for demoUrl:', demoUrl);
            coverSection = createYouTubeCoverWithPlay(demoUrl, title);
        } else if (imageUrl && isYouTubeVideo && isYouTubeVideo(imageUrl)) {
            // Use click-to-play YouTube video from image field
            console.log('Creating YouTube video cover for imageUrl:', imageUrl);
            coverSection = createYouTubeCoverWithPlay(imageUrl, title);
        } else if (imageUrl && imageUrl !== '') {
            // Use regular image
            console.log('Using regular image:', imageUrl);
            coverSection = `<img src="${imageUrl}" alt="${title}" class="project-cover">`;
        } else {
            // Fallback to placeholder
            console.log('Using placeholder for project:', title);
            coverSection = `
                <div class="project-placeholder">
                    <i class="fas fa-vr-cardboard"></i>
                </div>
            `;
        }

        // Create technologies section
        const technologiesSection = createTechnologiesSection(technologies);
        
        // Create demo link section
        const demoLinkSection = createDemoLinkSection(demoUrl);

        // Horizontal card layout (same as original)
        card.innerHTML = `
            <div class="project-image">
                ${coverSection}
                <!-- Removed demoLinkSection -->
            </div>
            <div class="project-content">
                <h3>${title}</h3>
                <p class="project-description">${description}</p>
                ${technologiesSection}
            </div>
        `;

        return card;
    };
    
    console.log('✅ Optimized horizontal project cards created');
}

// Function to set up video overlay click handlers
function setupVideoOverlayHandlers() {
    // Use event delegation to handle clicks on video overlays
    document.addEventListener('click', function(e) {
        if (e.target.closest('.video-overlay')) {
            const overlay = e.target.closest('.video-overlay');
            const containerId = overlay.getAttribute('data-container-id');
            const embedUrl = overlay.getAttribute('data-embed-url');
            const title = overlay.getAttribute('data-title');
            
            console.log('Video overlay clicked:', { containerId, embedUrl, title });
            
            if (containerId && embedUrl && title) {
                playYouTubeVideo(containerId, embedUrl, title);
            }
        }
    });
    
    console.log('✅ Video overlay handlers set up');
}

// Add CSS styles for horizontal card layout (same as original)
function addOptimizedHorizontalStyles() {
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
        
        .project-video-thumbnail {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        
        .video-overlay:hover {
            background: rgba(0, 0, 0, 0.5);
        }
        
        .video-overlay i {
            font-size: 4rem;
            color: #ff0000;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease;
        }
        
        .video-overlay:hover i {
            transform: scale(1.1);
        }
        
        .project-video-cover iframe {
            width: 100%;
            height: 300px;
            border: none;
            transition: opacity 0.3s ease;
        }
        
        /* Ensure YouTube videos reload properly during tab transitions */
        .project-category.active .project-video-cover iframe,
        .others-category.active .project-video-cover iframe {
            opacity: 1;
        }
        
        .project-category:not(.active) .project-video-cover iframe,
        .others-category:not(.active) .project-video-cover iframe {
            opacity: 0;
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
            grid-template-columns: repeat(2, 1fr);
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
    console.log('✅ Optimized horizontal styles added');
}

// Simple function to ensure all cards have horizontal layout
function ensureHorizontalLayout() {
    // Find all project cards that don't have the horizontal class
    const cards = document.querySelectorAll('.project-card:not(.horizontal)');
    
    cards.forEach(card => {
        // Add horizontal class
        card.classList.add('horizontal');
        
        // Ensure the card has the proper structure
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');
        
        if (!image || !content) {
            console.log('⚠️ Card structure incomplete, skipping...');
            return;
        }
        
        // Apply immediate styles to prevent visual flashing
        card.style.cssText = `
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            max-width: 600px !important;
            height: auto !important;
            margin: 0 !important;
        `;
        
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
        
        console.log('✅ Applied horizontal layout to card');
    });
    
    if (cards.length > 0) {
        console.log(`✅ Applied horizontal layout to ${cards.length} cards`);
    }
}

// Simple tab switching listener
function setupTabSwitchingListener() {
    // Listen for others tab switching
    const othersTabButtons = document.querySelectorAll('.others-tab-button');
    othersTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('🔄 Others tab switched, ensuring horizontal layout...');
            setTimeout(() => {
                ensureHorizontalLayout();
            }, 100);
        });
    });
    
    // Listen for XR project tab switching
    const xrTabButtons = document.querySelectorAll('.tab-button');
    xrTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('🔄 XR tab switched, ensuring horizontal layout...');
            setTimeout(() => {
                ensureHorizontalLayout();
            }, 100);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createOptimizedHorizontalCards();
        addOptimizedHorizontalStyles();
        setupVideoOverlayHandlers();
        setupTabSwitchingListener();
        console.log('🚀 Optimized horizontal layout initialized');
    }, 100);
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            createOptimizedHorizontalCards();
            addOptimizedHorizontalStyles();
            setupVideoOverlayHandlers();
            setupTabSwitchingListener();
            console.log('🚀 Optimized horizontal layout initialized');
        }, 100);
    });
} else {
    setTimeout(() => {
        createOptimizedHorizontalCards();
        addOptimizedHorizontalStyles();
        setupVideoOverlayHandlers();
        setupTabSwitchingListener();
        console.log('🚀 Optimized horizontal layout initialized');
    }, 100);
}

console.log('📋 Optimized Horizontal Layout script loaded'); 