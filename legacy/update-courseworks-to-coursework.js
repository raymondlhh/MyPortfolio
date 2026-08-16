// Update Courseworks to Coursework
// This script updates all HTML files to change "Courseworks" to "Coursework"

console.log('🔄 Updating Courseworks to Coursework...');

// List of HTML files to update
const htmlFiles = [
    'VR.html',
    'AR.html', 
    'MR.html',
    'Game.html',
    '3D.html',
    'Anim.html',
    'Production.html'
];

// Function to update a single file
async function updateFile(filename) {
    try {
        console.log(`📝 Updating ${filename}...`);
        
        // Read the file
        const response = await fetch(filename);
        let content = await response.text();
        
        // Replace all instances of "Courseworks" with "Coursework"
        content = content.replace(/Courseworks/g, 'Coursework');
        
        // Replace courseworks-category with coursework-category
        content = content.replace(/courseworks-category/g, 'coursework-category');
        
        // Replace courseworks-tabs with coursework-tabs
        content = content.replace(/courseworks-tabs/g, 'coursework-tabs');
        
        // Replace courseworks-tab-button with coursework-tab-button
        content = content.replace(/courseworks-tab-button/g, 'coursework-tab-button');
        
        // Replace courseworks class with coursework class
        content = content.replace(/class="courseworks"/g, 'class="coursework"');
        
        // Replace #courseworks with #coursework in href attributes
        content = content.replace(/href="([^"]*)#courseworks/g, 'href="$1#coursework');
        
        // Write the updated content back to the file
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create a download link
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        
        URL.revokeObjectURL(url);
        
        console.log(`✅ Updated ${filename}`);
        
    } catch (error) {
        console.error(`❌ Error updating ${filename}:`, error);
    }
}

// Function to update all files
async function updateAllFiles() {
    console.log('🚀 Starting batch update...');
    
    for (const filename of htmlFiles) {
        await updateFile(filename);
    }
    
    console.log('✅ All files updated!');
    console.log('📋 Updated files:');
    htmlFiles.forEach(file => console.log(`  - ${file}`));
}

// Make function available globally
window.updateAllFiles = updateAllFiles;

// Auto-execute when script loads
setTimeout(() => {
    console.log('🔄 Courseworks to Coursework Updater Ready!');
    console.log('📋 Available commands:');
    console.log('  updateAllFiles() - Update all HTML files');
    console.log('  updateFile(filename) - Update a specific file');
    
    console.log('💡 To update all files, run: updateAllFiles()');
}, 1000); 