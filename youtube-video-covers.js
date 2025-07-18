// YouTube Video Covers for Projects
// This script modifies project cards to display YouTube videos as covers

console.log('🎥 YouTube Video Covers Loaded');

// Function to extract YouTube video ID from URL
function extractYouTubeVideoId(url) {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
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

// Function to create YouTube embed URL
function createYouTubeEmbedUrl(videoId) {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`;
}

// Function to create video cover HTML
function createVideoCover(videoUrl, title) {
    const videoId = extractYouTubeVideoId(videoUrl);
    
    if (!videoId) {
        // Fallback to placeholder if not a valid YouTube URL
        return `
            <div class="project-placeholder">
                <i class="fas fa-vr-cardboard"></i>
            </div>
        `;
    }
    
    const embedUrl = createYouTubeEmbedUrl(videoId);
    
    return `
        <div class="project-video-cover">
            <iframe 
                src="${embedUrl}" 
                title="${title}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            <div class="video-overlay">
                <i class="fas fa-play-circle"></i>
            </div>
        </div>
    `;
}

// Function to check if URL is a YouTube video
function isYouTubeVideo(url) {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
}

// Override the original createProjectCard method
function enhanceProjectCards() {
    if (!window.dynamicProjectLoader) {
        console.error('Dynamic project loader not found');
        return;
    }
    
    // Store the original method
    const originalCreateProjectCard = window.dynamicProjectLoader.createProjectCard;
    
    // Override with enhanced version
    window.dynamicProjectLoader.createProjectCard = function(project) {
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

        // Create cover section - check if it's a YouTube video
        let coverSection = '';
        if (imageUrl && imageUrl !== '') {
            if (isYouTubeVideo(imageUrl)) {
                // Use YouTube video as cover
                coverSection = createVideoCover(imageUrl, title);
            } else {
                // Use regular image
                coverSection = `<img src="${imageUrl}" alt="${title}" class="project-cover">`;
            }
        } else if (demoUrl && isYouTubeVideo(demoUrl)) {
            // Use demo URL as video cover if image is not set
            coverSection = createVideoCover(demoUrl, title);
        } else {
            // Fallback to placeholder
            coverSection = `
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
                ${coverSection}
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
    };
    
    console.log('✅ Project cards enhanced with YouTube video support');
}

// Add CSS styles for video covers
function addVideoCoverStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-video-cover {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-radius: 8px;
            background: #000;
        }
        
        .project-video-cover iframe {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 8px;
        }
        
        .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .video-overlay i {
            font-size: 3rem;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        
        .project-video-cover:hover .video-overlay {
            opacity: 1;
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .project-video-cover {
                height: 150px;
            }
            
            .video-overlay i {
                font-size: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Video cover styles added');
}

// Function to test YouTube video detection
function testYouTubeDetection() {
    const testUrls = [
        'https://www.youtube.com/watch?v=4JCJLuJrdzc',
        'https://youtu.be/4JCJLuJrdzc',
        'https://www.youtube.com/embed/4JCJLuJrdzc',
        'https://example.com/image.jpg',
        null
    ];
    
    console.log('🧪 Testing YouTube URL detection:');
    testUrls.forEach(url => {
        const isYouTube = isYouTubeVideo(url);
        const videoId = extractYouTubeVideoId(url);
        console.log(`  ${url || 'null'} -> YouTube: ${isYouTube}, Video ID: ${videoId || 'null'}`);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎥 Initializing YouTube video covers...');
    
    // Add styles
    addVideoCoverStyles();
    
    // Enhance project cards
    setTimeout(() => {
        enhanceProjectCards();
        testYouTubeDetection();
    }, 1000);
});

// Make functions available globally
window.extractYouTubeVideoId = extractYouTubeVideoId;
window.createYouTubeEmbedUrl = createYouTubeEmbedUrl;
window.isYouTubeVideo = isYouTubeVideo;
window.testYouTubeDetection = testYouTubeDetection; 