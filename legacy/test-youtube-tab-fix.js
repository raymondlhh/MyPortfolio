// Test script to verify YouTube tab switching fix
console.log('🧪 Testing YouTube tab switching fix...');

// Test the YouTubeTabFix functions
function testYouTubeTabFix() {
    console.log('=== Testing YouTube Tab Fix Functions ===');
    
    // Test if YouTubeTabFix is available
    if (window.YouTubeTabFix) {
        console.log('✅ YouTubeTabFix is available');
        
        // Test extractYouTubeVideoId function
        const testUrls = [
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'https://youtu.be/dQw4w9WgXcQ',
            'https://www.youtube.com/shorts/dQw4w9WgXcQ',
            'https://www.youtube.com/embed/dQw4w9WgXcQ'
        ];
        
        testUrls.forEach((url, index) => {
            const videoId = window.YouTubeTabFix.extractYouTubeVideoId(url);
            const expectedId = 'dQw4w9WgXcQ';
            const status = videoId === expectedId ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} Test ${index + 1}: ${url}`);
            console.log(`   Extracted ID: ${videoId}`);
        });
        
        // Test isYouTubeVideo function
        const testIsYouTube = [
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'https://youtu.be/dQw4w9WgXcQ',
            'https://www.youtube.com/shorts/dQw4w9WgXcQ',
            'https://example.com/image.jpg',
            'https://vimeo.com/123456'
        ];
        
        console.log('\n=== Testing isYouTubeVideo Function ===');
        testIsYouTube.forEach((url, index) => {
            const isYouTube = window.YouTubeTabFix.isYouTubeVideo(url);
            const expected = url.includes('youtube.com') || url.includes('youtu.be');
            const status = isYouTube === expected ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} Test ${index + 1}: ${url} -> ${isYouTube}`);
        });
        
        // Test createAutoplayYouTubeEmbedUrl function
        console.log('\n=== Testing createAutoplayYouTubeEmbedUrl Function ===');
        const videoId = 'dQw4w9WgXcQ';
        const embedUrl = window.YouTubeTabFix.createAutoplayYouTubeEmbedUrl(videoId);
        const expectedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&rel=0&modestbranding=1&showinfo=0&controls=0&disablekb=1&fs=0`;
        const status = embedUrl === expectedUrl ? '✅ PASS' : '❌ FAIL';
        console.log(`${status} Embed URL: ${embedUrl}`);
        
    } else {
        console.log('❌ YouTubeTabFix is not available');
    }
}

// Test tab switching simulation
function testTabSwitching() {
    console.log('\n=== Testing Tab Switching Simulation ===');
    
    // Find tab buttons
    const othersTabButtons = document.querySelectorAll('.others-tab-button');
    const xrTabButtons = document.querySelectorAll('.tab-button');
    
    console.log(`Found ${othersTabButtons.length} others tab buttons`);
    console.log(`Found ${xrTabButtons.length} XR tab buttons`);
    
    // Test if tab switching functions are working
    if (othersTabButtons.length > 0) {
        console.log('✅ Others tab buttons found');
        othersTabButtons.forEach((button, index) => {
            const category = button.getAttribute('data-category');
            console.log(`   Button ${index + 1}: ${category}`);
        });
    }
    
    if (xrTabButtons.length > 0) {
        console.log('✅ XR tab buttons found');
        xrTabButtons.forEach((button, index) => {
            const category = button.getAttribute('data-category');
            console.log(`   Button ${index + 1}: ${category}`);
        });
    }
}

// Test YouTube video elements
function testYouTubeVideos() {
    console.log('\n=== Testing YouTube Video Elements ===');
    
    const videoCovers = document.querySelectorAll('.project-video-cover');
    console.log(`Found ${videoCovers.length} video covers`);
    
    videoCovers.forEach((cover, index) => {
        const iframe = cover.querySelector('iframe');
        if (iframe && iframe.src.includes('youtube.com/embed/')) {
            console.log(`✅ Video ${index + 1}: YouTube iframe found`);
            console.log(`   Source: ${iframe.src}`);
        } else {
            console.log(`❌ Video ${index + 1}: No YouTube iframe found`);
        }
    });
}

// Run all tests
function runAllTests() {
    console.log('🚀 Starting YouTube Tab Switching Fix Tests...\n');
    
    testYouTubeTabFix();
    testTabSwitching();
    testYouTubeVideos();
    
    console.log('\n🎉 All tests completed!');
}

// Run tests when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runAllTests, 2000); // Wait for all scripts to load
    });
} else {
    setTimeout(runAllTests, 2000); // Wait for all scripts to load
} 