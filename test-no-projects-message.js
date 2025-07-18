// Test script to manually show "no projects found" messages
// Run this in browser console to test the messages

function testNoProjectsMessages() {
    console.log('=== Testing "No Projects Found" Messages ===');
    
    const courseworksData = [
        { id: 'vr-ar-projects', name: 'VR/AR' },
        { id: 'game-dev-projects', name: 'Game Development' },
        { id: '3d-modeling-projects', name: '3D Modeling' },
        { id: 'animation-projects', name: '2D/3D Animation' },
        { id: 'audio-video-projects', name: 'Audio & Video Production' }
    ];
    
    courseworksData.forEach(data => {
        console.log(`Testing ${data.name}...`);
        
        // Get the container
        const element = document.getElementById(data.id);
        if (element) {
            const projectsGrid = element.querySelector('.projects-grid');
            if (projectsGrid) {
                // Show the "no projects found" message
                projectsGrid.innerHTML = `
                    <div class="no-projects-message">
                        <i class="fas fa-info-circle"></i>
                        <p>No projects found in this category. Projects will appear here once added to the database.</p>
                    </div>
                `;
                console.log(`✅ ${data.name}: Message displayed`);
            } else {
                console.log(`❌ ${data.name}: .projects-grid not found`);
            }
        } else {
            console.log(`❌ ${data.name}: Container not found`);
        }
    });
    
    console.log('Test completed! Check each courseworks tab to see the messages.');
}

// Function to show messages for specific category
function showNoProjectsMessage(categoryId) {
    const element = document.getElementById(categoryId);
    if (element) {
        const projectsGrid = element.querySelector('.projects-grid');
        if (projectsGrid) {
            projectsGrid.innerHTML = `
                <div class="no-projects-message">
                    <i class="fas fa-info-circle"></i>
                    <p>No projects found in this category. Projects will appear here once added to the database.</p>
                </div>
            `;
            console.log(`✅ Message displayed for ${categoryId}`);
        } else {
            console.log(`❌ .projects-grid not found in ${categoryId}`);
        }
    } else {
        console.log(`❌ Container ${categoryId} not found`);
    }
}

// Make functions available globally
window.testNoProjectsMessages = testNoProjectsMessages;
window.showNoProjectsMessage = showNoProjectsMessage;

console.log('Test functions loaded!');
console.log('Available functions:');
console.log('- testNoProjectsMessages() - Test all courseworks categories');
console.log('- showNoProjectsMessage("category-id") - Test specific category');
console.log('');
console.log('Example: showNoProjectsMessage("3d-modeling-projects")'); 