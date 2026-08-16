// Remove VR Campus Navigation Project
// This script removes the VR Campus Navigation project from the VRAR collection

console.log('🗑️ VR Campus Navigation Project Remover Loaded');

// Function to find and remove the VR Campus Navigation project
async function removeVRCampusNavigation() {
    try {
        console.log('🔍 Searching for VR Campus Navigation project...');
        
        // Get all documents in VRAR collection
        const snapshot = await window.db.collection('VRAR').get();
        let projectToDelete = null;
        
        snapshot.forEach(doc => {
            const data = doc.data();
            // Check for the project by name (both possible field names)
            if (data.Name === 'VR Campus Navigation System' || data.title === 'VR Campus Navigation System') {
                projectToDelete = { id: doc.id, ...data };
            }
        });
        
        if (!projectToDelete) {
            console.log('❌ VR Campus Navigation project not found');
            return false;
        }
        
        console.log('📋 Found project to delete:', projectToDelete.id);
        console.log('📝 Project name:', projectToDelete.Name || projectToDelete.title);
        
        // Delete the document
        await window.db.collection('VRAR').doc(projectToDelete.id).delete();
        
        console.log('✅ VR Campus Navigation project deleted successfully!');
        console.log('🗑️ Deleted project ID:', projectToDelete.id);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error removing VR Campus Navigation project:', error);
        return false;
    }
}

// Function to list all current VRAR projects
async function listVRARProjects() {
    try {
        console.log('📋 Listing all VRAR projects...');
        
        const snapshot = await window.db.collection('VRAR').get();
        const projects = [];
        
        snapshot.forEach(doc => {
            const data = doc.data();
            projects.push({
                id: doc.id,
                name: data.Name || data.title || 'Unknown',
                description: data.Description || data.description || 'No description'
            });
        });
        
        console.log(`📊 Found ${projects.length} VRAR projects:`);
        projects.forEach((project, index) => {
            console.log(`  ${index + 1}. ${project.name} (ID: ${project.id})`);
        });
        
        return projects;
        
    } catch (error) {
        console.error('❌ Error listing VRAR projects:', error);
        return [];
    }
}

// Function to remove all projects except VR Minimarket
async function removeAllExceptVRMinimarket() {
    try {
        console.log('🗑️ Removing all projects except VR Minimarket...');
        
        const snapshot = await window.db.collection('VRAR').get();
        let deletedCount = 0;
        
        for (const doc of snapshot.docs) {
            const data = doc.data();
            const projectName = data.Name || data.title || '';
            
            // Keep VR Minimarket, delete everything else
            if (projectName !== 'VR Minimarket') {
                await window.db.collection('VRAR').doc(doc.id).delete();
                console.log(`🗑️ Deleted: ${projectName} (ID: ${doc.id})`);
                deletedCount++;
            } else {
                console.log(`✅ Kept: ${projectName} (ID: ${doc.id})`);
            }
        }
        
        console.log(`🎉 Cleanup completed! Deleted ${deletedCount} projects`);
        
        // List remaining projects
        await listVRARProjects();
        
        return deletedCount;
        
    } catch (error) {
        console.error('❌ Error during cleanup:', error);
        return 0;
    }
}

// Function to check if VR Campus Navigation exists
async function checkVRCampusExists() {
    try {
        console.log('🔍 Checking if VR Campus Navigation project exists...');
        
        const snapshot = await window.db.collection('VRAR').get();
        let found = false;
        
        snapshot.forEach(doc => {
            const data = doc.data();
            if (data.Name === 'VR Campus Navigation System' || data.title === 'VR Campus Navigation System') {
                console.log('✅ Found VR Campus Navigation project:', doc.id);
                found = true;
            }
        });
        
        if (!found) {
            console.log('❌ VR Campus Navigation project not found');
        }
        
        return found;
        
    } catch (error) {
        console.error('❌ Error checking for VR Campus Navigation:', error);
        return false;
    }
}

// Auto-execute when script loads
setTimeout(async () => {
    console.log('🗑️ VR Campus Navigation Project Remover Ready!');
    console.log('📋 Available commands:');
    console.log('  removeVRCampusNavigation() - Remove VR Campus Navigation project');
    console.log('  listVRARProjects() - List all current VRAR projects');
    console.log('  removeAllExceptVRMinimarket() - Remove all except VR Minimarket');
    console.log('  checkVRCampusExists() - Check if VR Campus Navigation exists');
    
    // Check current projects
    await listVRARProjects();
    
    // Check if VR Campus Navigation exists
    await checkVRCampusExists();
    
    console.log('💡 To remove VR Campus Navigation, run: removeVRCampusNavigation()');
}, 1000);

// Make functions available globally
window.removeVRCampusNavigation = removeVRCampusNavigation;
window.listVRARProjects = listVRARProjects;
window.removeAllExceptVRMinimarket = removeAllExceptVRMinimarket;
window.checkVRCampusExists = checkVRCampusExists; 