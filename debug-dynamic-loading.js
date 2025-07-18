// Debug script for dynamic project loading
// Run this in browser console to troubleshoot issues

async function debugDynamicLoading() {
    console.log('=== Debugging Dynamic Project Loading ===');
    
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase is not loaded!');
        return;
    }
    console.log('✅ Firebase is loaded');
    
    // Check if database is available
    if (typeof window.db === 'undefined') {
        console.error('❌ Database instance not available!');
        return;
    }
    console.log('✅ Database instance is available');
    
    // Check if dynamic loader is available
    if (typeof window.dynamicProjectLoader === 'undefined') {
        console.error('❌ Dynamic project loader not available!');
        return;
    }
    console.log('✅ Dynamic project loader is available');
    
    // Test loading VRAR collection
    console.log('\n=== Testing VRAR Collection ===');
    try {
        const vrArProjects = await window.dynamicProjectLoader.loadProjectsFromCollection('VRAR');
        console.log('VRAR projects loaded:', vrArProjects);
        
        if (vrArProjects.length === 0) {
            console.log('⚠️ No projects found in VRAR collection');
        } else {
            console.log(`✅ Found ${vrArProjects.length} project(s) in VRAR collection`);
            vrArProjects.forEach((project, index) => {
                console.log(`Project ${index + 1}:`, project);
            });
        }
    } catch (error) {
        console.error('❌ Error loading VRAR projects:', error);
    }
    
    // Test loading other collections
    const testCollections = ['VR', 'AR', 'MR', 'Game', '3D', 'Animation', 'Production'];
    console.log('\n=== Testing Other Collections ===');
    
    for (const collection of testCollections) {
        try {
            const projects = await window.dynamicProjectLoader.loadProjectsFromCollection(collection);
            console.log(`${collection}: ${projects.length} projects`);
        } catch (error) {
            console.error(`❌ Error loading ${collection}:`, error);
        }
    }
    
    // Check current page and containers
    console.log('\n=== Checking Page and Containers ===');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    console.log('Current page:', currentPage);
    
    // Check if containers exist
    const containers = [
        '#vr-projects .projects-grid',
        '#ar-projects .projects-grid', 
        '#mr-projects .projects-grid',
        '#vr-ar-projects .projects-grid',
        '#game-dev-projects .projects-grid',
        '#3d-modeling-projects .projects-grid',
        '#animation-projects .projects-grid',
        '#audio-video-projects .projects-grid',
        '.projects-grid'
    ];
    
    containers.forEach(selector => {
        const container = document.querySelector(selector);
        if (container) {
            console.log(`✅ Container found: ${selector}`);
            console.log(`   Content: ${container.innerHTML.substring(0, 100)}...`);
        } else {
            console.log(`❌ Container not found: ${selector}`);
        }
    });
    
    // Test manual display
    console.log('\n=== Testing Manual Display ===');
    try {
        await window.dynamicProjectLoader.displayProjects('#vr-ar-projects .projects-grid', 'VRAR');
        console.log('✅ Manual display test completed');
    } catch (error) {
        console.error('❌ Manual display test failed:', error);
    }
}

// Function to manually load VRAR projects
async function manuallyLoadVRAR() {
    console.log('=== Manually Loading VRAR Projects ===');
    try {
        await window.dynamicProjectLoader.displayProjects('#vr-ar-projects .projects-grid', 'VRAR');
        console.log('✅ VRAR projects loaded manually');
    } catch (error) {
        console.error('❌ Error manually loading VRAR:', error);
    }
}

// Function to check all courseworks containers
async function checkAllCourseworks() {
    console.log('=== Checking All Courseworks Containers ===');
    const courseworksSelectors = [
        '#vr-ar-projects .projects-grid',
        '#game-dev-projects .projects-grid',
        '#3d-modeling-projects .projects-grid',
        '#animation-projects .projects-grid',
        '#audio-video-projects .projects-grid'
    ];
    
    for (const selector of courseworksSelectors) {
        console.log(`\nChecking: ${selector}`);
        const container = document.querySelector(selector);
        if (container) {
            console.log('Container found, current content:', container.innerHTML.substring(0, 200));
            // Try to load projects for this container
            const collectionName = selector.includes('vr-ar') ? 'VRAR' : 
                                 selector.includes('game-dev') ? 'Game' :
                                 selector.includes('3d-modeling') ? '3D' :
                                 selector.includes('animation') ? 'Animation' :
                                 selector.includes('audio-video') ? 'Production' : 'Unknown';
            
            console.log(`Loading collection: ${collectionName}`);
            await window.dynamicProjectLoader.displayProjects(selector, collectionName);
        } else {
            console.log('Container not found');
        }
    }
}

// Function to test courseworks tab switching
function testCourseworksTabs() {
    console.log('=== Testing Courseworks Tab Switching ===');
    
    const courseworksTabButtons = document.querySelectorAll('.courseworks-tab-button');
    console.log(`Found ${courseworksTabButtons.length} courseworks tab buttons`);
    
    courseworksTabButtons.forEach((button, index) => {
        const category = button.getAttribute('data-category');
        console.log(`Button ${index + 1}: ${category}`);
        
        // Simulate click on each button
        setTimeout(() => {
            console.log(`Clicking ${category} tab...`);
            button.click();
        }, index * 2000); // Click each tab 2 seconds apart
    });
}

// Function to manually load all courseworks
async function loadAllCourseworks() {
    console.log('=== Manually Loading All Courseworks ===');
    
    const courseworksData = [
        { selector: '#vr-ar-projects .projects-grid', collection: 'VRAR' },
        { selector: '#game-dev-projects .projects-grid', collection: 'Game' },
        { selector: '#3d-modeling-projects .projects-grid', collection: '3D' },
        { selector: '#animation-projects .projects-grid', collection: 'Animation' },
        { selector: '#audio-video-projects .projects-grid', collection: 'Production' }
    ];
    
    for (const data of courseworksData) {
        console.log(`Loading ${data.collection} projects...`);
        await window.dynamicProjectLoader.displayProjects(data.selector, data.collection);
    }
    
    console.log('All courseworks loaded!');
}

// Make functions available globally
window.debugDynamicLoading = debugDynamicLoading;
window.manuallyLoadVRAR = manuallyLoadVRAR;
window.checkAllCourseworks = checkAllCourseworks;
window.testCourseworksTabs = testCourseworksTabs;
window.loadAllCourseworks = loadAllCourseworks;

console.log('Debug functions loaded!');
console.log('Available functions:');
console.log('- debugDynamicLoading() - Full debug check');
console.log('- manuallyLoadVRAR() - Manually load VRAR projects');
console.log('- checkAllCourseworks() - Check all courseworks containers');
console.log('- testCourseworksTabs() - Test tab switching');
console.log('- loadAllCourseworks() - Manually load all courseworks'); 