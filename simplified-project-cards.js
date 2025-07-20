// Simplified Project Cards with Autoplay YouTube Videos
// This script creates simplified project cards with only name and description, plus autoplay videos

console.log('🎬 Simplified Project Cards with Autoplay Loaded');

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

// Override the original createProjectCard method with simplified version
function createSimplifiedProjectCards() {
    if (!window.dynamicProjectLoader) {
        console.error('Dynamic project loader not found');
        return;
    }
    
    // Override with simplified version
    window.dynamicProjectLoader.createProjectCard = function(project) {
        const card = document.createElement('div');
        card.className = 'project-card simplified';
        card.setAttribute('data-project-id', project.id);

        // Handle different field name formats from Firestore
        const title = project.title || project.Name || 'Untitled Project';
        const description = project.description || project.Description || 'No description available';
        const imageUrl = project.imageUrl || project.Image || '';
        const videoUrl = project.videoUrl || project.Video || '';
        const demoUrl = project.demoUrl || project['Demo Link'] || '';

        // Create cover section - prioritize video over image
        let coverSection = '';
        if (videoUrl && isYouTubeVideo(videoUrl)) {
            // Use autoplay YouTube video as cover
            coverSection = createAutoplayVideoCover(videoUrl, title);
        } else if (imageUrl && isYouTubeVideo(imageUrl)) {
            // Use autoplay YouTube video from image field
            coverSection = createAutoplayVideoCover(imageUrl, title);
        } else if (demoUrl && isYouTubeVideo(demoUrl)) {
            // Use autoplay YouTube video from demo field
            coverSection = createAutoplayVideoCover(demoUrl, title);
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

        // Simplified card with only name and description
        card.innerHTML = `
            <div class="project-image">
                ${coverSection}
            </div>
            <div class="project-content">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;

        return card;
    };
    
    console.log('✅ Project cards simplified with autoplay videos');
}

// Add CSS styles for simplified cards and autoplay videos
function addSimplifiedCardStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-card.simplified {
            background: var(--card-bg, #ffffff);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid var(--border-color, #e5e7eb);
        }
        
        .project-card.simplified:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .project-card.simplified .project-image {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
        }
        
        .project-card.simplified .project-cover {
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
            pointer-events: none; /* Prevents interaction with video */
        }
        
        .project-card.simplified .project-content {
            padding: 1.5rem;
        }
        
        .project-card.simplified h3 {
            margin: 0 0 0.75rem 0;
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text-primary, #1f2937);
            line-height: 1.4;
        }
        
        .project-card.simplified p {
            margin: 0;
            color: var(--text-secondary, #6b7280);
            line-height: 1.6;
            font-size: 0.95rem;
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
        [data-theme="dark"] .project-card.simplified {
            background: var(--card-bg-dark, #1f2937);
            border-color: var(--border-color-dark, #374151);
        }
        
        [data-theme="dark"] .project-card.simplified h3 {
            color: var(--text-primary-dark, #f9fafb);
        }
        
        [data-theme="dark"] .project-card.simplified p {
            color: var(--text-secondary-dark, #d1d5db);
        }
        
        [data-theme="dark"] .project-placeholder {
            background: var(--placeholder-bg-dark, #374151);
            color: var(--placeholder-color-dark, #6b7280);
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .project-card.simplified .project-image,
            .project-video-cover {
                height: 150px;
            }
            
            .project-card.simplified .project-content {
                padding: 1rem;
            }
            
            .project-card.simplified h3 {
                font-size: 1.1rem;
            }
            
            .project-card.simplified p {
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
    console.log('✅ Simplified card styles added');
}

// Function to test autoplay video creation
function testAutoplayVideo() {
    const testUrl = 'https://www.youtube.com/watch?v=4JCJLuJrdzc';
    const videoId = extractYouTubeVideoId(testUrl);
    const embedUrl = createAutoplayYouTubeEmbedUrl(videoId);
    
    console.log('🧪 Testing autoplay video creation:');
    console.log(`  Original URL: ${testUrl}`);
    console.log(`  Video ID: ${videoId}`);
    console.log(`  Autoplay Embed URL: ${embedUrl}`);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Initializing simplified project cards with autoplay...');
    
    // Add styles
    addSimplifiedCardStyles();
    
    // Create simplified project cards
    setTimeout(() => {
        createSimplifiedProjectCards();
        testAutoplayVideo();
    }, 1000);
});

// Make functions available globally
window.extractYouTubeVideoId = extractYouTubeVideoId;
window.createAutoplayYouTubeEmbedUrl = createAutoplayYouTubeEmbedUrl;
window.isYouTubeVideo = isYouTubeVideo;
window.testAutoplayVideo = testAutoplayVideo; 