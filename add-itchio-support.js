// Add Itch.io Support to All Projects
// This script adds Itch.io link fields to all existing projects in the database

class ItchioSupportManager {
    constructor() {
        this.db = window.db;
        this.collections = [
            'Virtual Reality',
            'Augmented Reality', 
            'Mixed Reality',
            'Game Development',
            '3D Modeling',
            '2D & 3D Animation',
            'Audio & Video Production'
        ];
    }

    // Add Itch.io field to all projects in a collection
    async addItchioFieldToCollection(collectionName) {
        try {
            console.log(`Adding Itch.io field to projects in ${collectionName}...`);
            
            const snapshot = await this.db.collection(collectionName).get();
            
            if (snapshot.empty) {
                console.log(`No projects found in ${collectionName}`);
                return { success: true, updated: 0 };
            }

            let updatedCount = 0;
            const batch = this.db.batch();

            snapshot.forEach(doc => {
                const data = doc.data();
                
                // Check if Itch.io field already exists
                if (data.Itchio || data.itchioUrl || data['Itch.io']) {
                    console.log(`Project ${doc.id} already has Itch.io field`);
                    return;
                }

                // Add empty Itch.io field
                const docRef = this.db.collection(collectionName).doc(doc.id);
                batch.update(docRef, {
                    Itchio: '',
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                
                updatedCount++;
                console.log(`Queued update for project ${doc.id} in ${collectionName}`);
            });

            if (updatedCount > 0) {
                await batch.commit();
                console.log(`Successfully added Itch.io field to ${updatedCount} projects in ${collectionName}`);
            } else {
                console.log(`All projects in ${collectionName} already have Itch.io field`);
            }

            return { success: true, updated: updatedCount };

        } catch (error) {
            console.error(`Error adding Itch.io field to ${collectionName}:`, error);
            return { success: false, error: error.message };
        }
    }

    // Add Itch.io field to all collections
    async addItchioFieldToAllCollections() {
        console.log('Starting to add Itch.io field to all collections...');
        
        const results = [];
        
        for (const collectionName of this.collections) {
            const result = await this.addItchioFieldToCollection(collectionName);
            results.push({
                collection: collectionName,
                ...result
            });
            
            // Add a small delay between collections to avoid overwhelming the database
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('Completed adding Itch.io field to all collections:', results);
        return results;
    }

    // Update specific project with Itch.io link
    async updateProjectItchioLink(collectionName, projectId, itchioUrl) {
        try {
            console.log(`Updating project ${projectId} in ${collectionName} with Itch.io link: ${itchioUrl}`);
            
            await this.db.collection(collectionName).doc(projectId).update({
                Itchio: itchioUrl,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log(`Successfully updated project ${projectId} with Itch.io link`);
            return { success: true };

        } catch (error) {
            console.error(`Error updating project ${projectId}:`, error);
            return { success: false, error: error.message };
        }
    }

    // Get all projects that need Itch.io links
    async getProjectsNeedingItchioLinks() {
        const projectsNeedingLinks = {};
        
        for (const collectionName of this.collections) {
            try {
                const snapshot = await this.db.collection(collectionName).get();
                const projects = [];
                
                snapshot.forEach(doc => {
                    const data = doc.data();
                    const itchioUrl = data.Itchio || data.itchioUrl || data['Itch.io'] || '';
                    
                    if (!itchioUrl || itchioUrl.trim() === '') {
                        projects.push({
                            id: doc.id,
                            name: data.Name || data.title || 'Untitled Project',
                            description: data.Description || data.description || '',
                            currentItchio: itchioUrl
                        });
                    }
                });
                
                if (projects.length > 0) {
                    projectsNeedingLinks[collectionName] = projects;
                }
                
            } catch (error) {
                console.error(`Error getting projects from ${collectionName}:`, error);
            }
        }
        
        return projectsNeedingLinks;
    }

    // Bulk update Itch.io links for multiple projects
    async bulkUpdateItchioLinks(updates) {
        const results = [];
        
        for (const update of updates) {
            const result = await this.updateProjectItchioLink(
                update.collection, 
                update.projectId, 
                update.itchioUrl
            );
            results.push({
                collection: update.collection,
                projectId: update.projectId,
                ...result
            });
            
            // Small delay between updates
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        return results;
    }
}

// Create global instance
window.itchioManager = new ItchioSupportManager();

// Auto-run function to add Itch.io fields to all collections
async function addItchioFieldsToAllProjects() {
    console.log('=== Adding Itch.io Support to All Projects ===');
    
    if (!window.itchioManager) {
        console.error('ItchioManager not initialized');
        return;
    }

    try {
        const results = await window.itchioManager.addItchioFieldToAllCollections();
        
        console.log('=== Results Summary ===');
        results.forEach(result => {
            if (result.success) {
                console.log(`✅ ${result.collection}: ${result.updated} projects updated`);
            } else {
                console.log(`❌ ${result.collection}: Error - ${result.error}`);
            }
        });
        
        // Show projects that need Itch.io links
        console.log('\n=== Projects Needing Itch.io Links ===');
        const projectsNeedingLinks = await window.itchioManager.getProjectsNeedingItchioLinks();
        
        Object.keys(projectsNeedingLinks).forEach(collectionName => {
            console.log(`\n${collectionName}:`);
            projectsNeedingLinks[collectionName].forEach(project => {
                console.log(`  - ${project.name} (ID: ${project.id})`);
            });
        });
        
    } catch (error) {
        console.error('Error adding Itch.io fields:', error);
    }
}

// Function to update a specific project with Itch.io link
async function updateProjectWithItchioLink(collectionName, projectId, itchioUrl) {
    if (!window.itchioManager) {
        console.error('ItchioManager not initialized');
        return;
    }

    try {
        const result = await window.itchioManager.updateProjectItchioLink(collectionName, projectId, itchioUrl);
        
        if (result.success) {
            console.log(`✅ Successfully updated project ${projectId} with Itch.io link`);
        } else {
            console.log(`❌ Failed to update project ${projectId}: ${result.error}`);
        }
        
        return result;
    } catch (error) {
        console.error('Error updating project with Itch.io link:', error);
        return { success: false, error: error.message };
    }
}

// Function to get all projects that need Itch.io links
async function showProjectsNeedingItchioLinks() {
    if (!window.itchioManager) {
        console.error('ItchioManager not initialized');
        return;
    }

    try {
        const projectsNeedingLinks = await window.itchioManager.getProjectsNeedingItchioLinks();
        
        console.log('=== Projects Needing Itch.io Links ===');
        Object.keys(projectsNeedingLinks).forEach(collectionName => {
            console.log(`\n${collectionName}:`);
            projectsNeedingLinks[collectionName].forEach(project => {
                console.log(`  - ${project.name} (ID: ${project.id})`);
                console.log(`    Description: ${project.description.substring(0, 100)}...`);
            });
        });
        
        return projectsNeedingLinks;
    } catch (error) {
        console.error('Error getting projects needing Itch.io links:', error);
        return {};
    }
}

// Auto-run when script loads
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Itch.io Support Manager loaded!');
    console.log('Available functions:');
    console.log('- addItchioFieldsToAllProjects() - Add empty Itch.io fields to all projects');
    console.log('- updateProjectWithItchioLink(collection, projectId, itchioUrl) - Update specific project');
    console.log('- showProjectsNeedingItchioLinks() - Show projects that need Itch.io links');
    
    // Uncomment the line below to automatically add Itch.io fields to all projects
    // await addItchioFieldsToAllProjects();
});

console.log('Itch.io Support Manager initialized!');
