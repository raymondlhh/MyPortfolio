// Fix YouTube Video Black Screen Issue on Tab Switching
// This script ensures YouTube videos reload properly when switching tabs

console.log('🔧 Loading YouTube tab switching fix...');

// Function to extract YouTube video ID from URL
function extractYouTubeVideoId(url) {
    if (!url) return null;
    
    let videoId = null;
    if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
        videoId = url.split('embed/')[1].split('?')[0];
    } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('shorts/')[1].split('?')[0];
    }
    
    return videoId;
}

// Function to check if URL is a YouTube video
function isYouTubeVideo(url) {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
}

// Function to create autoplay YouTube embed URL
function createAutoplayYouTubeEmbedUrl(videoId) {
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&showinfo=0&controls=0&disablekb=1&fs=0`;
}

// Function to reload YouTube iframes in a container
function reloadYouTubeIframes(container) {
    if (!container) return;
    
    const videoCovers = container.querySelectorAll('.project-video-cover');
    
    videoCovers.forEach(videoCover => {
        const iframe = videoCover.querySelector('iframe');
        if (iframe && iframe.src.includes('youtube.com/embed/')) {
            // Store the current src
            const currentSrc = iframe.src;
            
            // Reload the iframe by temporarily changing src and then restoring it
            iframe.src = '';
            setTimeout(() => {
                iframe.src = currentSrc;
                console.log('🔄 Reloaded YouTube iframe:', currentSrc);
            }, 100);
        }
    });
}

// Function to fix YouTube videos in newly loaded projects
function fixYouTubeVideosInProjects() {
    // Find all project cards with YouTube videos
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const videoCover = card.querySelector('.project-video-cover');
        if (videoCover) {
            const iframe = videoCover.querySelector('iframe');
            if (iframe && iframe.src.includes('youtube.com/embed/')) {
                // Add a small delay to ensure the iframe is properly loaded
                setTimeout(() => {
                    if (iframe.contentWindow) {
                        // Try to reload the iframe
                        const currentSrc = iframe.src;
                        iframe.src = '';
                        setTimeout(() => {
                            iframe.src = currentSrc;
                        }, 50);
                    }
                }, 200);
            }
        }
    });
}

// Function to handle tab switching for YouTube videos
function setupYouTubeTabSwitching() {
    // Listen for others tab switching
    const othersTabButtons = document.querySelectorAll('.others-tab-button');
    othersTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = button.getAttribute('data-category');
            console.log('🔄 Others tab switched to:', category);
            
            // Wait for the category to become active, then reload YouTube videos
            setTimeout(() => {
                const targetCategory = document.getElementById(`${category}-projects`);
                if (targetCategory && targetCategory.classList.contains('active')) {
                    console.log('🎥 Reloading YouTube videos in:', category);
                    reloadYouTubeIframes(targetCategory);
                    
                    // Also fix any newly loaded projects
                    setTimeout(() => {
                        fixYouTubeVideosInProjects();
                    }, 500);
                }
            }, 300);
        });
    });
    
    // Listen for XR project tab switching
    const xrTabButtons = document.querySelectorAll('.tab-button');
    xrTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = button.getAttribute('data-category');
            console.log('🔄 XR tab switched to:', category);
            
            // Wait for the category to become active, then reload YouTube videos
            setTimeout(() => {
                const targetCategory = document.getElementById(`${category}-projects`);
                if (targetCategory && targetCategory.classList.contains('active')) {
                    console.log('🎥 Reloading YouTube videos in:', category);
                    reloadYouTubeIframes(targetCategory);
                    
                    // Also fix any newly loaded projects
                    setTimeout(() => {
                        fixYouTubeVideosInProjects();
                    }, 500);
                }
            }, 300);
        });
    });
}

// Function to monitor for new project cards and fix YouTube videos
function setupYouTubeVideoMonitoring() {
    // Create a MutationObserver to watch for new project cards
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node is a project card or contains project cards
                        const projectCards = node.classList && node.classList.contains('project-card') 
                            ? [node] 
                            : node.querySelectorAll('.project-card');
                        
                        projectCards.forEach(card => {
                            const videoCover = card.querySelector('.project-video-cover');
                            if (videoCover) {
                                const iframe = videoCover.querySelector('iframe');
                                if (iframe && iframe.src.includes('youtube.com/embed/')) {
                                    console.log('🎥 New YouTube video detected, ensuring proper loading...');
                                    // Add a small delay to ensure proper loading
                                    setTimeout(() => {
                                        const currentSrc = iframe.src;
                                        iframe.src = '';
                                        setTimeout(() => {
                                            iframe.src = currentSrc;
                                        }, 50);
                                    }, 200);
                                }
                            }
                        });
                    }
                });
            }
        });
    });
    
    // Start observing all project grids
    const projectGrids = document.querySelectorAll('.projects-grid');
    projectGrids.forEach(grid => {
        observer.observe(grid, { childList: true, subtree: true });
    });
    
    console.log('👀 YouTube video monitoring set up');
}

// Enhanced createAutoplayVideoCover function that handles YouTube Shorts
function createAutoplayVideoCover(videoUrl, title) {
    if (!videoUrl) return '';
    
    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) return `<img src="${videoUrl}" alt="${title}" class="project-cover">`;
    
    const embedUrl = createAutoplayYouTubeEmbedUrl(videoId);
    
    return `
        <div class="project-video-cover">
            <iframe 
                src="${embedUrl}" 
                title="${title}" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Initializing YouTube tab switching fix...');
    
    // Set up tab switching handlers
    setupYouTubeTabSwitching();
    
    // Set up video monitoring
    setupYouTubeVideoMonitoring();
    
    // Initial fix for any existing videos
    setTimeout(() => {
        fixYouTubeVideosInProjects();
    }, 1000);
    
    console.log('✅ YouTube tab switching fix initialized');
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            setupYouTubeTabSwitching();
            setupYouTubeVideoMonitoring();
            setTimeout(() => {
                fixYouTubeVideosInProjects();
            }, 1000);
        }, 100);
    });
} else {
    setTimeout(() => {
        setupYouTubeTabSwitching();
        setupYouTubeVideoMonitoring();
        setTimeout(() => {
            fixYouTubeVideosInProjects();
        }, 1000);
    }, 100);
}

// Export functions for use in other scripts
window.YouTubeTabFix = {
    reloadYouTubeIframes,
    fixYouTubeVideosInProjects,
    createAutoplayVideoCover,
    extractYouTubeVideoId,
    isYouTubeVideo
};

console.log('📋 YouTube Tab Switching Fix script loaded'); 